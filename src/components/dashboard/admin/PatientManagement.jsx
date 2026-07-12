import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Ban,
  CheckCircle2,
  Eye,
  Users,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

const initialPatients = [
  {
    id: 1,
    name: "Charlotte Bennett",
    email: "charlotte.bennett@gmail.com",
    phone: "+44 7911 123456",
    address: "Manchester, United Kingdom",
    joined: "12 Mar 2026",
    appointments: 5,
    blocked: false,
  },
  {
    id: 2,
    name: "Fatima Al Suwaidi",
    email: "fatima.alsuwaidi@gmail.com",
    phone: "+971 50 123 4567",
    address: "Dubai, UAE",
    joined: "03 Jan 2026",
    appointments: 12,
    blocked: false,
  },
  {
    id: 3,
    name: "Daniel Weber",
    email: "daniel.weber@outlook.de",
    phone: "+49 151 23456789",
    address: "Berlin, Germany",
    joined: "27 Apr 2026",
    appointments: 2,
    blocked: false,
  },
  {
    id: 4,
    name: "Ayesha Raheem",
    email: "ayesha.raheem@gmail.com",
    phone: "+92 300 1234567",
    address: "Lahore, Pakistan",
    joined: "19 Feb 2026",
    appointments: 8,
    blocked: true,
  },
  {
    id: 5,
    name: "Oliver Scott",
    email: "oliver.scott@gmail.com",
    phone: "+44 7700 900123",
    address: "London, United Kingdom",
    joined: "05 May 2026",
    appointments: 1,
    blocked: false,
  },
];

function PatientDetailsPanel({ patient, onClose }) {
  if (!patient) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#1A1A2E]">
            Patient Details
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-[#6B7280] hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1565C0]/10 text-sm font-semibold text-[#1565C0]">
            {patient.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
          </span>
          <div>
            <p className="font-['Poppins'] font-semibold text-[#1A1A2E]">{patient.name}</p>
            <span
              className={`mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                patient.blocked
                  ? "bg-red-50 text-[#DC2626] ring-1 ring-red-200"
                  : "bg-green-50 text-[#2E7D32] ring-1 ring-green-200"
              }`}
            >
              {patient.blocked ? "Blocked" : "Active"}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-[#1A1A2E]">
            <Mail className="h-4 w-4 shrink-0 text-[#6B7280]" />
            {patient.email}
          </div>
          <div className="flex items-center gap-3 text-[#1A1A2E]">
            <Phone className="h-4 w-4 shrink-0 text-[#6B7280]" />
            {patient.phone}
          </div>
          <div className="flex items-center gap-3 text-[#1A1A2E]">
            <MapPin className="h-4 w-4 shrink-0 text-[#6B7280]" />
            {patient.address}
          </div>
          <div className="flex items-center gap-3 text-[#1A1A2E]">
            <Calendar className="h-4 w-4 shrink-0 text-[#6B7280]" />
            Joined {patient.joined}
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-[#F5F5F5] p-4 text-center">
          <p className="font-['Poppins'] text-xl font-bold text-[#1A1A2E]">
            {patient.appointments}
          </p>
          <p className="text-xs text-[#6B7280]">Total appointments booked</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-[#2E7D32] py-2.5 text-sm font-medium text-white hover:bg-[#1B5E20]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function PatientManagement() {
  const [patients, setPatients] = useState(initialPatients);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewing, setViewing] = useState(null);
  const [blockTarget, setBlockTarget] = useState(null);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && !p.blocked) ||
        (statusFilter === "Blocked" && p.blocked);
      return matchesQuery && matchesStatus;
    });
  }, [patients, query, statusFilter]);

  const confirmToggleBlock = () => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === blockTarget.id ? { ...p, blocked: !p.blocked } : p
      )
    );
    setBlockTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
            Hoku Health Care
          </p>
          <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
            Patient Management
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            View patient records and manage platform access.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-[#6B7280]">Total Patients</p>
            <p className="font-['Poppins'] text-xl font-bold text-[#1A1A2E]">{patients.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-[#6B7280]">Active</p>
            <p className="font-['Poppins'] text-xl font-bold text-[#2E7D32]">
              {patients.filter((p) => !p.blocked).length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-[#6B7280]">Blocked</p>
            <p className="font-['Poppins'] text-xl font-bold text-[#DC2626]">
              {patients.filter((p) => p.blocked).length}
            </p>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>
          <div className="relative sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
                <Users className="h-6 w-6 text-[#6B7280]" />
              </div>
              <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
                No patients found
              </h3>
              <p className="mt-1 max-w-xs text-sm text-[#6B7280]">
                Try a different search term or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-[#6B7280]">
                    <th className="py-3 font-medium">Patient</th>
                    <th className="py-3 font-medium">Location</th>
                    <th className="py-3 font-medium">Joined</th>
                    <th className="py-3 font-medium">Appointments</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5]/60">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1565C0]/10 text-xs font-semibold text-[#1565C0]">
                            {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                          </span>
                          <div>
                            <p className="font-medium text-[#1A1A2E]">{p.name}</p>
                            <p className="text-xs text-[#6B7280]">{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-[#6B7280]">{p.address}</td>
                      <td className="py-3 text-[#6B7280]">{p.joined}</td>
                      <td className="py-3 text-[#6B7280]">{p.appointments}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            p.blocked
                              ? "bg-red-50 text-[#DC2626] ring-1 ring-red-200"
                              : "bg-green-50 text-[#2E7D32] ring-1 ring-green-200"
                          }`}
                        >
                          {p.blocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewing(p)}
                            className="rounded-lg p-2 text-[#1565C0] hover:bg-[#1565C0]/10"
                            aria-label={`View ${p.name}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setBlockTarget(p)}
                            className={`rounded-lg p-2 ${
                              p.blocked
                                ? "text-[#2E7D32] hover:bg-green-50"
                                : "text-[#DC2626] hover:bg-red-50"
                            }`}
                            aria-label={p.blocked ? `Unblock ${p.name}` : `Block ${p.name}`}
                          >
                            {p.blocked ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Ban className="h-4 w-4" />
                            )}
                          </button>
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

      <PatientDetailsPanel patient={viewing} onClose={() => setViewing(null)} />

      {blockTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div
              className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                blockTarget.blocked ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {blockTarget.blocked ? (
                <CheckCircle2 className="h-5 w-5 text-[#2E7D32]" />
              ) : (
                <Ban className="h-5 w-5 text-[#DC2626]" />
              )}
            </div>
            <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
              {blockTarget.blocked ? "Unblock" : "Block"} {blockTarget.name}?
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              {blockTarget.blocked
                ? "This patient will regain access to book appointments and use the platform."
                : "This patient will no longer be able to log in or book appointments."}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setBlockTarget(null)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggleBlock}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium text-white ${
                  blockTarget.blocked
                    ? "bg-[#2E7D32] hover:bg-[#1B5E20]"
                    : "bg-[#DC2626] hover:bg-red-700"
                }`}
              >
                {blockTarget.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
