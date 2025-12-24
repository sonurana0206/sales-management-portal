"use client";
import { useState } from "react";
import { 
  Users, Wallet, TrendingUp, CheckCircle2, 
  ArrowUpRight, Eye, Check, X, Bell, LayoutDashboard
} from "lucide-react";

export default function ManagerHome() {
  // Manager-specific stats
  const [stats] = useState([
    { title: "Total Team Leads", value: "2,450", trend: "+12%", icon: <Users size={24}/>, color: "bg-blue-50 text-[#103c7f]" },
    { title: "Pending Expenses", value: "₹18,200", trend: "5 Claims", icon: <Wallet size={24}/>, color: "bg-orange-50 text-orange-600" },
    { title: "Monthly Target", value: "85%", trend: "On Track", icon: <TrendingUp size={24}/>, color: "bg-green-50 text-green-600" }
  ]);

  const [teamActivity] = useState([
    { id: 1, fse: "Sonu Rawat", activity: "New Lead Added", details: "Sample Enterprise Ltd", time: "10 mins ago" },
    { id: 2, fse: "Amit Kumar", activity: "Expense Claimed", details: "Travel Reimbursement", time: "1 hour ago" },
    { id: 3, fse: "Rahul Sharma", activity: "Status Updated", details: "Interested -> Onboarded", time: "3 hours ago" }
  ]);

  return (
    /* FIXED: ml-22/72 margins removed. 
       w-full ensures content starts exactly where Layout's padding ends.
    */
    <div className="w-full min-h-screen font-['Calibri']">
      
      {/* --- MANAGER HEADER --- */}
      <div className="flex justify-between items-center mb-10 w-full pr-4">
        <div className="flex items-center gap-5">
          <div className="bg-[#103c7f] p-4 rounded-[22px] shadow-lg shadow-[#103c7f]/20">
            <LayoutDashboard size={28} className="text-[#a1db40]" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">
              Manager Control Center
            </h1>
            <div className="flex items-center gap-2 mt-2">
               <span className="w-2.5 h-2.5 bg-[#a1db40] rounded-full shadow-[0_0_8px_#a1db40] animate-pulse"></span>
               <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest leading-none">
                 Sales Operations Desk
               </p>
            </div>
          </div>
        </div>
        
        {/*<button className="p-4 bg-white border border-gray-100 rounded-2xl text-[#103c7f] shadow-sm hover:bg-blue-50 transition-all relative group">
          <Bell size={22} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>*/}
      </div>

      {/* --- INSIGHT CARDS: Max width utilization --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className={`${stat.color} p-4 rounded-2xl shadow-inner`}>{stat.icon}</div>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase italic tracking-tighter">{stat.trend}</span>
            </div>
            <div className="mt-8 relative z-10">
              <h3 className="text-gray-400 font-bold uppercase text-[11px] tracking-[0.2em]">{stat.title}</h3>
              <p className="text-4xl font-black text-[#103c7f] mt-1 tracking-tighter italic">{stat.value}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-[#103c7f]/5 transform -rotate-12 group-hover:scale-125 transition-transform duration-700">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* --- TEAM LIVE ACTIVITY TABLE: Figma Style Wide Layout --- */}
      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[40px] border border-gray-100 overflow-hidden w-full mb-12">
        <div className="p-10 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">Live Team Activity</h2>
            <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase tracking-widest italic opacity-60">FSE field updates</p>
          </div>
          <button className="text-[10px] font-black text-[#103c7f] uppercase tracking-[0.2em] bg-blue-50/50 px-6 py-3 rounded-xl hover:bg-[#103c7f] hover:text-[#a1db40] transition-all border border-blue-100 shadow-sm">
            Full Audit Log
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-50">
              <tr>
                <th className="px-10 py-8">FSE Personnel</th>
                <th className="px-10 py-8">Action Type</th>
                <th className="px-10 py-8">Reference Details</th>
                <th className="px-10 py-8">Recorded Time</th>
                <th className="px-10 py-8 text-center">Engagement</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {teamActivity.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-all group italic">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#103c7f] to-blue-900 text-[#a1db40] rounded-2xl flex items-center justify-center font-black text-base shadow-lg group-hover:scale-105 transition-transform">
                        {log.fse.charAt(0)}
                      </div>
                      <div>
                        <span className="font-black text-[#103c7f] not-italic tracking-tight text-lg leading-none">{log.fse}</span>
                        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 not-italic tracking-tighter">Team Alpha</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-200 not-italic">
                      {log.activity}
                    </span>
                  </td>
                  <td className="px-10 py-6 font-bold text-gray-600 tracking-tight">{log.details}</td>
                  <td className="px-10 py-6 text-gray-400 font-black tabular-nums text-xs not-italic uppercase tracking-tighter">{log.time}</td>
                  <td className="px-10 py-6">
                    <div className="flex justify-center">
                      <button className="bg-[#103c7f] text-white p-3.5 rounded-[18px] hover:bg-[#a1db40] hover:text-[#103c7f] transition-all shadow-xl shadow-blue-900/10 group-hover:scale-110 active:scale-90">
                        <Eye size={20} strokeWidth={2.5}/>
                      </button>
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