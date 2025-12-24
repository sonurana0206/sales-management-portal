"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, X } from "lucide-react";
import Link from "next/link";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // --- UPDATED: Notifications ko state mein rakha taaki click par update ho sake ---
  const [notifications, setNotifications] = useState([]);

  // URL badalne par dropdown band karein aur notifications load karein
  useEffect(() => {
    setIsOpen(false);
    setNotifications(getNotificationsByRole());
  }, [pathname]);
  
  const getNotificationsByRole = () => {
    if (pathname.startsWith("/manager")) {
      return [
        { id: 1, text: "New Expense submitted by Monu (FSE)", time: "5m ago", unread: true },
        { id: 2, text: "Weekly Team Report is due", time: "1h ago", unread: false },
      ];
    } else if (pathname.startsWith("/admin")) {
      return [
        { id: 1, text: "System Update: Maintenance at 12 AM", time: "10m ago", unread: true },
        { id: 2, text: "New User Registration: Diwakar", time: "3h ago", unread: false },
      ];
    } else { 
      return [
        { id: 1, text: "Your Travel Expense was Approved", time: "2m ago", unread: true },
        { id: 2, text: "New Lead assigned: Rahul Sharma", time: "1h ago", unread: false },
      ];
    }
  };

  // --- NEW: Click karne par status change karne ka logic ---
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-2xl transition-all ${
          isOpen ? "bg-[#103c7f] text-white" : "bg-gray-50 text-[#103c7f] hover:bg-blue-50"
        }`}
      >
        <Bell size={20} strokeWidth={2.5} />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#a1db40] rounded-full border-2 border-white animate-bounce"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 bg-white rounded-[24px] shadow-2xl border border-gray-100 py-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-6 pb-3 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xs font-black text-[#103c7f] uppercase tracking-widest">Notifications</h3>
            <span className="text-[10px] font-bold text-[#a1db40] bg-[#a1db40]/10 px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          </div>
          
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
            {notifications.map(n => (
              <div 
                key={n.id} 
                // Mark as Read on Click
                onClick={() => markAsRead(n.id)}
                className={`p-4 border-b border-gray-50 flex gap-3 items-start transition-colors cursor-pointer hover:bg-gray-50/80 ${
                  n.unread ? "bg-blue-50/40" : "bg-white"
                }`}
              >
                {/* Dot color logic: Unread = Lime Green, Read = Gray */}
                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                  n.unread ? "bg-[#a1db40]" : "bg-gray-300" 
                }`}></div>

                <div>
                  <p className={`text-[11px] leading-tight ${
                    n.unread ? "font-black text-[#103c7f]" : "font-medium text-gray-400"
                  }`}>
                    {n.text}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-1 font-bold">{n.time}</p>
                </div>
              </div>
            ))}
          </div>

          <Link 
            href={`${pathname.split('/')[1] === 'fse' ? '/fse/notifications' : '/manager/notifications'}`}
            onClick={() => setIsOpen(false)}
          >
            <button className="w-full pt-3 text-[10px] font-black text-[#103c7f] uppercase tracking-tighter hover:text-[#a1db40] transition-colors">
              View All Notifications
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}