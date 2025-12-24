"use client";
import { useState } from "react";
import { 
  Wallet, Plus, X, FileText, Send, CheckCircle, 
  Clock, Paperclip, AlertCircle, ChevronDown 
} from "lucide-react";

export default function ExpenseList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2025-12-20", type: "Travel", amount: "500", status: "Approved", notes: "Petrol reimbursement", bill: "petrol_01.jpg" },
    { id: 2, date: "2025-12-21", type: "Stay", amount: "1200", status: "Pending", notes: "Hotel Delhi Stay", bill: "hotel_rec.pdf" },
    { id: 3, date: "2025-12-22", type: "Food", amount: "300", status: "Draft", notes: "Lunch with Client", bill: null },
  ]);

  const [formData, setFormData] = useState({ date: "", type: "Travel", amount: "", notes: "", bill: null });

  const handleSave = (e) => {
    e.preventDefault();
    const newExpense = { ...formData, id: expenses.length + 1, status: "Draft" };
    setExpenses([...expenses, newExpense]);
    setIsModalOpen(false);
    setFormData({ date: "", type: "Travel", amount: "", notes: "", bill: null });
  };

  const submitToManager = (id) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, status: "Pending" } : exp));
  };

  return (
    <div className="p-8 font-['Calibri'] min-h-screen bg-gray-50/50">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#103c7f] tracking-tight">Expense Claims</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#a1db40] rounded-full animate-pulse"></span>
            FSE Approval Workflow
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#a1db40] text-[#103c7f] px-8 py-4 rounded-[20px] font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-[#a1db40]/20 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          CREATE CLAIM
        </button>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white shadow-sm rounded-[32px] overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-100">
              <th className="p-6">Date</th>
              <th className="p-6">Details</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {expenses.map((exp) => (
              <tr key={exp.id} className="border-b border-gray-50 hover:bg-blue-50/40 transition-all group">
                <td className="p-6 font-bold text-gray-600 tracking-tighter">{exp.date || 'N/A'}</td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="font-black text-[#103c7f] text-xs uppercase tracking-tight flex items-center gap-2">
                      {exp.type}
                      {exp.bill && <Paperclip size={12} className="text-[#a1db40]" />}
                    </span>
                    <span className="text-gray-400 text-[11px] italic mt-1 font-medium">{exp.notes || 'No notes added'}</span>
                  </div>
                </td>
                <td className="p-6 font-black text-[#103c7f] text-lg tracking-tighter">₹{exp.amount}</td>
                <td className="p-6">
                  <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit shadow-sm border ${
                    exp.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : 
                    exp.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse' : 
                    'bg-gray-50 text-gray-400 border-gray-100'
                  }`}>
                    {exp.status === 'Approved' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                    {exp.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center">
                    {exp.status === "Draft" ? (
                      <button 
                        onClick={() => submitToManager(exp.id)}
                        className="bg-[#103c7f] text-white px-5 py-2.5 rounded-[14px] hover:bg-[#a1db40] hover:text-[#103c7f] transition-all group flex items-center gap-2 shadow-lg"
                      >
                        <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Submit</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-gray-300 bg-gray-50 px-4 py-2 rounded-xl">
                         <AlertCircle size={14} />
                         <span className="text-[10px] font-bold italic">Locked</span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* --- COMPACT PREMIUM MODAL --- */}
{isModalOpen && (
  <div className="fixed inset-0 bg-[#103c7f]/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn font-['Calibri']">
    <div className="bg-white/95 rounded-[32px] shadow-2xl max-w-2xl w-full p-8 relative border border-white/40 overflow-hidden">
      
      {/* Close Button */}
      <button 
        onClick={() => setIsModalOpen(false)} 
        className="absolute top-6 right-6 p-2 bg-gray-100/80 rounded-full text-gray-500 hover:text-red-500 transition-all z-10"
      >
        <X size={18} strokeWidth={2.5} />
      </button>
      
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="bg-[#a1db40]/20 w-14 h-14 rounded-[20px] flex items-center justify-center text-[#103c7f] mx-auto mb-3">
          <Wallet size={26} strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-black text-[#103c7f] tracking-tight leading-none">New Expense Claim</h2>
        <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">Maven Jobs Reimbursement</p>
      </div>
      
      <form onSubmit={handleSave} className="space-y-4">
        {/* Row 1: Date & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Date</label>
            <input 
              type="date" required
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] focus:ring-2 focus:ring-[#a1db40]/50 outline-none text-sm font-bold text-gray-700 transition-all" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Category</label>
            <div className="relative">
              <select 
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] focus:ring-2 focus:ring-[#a1db40]/50 outline-none text-sm font-bold text-gray-700 appearance-none"
              >
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Stay">Stay</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Amount & Proof of Expense (Side by Side) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Amount (₹)</label>
            <input 
              type="number" required placeholder="0.00"
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] focus:ring-2 focus:ring-[#a1db40]/50 outline-none text-sm font-bold text-gray-700" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Proof of Expense</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-[14px] p-2 bg-gray-50/50 hover:bg-[#a1db40]/5 hover:border-[#a1db40]/50 transition-all group flex items-center justify-center gap-3 cursor-pointer h-[46px]">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <FileText size={18} className="text-[#103c7f] opacity-40 group-hover:text-[#a1db40]" />
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-tight group-hover:text-[#103c7f]">Upload Bill</p>
            </div>
          </div>
        </div>

        {/* Row 3: Notes (Full Width but smaller height) */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Notes</label>
          <textarea 
            rows="2" placeholder="Describe the expense briefly..."
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] focus:ring-2 focus:ring-[#a1db40]/50 outline-none text-sm font-bold text-gray-700 resize-none transition-all"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-[#103c7f] text-white py-3.5 rounded-[14px] font-black tracking-widest hover:bg-[#0d316a] shadow-lg active:scale-95 transition-all text-xs uppercase">
             Save Claim
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-3.5 rounded-[14px] font-black tracking-widest hover:bg-gray-200 transition-all text-xs uppercase active:scale-95">
             Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}