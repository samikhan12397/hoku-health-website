import React, { useState } from "react";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarCheck,
  HeartPulse,
  MessageSquareText,
  Menu,
  X,
} from "lucide-react";

import Dashboard from "../components/dashboard/admin/Dashboard";
import DoctorManagement from "../components/dashboard/admin/DoctorManagement";
import PatientManagement from "../components/dashboard/admin/PatientManagement";
import AppointmentManagement from "../components/dashboard/admin/AppointmentManagement";
import ServiceManagement from "../components/dashboard/admin/ServiceManagement";
import ReviewManagement from "../components/dashboard/admin/ReviewManagement";

// Matches PDF Section 11.1: src/pages/AdminDashboard.jsx
// This shell provides the admin side-nav and mounts each screen Sami built.
// In the full app (with react-router-dom installed by Mehwish's setup),
// swap the internal `active` state below for real routes, e.g.:
//   /admin, /admin/doctors, /admin/patients, /admin/appointments,
//   /admin/services, /admin/reviews

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, Component: Dashboard },
  { key: "doctors", label: "Doctors", icon: Stethoscope, Component: DoctorManagement },
  { key: "patients", label: "Patients", icon: Users, Component: PatientManagement },
  { key: "appointments", label: "Appointments", icon: CalendarCheck, Component: AppointmentManagement },
  { key: "services", label: "Services", icon: HeartPulse, Component: ServiceManagement },
  { key: "reviews", label: "Reviews", icon: MessageSquareText, Component: ReviewManagement },
];

export default function AdminDashboardPage() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActiveComponent = NAV_ITEMS.find((n) => n.key === active)?.Component ?? Dashboard;

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-['Inter']">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 lg:hidden">
        <p className="font-['Poppins'] font-semibold text-[#1A1A2E]">Hoku Admin</p>
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-[#1A1A2E] hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 shrink-0 transform border-r border-gray-100 bg-white pt-16 transition-transform lg:static lg:translate-x-0 lg:pt-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden border-b border-gray-100 px-6 py-6 lg:block">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
            Hoku Health Care
          </p>
          <p className="font-['Poppins'] text-lg font-bold text-[#1A1A2E]">Admin Panel</p>
        </div>
        <nav className="space-y-1 p-4">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActive(key);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active === key
                  ? "bg-[#2E7D32] text-white"
                  : "text-[#1A1A2E] hover:bg-[#F5F5F5]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
        />
      )}

      {/* Active screen */}
      <main className="min-w-0 flex-1 pt-14 lg:pt-0">
        <ActiveComponent />
      </main>
    </div>
  );
}
