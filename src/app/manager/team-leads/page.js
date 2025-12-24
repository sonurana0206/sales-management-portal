"use client";
import { useState } from "react";
import { Users, Search, Filter, ArrowRight, ExternalLink } from "lucide-react";

export default function FSETracking() {
  const [teamLeads] = useState([
    { id: 1, fse: "Sonu Rawat", company: "Goyal Logistics", status: "Interested", lastVisit: "20-12-2025", next: "25-12-2025" },
    { id: 2, fse: "Amit Kumar", company: "Tech Solutions", status: "Onboarded", lastVisit: "19-12-2025", next: "NA" }
  ]);

  return (
    <div className="w-full font-['Calibri']">
      <div className="flex justify-between items-center mb-8 pr-4">
        <div>
          <h1 className="text-3xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">FSE Field Tracking</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2 flex items-center gap-2">
             Live Sourcing Analytics
          </p>
        </div>
        
        {/* Compact Filter */}
        <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
           <select className="text-[10px] font-black text-[#103c7f] px-4 outline-none uppercase cursor-pointer">
              <option>All FSE Personnel</option>
              <option>Sonu Rawat</option>
              <option>Amit Kumar</option>
           </select>
        </div>
      </div>

      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[32px] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-gray-50/50 border-b text-[10px] uppercase font-black text-gray-400 tracking-widest">
              <tr>
                <th className="p-6">FSE Name</th>
                <th className="p-6">Client Company</th>
                <th className="p-6">Current Status</th>
                <th className="p-6">Last Action Date</th>
                <th className="p-6 text-orange-600 italic">Next Follow-up</th>
                <th className="p-6 text-center">Full Report</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {teamLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-all group">
                  <td className="p-6 font-black text-[#103c7f]">{lead.fse}</td>
                  <td className="p-6 font-bold text-gray-600 italic">{lead.company}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                      lead.status === 'Onboarded' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-gray-400 tabular-nums">{lead.lastVisit}</td>
                  <td className="p-6 font-black text-orange-600 tabular-nums">{lead.next}</td>
                  <td className="p-6">
                    <div className="flex justify-center">
                       <button className="text-[#103c7f] hover:text-[#a1db40] p-2 transition-all"><ExternalLink size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}