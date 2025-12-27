"use client";
import React, { useState, useEffect } from "react";
import {
  Users, CheckCircle, MapPin, Target, 
  TrendingUp, Calendar, Filter,
  ArrowRight, Search, Activity
} from "lucide-react";

export default function FSEDashboard() {
  const [mounted, setMounted] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => { setMounted(true); }, []);

  // Mock Data
  const [stats, setStats] = useState({
    global: { totalClients: 1250, totalOnboard: 450, totalVisits: 3200 },
    monthly: { visitTarget: "120/150", individualVisits: 85, onboardMtd: "12/20", avgVisit: 4.2 },
    projections: { mpLess50: 15, mpGreater50: 8, wpLess50: 22, wpGreater50: 12 },
    dynamicMetrics: { total: 12, individual: 8, repeat: 4, interested: 5, notInterested: 2, reachedOut: 15, onboard: 3 },
    clients: [
      { name: "Tech Corp Solutions", status: "Interested", sub: "WP > 50", color: "bg-green-100 text-green-700" },
      { name: "Global Logistics Ltd", status: "Onboarded", sub: "MP < 50", color: "bg-blue-100 text-[#103c7f]" },
      { name: "Pioneer Manufacturing", status: "Reached Out", sub: "WP < 50", color: "bg-gray-100 text-gray-700" },
      { name: "Apex Retailers", status: "Not Interested", sub: "MP > 50", color: "bg-red-100 text-red-700" },
      { name: "Innova Soft", status: "Interested", sub: "WP > 50", color: "bg-green-100 text-green-700" },
      { name: "Modern Services", status: "Onboarded", sub: "WP > 50", color: "bg-blue-100 text-[#103c7f]" },
    ]
  });

  if (!mounted) return null;

  return (
    <div className="p-1 bg-[#f8fafc] font-['Calibri'] h-full text-slate-800 flex flex-col">
      <div className="max-w-8xl mx-auto space-y-4 w-full">
        
        {/* --- ROW 1: GLOBAL STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Clients in Database" value={stats.global.totalClients} icon={<Users size={20} />} accentColor="text-[#103c7f]" bgColor="bg-[#103c7f]/10" />
          <StatCard title="Total Onboarded" value={stats.global.totalOnboard} icon={<CheckCircle size={20} />} accentColor="text-[#a1db40]" bgColor="bg-[#a1db40]/10" />
          <StatCard title="Total Visits" value={stats.global.totalVisits} icon={<MapPin size={20} />} accentColor="text-[#1a4da1]" bgColor="bg-[#1a4da1]/10" />
        </div>

        {/* --- ROW 2: KPIs & PROJECTION --- */}
        {/* Fixed: h-21 invalid tha, h-28 kiya. items-stretch rakha taaki height same rahe */}
        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-28 mb-4">
          
          {/* 1. Month Indicator */}
          <div className="bg-[#103c7f] rounded-xl flex flex-col items-center justify-center w-12 shadow-sm shrink-0 py-2 hidden lg:flex">
            <div className="flex flex-col items-center leading-[1.1] text-white font-black text-[16px] uppercase tracking-tighter">
              {"DEC".split("").map((char, i) => <span key={i}>{char}</span>)}
            </div>
          </div>

          {/* 2. KPIs (Fixed: Removed min-w-300px from children to prevent overflow) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3"> 
            <CompactMonthCard label="Total Visit" value="120/150" icon={<TrendingUp size={16} />} />
            <CompactMonthCard label="Individual Visit" value="85" icon={<Users size={16} />} />
            <CompactMonthCard label="Onboard (MTD/MP)" value="12/20" icon={<CheckCircle size={16} />} />
            <CompactMonthCard label="Avg Visit" value="4.2" icon={<Activity size={16} />} />
          </div>

          {/* 3. Projection Card */}
          <div className="flex-1 bg-[#103c7f] rounded-xl p-3 text-white shadow-md flex flex-col justify-between shrink-0 relative overflow-hidden border border-white/5 min-h-[100px]">
            <div className="flex justify-between items-center mb-1 px-1 relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#a1db40]">Projection</h3>
              <Target size={12} className="opacity-30" />
            </div>

            {/* Fixed: Grid gap logic */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 px-2 relative z-10">
               {/* Corrected Props passing */}
               <ProjItem label="MP < 50" value={stats.projections.mpLess50} />
               <ProjItem label="MP > 50" value={stats.projections.mpGreater50} />
               <ProjItem label="WP < 50" value={stats.projections.wpLess50} />
               <ProjItem label="WP > 50" value={stats.projections.wpGreater50} />
            </div>
            <Target size={60} className="absolute -right-4 -bottom-4 opacity-5 rotate-12" />
          </div>
        </div>

        {/* --- ROW 3: DATE SELECTOR --- */}
        <div className="bg-white rounded-2xl p-2 px-4 border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#103c7f] shrink-0">
            <h3 className="font-black text-sm uppercase tracking-wide">Latest Visit</h3>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <DateInput label="From" value={fromDate} onChange={setFromDate} />
            <DateInput label="To" value={toDate} onChange={setToDate} />
            <button className="bg-[#103c7f] text-white p-2.5 rounded-xl hover:bg-[#1a4da1] transition-all"><Filter size={16} /></button>
          </div>
        </div>

        {/* --- ROW 4: DYNAMIC METRICS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <DynamicCard label="Total Visit" value={stats.dynamicMetrics.total} color="border-l-[#103c7f]" />
          <DynamicCard label="Individual" value={stats.dynamicMetrics.individual} color="border-l-[#1a4da1]" />
          <DynamicCard label="Repeat" value={stats.dynamicMetrics.repeat} color="border-l-blue-400" />
          <DynamicCard label="Interested" value={stats.dynamicMetrics.interested} color="border-l-[#a1db40]" />
          <DynamicCard label="Not Interested" value={stats.dynamicMetrics.notInterested} color="border-l-red-400" />
          <DynamicCard label="Reached Out" value={stats.dynamicMetrics.reachedOut} color="border-l-orange-400" />
          <DynamicCard label="Onboarded" value={stats.dynamicMetrics.onboard} color="border-l-emerald-500" />
        </div>

        {/* --- ROW 5: SCROLLABLE TABLE (FIXED) --- */}
        {/* Fixed Height applied here */}
        <div className="h-[250px] bg-white rounded-[1rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col mb-4"> 
          <div className="px-6 py-3 border-b border-gray-50 flex items-center justify-between bg-[#103c7f]/5 shrink-0">
             <h3 className="text-[#103c7f] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Users size={14} className="text-[#a1db40]" /> Client Details
             </h3>
             <span className="text-[8px] font-bold text-gray-400 uppercase italic">{stats.clients.length * 4} Records</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-white">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 shadow-sm bg-white">
                <tr>
                  <th className="px-6 py-3 text-[10px] uppercase font-black text-gray-400 tracking-wider border-b border-gray-100 bg-white">Client Name</th>
                  <th className="px-6 py-3 text-[10px] uppercase font-black text-gray-400 tracking-wider border-b border-gray-100 bg-white text-center">Status</th>
                  <th className="px-6 py-3 text-[10px] uppercase font-black text-gray-400 tracking-wider border-b border-gray-100 bg-white text-right">Substatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...stats.clients, ...stats.clients, ...stats.clients, ...stats.clients].map((client, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-all group">
                    <td className="px-6 py-3 text-xs font-bold text-slate-700">{client.name} </td>
                    <td className="px-6 py-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${client.color}`}>{client.status}</span>
                    </td>
                    <td className="px-6 py-3 text-[10px] font-bold text-gray-400 italic text-right group-hover:text-[#103c7f]">{client.sub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

/* --- REUSABLE SUB-COMPONENTS --- */
function StatCard({ title, value, icon, accentColor, bgColor }) {
  return (
    <div className="bg-white border border-gray-100 p-3 px-4 rounded-xl shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`p-2.5 rounded-lg ${bgColor} ${accentColor} shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-0.5 truncate">{title}</p>
        <p className="text-xl font-black text-slate-800 leading-none">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

// Fixed: Removed min-w-[300px] which was breaking the grid
function CompactMonthCard({ label, value, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm flex items-center gap-3 h-full w-full">
      <div className="w-8 h-8 rounded-lg bg-[#103c7f]/10 flex items-center justify-center text-[#103c7f] shrink-0">
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wide truncate">{label}</span>
        <span className="text-base font-black text-[#103c7f] leading-tight">{value}</span>
      </div>
    </div>
  );
}

// Fixed: Simplified props to match usage (Label + Value only)
function ProjItem({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-white/10 py-1 w-full gap-2">
      <span className="text-[12px] font-bold text-[#a1db40] uppercase tracking-tighter shrink-0">{label}</span>
      <span className="text-[12px] font-black text-white italic shrink-0">{value}</span>
    </div>
  );
}

function DynamicCard({ label, value, color }) {
  return (
    <div className={`bg-white p-3 rounded-xl border border-gray-100 border-l-4 ${color} shadow-sm text-center`}>
      <p className="text-[9px] font-black text-gray-400 uppercase mb-1 truncate">{label}</p>
      <p className="text-lg font-black text-[#103c7f]">{value}</p>
    </div>
  );
}

function DateInput({ label, value, onChange }) {
    return (
        <div className="flex items-center bg-gray-50 border rounded-xl px-3 py-2 gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase">{label}</span>
            <input type="date" value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-xs font-bold outline-none" />
        </div>
    )
}