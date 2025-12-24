"use client";
import { useState } from "react";
import { Check, X, Eye, ShieldCheck, UserCircle, Search, Filter, Download } from "lucide-react";

export default function HODApprovals() {
  // Mock Pending Data
  const [approvals] = useState([
    { id: 1, name: "Amit Sharma", role: "Sales Manager", type: "Travel Reimbursement", amount: "4,500", date: "22-12-2025", status: "Manager Approved" },
    { id: 2, name: "Rahul Verma", role: "Field Executive", type: "Client Stay", amount: "12,200", date: "21-12-2025", status: "Manager Approved" }
  ]);

  return (
    /* FIXED: Margin/Padding removed as RootLayout handles the shell.
       w-full ensures the table expands to cover all available Figma-style space.
    */
    <div className="min-h-screen bg-[#f3f4f6] pb-12 w-full font-['Calibri']">
      
      {/* --- APPROVALS HEADER SECTION --- */}
      <div className="bg-white rounded-[24px] p-8 mb-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-[#103c7f] p-4 rounded-[20px] shadow-lg shadow-[#103c7f]/20">
            <ShieldCheck size={28} className="text-[#a1db40]" strokeWidth={2.5}/>
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">Pending Sign-offs</h1>
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
               <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
               Dept. Finance Clearance
            </p>
          </div>
        </div>

        {/* Global Search & Action Pill */}
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-[20px] border border-gray-100">
           <div className="flex items-center px-4 gap-3 border-r border-gray-200">
             <Search size={18} className="text-gray-300"/>
             <input type="text" placeholder="Search by name..." className="bg-transparent text-[11px] font-bold text-[#103c7f] outline-none w-40" />
           </div>
           <button className="bg-[#103c7f] text-[#a1db40] px-6 py-2.5 rounded-[14px] font-black text-[10px] uppercase tracking-widest shadow-md flex items-center gap-2">
             <Download size={14} /> EXPORT LIST
           </button>
        </div>
      </div>

      {/* --- APPROVALS DATA TABLE --- */}
      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[32px] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
              <tr>
                <th className="p-8">Employee & Designation</th>
                <th className="p-8">Expense Category</th>
                <th className="p-8">Amount Claimed</th>
                <th className="p-8">Submit Date</th>
                <th className="p-8 text-center">Status Badge</th>
                <th className="p-8 text-center">Final Approval</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {approvals.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-[#103c7f] group-hover:bg-[#103c7f] group-hover:text-white transition-colors">
                        <UserCircle size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-black text-[#103c7f] text-base leading-none tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1.5">{item.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 font-bold text-gray-600 italic uppercase tracking-tighter">
                    {item.type}
                  </td>
                  <td className="p-8">
                    <p className="text-xl font-black text-[#103c7f] italic leading-none">₹{item.amount}</p>
                    <p className="text-[8px] font-bold text-gray-300 mt-1 uppercase">Tax Inclusive</p>
                  </td>
                  <td className="p-8 font-black text-gray-400 tabular-nums">
                    {item.date}
                  </td>
                  <td className="p-8 text-center">
                    <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-orange-100 italic">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-center gap-3">
                      <button className="bg-green-50 text-green-600 p-3.5 rounded-2xl hover:bg-green-600 hover:text-white hover:scale-110 transition-all shadow-sm" title="Final Approve">
                        <Check size={20} strokeWidth={3}/>
                      </button>
                      <button className="bg-red-50 text-red-600 p-3.5 rounded-2xl hover:bg-red-600 hover:text-white hover:scale-110 transition-all shadow-sm" title="Reject Claim">
                        <X size={20} strokeWidth={3}/>
                      </button>
                      <button className="bg-gray-100 text-[#103c7f] p-3.5 rounded-2xl hover:bg-[#103c7f] hover:text-white transition-all shadow-sm" title="View Bill">
                        <Eye size={20} strokeWidth={2}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer Activity */}
        <div className="bg-[#103c7f] p-5 flex justify-between items-center text-white">
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Last Sync: 23 Dec 2025</p>
           <p className="text-[10px] font-black uppercase tracking-widest text-[#a1db40]">Total Pending Value: ₹16,700</p>
        </div>
      </div>
    </div>
  );
}