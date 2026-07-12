import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Stethoscope,
  ChevronDown,
  X,
} from "lucide-react";

const CURRENCIES = {
  PKR: { symbol: "PKR", rate: 1, label: "Pakistan (PKR)" },
  AED: { symbol: "AED", rate: 0.013, label: "UAE (AED)" },
  GBP: { symbol: "£", rate: 0.0028, label: "UK (GBP)" },
  EUR: { symbol: "€", rate: 0.0032, label: "Europe (EUR)" },
  USD: { symbol: "$", rate: 0.0036, label: "USA (USD)" },
};

function formatFee(feeInPkr, currency) {
  const { symbol, rate } = CURRENCIES[currency];
  const converted = feeInPkr * rate;
  const formatted =
    currency === "PKR"
      ? Math.round(converted).toLocaleString()
      : converted.toFixed(2);
  return `${symbol} ${formatted}`;
}

const initialDoctors = [
  { id: 1, name: "Dr. James Whitfield", specialty: "Cardiologist", experience: 10, fee: 3500, available: true, photo: "JW" },
  { id: 2, name: "Dr. Emma Clarke", specialty: "Gynecologist", experience: 8, fee: 3000, available: true, photo: "EC" },
  { id: 3, name: "Dr. Sophie Bennett", specialty: "Child Specialist", experience: 6, fee: 2500, available: false, photo: "SB" },
  { id: 4, name: "Dr. Michael Braun", specialty: "Dermatologist", experience: 12, fee: 4000, available: true, photo: "MB" },
  { id: 5, name: "Dr. Layla Al Mansoori", specialty: "Dental Specialist", experience: 5, fee: 2200, available: true, photo: "LA" },
];

const specialties = ["All Specialties", "Cardiologist", "Gynecologist", "Child Specialist", "Dermatologist", "Dental Specialist"];

function AddDoctorModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", specialty: "", experience: "", fee: "" });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.specialty.trim()) return;
    onSave({
      id: Date.now(),
      name: form.name,
      specialty: form.specialty,
      experience: Number(form.experience) || 0,
      fee: Number(form.fee) || 0,
      available: true,
      photo: form.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase(),
    });
    setForm({ name: "", specialty: "", experience: "", fee: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#1A1A2E]">
            Add New Doctor
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-[#6B7280] hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A1A2E]">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Dr. Sarah Thompson"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A1A2E]">
              Specialty
            </label>
            <select
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              required
            >
              <option value="">Select specialty</option>
              {specialties.slice(1).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1A1A2E]">
                Experience (yrs)
              </label>
              <input
                type="number"
                min="0"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="5"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1A1A2E]">
                Fee (PKR — base rate)
              </label>
              <input
                type="number"
                min="0"
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
                placeholder="3000"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#2E7D32] py-2.5 text-sm font-medium text-white hover:bg-[#1B5E20]"
            >
              Save Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [currency, setCurrency] = useState("EUR");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase());
      const matchesSpecialty = specialty === "All Specialties" || d.specialty === specialty;
      return matchesQuery && matchesSpecialty;
    });
  }, [doctors, query, specialty]);

  const toggleAvailability = (id) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d))
    );
  };

  const confirmDelete = () => {
    setDoctors((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
              Hoku Health Care
            </p>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
              Doctor Management
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Add, edit, and manage specialists on the platform.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2E7D32] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1B5E20]"
          >
            <Plus className="h-4 w-4" />
            Add Doctor
          </button>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors by name..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>
          <div className="relative sm:w-56">
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
          <div className="relative sm:w-52">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Display currency"
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            >
              {Object.entries(CURRENCIES).map(([code, { label }]) => (
                <option key={code} value={code}>{label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
                <Stethoscope className="h-6 w-6 text-[#6B7280]" />
              </div>
              <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
                No doctors found
              </h3>
              <p className="mt-1 max-w-xs text-sm text-[#6B7280]">
                Try a different search term or specialty filter, or add a new doctor.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-[#6B7280]">
                    <th className="py-3 font-medium">Doctor</th>
                    <th className="py-3 font-medium">Specialty</th>
                    <th className="py-3 font-medium">Experience</th>
                    <th className="py-3 font-medium">Fee ({currency})</th>
                    <th className="py-3 font-medium">Availability</th>
                    <th className="py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5]/60">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1565C0]/10 text-xs font-semibold text-[#1565C0]">
                            {d.photo}
                          </span>
                          <span className="font-medium text-[#1A1A2E]">{d.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-[#6B7280]">{d.specialty}</td>
                      <td className="py-3 text-[#6B7280]">{d.experience} yrs</td>
                      <td className="py-3 text-[#6B7280]">{formatFee(d.fee, currency)}</td>
                      <td className="py-3">
                        <button
                          onClick={() => toggleAvailability(d.id)}
                          className={`relative h-6 w-11 rounded-full transition ${
                            d.available ? "bg-[#2E7D32]" : "bg-gray-300"
                          }`}
                          aria-label={`Set ${d.name} ${d.available ? "unavailable" : "available"}`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                              d.available ? "left-5" : "left-0.5"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            className="rounded-lg p-2 text-[#1565C0] hover:bg-[#1565C0]/10"
                            aria-label={`Edit ${d.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(d)}
                            className="rounded-lg p-2 text-[#DC2626] hover:bg-red-50"
                            aria-label={`Delete ${d.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
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

      <AddDoctorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(doc) => setDoctors((prev) => [doc, ...prev])}
      />

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 className="h-5 w-5 text-[#DC2626]" />
            </div>
            <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
              Remove {deleteTarget.name}?
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              This doctor will be removed from the platform and can no longer receive bookings.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-[#1A1A2E] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-lg bg-[#DC2626] py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
