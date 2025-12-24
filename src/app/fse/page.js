"use client";
import React from "react";
import {
  CheckCircle,
  Users,
  TrendingUp,
  BarChart3,
  RotateCcw,
  Target,
} from "lucide-react";

export default function Home() {
  const userName = "Monu";

  const monthlyStats = {
    month: "DECEMBER 2025",
    totalVisits: 112,
    individualVisits: 42,
    totalOnboarded: 4,
    mtdMp: "4/12",
    avg: "3.2",
  };

  const latestActivity = {
    date: "20/12/2025",
    total: 6,
    individual: 1,
    repeat: 5,
    interested: 4,
    onboarded: 1,
  };

  const latestLeads = [
    { sn: 1, name: "Prem Spintex", status: "Interested", sub: "Call Back", color: "text-green-600 bg-green-50" },
    { sn: 2, name: "Artex Home Fashion", status: "Interested", sub: "Call Back", color: "text-green-600 bg-green-50" },
    { sn: 3, name: "Eleco Electrician", status: "Onboarded", sub: "Finalized", color: "text-white bg-green-700" },
    { sn: 4, name: "Mista Home Decor", status: "Interested", sub: "Visit Done", color: "text-green-600 bg-green-50" },
    { sn: 5, name: "Colour Band", status: "Reached Out", sub: "-", color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="p-6 bg-gray-50 font-['Calibri'] h-[calc(100vh-5rem)] overflow-hidden">
     

      <div className="space-y-6">
        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Visits" value={monthlyStats.totalVisits} icon={<TrendingUp size={18} />} color="bg-[#103c7f]" />
          <StatCard title="Individual Visits" value={monthlyStats.individualVisits} icon={<Users size={18} />} color="bg-[#1a4da1]" />
          <StatCard title="Onboarded" value={monthlyStats.totalOnboarded} icon={<CheckCircle size={18} />} color="bg-[#a1db40]" />
          <StatCard title="MTD / MP" value={monthlyStats.mtdMp} icon={<Target size={18} />} color="bg-orange-500" />
        </div>

        {/* REPORT CARD */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* TOP BAR */}
          <div className="bg-[#103c7f] text-white px-6 py-4 flex justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">
                Latest Activity
              </p>
              <h2 className="text-xl font-black">{latestActivity.date}</h2>
            </div>
            <div className="text-right border-l border-blue-800/50 pl-6">
              <p className="text-[9px] font-bold uppercase opacity-70">AVG</p>
              <p className="text-xl font-black">{monthlyStats.avg}</p>
            </div>
          </div>

          <div className="p-6">
            {/* DAILY METRICS */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              <DailyMetric label="Total" value={latestActivity.total} />
              <DailyMetric label="Individual" value={latestActivity.individual} />
              <DailyMetric label="Repeat" value={latestActivity.repeat} icon={<RotateCcw size={12} />} />
              <DailyMetric label="Interested" value={latestActivity.interested} highlight="text-green-600" />
              <DailyMetric label="Onboarded" value={latestActivity.onboarded} highlight="text-[#103c7f]" />
            </div>

            {/* TABLE TITLE */}
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-[#103c7f]" />
              <h3 className="font-bold text-gray-800 text-sm uppercase">
                Recent Interactions
              </h3>
            </div>

            {/* TABLE */}
            <div className="rounded-lg border border-gray-100 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 uppercase text-[10px] font-bold text-gray-400">
                    <th className="p-3 w-12">SN</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Sub</th>
                  </tr>
                </thead>
                <tbody>
                  {latestLeads.map((lead) => (
                    <tr key={lead.sn} className="border-t hover:bg-blue-50/40">
                      <td className="p-3 text-gray-400">{lead.sn}</td>
                      <td className="p-3 font-semibold">{lead.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${lead.color}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3 text-center italic text-gray-500">
                        {lead.sub}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-[9px] font-bold text-gray-400 uppercase">
          {title}
        </p>
        <p className="text-2xl font-black">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-xl text-white`}>
        {icon}
      </div>
    </div>
  );
}

function DailyMetric({ label, value, highlight = "text-gray-900", icon }) {
  return (
    <div className="bg-white p-3 rounded-xl border text-center">
      <div className="flex justify-center gap-1 text-gray-400 mb-1">
        {icon}
        <p className="text-[9px] font-bold uppercase">{label}</p>
      </div>
      <p className={`text-xl font-black ${highlight}`}>{value}</p>
    </div>
  );
}
