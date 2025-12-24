"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Logo ke liye
import { Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Yahan aap apna authentication logic jodd sakte hain
    // Abhi ke liye ye default /fse par le jayega
    router.push("/fse");
  };

  return (
    <div className="min-h-screen bg-[#103c7f] flex items-center justify-center p-6 font-['Calibri'] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#a1db40]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="bg-white/95 backdrop-blur-xl w-full max-w-md rounded-[40px] shadow-2xl p-10 relative z-10 border border-white/20">
        
        {/* --- BRANDING SECTION: Logo replace kiya gaya --- */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
             <Image
                src="/maven-logo.png" 
                alt="Maven Jobs"
                width={180}
                height={60} 
                priority
                className="object-contain" 
              />
          </div>
          <p className="text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2 italic">
            Enterprise Sales Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* USERNAME FIELD */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#103c7f] uppercase tracking-widest ml-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                required 
                placeholder="Enter your username"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#a1db40]/50 outline-none font-bold text-[#103c7f] transition-all placeholder:text-gray-200"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#103c7f] uppercase tracking-widest ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#a1db40]/50 outline-none font-bold text-[#103c7f] transition-all placeholder:text-gray-200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-[#a1db40] text-[#103c7f] py-5 rounded-[22px] font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#a1db40]/20 flex items-center justify-center gap-3 uppercase italic"
            >
              Sign In
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-300 text-[9px] font-bold uppercase tracking-widest">
            Protected by Maven Jobs Security System
          </p>
        </div>
      </div>
    </div>
  );
}