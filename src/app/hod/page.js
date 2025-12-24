"use client";
import { useState } from "react";
import { 
  BarChart3, Calendar, Filter, Target, 
  TrendingUp, Users, ShieldCheck, 
  ChevronRight, Globe, LayoutDashboard
} from "lucide-react";

export default function HODDashboard() {
  const [sector, setSector] = useState("All");

  const domesticKPIs = [
    { kpi: "Onboarding", target: "12", mtd: "0", achieved: "0", unit: "Number" },
    { kpi: "Avg Visit / day", target: "240", mtd: "0", achieved: "0", unit: "Number" },
    { kpi: "Joinings", target: "NA", mtd: "0", achieved: "0", unit: "Number" },
    { kpi: "CTC Generated", target: "NA", mtd: "0", achieved: "0", unit: "INR" },
    { kpi: "Total Positions", target: "NA", mtd: "0", achieved: "0", unit: "Number" },
  ];

  return (
    /* FIXED: Margin removed from here because Layout handles it.
       Width is now 100% of the available area.
    */
    <div className="min-h-screen bg-[#f3f4f6] pb-12 w-full font-['Calibri']">
      
      {/* --- TOP BAR --- */}
      <div className="bg-white rounded-[24px] p-6 mb-6 shadow-sm border border-gray-100 flex flex-col xl:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#103c7f] p-3 rounded-2xl shadow-lg shadow-[#103c7f]/20">
            <LayoutDashboard size={24} className="text-[#a1db40]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#103c7f] tracking-tight uppercase leading-none">Strategic Overview</h1>
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mt-1.5 uppercase">Dept. Head Controls</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-[20px] border border-gray-100">
          <div className="flex items-center px-4 gap-3 border-r border-gray-200">
            <Calendar size={16} className="text-gray-400"/>
            <input type="date" className="bg-transparent text-[11px] font-black text-[#103c7f] outline-none" defaultValue="2025-12-15" />
            <span className="text-gray-300 text-xs">to</span>
            <input type="date" className="bg-transparent text-[11px] font-black text-[#103c7f] outline-none" defaultValue="2025-12-23" />
          </div>
          <div className="px-4 border-r border-gray-200">
            <select 
              value={sector} onChange={(e) => setSector(e.target.value)}
              className="bg-transparent text-[11px] font-black text-[#103c7f] outline-none appearance-none cursor-pointer uppercase"
            >
              <option value="All">All Sectors</option>
              <option value="Domestic">Domestic</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
          <button className="bg-[#a1db40] text-[#103c7f] px-6 py-2.5 rounded-[16px] font-black text-[10px] uppercase tracking-widest shadow-md">
            Update View
          </button>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: "Department Revenue", val: "₹1.24 Cr", trend: "+12.5%", icon: <TrendingUp/>, bg: "bg-blue-500" },
          { label: "Pipeline Velocity", val: "84.2%", trend: "Optimal", icon: <Target/>, bg: "bg-green-500" },
          { label: "Active Field Force", val: "142", trend: "3 Teams", icon: <Users/>, bg: "bg-orange-500" },
          { label: "Client Conversion", val: "22.8%", trend: "+4%", icon: <ShieldCheck/>, bg: "bg-purple-500" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="relative z-10 flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-[#103c7f] group-hover:text-[#a1db40] transition-colors duration-500">
                {card.icon}
              </div>
              <span className="text-[9px] font-black bg-green-50 text-green-600 px-2.5 py-1 rounded-full uppercase">{card.trend}</span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{card.label}</p>
              <h4 className="text-3xl font-black text-[#103c7f] mt-1 tracking-tighter">{card.val}</h4>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${card.bg}`}></div>
          </div>
        ))}
      </div>

      {/* --- TABLES: Exact Excel Logic --- */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        {/* DOMESTIC CARD */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 flex justify-between items-center">
            <h2 className="text-xl font-black text-white uppercase tracking-[0.1em] italic">Domestic Sector</h2>
            <button className="text-[9px] font-black text-white/80 border border-white/20 px-4 py-1.5 rounded-full uppercase">Details</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b text-[9px] uppercase font-black text-gray-400 tracking-[0.2em]">
                <tr><th className="p-5">KPI</th><th className="p-5 text-center">Goal</th><th className="p-5 text-center">MTD</th><th className="p-5 text-center">Status</th></tr>
              </thead>
              <tbody className="text-xs font-bold text-gray-600">
                {domesticKPIs.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-green-50/30 transition-all">
                    <td className="p-5 text-[#103c7f] font-black">{row.kpi}</td>
                    <td className="p-5 text-center text-gray-400">{row.target}</td>
                    <td className="p-5 text-center bg-gray-50/50">{row.mtd}</td>
                    <td className="p-5 text-center"><span className="bg-gray-100 px-3 py-1 rounded-md text-[9px] uppercase">{row.achieved}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-4 bg-[#103c7f] text-white p-6">
             {[{l:"WP > 50",v:"02",c:"text-[#a1db40]"},{l:"WP < 50",v:"01"},{l:"MP > 50",v:"00"},{l:"MP < 50",v:"05"}].map((m,i)=>(
               <div key={i} className={`text-center ${i!==3?'border-r border-white/10':''}`}>
                 <p className="text-[8px] opacity-40 uppercase mb-1">{m.l}</p><p className={`text-2xl font-black ${m.c||''}`}>{m.v}</p>
               </div>
             ))}
          </div>
        </div>

        {/* CORPORATE CARD */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 flex justify-between items-center text-white">
            <h2 className="text-xl font-black uppercase tracking-[0.1em] italic">Corporate Sector</h2>
            <button className="text-[9px] font-black text-white/80 border border-white/20 px-4 py-1.5 rounded-full uppercase">Export</button>
          </div>
          <div className="overflow-x-auto flex-1 italic text-gray-300 flex items-center justify-center p-20">
             Corporate data loading from Supabase...
          </div>
        </div>
      </div>
    </div>
  );
}