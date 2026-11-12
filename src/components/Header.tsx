import React, { useState } from 'react';
import { Calendar, Menu, X, Clock, Sparkles } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
  onOpenMyBookings: () => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onBookClick,
  onOpenMyBookings,
  bookingCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in luxury display serif) */}
          <a
            href="#"
            className="font-serif text-2xl tracking-widest uppercase font-semibold text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
          >
            Atelier Sarah
          </a>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a
              href="#services"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#gallery"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
            <a
              href="#booking"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Calendar
            </a>
            <a
              href="#shapes"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Shape Guide
            </a>
            <a
              href="#policies"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Studio Policies
            </a>
          </nav>

          {/* Zone 3: Actions - Primary CTA & My Bookings */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenMyBookings}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/70 rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Lookup your appointment"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-600" />
              <span>My Bookings</span>
              {bookingCount > 0 && (
                <span className="w-4 h-4 ml-0.5 rounded-full bg-stone-900 text-stone-50 text-[10px] flex items-center justify-center font-mono">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={onBookClick}
              className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Book Appointment
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-6 py-5 space-y-4 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-stone-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Services & Pricing
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Portfolio Gallery
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Booking Calendar
            </a>
            <a
              href="#shapes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Nail Shape Guide
            </a>
            <a
              href="#policies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-950"
            >
              Studio Policies & Hygiene
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-stone-800 bg-stone-200/80 rounded-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Lookup My Appointment ({bookingCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
