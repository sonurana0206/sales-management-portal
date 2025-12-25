"use client";
import { useState, useEffect } from "react";
import { Pencil, Plus, X, Search, Filter, Loader2 } from "lucide-react";

export default function LeadsList() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    company: '',
    category: '',
    state: '',
    status: '',
    location: '',
    projection: ''
  });


  // 1. HYDRATION FIX
  useEffect(() => { setMounted(true); }, []);

  // 2. CHECK AUTH
  useEffect(() => {
    if (mounted) {
      const session = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('session') || '{}') : {};
      const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

      if (!session.access_token) {
        window.location.href = '/';
        return;
      }

      // Role-based access control
      const roleRoutes = {
        'FSE': '/fse',
        'MANAGER': '/manager',
        'HOD': '/hod',
        'ADMIN': '/admin'
      };

      if (user.role !== 'FSE') {
        // Redirect to appropriate dashboard if not FSE
        const redirectPath = roleRoutes[user.role] || '/';
        window.location.href = redirectPath;
      }
    }
  }, [mounted]);

  // 3. FETCH LEADS ON MOUNT
  useEffect(() => {
    if (mounted) {
      fetchLeads();
    }
  }, [mounted]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const session = JSON.parse(localStorage.getItem('session') || '{}');
      const response = await fetch('/api/fse/clients', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setLeads(data.data);
      } else {
        setError(data.error || 'Failed to fetch leads');
      }
    } catch (err) {
      setError('Network error while fetching leads');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 3. SAVE LEAD FUNCTION
  const saveLead = async (formData) => {
    try {
      setSaving(true);
      setError(null);

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const session = JSON.parse(localStorage.getItem('session') || '{}');

      const isEdit = !!selectedLead;
      let leadData;
      let method;
      let url = '/api/fse/clients';

      if (isEdit) {
        // Update existing lead
        leadData = {
          client_id: selectedLead.client_id,
          ...formData
        };
        method = 'PUT';
      } else {
        // Create new lead
        leadData = {
          ...formData,
          user_id: user.user_id
        };
        method = 'POST';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(leadData)
      });

      const data = await response.json();

      if (data.success) {
        if (isEdit) {
          // Update existing lead in the list
          setLeads(prev => prev.map(lead =>
            lead.client_id === selectedLead.client_id ? data.data : lead
          ));
        } else {
          // Add new lead to the list
          setLeads(prev => [data.data, ...prev]);
        }
        setIsModalOpen(false);
        setSelectedLead(null);
      } else {
        setError(data.error || 'Failed to save lead');
      }
    } catch (err) {
      setError('Network error while saving lead');
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // 4. FILTER LEADS FUNCTION
  const getFilteredLeads = () => {
    return leads.filter(lead => {
      const matchesCompany = !filters.company ||
        lead.company.toLowerCase().includes(filters.company.toLowerCase());
      const matchesCategory = !filters.category || lead.category === filters.category;
      const matchesState = !filters.state || lead.state === filters.state;
      const matchesStatus = !filters.status || lead.status === filters.status;
      const matchesLocation = !filters.location ||
        lead.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesProjection = !filters.projection || lead.projection === filters.projection;

      return matchesCompany && matchesCategory && matchesState &&
             matchesStatus && matchesLocation && matchesProjection;
    });
  };

  // 5. UPDATE FILTERS
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // --- 6. MODAL FUNCTIONS ---
  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  // --- 7. FORM SUBMIT HANDLER ---
  const handleFormSubmit = (formData) => {
    saveLead(formData);
  };

  // --- DROPDOWN LISTS ---
  const categoryList = ["Industrial", "IT / Service", "Retail", "Manufacturing"];

  const statesList = [
    "Delhi", "Haryana", "UP", "Maharashtra",
    "Punjab", "Gujarat", "Karnataka"
  ];

  const empCountList = ["1-50", "51-200", "201-500", "500+"];

  const projectionList = ["WP > 50", "WP < 50", "MP > 50", "MP < 50"];

  const statusList = ["Interested", "Not Interested", "Onboarded"];

  const subStatusList = [
    "Blue Collar",
    "Call Back",
    "In Process",
    "Low Budget",
    "Medicant",
    "Not ready to sign",
    "Proposal Shared",
    "Right Person Founded"
  ];

  if (!mounted) return null;

  const filteredLeads = getFilteredLeads();

  return (
<div className="w-full h-screen flex flex-col overflow-hidden font-['Calibri']">

      {/* 8. HEADER SECTION */}
      <div className="flex items-center gap-8 mb-6 pr-4">
        <div>
          <h1 className="text-2xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">Leads Master Database</h1>
          <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mt-1.5 flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-[#a1db40] rounded-full animate-pulse shadow-[0_0_5px_#a1db40]"></span> Field Operations Portal
          </p>
        </div>
        <button
          onClick={openAddModal}
          disabled={saving}
          className="bg-[#a1db40] text-[#103c7f] px-6 py-2.5 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg uppercase italic text-[11px] disabled:opacity-50"
        >
          <Plus size={18} strokeWidth={4} /> ADD NEW CLIENT
        </button>
      </div>

      {/* 9. FILTER BAR */}
      <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm mb-6 w-full shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">

          {/* Company Filter */}
          <input
            type="text"
            placeholder="COMPANY..."
            value={filters.company}
            onChange={(e) => updateFilter('company', e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none placeholder:text-gray-300"
          />

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none cursor-pointer appearance-none"
          >
            <option value="">CATEGORY</option>
            {categoryList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* State Filter */}
          <select
            value={filters.state}
            onChange={(e) => updateFilter('state', e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none cursor-pointer appearance-none"
          >
            <option value="">STATE</option>
            {statesList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Date Filter */}
          <input
            type="date"
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none"
          />

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none cursor-pointer appearance-none"
          >
            <option value="">STATUS</option>
            {statusList.map(st => <option key={st} value={st}>{st}</option>)}
          </select>

          {/* Location Filter */}
          <input
            type="text"
            placeholder="LOCATION..."
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none placeholder:text-gray-300"
          />

          {/* Projection Filter */}
          <select
            value={filters.projection}
            onChange={(e) => updateFilter('projection', e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-[#103c7f] outline-none cursor-pointer appearance-none"
          >
            <option value="">PROJECTION</option>
            {projectionList.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* 10. LEADS TABLE */}
      <div className="bg-white border border-[#103c7f]/20 rounded-xl shadow-md flex-1 min-h-0">
        <div className="w-full h-full overflow-x-auto overflow-y-auto">

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="animate-spin text-[#103c7f]" size={32} />
              <span className="ml-2 text-gray-600">Loading leads...</span>
            </div>
          ) : (
            <table className="min-w-[3200px] text-[11px] border-collapse">

              {/* ===== TABLE HEADER ===== */}
              <thead className="sticky top-0 z-30 bg-[#103c7f] border-b border-[#103c7f]">
                <tr className="uppercase text-white font-black tracking-widest">
                  {[
                    "Sourcing Date","Company","Category","State","Location",
                    "Employee Count","Contact Person","Contact No.","Email",
                    "Call / Visit","Latest Mode",
                    "Date of Call / Visit","Latest Date",
                    "Remarks","Reference","Next Followup",
                    "Status","Sub Status","Projection","Action"
                  ].map(h => (
                    <th key={h} className="px-3 py-3 text-left whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ===== TABLE BODY ===== */}
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={20} className="text-center py-10 text-gray-400 font-bold">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, index) => (
                    <tr
                      key={lead.client_id || lead.id}
                      className={`
                        border-b
                        ${index % 2 === 0 ? "bg-white" : "bg-[#103c7f]/5"}
                        hover:bg-[#a1db40]/20 transition
                      `}
                    >
                      <td className="px-3 py-2">{lead.sourcing_date}</td>
                      <td className="px-3 py-2 font-bold text-[#103c7f]">{lead.company}</td>
                      <td className="px-3 py-2">{lead.category}</td>
                      <td className="px-3 py-2">{lead.state}</td>
                      <td className="px-3 py-2">{lead.location}</td>
                      <td className="px-3 py-2">{lead.employee_count}</td>
                      <td className="px-3 py-2">{lead.contact_person}</td>
                      <td className="px-3 py-2">{lead.contact_no}</td>
                      <td className="px-3 py-2 text-blue-700 underline">
                        {lead.email}
                      </td>
                      <td className="px-3 py-2">{lead.contact_mode}</td>
                      <td className="px-3 py-2">{lead.latest_contact_mode}</td>
                      <td className="px-3 py-2">{lead.contact_date}</td>
                      <td className="px-3 py-2">{lead.latest_contact_date}</td>
                      <td className="px-3 py-2 max-w-[200px] truncate">
                        {lead.remarks}
                      </td>
                      <td className="px-3 py-2">{lead.reference}</td>
                      <td className="px-3 py-2 font-bold text-gray-800">
                        {lead.next_follow_up}
                      </td>

                      {/* ===== STATUS BADGE ===== */}
                      <td className="px-3 py-2">
                        <span className="px-2 py-1 rounded-full text-[10px] font-black bg-[#a1db40]/20 text-[#103c7f]">
                          {lead.status}
                        </span>
                      </td>

                      <td className="px-3 py-2">{lead.sub_status}</td>
                      <td className="px-3 py-2 font-bold">{lead.projection}</td>

                      {/* ===== ACTION BUTTON ===== */}
                      <td className="px-3 py-2">
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-1.5 bg-[#103c7f] text-white rounded-lg hover:bg-[#a1db40] hover:text-[#103c7f] transition"
                        >
                          <Pencil size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          )}

        </div>
      </div>

      {/* 11. MODAL: ADD/EDIT CLIENT */}
      {isModalOpen && (
        <LeadModal
          lead={selectedLead}
          onSave={handleFormSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLead(null);
          }}
          saving={saving}
          categoryList={categoryList}
          statesList={statesList}
          empCountList={empCountList}
          statusList={statusList}
          subStatusList={subStatusList}
          projectionList={projectionList}
        />
      )}

    </div>
  );
}

// Separate Modal Component
function LeadModal({ lead, onSave, onClose, saving, ...lists }) {
  const [formData, setFormData] = useState({
    sourcing_date: lead?.sourcing_date || '',
    company: lead?.company || '',
    category: lead?.category || '',
    state: lead?.state || '',
    location: lead?.location || '',
    employee_count: lead?.employee_count || '',
    contact_person: lead?.contact_person || '',
    contact_no: lead?.contact_no || '',
    email: lead?.email || '',
    contact_mode: lead?.contact_mode || 'Call',
    latest_contact_mode: lead?.latest_contact_mode || 'Call',
    contact_date: lead?.contact_date || '',
    latest_contact_date: lead?.latest_contact_date || '',
    reference: lead?.reference || '',
    next_follow_up: lead?.next_follow_up || '',
    status: lead?.status || 'Interested',
    sub_status: lead?.sub_status || '',
    projection: lead?.projection || '',
    remarks: lead?.remarks || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-[#103c7f]/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[32px] shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">

        {/* HEADER */}
        <div className="sticky top-0 bg-white px-10 py-6 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-black text-[#103c7f] uppercase italic tracking-tight">
            {lead ? `Update Record : ${lead.company}` : "New Client Registration"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 text-gray-400 hover:text-red-500 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">

          {/* Form Fields - Add all the form fields here */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Sourcing Date</label>
            <input
              type="date"
              value={formData.sourcing_date}
              onChange={(e) => updateField('sourcing_date', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => updateField('company', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            >
              <option value="">Select Category</option>
              {lists.categoryList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">State</label>
            <select
              value={formData.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            >
              <option value="">Select State</option>
              {lists.statesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Employee Count</label>
            <select
              value={formData.employee_count}
              onChange={(e) => updateField('employee_count', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            >
              <option value="">Select Count</option>
              {lists.empCountList.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Contact Person</label>
            <input
              type="text"
              value={formData.contact_person}
              onChange={(e) => updateField('contact_person', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Contact No.</label>
            <input
              type="tel"
              value={formData.contact_no}
              onChange={(e) => updateField('contact_no', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Call / Visit</label>
            <select
              value={formData.contact_mode}
              onChange={(e) => updateField('contact_mode', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            >
              <option value="Call">Call</option>
              <option value="Visit">Visit</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Latest Mode</label>
            <select
              value={formData.latest_contact_mode}
              onChange={(e) => updateField('latest_contact_mode', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            >
              <option value="Call">Call</option>
              <option value="Visit">Visit</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Date of Call / Visit</label>
            <input
              type="date"
              value={formData.contact_date}
              onChange={(e) => updateField('contact_date', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Latest Date</label>
            <input
              type="date"
              value={formData.latest_contact_date}
              onChange={(e) => updateField('latest_contact_date', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Reference</label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => updateField('reference', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Next Followup</label>
            <input
              type="date"
              value={formData.next_follow_up}
              onChange={(e) => updateField('next_follow_up', e.target.value)}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl text-sm font-semibold text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
              required
            >
              {lists.statusList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Sub Status</label>
            <select
              value={formData.sub_status}
              onChange={(e) => updateField('sub_status', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            >
              <option value="">Select Sub Status</option>
              {lists.subStatusList.map(ss => <option key={ss} value={ss}>{ss}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Projection</label>
            <select
              value={formData.projection}
              onChange={(e) => updateField('projection', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition"
            >
              <option value="">Select Projection</option>
              {lists.projectionList.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* REMARKS */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-wide text-gray-500 ml-1">Remarks</label>
            <textarea
              rows="3"
              value={formData.remarks}
              onChange={(e) => updateField('remarks', e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#103c7f]/30 focus:border-[#103c7f] transition resize-none"
              placeholder="Additional notes..."
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="md:col-span-2 lg:col-span-3 flex gap-3 pt-6 mt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#103c7f] text-white py-2.5 rounded-xl font-bold uppercase italic text-xs tracking-widest hover:bg-[#1a4da1] shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {lead ? "Update Record" : "Save Record"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}