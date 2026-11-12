import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Download,
  ExternalLink,
  User,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';
import { SERVICES, ADD_ONS, NAIL_SHAPES } from '../data/servicesData';
import { Service, AddOn, Appointment, GalleryItem } from '../types';

interface BookingCalendarProps {
  preselectedService?: Service | null;
  preselectedLook?: GalleryItem | null;
  onBookingConfirmed: (newBooking: Appointment) => void;
  onClearPreselection: () => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  preselectedService,
  preselectedLook,
  onBookingConfirmed,
  onClearPreselection
}) => {
  // Step flow: 1: Service & Addons, 2: Date & Time, 3: Client Details, 4: Confirmation Summary, 5: Success
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedService ? preselectedService.id : SERVICES[0].id
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Update selection if preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setSelectedServiceId(preselectedService.id);
      setStep(1);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedLook) {
      setSelectedServiceId(preselectedLook.serviceId);
      // Auto-toggle chrome if it's a chrome look
      if (preselectedLook.category === 'chrome' && !selectedAddOnIds.includes('chrome-glaze')) {
        setSelectedAddOnIds((prev) => [...prev, 'chrome-glaze']);
      }
      setStep(1);
    }
  }, [preselectedLook]);

  // Calendar Date logic
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Form Details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [nailCondition, setNailCondition] = useState<'bare' | 'existing_gel' | 'foreign_removal'>('bare');
  const [nailShape, setNailShape] = useState<string>(NAIL_SHAPES[0].name);
  const [nailLength, setNailLength] = useState<string>('Medium');
  const [notes, setNotes] = useState<string>(
    preselectedLook ? `Inspiration Look: ${preselectedLook.title}` : ''
  );
  const [agreedToPolicy, setAgreedToPolicy] = useState<boolean>(true);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Active Service & Addons calculation
  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const activeAddOns = ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id));

  const foreignRemovalExtra = nailCondition === 'foreign_removal' ? 25 : 0;
  const foreignRemovalDuration = nailCondition === 'foreign_removal' ? 30 : 0;

  const totalDuration =
    activeService.durationMinutes +
    activeAddOns.reduce((acc, curr) => acc + curr.durationMinutes, 0) +
    foreignRemovalDuration;

  const totalPrice =
    activeService.price +
    activeAddOns.reduce((acc, curr) => acc + curr.price, 0) +
    foreignRemovalExtra;

  const depositRequired = Math.round(totalPrice * 0.25);
  const balanceDue = totalPrice - depositRequired;

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calendar Days calculation
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Check if a date is valid for booking
  const isDateSelectable = (day: number) => {
    const checkDate = new Date(year, month, day);
    const dayOfWeek = checkDate.getDay();
    // Sunday (0) and Monday (1) are closed
    if (dayOfWeek === 0 || dayOfWeek === 1) return false;
    // Don't allow past dates
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate >= startOfToday;
  };

  const formatSelectedDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Available Time Slots
  const timeSlots = [
    { time: '09:30 AM', label: 'Morning Session', available: true },
    { time: '11:45 AM', label: 'Midday Session', available: true },
    { time: '02:15 PM', label: 'Afternoon Session', available: true },
    { time: '04:30 PM', label: 'Late Afternoon', available: true },
    { time: '06:45 PM', label: 'Evening Prime', available: true }
  ];

  // Final submission
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDateStr || !selectedTimeSlot || !clientName || !clientPhone || !clientEmail) {
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      referenceCode: `SLN-${randomSuffix}`,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      serviceId: activeService.id,
      serviceName: activeService.name,
      addOnIds: selectedAddOnIds,
      addOnNames: activeAddOns.map((a) => a.name),
      nailCondition,
      nailShape,
      nailLength,
      inspirationNote: notes.trim(),
      date: selectedDateStr,
      timeSlot: selectedTimeSlot,
      durationMinutes: totalDuration,
      totalPrice,
      depositAmount: depositRequired,
      balanceDue,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newAppointment);
    onBookingConfirmed(newAppointment);
    setStep(5);
  };

  // Add to Google Calendar URL generator
  const getGoogleCalendarUrl = (booking: Appointment) => {
    const title = encodeURIComponent(`Nail Appointment with Sarah: ${booking.serviceName}`);
    const details = encodeURIComponent(
      `Reference: ${booking.referenceCode}\nService: ${booking.serviceName}\nDuration: ${booking.durationMinutes} min\nStudio Suite: Atelier Sarah, 1420 Bellevue Ave, Suite 3B\nDeposit Paid: $${booking.depositAmount}`
    );
    const location = encodeURIComponent('Atelier Sarah, 1420 Bellevue Ave Suite 3B');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Download .ics File
  const downloadIcsFile = (booking: Appointment) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Atelier Sarah//Nails Appointment//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Nail Appointment with Sarah (${booking.serviceName})`,
      `DESCRIPTION:Booking Ref: ${booking.referenceCode}\\nService: ${booking.serviceName}\\nDuration: ${booking.durationMinutes} min`,
      'LOCATION:Atelier Sarah, 1420 Bellevue Ave Suite 3B',
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `AtelierSarah-${booking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">
            03. Direct Reservation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Select Your Date & Reserve Your Seat
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            Private 1:1 sessions. A modest 25% deposit secures your slot and is deducted from your final total.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        {step < 5 && (
          <div className="mb-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-xs font-medium text-stone-500">
              <span className={step >= 1 ? 'text-stone-900 font-semibold' : ''}>
                1. Service & Add-ons
              </span>
              <span className={step >= 2 ? 'text-stone-900 font-semibold' : ''}>
                2. Date & Time
              </span>
              <span className={step >= 3 ? 'text-stone-900 font-semibold' : ''}>
                3. Client Details
              </span>
              <span className={step >= 4 ? 'text-stone-900 font-semibold' : ''}>
                4. Summary & Deposit
              </span>
            </div>
            <div className="mt-2 h-1 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-900 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Preselection notice banner if client clicked from gallery */}
        {preselectedLook && step < 5 && (
          <div className="mb-8 p-4 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={preselectedLook.image}
                alt={preselectedLook.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-xs">
                <span className="font-semibold text-stone-900">Configuring look: </span>
                <span className="text-stone-700">{preselectedLook.title}</span>
                <p className="text-stone-500 text-[11px]">
                  {preselectedLook.nailShape} · {preselectedLook.technique}
                </p>
              </div>
            </div>
            <button
              onClick={onClearPreselection}
              className="text-xs text-stone-500 hover:text-stone-900 underline"
            >
              Reset
            </button>
          </div>
        )}

        {/* ================= STEP 1: SERVICE & ADD-ONS ================= */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mb-4">
                Choose Base Service
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((s) => {
                  const isSelected = selectedServiceId === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-stone-50/80 shadow-sm ring-1 ring-stone-900'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-lg font-medium text-stone-900">
                            {s.name}
                          </h4>
                          <span className="font-serif text-lg font-medium text-stone-900 tabular-nums shrink-0">
                            ${s.price}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-2 mt-1.5">
                          {s.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {s.durationMinutes} min
                        </span>
                        {isSelected && (
                          <span className="text-stone-900 font-sans font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Add-Ons */}
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mb-2">
                Enhance Your Appointment
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Add special finishes, nail fixes or take-home care.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddOn(addon.id)}
                        className="mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-stone-900">
                            {addon.name}
                          </span>
                          <span className="font-serif text-sm font-medium text-stone-900 tabular-nums">
                            +${addon.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 1 Footer Bar */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs">
                <span className="text-stone-500">Estimated Total: </span>
                <span className="font-serif text-lg font-medium text-stone-900 tabular-nums mr-3">
                  ${totalPrice}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500 ml-3">Duration: </span>
                <span className="font-mono font-medium text-stone-900">
                  {totalDuration} min
                </span>
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium uppercase tracking-wider rounded-md transition-colors"
              >
                Proceed to Calendar & Time
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DATE & TIME ================= */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Calendar Month Widget */}
              <div className="md:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
                  <h3 className="font-serif text-xl text-stone-900 font-medium">
                    {monthNames[month]} {year}
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1.5 rounded hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day of week headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-stone-400 mb-2 font-mono">
                  <span>Su</span>
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {/* Empty cells before 1st of month */}
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10" />
                  ))}

                  {/* Month days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    const selectable = isDateSelectable(dayNum);
                    const isSelected = selectedDateStr === dateFormatted;

                    return (
                      <button
                        key={`day-${dayNum}`}
                        disabled={!selectable}
                        onClick={() => {
                          setSelectedDateStr(dateFormatted);
                          setSelectedTimeSlot(''); // reset time on date change
                        }}
                        className={`h-10 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                          !selectable
                            ? 'text-stone-300 cursor-not-allowed bg-transparent'
                            : isSelected
                            ? 'bg-stone-900 text-white font-semibold shadow-sm'
                            : 'text-stone-800 hover:bg-stone-100 bg-stone-50/60'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                    <span>Studio Open (Tue - Sat)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-300">Sunday/Monday Closed</span>
                  </div>
                </div>
              </div>

              {/* Time Slot Picker Pane */}
              <div className="md:col-span-5 bg-stone-50 rounded-xl border border-stone-200 p-6">
                <h4 className="font-serif text-lg font-medium text-stone-900 mb-1">
                  Select Arrival Slot
                </h4>
                <p className="text-xs text-stone-500 mb-4">
                  {selectedDateStr
                    ? formatSelectedDateDisplay(selectedDateStr)
                    : 'Please select an open date first'}
                </p>

                {selectedDateStr ? (
                  <div className="space-y-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-sm'
                              : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div>
                            <span className="font-mono text-sm font-medium">
                              {slot.time}
                            </span>
                            <span className={`block text-[11px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                              {slot.label} · ~{totalDuration} min
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                            Available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-stone-400">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-stone-300 stroke-1" />
                    Click an available date on the calendar to view time slots.
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 Navigation */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                ← Back to Services
              </button>
              <button
                disabled={!selectedDateStr || !selectedTimeSlot}
                onClick={() => setStep(3)}
                className={`px-6 py-2.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors ${
                  selectedDateStr && selectedTimeSlot
                    ? 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                Continue to Client Info
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CLIENT DETAILS & NAIL PREP ================= */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                Your Details & Nail Consultation
              </h3>

              {/* Name & Phone & Email */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone (for SMS reminders) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="(555) 234-5678"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Nail Condition */}
              <div className="pt-4 border-t border-stone-100">
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-2">
                  What is currently on your nails?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      nailCondition === 'bare'
                        ? 'border-stone-900 bg-stone-50 font-medium'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={nailCondition === 'bare'}
                        onChange={() => setNailCondition('bare')}
                        className="text-stone-900 focus:ring-stone-900"
                      />
                      <span>Bare Natural Nails</span>
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1">No previous polish or enhancements</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      nailCondition === 'existing_gel'
                        ? 'border-stone-900 bg-stone-50 font-medium'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={nailCondition === 'existing_gel'}
                        onChange={() => setNailCondition('existing_gel')}
                        className="text-stone-900 focus:ring-stone-900"
                      />
                      <span>Atelier Sarah Infill</span>
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1">Previous set done by Sarah ($0 removal)</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border text-xs cursor-pointer flex flex-col justify-between ${
                      nailCondition === 'foreign_removal'
                        ? 'border-stone-900 bg-stone-50 font-medium'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="condition"
                        checked={nailCondition === 'foreign_removal'}
                        onChange={() => setNailCondition('foreign_removal')}
                        className="text-stone-900 focus:ring-stone-900"
                      />
                      <span>Foreign Product (+ $25)</span>
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1">Acrylic or hard gel from another salon (+30m)</span>
                  </label>
                </div>
              </div>

              {/* Shape and Length preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                    Desired Nail Shape
                  </label>
                  <select
                    value={nailShape}
                    onChange={(e) => setNailShape(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                  >
                    {NAIL_SHAPES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                    Desired Nail Length
                  </label>
                  <select
                    value={nailLength}
                    onChange={(e) => setNailLength(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                  >
                    <option value="Natural Short">Natural Short (Fingertip length)</option>
                    <option value="Medium">Medium (Active chic extension)</option>
                    <option value="Long Extension">Long (Statement editorial length)</option>
                  </select>
                </div>
              </div>

              {/* Inspiration Note */}
              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                  Art Inspiration / Notes for Sarah
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell Sarah about preferred colors, wedding date, or paste an Instagram / Pinterest link..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Step 3 Navigation */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                ← Back to Date & Time
              </button>
              <button
                disabled={!clientName || !clientPhone || !clientEmail}
                onClick={() => setStep(4)}
                className={`px-6 py-2.5 text-xs font-medium uppercase tracking-wider rounded-md transition-colors ${
                  clientName && clientPhone && clientEmail
                    ? 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                Review Summary & Deposit
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: SUMMARY & DEPOSIT CONFIRMATION ================= */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
              <h3 className="font-serif text-2xl text-stone-900 font-medium mb-1">
                Appointment Summary
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Please verify your details and studio policy before confirming your seat.
              </p>

              {/* Itemized breakdown */}
              <div className="space-y-3 pb-6 border-b border-stone-100 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span className="font-medium text-stone-900">{activeService.name}</span>
                  <span className="font-mono tabular-nums font-medium">${activeService.price}</span>
                </div>

                {activeAddOns.map((addon) => (
                  <div key={addon.id} className="flex justify-between text-stone-600 pl-3">
                    <span>+ {addon.name}</span>
                    <span className="font-mono tabular-nums">+${addon.price}</span>
                  </div>
                ))}

                {foreignRemovalExtra > 0 && (
                  <div className="flex justify-between text-stone-600 pl-3">
                    <span>+ Foreign Gel/Acrylic Removal</span>
                    <span className="font-mono tabular-nums">+${foreignRemovalExtra}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-500 text-[11px] pt-1">
                  <span>Estimated Total Duration:</span>
                  <span className="font-mono font-medium">{totalDuration} minutes</span>
                </div>
              </div>

              {/* Schedule and Client recap */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-stone-100 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Date & Time</span>
                  <p className="font-medium text-stone-900 mt-0.5">
                    {formatSelectedDateDisplay(selectedDateStr)}
                  </p>
                  <p className="font-mono text-stone-600">{selectedTimeSlot}</p>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Client & Contact</span>
                  <p className="font-medium text-stone-900 mt-0.5">{clientName}</p>
                  <p className="text-stone-600 font-mono text-[11px]">{clientPhone}</p>
                </div>
              </div>

              {/* Deposit Math */}
              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Total Service Value</span>
                  <span className="font-serif text-lg font-medium text-stone-900 tabular-nums">
                    ${totalPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-900 font-medium bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                  <div>
                    <span>Deposit Due Now (25% to Secure Slot)</span>
                    <span className="block text-[10px] font-normal text-stone-500">
                      Applied toward final appointment balance
                    </span>
                  </div>
                  <span className="font-serif text-xl tabular-nums font-semibold">
                    ${depositRequired}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-500 text-[11px] px-1">
                  <span>Balance Due at Appointment (Cash / Zelle / Card)</span>
                  <span className="font-mono tabular-nums">${balanceDue}</span>
                </div>
              </div>

              {/* Policy Checkbox */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    className="mt-1 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                  />
                  <span className="text-xs text-stone-600 leading-relaxed">
                    I agree to the <strong className="text-stone-800">48-hour cancellation policy</strong> and understand that deposits are non-refundable if cancelled with less than 48 hours notice. I agree to arrive with clean hands.
                  </span>
                </label>
              </div>

              {/* Action */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  ← Edit Information
                </button>
                <button
                  disabled={!agreedToPolicy}
                  onClick={handleConfirmBooking}
                  className={`px-8 py-3 text-xs font-medium uppercase tracking-wider rounded-md transition-all shadow-sm ${
                    agreedToPolicy
                      ? 'bg-stone-900 hover:bg-stone-800 text-stone-50'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Confirm & Reserve Appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: SUCCESS CONFIRMATION SCREEN ================= */}
        {step === 5 && confirmedBooking && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-8 shadow-sm text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-stone-900 text-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-xs uppercase tracking-widest text-stone-500 font-mono mb-1">
              Booking Confirmed
            </div>
            <h3 className="font-serif text-3xl text-stone-900 font-medium mb-2">
              We Look Forward to Seeing You, {confirmedBooking.clientName.split(' ')[0]}!
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
              Your appointment is locked in the studio book. A confirmation SMS and calendar invite have been dispatched.
            </p>

            {/* Reference Badge */}
            <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-lg font-mono text-sm text-stone-800 font-medium mb-6">
              <span>Booking Ref:</span>
              <span className="text-stone-950 font-bold">{confirmedBooking.referenceCode}</span>
            </div>

            {/* Appointment Recap Card */}
            <div className="text-left bg-stone-50/80 rounded-xl p-5 border border-stone-200/80 mb-6 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-200/50">
                <span className="text-stone-500">Service:</span>
                <span className="font-medium text-stone-900">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/50">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-medium text-stone-900">
                  {formatSelectedDateDisplay(confirmedBooking.date)} at {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/50">
                <span className="text-stone-500">Location:</span>
                <span className="font-medium text-stone-900">
                  Atelier Sarah, 1420 Bellevue Ave, Suite 3B (Private Elevator)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Deposit Secured:</span>
                <span className="font-mono text-stone-900 font-medium">
                  ${confirmedBooking.depositAmount} (Remaining balance ${confirmedBooking.balanceDue} due at session)
                </span>
              </div>
            </div>

            {/* Calendar Integration CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href={getGoogleCalendarUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                onClick={() => downloadIcsFile(confirmedBooking)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .ICS Calendar File</span>
              </button>
            </div>

            {/* Restart or New Booking */}
            <button
              onClick={() => {
                setStep(1);
                setSelectedDateStr('');
                setSelectedTimeSlot('');
                setConfirmedBooking(null);
                onClearPreselection();
              }}
              className="text-xs text-stone-500 hover:text-stone-900 underline"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
