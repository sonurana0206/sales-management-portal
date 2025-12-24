"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("fse"); // Default role

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Role-based Navigation Logic
    if (role === "admin") router.push("/admin");
    else if (role === "hod") router.push("/hod");
    else if (role === "manager") router.push("/manager");
    else router.push("/fse");
  };

  return (
    <div className="min-h-screen bg-[#103c7f] flex items-center justify-center p-6 font-['Calibri'] relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#a1db40]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-[40px] shadow-2xl p-10 relative z-10 border border-white/20">
        
        {/* Branding Section */}
        <div className="text-center mb-10">
          <div className="bg-[#a1db40] w-20 h-20 rounded-[24px] flex items-center justify-center text-[#103c7f] mx-auto mb-6 shadow-lg shadow-[#a1db40]/20">
            <ShieldCheck size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-[#103c7f] tracking-tight uppercase italic">Maven Jobs</h1>
          <p className="text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2 italic">Enterprise Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="email" required placeholder="name@mavenjobs.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#a1db40]/50 outline-none font-bold text-[#103c7f] transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Role Selection (Temporary for setup) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Select Access Level</label>
            <div className="grid grid-cols-2 gap-3">
              {['admin', 'hod', 'manager', 'fse'].map((r) => (
                <button
                  key={r} type="button"
                  onClick={() => setRole(r)}
                  className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                    role === r 
                    ? 'bg-[#103c7f] text-[#a1db40] border-[#103c7f] shadow-md' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-[#a1db40]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-[#a1db40] text-[#103c7f] py-5 rounded-[22px] font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#a1db40]/20 flex items-center justify-center gap-3 uppercase italic"
          >
            Enter System
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-300 text-[9px] font-bold uppercase tracking-widest">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}