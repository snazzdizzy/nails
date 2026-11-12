import React from 'react';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
  onOpenMyBookings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick, onOpenMyBookings }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Ethos */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-serif text-2xl font-semibold tracking-widest uppercase text-white block">
              Atelier Sarah
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Boutique freelance nail artist studio specializing in structured BIAB overlays, gentle Russian e-file manicures, and bespoke hand-painted editorial designs.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-stone-400">
                100% Autoclave Sterilized · Vegan Japanese Gel
              </span>
            </div>
          </div>

          {/* Studio Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              Studio Hours
            </h4>
            <div className="text-xs space-y-1.5 text-stone-400 font-mono">
              <div className="flex justify-between">
                <span>Tuesday – Friday:</span>
                <span className="text-stone-200">09:30 – 19:30</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-stone-200">10:00 – 18:30</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Sunday – Monday:</span>
                <span>Studio Closed</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 pt-1">
              By appointment only. Private suite access code sent after booking.
            </p>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              Private Suite Location
            </h4>
            <div className="text-xs text-stone-400 space-y-1 leading-relaxed">
              <p className="text-stone-200">Atelier Sarah</p>
              <p>1420 Bellevue Avenue, Suite 3B</p>
              <p>Downtown Design District</p>
              <p className="text-stone-400 text-[11px] pt-1">
                Complimentary 2-hour underground guest parking.
              </p>
            </div>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-stone-400" />
                <span>SMS Concierge: (555) 839-2041</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-stone-400" />
                <span>appointments@ateliersarah.com</span>
              </p>
            </div>
          </div>

          {/* Quick Links & Instagram */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button
                onClick={onBookClick}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                → Book Appointment Online
              </button>
              <button
                onClick={onOpenMyBookings}
                className="text-left text-stone-300 hover:text-white transition-colors"
              >
                → Lookup / Manage My Booking
              </button>
              <a
                href="#services"
                className="text-stone-300 hover:text-white transition-colors"
              >
                → Service Menu & Pricing
              </a>
              <a
                href="#gallery"
                className="text-stone-300 hover:text-white transition-colors"
              >
                → Photo Portfolio
              </a>
              <a
                href="#policies"
                className="text-stone-300 hover:text-white transition-colors"
              >
                → Cancellation & Deposit Terms
              </a>
            </div>

            <div className="pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-stone-300" />
                <span>@ateliersarah.nails</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Atelier Sarah Freelance Nail Artistry. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Sterilization Protocol Certified</span>
            <span aria-hidden="true">·</span>
            <span>Licensed Master Cosmetologist</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
