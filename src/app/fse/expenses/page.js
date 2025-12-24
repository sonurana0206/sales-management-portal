"use client";
import { useState } from "react";
import { 
  Wallet, Plus, X, FileText, Send, CheckCircle, 
  Clock, Paperclip, AlertCircle, ChevronDown, Trash2 
} from "lucide-react";

export default function ExpenseList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Aapka original data
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2025-12-20", type: "TRAVEL", amount: "500", status: "APPROVED", notes: "Petrol reimbursement", bill: "petrol_01.jpg" },
    { id: 2, date: "2025-12-21", type: "STAY", amount: "1200", status: "PENDING (MANAGER)", notes: "Hotel Delhi Stay", bill: "hotel_rec.pdf" },
    { id: 3, date: "2025-12-22", type: "FOOD", amount: "300", status: "PENDING (MANAGER)", notes: "Lunch with Client", bill: null },
    { id: 4, date: "2025-12-25", type: "TRAVEL", amount: "500", status: "DRAFT", notes: "No notes added", bill: null },
    { id: 5, date: "2025-12-25", type: "FOOD", amount: "650", status: "DRAFT", notes: "No notes added", bill: null },
    { id: 6, date: "2025-12-26", type: "TRAVEL", amount: "400", status: "DRAFT", notes: "Client visit", bill: null },
    { id: 7, date: "2025-12-27", type: "STAY", amount: "1500", status: "DRAFT", notes: "Hotel booking", bill: null },
  ]);

  const [formData, setFormData] = useState({ date: "", type: "Travel", amount: "", notes: "", bill: null });

  // FIXED: handleSave function define kar di gayi hai
  const handleSave = (e) => {
    e.preventDefault();
    const newExpense = { ...formData, id: expenses.length + 1, status: "DRAFT" };
    setExpenses([...expenses, newExpense]);
    setIsModalOpen(false);
    setFormData({ date: "", type: "Travel", amount: "", notes: "", bill: null });
  };

  const submitToManager = (id) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, status: "PENDING (MANAGER)" } : exp
    ));
  };

  return (
    <div className="flex flex-col h-full font-['Calibri']">
      
     {/* --- FIXED HEADER: Sidebar ke saath smooth transition ke liye updated --- */}
<div className="flex justify-between items-end mb-8 shrink-0 transition-all duration-500 ease-in-out">
  <div>
    <h1 className="text-4xl font-black text-[#103c7f] tracking-tight uppercase italic">
      Expense Claims
    </h1>
    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1 flex items-center gap-2">
      <span className="w-2 h-2 bg-[#a1db40] rounded-full animate-pulse"></span>
      FSE Personal Portal
    </p>
  </div>
  
  <button 
    onClick={() => setIsModalOpen(true)}
    className="bg-[#a1db40] text-[#103c7f] px-8 py-4 rounded-[22px] font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-[#a1db40]/20 active:scale-95 text-xs uppercase tracking-widest"
  >
    <Plus size={18} strokeWidth={3} /> 
    Create Claim
  </button>
</div>

      {/* --- INTERNAL SCROLLABLE AREA --- */}
      <div className="bg-white shadow-sm rounded-[32px] border border-gray-100 overflow-hidden flex flex-col flex-1 max-h-[72vh]">
        
        {/* Scrollable Wrapper with fixed height logic */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse relative">
            
            {/* Sticky Header: Scroll karne par bhi upar dikhega */}
<thead className="sticky top-0 z-10 bg-[#103c7f] text-white">
              <tr className="text-[11px] uppercase font-black tracking-widest">
                <th className="p-6 border-b border-white/10">Date</th>
                <th className="p-6 border-b border-white/10">Details</th>
                <th className="p-6 text-center border-b border-white/10">Amount</th>
                <th className="p-6 text-center border-b border-white/10">Status</th>
                <th className="p-6 text-center border-b border-white/10">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {expenses.map((exp) => (
                <tr key={exp.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-all group">
                  <td className="p-8 font-black text-gray-500">{exp.date}</td>
                  <td className="p-8">
                    <div className="flex flex-col">
                      <span className="font-black text-[#103c7f] text-xs uppercase flex items-center gap-2">
                        {exp.type} {exp.bill && <Paperclip size={12} className="text-[#a1db40]" />}
                      </span>
                      <span className="text-gray-400 text-[11px] italic mt-1">{exp.notes}</span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <p className="text-xl font-black text-[#103c7f] italic leading-none italic">₹{exp.amount}</p>
                  </td>
                  <td className="p-8 text-center">
                    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border italic ${
                      exp.status === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-100' : 
                      exp.status.includes('PENDING') ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {exp.status}
                    </span>
                  </td>
                  <td className="p-8 text-center">
                    {exp.status === "DRAFT" ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => submitToManager(exp.id)} className="bg-[#103c7f] text-white px-5 py-2.5 rounded-[14px] hover:bg-[#a1db40] hover:text-[#103c7f] flex items-center gap-2 shadow-lg transition-all">
                          <Send size={14} /> <span className="text-[10px] font-black uppercase">Submit</span>
                        </button>
                        <button className="bg-red-50 text-red-600 p-2.5 rounded-[14px] hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    ) : (
                      <span className="text-gray-300 font-bold italic text-[10px] uppercase bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">Record Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL remains exactly as provided by you */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#103c7f]/60 backdrop-blur-md flex items-center justify-center z-50 p-4 font-['Calibri']">
          <div className="bg-white/95 rounded-[32px] shadow-2xl max-w-2xl w-full p-8 relative border border-white/40 overflow-hidden">
             {/* ... Modal content ... */}
             <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100/80 rounded-full text-gray-500 hover:text-red-500 transition-all z-10">
              <X size={18} strokeWidth={2.5} />
            </button>
            <form onSubmit={handleSave} className="space-y-4">
               {/* Modal fields (Date, Category, Amount, Notes) */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Date</label>
                    <input type="date" required onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] focus:ring-2 focus:ring-[#a1db40]/50 outline-none text-sm font-bold text-gray-700" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Category</label>
                    <select onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] outline-none text-sm font-bold text-gray-700">
                      <option value="TRAVEL">Travel</option>
                      <option value="FOOD">Food</option>
                      <option value="STAY">Stay</option>
                    </select>
                  </div>
               </div>
               <input type="number" placeholder="Amount (₹)" required onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] text-sm font-bold text-gray-700 outline-none" />
               <textarea rows="2" placeholder="Describe the expense briefly..." onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-[14px] text-sm font-bold text-gray-700 resize-none outline-none"></textarea>
               <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-500 py-3.5 rounded-[14px] font-black tracking-widest hover:bg-gray-200 transition-all text-xs uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-[#103c7f] text-white py-3.5 rounded-[14px] font-black tracking-widest hover:bg-[#0d316a] shadow-lg transition-all text-xs uppercase">Save Claim</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}