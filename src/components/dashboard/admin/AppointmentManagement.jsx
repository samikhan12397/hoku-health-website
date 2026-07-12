import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  X as XIcon,
  CalendarClock,
  Eye,
} from "lucide-react";

const initialAppointments = [
  {
    id: 101,
    patient: "Charlotte Bennett",
    doctor: "Dr. James Whitfield",
    service: "Home Health",
    date: "14 Jul 2026",
    time: "09:30 AM",
    status: "Pending",
  },
  {
    id: 102,
    patient: "Fatima Al Suwaidi",
    doctor: "Dr. Emma Clarke",
    service: "Palliative Care",
    date: "14 Jul 2026",
    time: "10:15 AM",
    status: "Confirmed",
  },
  {
    id: 103,
    patient: "Daniel Weber",
    doctor: "Dr. Michael Braun",
    service: "Hospice Care",
    date: "15 Jul 2026",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    id: 104,
    patient: "Ayesha Raheem",
    doctor: "Dr. Sophie Bennett",
    service: "Home Health",
    date: "15 Jul 2026",
    time: "01:20 PM",
    status: "Cancelled",
  },
  {
    id: 105,
    patient: "Oliver Scott",
    doctor: "Dr. James Whitfield",
    service: "Home Health",
    date: "16 Jul 2026",
    time: "02:45 PM",
    status: "Pending",
  },
  {
    id: 106,
    patient: "Layla Haddad",
    doctor: "Dr. Layla Al Mansoori",
    service: "Palliative Care",
    date: "16 Jul 2026",
    time: "04:00 PM",
    status: "Confirmed",
  },
];

const statusOptions = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Confirmed: "bg-blue-50 text-[#1565C0] ring-1 ring-blue-200",
  Completed: "bg-green-50 text-[#2E7D32] ring-1 ring-green-200",
  Cancelled: "bg-red-50 text-[#DC2626] ring-1 ring-red-200",
};

function DetailsModal({ appt, onClose }) {
  if (!appt) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#1A1A2E]">
            Appointment #{appt.id}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-[#6B7280] hover:bg-gray-100"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <dl className="space-y-3 text-sm">
          {[
            ["Patient", appt.patient],
            ["Doctor", appt.doctor],
            ["Service", appt.service],
            ["Date", appt.date],
            ["Time", appt.time],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <dt className="text-[#6B7280]">{label}</dt>
              <dd className="font-medium text-[#1A1A2E]">{value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <dt className="text-[#6B7280]">Status</dt>
            <dd>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[appt.status]}`}>
                {appt.status}
              </span>
            </dd>
          </div>
        </dl>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#2E7D32] py-2.5 text-sm font-medium text-white hover:bg-[#1B5E20]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewing, setViewing] = useState(null);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesQuery =
        a.patient.toLowerCase().includes(query.toLowerCase()) ||
        a.doctor.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [appointments, query, statusFilter]);

  const updateStatus = (id, status) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const counts = useMemo(() => {
    const c = { Pending: 0, Confirmed: 0, Completed: 0, Cancelled: 0 };
    appointments.forEach((a) => (c[a.status] = (c[a.status] || 0) + 1));
    return c;
  }, [appointments]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
            Hoku Health Care
          </p>
          <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
            Appointment Management
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Review, approve, and track appointments across all doctors.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <p className="text-xs text-[#6B7280]">{status}</p>
              <p className="font-['Poppins'] text-xl font-bold text-[#1A1A2E]">{count}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient or doctor..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>
          <div className="relative sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
                <CalendarClock className="h-6 w-6 text-[#6B7280]" />
              </div>
              <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
                No appointments found
              </h3>
              <p className="mt-1 max-w-xs text-sm text-[#6B7280]">
                Try a different search term or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-[#6B7280]">
                    <th className="py-3 font-medium">Patient</th>
                    <th className="py-3 font-medium">Doctor</th>
                    <th className="py-3 font-medium">Service</th>
                    <th className="py-3 font-medium">Date &amp; Time</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5]/60">
                      <td className="py-3 font-medium text-[#1A1A2E]">{a.patient}</td>
                      <td className="py-3 text-[#6B7280]">{a.doctor}</td>
                      <td className="py-3 text-[#6B7280]">{a.service}</td>
                      <td className="py-3 text-[#6B7280]">
                        {a.date} · {a.time}
                      </td>
                      <td className="py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[a.status]}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewing(a)}
                            className="rounded-lg p-2 text-[#1565C0] hover:bg-[#1565C0]/10"
                            aria-label={`View appointment ${a.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {a.status === "Pending" && (
                            <>
                              <button
                                onClick={() => updateStatus(a.id, "Confirmed")}
                                className="rounded-lg p-2 text-[#2E7D32] hover:bg-green-50"
                                aria-label={`Approve appointment ${a.id}`}
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(a.id, "Cancelled")}
                                className="rounded-lg p-2 text-[#DC2626] hover:bg-red-50"
                                aria-label={`Cancel appointment ${a.id}`}
                              >
                                <XIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <DetailsModal appt={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
