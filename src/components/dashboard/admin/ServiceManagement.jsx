import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  HeartPulse,
  Home,
  Sparkles,
} from "lucide-react";

// Hoku Health Care — Admin Panel: Service Management
// Brand tokens: Health Green #2E7D32 · Trust Blue #1565C0 · Soft Gray #F5F5F5
// Headings: Poppins · Body: Inter
// Core services per SRS: Home Health, Palliative Care, Hospice Care

const iconMap = {
  "Home Health": Home,
  "Palliative Care": HeartPulse,
  "Hospice Care": Sparkles,
};

const initialServices = [
  {
    id: 1,
    name: "Home Health",
    description: "Skilled nursing, physical therapy, and medical care delivered in the comfort of your home.",
    price: 45,
    active: true,
  },
  {
    id: 2,
    name: "Palliative Care",
    description: "Specialised comfort care for patients living with serious illness, focused on quality of life.",
    price: 60,
    active: true,
  },
  {
    id: 3,
    name: "Hospice Care",
    description: "Compassionate end-of-life care and support for patients and their families.",
    price: 70,
    active: true,
  },
];

function ServiceModal({ open, initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial || { name: "", description: "", price: "" }
  );

  React.useEffect(() => {
    setForm(initial || { name: "", description: "", price: "" });
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;
    onSave({
      id: initial?.id ?? Date.now(),
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      active: initial?.active ?? true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-['Poppins'] text-lg font-semibold text-[#1A1A2E]">
            {initial ? "Edit Service" : "Add New Service"}
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
              Service Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Home Health"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A1A2E]">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Briefly describe this service..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1A1A2E]">
              Starting Price (€)
            </label>
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="45"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
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
              {initial ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ServiceManagement() {
  const [services, setServices] = useState(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setModalOpen(true);
  };

  const handleSave = (service) => {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      return exists
        ? prev.map((s) => (s.id === service.id ? service : s))
        : [service, ...prev];
    });
  };

  const toggleActive = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const confirmDelete = () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
              Hoku Health Care
            </p>
            <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
              Service Management
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Manage the healthcare services offered on the platform.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2E7D32] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1B5E20]"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        </div>

        {/* Service cards */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
              <HeartPulse className="h-6 w-6 text-[#6B7280]" />
            </div>
            <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
              No services yet
            </h3>
            <p className="mt-1 max-w-xs text-sm text-[#6B7280]">
              Add your first healthcare service to make it bookable for patients.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.name] || HeartPulse;
              return (
                <div
                  key={s.id}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2E7D32]/10">
                      <Icon className="h-5 w-5 text-[#2E7D32]" />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        s.active
                          ? "bg-green-50 text-[#2E7D32] ring-1 ring-green-200"
                          : "bg-gray-100 text-[#6B7280] ring-1 ring-gray-200"
                      }`}
                    >
                      {s.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm text-[#6B7280]">
                    {s.description}
                  </p>
                  <p className="mt-3 font-['Poppins'] text-lg font-bold text-[#1A1A2E]">
                    From €{s.price}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => toggleActive(s.id)}
                      className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-[#1A1A2E] hover:bg-gray-50"
                    >
                      {s.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => openEdit(s)}
                      className="rounded-lg p-2 text-[#1565C0] hover:bg-[#1565C0]/10"
                      aria-label={`Edit ${s.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(s)}
                      className="rounded-lg p-2 text-[#DC2626] hover:bg-red-50"
                      aria-label={`Delete ${s.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ServiceModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      {/* Delete confirmation */}
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
              Patients will no longer be able to book this service.
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
