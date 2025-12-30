"use client";
import { useState } from "react";
import { 
  Filter, MapPin, Phone, User, Calendar, 
  Building2, Search, Download 
} from "lucide-react";

export default function FSETeamTracking() {
  const [selectedFse, setSelectedFse] = useState("All");

  // Mock Data Updated with specific fields
  const [leads] = useState([
    { 
      id: 1, fse: "Rahul Verma", company: "Goyal Logistics", location: "Okhla Ph-1", 
      contact_person: "Mr. Sharma", phone: "9876543210",
      latest_date: "2025-12-24", next_followup: "2025-12-28",
      status: "Interested", sub_status: "Proposal Shared", projection: "Hot"
    },
    { 
      id: 2, fse: "Priya Das", company: "Tech Solutions", location: "Noida Sec-62", 
      contact_person: "Ms. Anjali", phone: "9988776655",
      latest_date: "2025-12-23", next_followup: "NA",
      status: "Onboarded", sub_status: "Agreement Signed", projection: "Closed"
    },
    { 
      id: 3, fse: "Rahul Verma", company: "Apex Retail", location: "Lajpat Nagar", 
      contact_person: "Mr. Vikram", phone: "9123456789",
      latest_date: "2025-12-22", next_followup: "2026-01-05",
      status: "Not Interested", sub_status: "Budget Issue", projection: "Cold"
    },
    { 
      id: 4, fse: "Vikram Singh", company: "Delta Mfg Ltd", location: "Manesar", 
      contact_person: "Mr. Rajeev", phone: "8877665544",
      latest_date: "2025-12-21", next_followup: "2025-12-29",
      status: "Interested", sub_status: "Right Person Found", projection: "Warm"
    },
    { 
      id: 5, fse: "Priya Das", company: "Urban Clap Office", location: "Gurgaon", 
      contact_person: "HR Manager", phone: "7766554433",
      latest_date: "2025-12-20", next_followup: "2025-12-30",
      status: "Interested", sub_status: "Call Back", projection: "Hot"
    },
  ]);

  const fseList = ["All", ...new Set(leads.map(item => item.fse))];

  const filteredLeads = selectedFse === "All" 
    ? leads 
    : leads.filter(lead => lead.fse === selectedFse);

  return (
    <div className="h-[calc(100vh-2rem)] bg-[#f8fafc] w-full font-['Calibri'] p-2 flex flex-col overflow-hidden">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">
            Team Field Tracking
          </h1>
          <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mt-1.5 uppercase flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-[#a1db40] rounded-full animate-pulse shadow-[0_0_5px_#a1db40]"></span>
             Live Field Updates
          </p>
        </div>

        <div className="flex items-center gap-3">
           <div className="relative group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#103c7f]">
                <Filter size={14} />
             </div>
             <select 
               value={selectedFse}
               onChange={(e) => setSelectedFse(e.target.value)}
               className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-[12px] text-[11px] font-black text-[#103c7f] uppercase tracking-wide outline-none focus:border-[#103c7f] cursor-pointer appearance-none shadow-sm hover:bg-gray-100 transition-all min-w-[180px]"
             >
               {fseList.map(fse => (
                 <option key={fse} value={fse}>{fse === "All" ? "All FSE Personnel" : fse}</option>
               ))}
             </select>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
               <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M1 1L5 5L9 1" stroke="#103c7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </div>
           </div>
           <button className="bg-[#103c7f] text-white p-2 rounded-[12px] hover:bg-[#0d316a] transition-all shadow-md" title="Download Report">
             <Download size={16} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse relative">
            
            <thead className="sticky top-0 bg-[#103c7f] text-white z-10 text-[10px] uppercase font-black tracking-[0.1em]">
              <tr>
                <th className="px-5 py-3.5">FSE Name</th>
                <th className="px-5 py-3.5">Company & Location</th>
                <th className="px-5 py-3.5">Contact Person</th>
                <th className="px-5 py-3.5 text-center">Latest Date</th>
                <th className="px-5 py-3.5 text-center">Next Followup</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5">Sub-Status</th>
                <th className="px-5 py-3.5 text-center">Projection</th>
              </tr>
            </thead>
            
            <tbody className="text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-blue-50 transition-all group">
                  
                  {/* FSE Name */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                       <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#103c7f]">
                          <User size={14} strokeWidth={2.5} />
                       </div>
                       <span className="font-black text-[#103c7f] text-xs uppercase">{lead.fse}</span>
                    </div>
                  </td>

                  {/* Company & Location */}
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                        <Building2 size={12} className="text-gray-400"/> {lead.company}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 mt-0.5 flex items-center gap-1.5 pl-0.5">
                        <MapPin size={10} /> {lead.location}
                      </p>
                    </div>
                  </td>

                  {/* Contact Person & Number */}
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-bold text-gray-700 text-xs">{lead.contact_person}</p>
                      <p className="text-[10px] font-bold text-[#103c7f] mt-0.5 flex items-center gap-1">
                        <Phone size={10} /> {lead.phone}
                      </p>
                    </div>
                  </td>

                  {/* Latest Date */}
                  <td className="px-5 py-3 text-center">
                    <span className="font-bold text-gray-600 text-[11px]">{lead.latest_date}</span>
                  </td>

                  {/* Next Followup */}
                  <td className="px-5 py-3 text-center">
                     {lead.status === 'Onboarded' || lead.status === 'Not Interested' ? (
                       <span className="text-gray-300 text-[10px] font-bold">-</span>
                     ) : (
                       <span className="font-black text-orange-600 text-[11px] bg-orange-50 px-2 py-1 rounded-md">
                         {lead.next_followup}
                       </span>
                     )}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3 text-center">
                    <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border italic inline-block
                      ${lead.status === 'Onboarded' ? 'bg-green-50 text-green-700 border-green-100' : 
                        lead.status === 'Interested' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        lead.status === 'Not Interested' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-orange-50 text-orange-700 border-orange-100'
                      }`}>
                      {lead.status}
                    </span>
                  </td>

                  {/* Sub-Status */}
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-bold text-gray-600 truncate block max-w-[120px]" title={lead.sub_status}>
                      {lead.sub_status}
                    </span>
                  </td>

                  {/* Projection */}
                  <td className="px-5 py-3 text-center">
                    <span className={`text-[10px] font-black uppercase
                      ${lead.projection === 'Hot' ? 'text-red-600' : 
                        lead.projection === 'Warm' ? 'text-orange-500' : 
                        lead.projection === 'Closed' ? 'text-green-600' : 'text-gray-400'}`}>
                      {lead.projection}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Summary */}
        <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-between items-center text-[#103c7f] shrink-0">
           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Data for: <span className="text-[#103c7f] font-black">{selectedFse}</span>
           </p>
           <p className="text-[10px] font-black uppercase tracking-widest">
              Count: <span className="text-lg italic">{filteredLeads.length}</span>
           </p>
        </div>

      </div>
    </div>
  );
}