import React from "react";
import {
  Users,
  Stethoscope,
  CalendarCheck,
  Star,
  TrendingUp,
  Clock,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";

const stats = [
  { label: "Total Patients", value: "1,248", delta: "+8.2%", icon: Users, accent: "bg-[#1565C0]" },
  { label: "Active Doctors", value: "36", delta: "+2 this month", icon: Stethoscope, accent: "bg-[#2E7D32]" },
  { label: "Appointments Today", value: "57", delta: "12 pending", icon: CalendarCheck, accent: "bg-[#1565C0]" },
  { label: "Avg. Rating", value: "4.8", delta: "214 reviews", icon: Star, accent: "bg-[#2E7D32]" },
];

const recentAppointments = [
  { patient: "Charlotte Bennett", doctor: "Dr. James Whitfield", service: "Home Health", time: "09:30 AM", status: "Confirmed" },
  { patient: "Fatima Al Suwaidi", doctor: "Dr. Emma Clarke", service: "Palliative Care", time: "10:15 AM", status: "Pending" },
  { patient: "Daniel Weber", doctor: "Dr. Michael Braun", service: "Hospice Care", time: "11:00 AM", status: "Confirmed" },
  { patient: "Ayesha Raheem", doctor: "Dr. Sophie Bennett", service: "Home Health", time: "01:20 PM", status: "Cancelled" },
  { patient: "Oliver Scott", doctor: "Dr. James Whitfield", service: "Home Health", time: "02:45 PM", status: "Confirmed" },
];

const statusStyles = {
  Confirmed: "bg-green-50 text-[#2E7D32] ring-1 ring-green-200",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Cancelled: "bg-red-50 text-[#DC2626] ring-1 ring-red-200",
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
              Hoku Health Care
            </p>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Overview of patients, doctors, and today's activity.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#6B7280] shadow-sm ring-1 ring-black/5">
            <Clock className="h-4 w-4 text-[#1565C0]" />
            Last updated just now
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, delta, icon: Icon, accent }) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <TrendingUp className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <p className="mt-4 font-['Poppins'] text-2xl font-bold text-[#1A1A2E]">
                {value}
              </p>
              <p className="text-sm text-[#6B7280]">{label}</p>
              <p className="mt-2 text-xs font-medium text-[#2E7D32]">{delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-['Poppins'] text-lg font-semibold text-[#1A1A2E]">
                Recent Appointments
              </h2>
              <p className="text-sm text-[#6B7280]">Latest bookings across all doctors</p>
            </div>
            <button className="flex items-center gap-1 rounded-lg bg-[#2E7D32] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1B5E20]">
              View all
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-[#6B7280]">
                  <th className="py-3 font-medium">Patient</th>
                  <th className="py-3 font-medium">Doctor</th>
                  <th className="py-3 font-medium">Service</th>
                  <th className="py-3 font-medium">Time</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((a, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5]/60"
                  >
                    <td className="py-3 font-medium text-[#1A1A2E]">{a.patient}</td>
                    <td className="py-3 text-[#6B7280]">{a.doctor}</td>
                    <td className="py-3 text-[#6B7280]">{a.service}</td>
                    <td className="py-3 text-[#6B7280]">{a.time}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="rounded-lg p-1.5 text-[#6B7280] hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
