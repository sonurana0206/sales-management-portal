"use client";
import { useState } from "react";
import { Check, X, Eye, ShieldCheck, UserCircle, Search, Download, Clock, FileText } from "lucide-react";

export default function ManagerApprovals() {
  const [approvals] = useState([
    { 
      id: 1, 
      name: "Rahul Verma", 
      role: "Field Sales Executive", 
      category: "Travel", 
      notes: "Cab to Airport for Mumbai Client visit", 
      amount: "2,400", 
      date: "24-12-2025", 
      status: "Pending Review", 
      img: "bg-blue-100 text-blue-600" 
    },
    { 
      id: 2, 
      name: "Priya Das", 
      role: "Field Sales Executive", 
      category: "Food", 
      notes: "Lunch with Maven Jobs HR Team", 
      amount: "850", 
      date: "24-12-2025", 
      status: "Pending Review", 
      img: "bg-purple-100 text-purple-600" 
    },
    { 
      id: 3, 
      name: "Vikram Singh", 
      role: "Field Sales Executive", 
      category: "Stay", 
      notes: "Hotel Lemon Tree (2 Nights)", 
      amount: "4,200", 
      date: "23-12-2025", 
      status: "Pending Review", 
      img: "bg-green-100 text-green-600" 
    },
    { 
      id: 4, 
      name: "Anjali Mehta", 
      role: "Field Sales Executive", 
      category: "Travel", 
      notes: "Local Auto charges (No bill)", 
      amount: "350", 
      date: "22-12-2025", 
      status: "Clarification Req", 
      img: "bg-orange-100 text-orange-600" 
    }
  ]);

  return (
    <div className="min-h-screen bg-[#f3f4f6] pb-12 w-full font-['Calibri']">
      
      {/* HEADER SECTION */}
      <div className="bg-white rounded-[24px] p-8 mb-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-[#103c7f] p-4 rounded-[20px] shadow-lg shadow-[#103c7f]/20">
            <ShieldCheck size={28} className="text-[#a1db40]" strokeWidth={2.5}/>
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#103c7f] tracking-tight uppercase italic leading-none">
              Team Approvals
            </h1>
            <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
               <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
               FSE Claims Queue
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-[20px] border border-gray-100">
           <div className="flex items-center px-4 gap-3 border-r border-gray-200">
             <Search size={18} className="text-gray-300"/>
             <input type="text" placeholder="Search FSE..." className="bg-transparent text-[11px] font-bold text-[#103c7f] outline-none w-32" />
           </div>
           <button className="bg-[#103c7f] text-[#a1db40] px-6 py-2.5 rounded-[14px] font-black text-[10px] uppercase tracking-widest shadow-md flex items-center gap-2">
             <Download size={14} /> Report
           </button>
        </div>
      </div>

      {/* CLAIMS TABLE */}
      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-[32px] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
              <tr>
                <th className="p-8">Field Executive</th>
                <th className="p-8">Expense Category & Notes</th>
                <th className="p-8">Amount</th>
                <th className="p-8">Date</th>
                <th className="p-8 text-center">Status</th>
                <th className="p-8 text-center">Manager Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {approvals.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${item.img}`}>
                        <UserCircle size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-black text-[#103c7f] text-base leading-none tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a1db40]"></span>
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-col">
                        <span className="font-black text-gray-700 uppercase tracking-tight text-xs mb-1">
                            {item.category}
                        </span>
                        <span className="text-xs font-bold text-gray-400 italic">
                            "{item.notes}"
                        </span>
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="text-xl font-black text-[#103c7f] italic leading-none">₹{item.amount}</p>
                    <p className="text-[8px] font-bold text-gray-300 mt-1 uppercase">INR</p>
                  </td>
                  <td className="p-8 font-black text-gray-400 tabular-nums">
                    {item.date}
                  </td>
                  <td className="p-8 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border italic flex items-center justify-center gap-2 w-fit mx-auto
                      ${item.status === 'Clarification Req' 
                        ? 'bg-yellow-50 text-yellow-600 border-yellow-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                      {item.status === 'Pending Review' && <Clock size={10} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button className="bg-green-50 text-green-600 p-3.5 rounded-2xl hover:bg-green-600 hover:text-white hover:scale-110 transition-all shadow-sm" title="Approve">
                        <Check size={20} strokeWidth={3}/>
                      </button>
                      <button className="bg-red-50 text-red-600 p-3.5 rounded-2xl hover:bg-red-600 hover:text-white hover:scale-110 transition-all shadow-sm" title="Reject">
                        <X size={20} strokeWidth={3}/>
                      </button>
                      <button className="bg-gray-100 text-[#103c7f] p-3.5 rounded-2xl hover:bg-[#103c7f] hover:text-white transition-all shadow-sm" title="View Bill Proof">
                        <FileText size={20} strokeWidth={2}/> 
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="bg-[#103c7f] p-5 flex justify-between items-center text-white">
           <div className="flex items-center gap-4">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">My Team: 4 FSEs</p>
              <div className="h-3 w-px bg-white/20"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Pending: 4 Claims</p>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-[#a1db40]">Total Approval Value: ₹7,800</p>
        </div>
      </div>
    </div>
  );
}