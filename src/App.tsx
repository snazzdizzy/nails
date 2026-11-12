/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceMenu } from './components/ServiceMenu';
import { PhotoGallery } from './components/PhotoGallery';
import { BookingCalendar } from './components/BookingCalendar';
import { ArtistProfile } from './components/ArtistProfile';
import { StudioPolicies } from './components/StudioPolicies';
import { ClientReviews } from './components/ClientReviews';
import { Footer } from './components/Footer';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Service, GalleryItem, Appointment } from './types';

const INITIAL_DEMO_BOOKINGS: Appointment[] = [
  {
    id: 'apt-demo-1',
    referenceCode: 'SLN-8924',
    clientName: 'Victoria Sterling',
    clientPhone: '(555) 392-1084',
    clientEmail: 'victoria.sterling@example.com',
    serviceId: 'biab-overlay',
    serviceName: 'Structured BIAB Builder Gel Overlay',
    addOnIds: ['chrome-glaze'],
    addOnNames: ['Aurora / Glazed Donut Chrome Glaze'],
    nailCondition: 'existing_gel',
    nailShape: 'Almond',
    nailLength: 'Medium',
    inspirationNote: 'Iridescent pearl finish for evening gallery opening',
    date: '2026-11-20',
    timeSlot: '11:45 AM',
    durationMinutes: 85,
    totalPrice: 100,
    depositAmount: 25,
    balanceDue: 75,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [bookings, setBookings] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem('atelier_sarah_bookings');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading stored bookings', e);
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedLook, setPreselectedLook] = useState<GalleryItem | null>(null);
  const [myBookingsOpen, setMyBookingsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_sarah_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings', e);
    }
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceToBook = (service: Service) => {
    setPreselectedService(service);
    setPreselectedLook(null);
    scrollToBooking();
    showToast(`Selected "${service.name}". Choose your date and time below.`);
  };

  const handleBookLook = (look: GalleryItem) => {
    setPreselectedLook(look);
    setPreselectedService(null);
    scrollToBooking();
    showToast(`Configured look "${look.title}". Choose your date and time below.`);
  };

  const handleBookingConfirmed = (newBooking: Appointment) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Appointment confirmed! Booking Ref: ${newBooking.referenceCode}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
    showToast('Your appointment has been cancelled. Confirmation sent via SMS.');
  };

  const handleRescheduleBooking = (booking: Appointment) => {
    // Scroll to booking and allow selecting a new date
    scrollToBooking();
    showToast(`Please select a new date & time for reference ${booking.referenceCode}.`);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-50 px-4 py-3 rounded-lg shadow-xl text-xs font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-stone-700">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        onBookClick={scrollToBooking}
        onOpenMyBookings={() => setMyBookingsOpen(true)}
        bookingCount={bookings.filter((b) => b.status === 'confirmed').length}
      />

      <main className="flex-1">
        {/* Hero Section with Split Screen & Metrics */}
        <Hero
          onBookNow={scrollToBooking}
          onExploreServices={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Service Menu with Pricing, Add-ons & Nail Shape Guide */}
        <ServiceMenu onSelectServiceToBook={handleSelectServiceToBook} />

        {/* Photo Gallery & Look Lightbox */}
        <PhotoGallery onBookLook={handleBookLook} />

        {/* Interactive Booking Calendar Engine */}
        <BookingCalendar
          preselectedService={preselectedService}
          preselectedLook={preselectedLook}
          onBookingConfirmed={handleBookingConfirmed}
          onClearPreselection={() => {
            setPreselectedService(null);
            setPreselectedLook(null);
          }}
        />

        {/* Meet the Artist / Studio Story */}
        <ArtistProfile />

        {/* Studio Policies (Deposits, Cancellations, Hygiene) */}
        <StudioPolicies />

        {/* Verified Client Reviews */}
        <ClientReviews />
      </main>

      {/* Footer */}
      <Footer
        onBookClick={scrollToBooking}
        onOpenMyBookings={() => setMyBookingsOpen(true)}
      />

      {/* Lookup / Manage My Bookings Modal */}
      <MyBookingsModal
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onRescheduleClick={handleRescheduleBooking}
      />
    </div>
  );
}
