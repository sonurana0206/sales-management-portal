import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // Authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseServer.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    // Get monthly stats
    const { data: monthlyData, error: monthlyError } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .gte('sourcing_date', `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`)

    if (monthlyError) {
      console.error('Monthly stats error:', monthlyError)
    }

    // Calculate monthly stats
    const totalVisits = monthlyData?.length || 0
    const onboarded = monthlyData?.filter(client => client.status === 'Onboarded').length || 0
    const individualVisits = monthlyData?.filter(client => client.contact_mode === 'Visit').length || 0

    // Get today's activity data
    const { data: todayActivityData, error: todayActivityError } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .or(`sourcing_date.eq.${today},latest_contact_date.eq.${today}`)

    if (todayActivityError) {
      console.error('Today activity error:', todayActivityError)
    }

    // Calculate today's metrics based on business logic
    const todayClients = todayActivityData || []

    // Individual: sourcing_date is today (new leads)
    const todayIndividual = todayClients.filter(client => client.sourcing_date === today).length

    // Repeat: latest_contact_date is today AND sourcing_date != latest_contact_date (follow-ups)
    const todayRepeat = todayClients.filter(client =>
      client.latest_contact_date === today && client.sourcing_date !== client.latest_contact_date
    ).length

    // Total: unique clients with any activity today
    const uniqueTodayClients = new Set(todayClients.map(c => c.client_id))
    const todayTotal = uniqueTodayClients.size

    // Interested: (sourcing_date OR latest_contact_date is today) AND status is Interested
    const todayInterested = todayClients.filter(client => client.status === 'Interested').length

    // Onboarded: (sourcing_date OR latest_contact_date is today) AND status is Onboarded
    const todayOnboarded = todayClients.filter(client => client.status === 'Onboarded').length

    // Check if DWR record exists for today
    const { data: existingDwr, error: dwrCheckError } = await supabaseServer
      .from('dwr_history')
      .select('*')
      .eq('user_id', user.id)
      .eq('dwr_date', today)
      .single()

    if (dwrCheckError && dwrCheckError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('DWR check error:', dwrCheckError)
    }

    // Prepare DWR data
    const dwrData = {
      user_id: user.id,
      dwr_date: today,
      total_visit: todayTotal,
      individual: todayIndividual,
      repeat: todayRepeat,
      interested: todayInterested,
      onboarded: todayOnboarded
    }

    if (existingDwr) {
      // Update existing DWR record
      const { error: updateError } = await supabaseServer
        .from('dwr_history')
        .update(dwrData)
        .eq('user_id', user.id)
        .eq('dwr_date', today)

      if (updateError) {
        console.error('DWR update error:', updateError)
      }
    } else {
      // Insert new DWR record
      const { error: insertError } = await supabaseServer
        .from('dwr_history')
        .insert(dwrData)

      if (insertError) {
        console.error('DWR insert error:', insertError)
      }
    }

    // Get all recent leads
    const { data: recentLeads, error: leadsError } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (leadsError) {
      console.error('Recent leads error:', leadsError)
    }

    // Format recent leads for UI
    const formattedLeads = recentLeads?.map((lead, index) => ({
      sn: index + 1,
      name: lead.company,
      status: lead.status,
      sub: lead.sub_status || '-',
      color: getStatusColor(lead.status)
    })) || []

    // Calculate average (this might need adjustment based on business logic)
    const avg = totalVisits > 0 ? (onboarded / totalVisits * 10).toFixed(1) : '0.0'

    const dashboardData = {
      monthlyStats: {
        month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(),
        totalVisits: totalVisits,
        individualVisits: individualVisits,
        totalOnboarded: onboarded,
        mtdMp: `${onboarded}/${totalVisits}`, // Onboarded/Total
        avg: avg
      },
      latestActivity: {
        date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY format
        total: dwrData.total_visit,
        individual: dwrData.individual,
        repeat: dwrData.repeat,
        interested: dwrData.interested,
        onboarded: dwrData.onboarded
      },
      latestLeads: formattedLeads
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 })
  }
}

// Helper function to get status color classes
function getStatusColor(status) {
  switch (status) {
    case 'Onboarded':
      return 'text-white bg-green-700'
    case 'Interested':
      return 'text-green-600 bg-green-50'
    case 'Not Interested':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-blue-600 bg-blue-50'
  }
}