import React, { useState } from 'react';
import { X, Search, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Appointment } from '../types';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Appointment[];
  onCancelBooking: (bookingId: string) => void;
  onRescheduleClick: (booking: Appointment) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onRescheduleClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.referenceCode.toLowerCase().includes(q) ||
      b.clientEmail.toLowerCase().includes(q) ||
      b.clientPhone.toLowerCase().includes(q) ||
      b.clientName.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium">
              My Appointments
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Look up, reschedule, or review your bookings with Sarah.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Booking Ref (e.g. SLN-), Email, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500 space-y-2">
              <Calendar className="w-8 h-8 text-stone-300 mx-auto" />
              <p>No appointments found.</p>
              <p className="text-[11px] text-stone-400">
                If you made a booking on another device, check your confirmation SMS or email.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border text-xs transition-all ${
                  item.status === 'cancelled'
                    ? 'bg-stone-100/60 border-stone-200 opacity-60'
                    : 'bg-white border-stone-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                      Ref: {item.referenceCode}
                    </span>
                    <h4 className="font-serif text-base font-medium text-stone-900 mt-1">
                      {item.serviceName}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                      item.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : item.status === 'rescheduled'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-stone-600 my-2">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.timeSlot} ({item.durationMinutes}m)</span>
                  </div>
                </div>

                {item.addOnNames && item.addOnNames.length > 0 && (
                  <p className="text-[11px] text-stone-500 mb-2">
                    <strong className="text-stone-700">Add-ons: </strong>
                    {item.addOnNames.join(', ')}
                  </p>
                )}

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-700">
                    Deposit Paid: ${item.depositAmount} · Balance: ${item.balanceDue}
                  </span>

                  {item.status !== 'cancelled' && (
                    <div className="flex items-center gap-2">
                      {cancelConfirmId === item.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onCancelBooking(item.id);
                              setCancelConfirmId(null);
                            }}
                            className="px-2.5 py-1 text-[11px] bg-rose-600 text-white rounded font-medium hover:bg-rose-700"
                          >
                            Confirm Cancel
                          </button>
                          <button
                            onClick={() => setCancelConfirmId(null)}
                            className="px-2 py-1 text-[11px] text-stone-600 hover:text-stone-900"
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              onRescheduleClick(item);
                              onClose();
                            }}
                            className="text-[11px] text-stone-700 hover:text-stone-950 underline"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => setCancelConfirmId(item.id)}
                            className="text-[11px] text-rose-600 hover:text-rose-700"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
