"use client";
import React from "react";
import Image from "next/image"; // Image import kiya
import { usePathname } from "next/navigation";
import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // --- 1. DYNAMIC DATA CONFIGURATION ---
  let roleLabel = "Field Sales Executive";
  let pageSubtitle = "DAILY WORK REPORT";
  let userName = "Monu";

  if (pathname.startsWith("/admin")) {
    roleLabel = "System Administrator";
    pageSubtitle = "MASTER CONTROL PANEL";
    userName = "Admin";
  } else if (pathname.startsWith("/hod")) {
    roleLabel = "Head of Department";
    pageSubtitle = "STRATEGY OVERSIGHT";
    userName = "Diwakar";
  } else if (pathname.startsWith("/manager")) {
    roleLabel = "Sales Manager";
    pageSubtitle = "TEAM MANAGEMENT";
    userName = "Monu";
  } else if (pathname.startsWith("/fse")) {
    roleLabel = "Field Sales Executive";
    pageSubtitle = "DAILY WORK REPORT";
    userName = "Monu";
  }

  return (
 <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm font-['Calibri']">
      
      {/* --- BRANDING SECTION: Image Logo added here --- */}
      <div className="flex items-center gap-8">
        <div className="relative border-r border-gray-100 pr-8 flex items-center">
          <Image
            src="/maven-logo.png" // Public folder se logo fetch karega
            alt="Maven Jobs"
            width={140}
            height={20}
            priority
            className="object-contain" // Aspect ratio maintain karne ke liye
          />
        </div>

        {/* Dynamic Title Section */}
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] hidden md:flex items-center gap-2">
          DOMESTIC SALES <span className="text-gray-300">|</span> 
          <span className="text-[#103c7f] font-black">{pageSubtitle}</span>
        </div>
      </div>

      {/* --- ICONS & USER PROFILE SECTION --- */}
      <div className="flex items-center gap-8">
        {/* Notifications */}
        <button className="relative p-2.5 bg-gray-50 rounded-2xl text-[#103c7f] hover:bg-blue-50 transition-all group">
          <Bell size={20} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
        </button>

        {/* User Profile Info with Dynamic Name */}
        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-xs font-black text-[#103c7f] leading-none uppercase tracking-tight">
              {userName}
            </p>
            <p className="text-[9px] font-black text-[#a1db40] mt-1.5 uppercase tracking-widest leading-none">
              {roleLabel}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white p-0.5 rounded-full border border-blue-100 shadow-inner group cursor-pointer">
            <div className="bg-white p-1 rounded-full text-[#103c7f] group-hover:text-[#a1db40] transition-colors">
              <UserCircle size={34} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}