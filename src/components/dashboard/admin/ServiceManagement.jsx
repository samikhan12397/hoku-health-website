import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  Trash2,
  Star,
  MessageSquareText,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    patient: "Charlotte Bennett",
    doctor: "Dr. James Whitfield",
    rating: 5,
    comment: "The home visit was on time and the nurse was incredibly caring. Made my father feel comfortable.",
    sentiment: "positive",
    approved: true,
  },
  {
    id: 2,
    patient: "Fatima Al Suwaidi",
    doctor: "Dr. Emma Clarke",
    rating: 4,
    comment: "Very professional service, though the booking process took a bit longer than expected.",
    sentiment: "neutral",
    approved: true,
  },
  {
    id: 3,
    patient: "Daniel Weber",
    doctor: "Dr. Michael Braun",
    rating: 2,
    comment: "The appointment was rescheduled twice without much notice. Not a great experience overall.",
    sentiment: "negative",
    approved: false,
  },
  {
    id: 4,
    patient: "Oliver Scott",
    doctor: "Dr. Sophie Bennett",
    rating: 5,
    comment: "Outstanding palliative care team — compassionate, patient, and always available when we needed them.",
    sentiment: "positive",
    approved: false,
  },
  {
    id: 5,
    patient: "Ayesha Raheem",
    doctor: "Dr. Layla Al Mansoori",
    rating: 3,
    comment: "Decent service overall, the dental checkup was quick but the waiting time for confirmation was long.",
    sentiment: "neutral",
    approved: true,
  },
];

const sentimentMeta = {
  positive: { icon: Smile, style: "bg-green-50 text-[#2E7D32] ring-1 ring-green-200" },
  neutral: { icon: Meh, style: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
  negative: { icon: Frown, style: "bg-red-50 text-[#DC2626] ring-1 ring-red-200" },
};

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState(initialReviews);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchesQuery =
        r.patient.toLowerCase().includes(query.toLowerCase()) ||
        r.doctor.toLowerCase().includes(query.toLowerCase()) ||
        r.comment.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (filter === "Pending" && !r.approved) ||
        (filter === "Approved" && r.approved) ||
        filter === r.sentiment;
      return matchesQuery && matchesFilter;
    });
  }, [reviews, query, filter]);

  const approve = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
  };

  const confirmDelete = () => {
    setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const pendingCount = reviews.filter((r) => !r.approved).length;
  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Inter']">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D32]">
            Hoku Health Care
          </p>
          <h1 className="font-['Poppins'] text-2xl font-bold text-[#1A1A2E] sm:text-3xl">
            Review Management
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Approve patient reviews before they appear on the public site.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-[#6B7280]">Total Reviews</p>
            <p className="font-['Poppins'] text-xl font-bold text-[#1A1A2E]">{reviews.length}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-[#6B7280]">Awaiting Approval</p>
            <p className="font-['Poppins'] text-xl font-bold text-amber-600">{pendingCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs text-[#6B7280]">Average Rating</p>
            <div className="flex items-center gap-2">
              <p className="font-['Poppins'] text-xl font-bold text-[#1A1A2E]">{avgRating}</p>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by patient, doctor, or comment..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>
          <div className="relative sm:w-56">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
            >
              <option value="All">All Reviews</option>
              <option value="Pending">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="positive">Sentiment: Positive</option>
              <option value="neutral">Sentiment: Neutral</option>
              <option value="negative">Sentiment: Negative</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
              <MessageSquareText className="h-6 w-6 text-[#6B7280]" />
            </div>
            <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
              No reviews found
            </h3>
            <p className="mt-1 max-w-xs text-sm text-[#6B7280]">
              Try a different search term or filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => {
              const SentimentIcon = sentimentMeta[r.sentiment].icon;
              return (
                <div
                  key={r.id}
                  className="rounded-2xl bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1565C0]/10 text-xs font-semibold text-[#1565C0]">
                        {r.patient.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                      </span>
                      <div>
                        <p className="font-medium text-[#1A1A2E]">{r.patient}</p>
                        <p className="text-xs text-[#6B7280]">Reviewed {r.doctor}</p>
                        <div className="mt-1.5">
                          <StarRow rating={r.rating} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${sentimentMeta[r.sentiment].style}`}
                      >
                        <SentimentIcon className="h-3.5 w-3.5" />
                        {r.sentiment.charAt(0).toUpperCase() + r.sentiment.slice(1)}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          r.approved
                            ? "bg-green-50 text-[#2E7D32] ring-1 ring-green-200"
                            : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                        }`}
                      >
                        {r.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#1A1A2E]">
                    {r.comment}
                  </p>

                  <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-4">
                    {!r.approved && (
                      <button
                        onClick={() => approve(r.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20]"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteTarget(r)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-[#DC2626] hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 className="h-5 w-5 text-[#DC2626]" />
            </div>
            <h3 className="font-['Poppins'] text-base font-semibold text-[#1A1A2E]">
              Delete this review?
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              This review from {deleteTarget.patient} will be permanently removed.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}