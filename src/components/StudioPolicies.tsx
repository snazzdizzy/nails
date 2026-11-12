import React from 'react';
import { Clock, ShieldAlert, Sparkles, RefreshCw, AlertCircle, Heart } from 'lucide-react';

export const StudioPolicies: React.FC = () => {
  const policies = [
    {
      icon: Clock,
      title: '48-Hour Rescheduling Grace',
      description: 'We understand schedules change. You may reschedule your appointment up to 48 hours prior without losing your booking deposit. Reschedules under 48 hours require a new deposit.'
    },
    {
      icon: ShieldAlert,
      title: '25% Booking Deposit',
      description: 'Because our private suite reserves dedicated 75-105 minute time slots exclusively for you, a 25% deposit is required at booking and is directly deducted from your appointment total.'
    },
    {
      icon: AlertCircle,
      title: '15-Minute Punctuality Window',
      description: 'To protect the unhurried experience of every client, arrivals beyond 15 minutes may need to modify their service (e.g. omitting intricate art) or reschedule.'
    },
    {
      icon: RefreshCw,
      title: 'Foreign Product Notice',
      description: 'If you are arriving with acrylic, dip powder, or hard gel from another studio, please add "Foreign Removal" to your booking so we reserve the necessary 30 minutes for safe removal.'
    },
    {
      icon: Heart,
      title: '5-Day Complimentary Guarantee',
      description: 'Your satisfaction and nail health are paramount. In the rare event of a lift or accidental chip within 5 days of your appointment, Sarah will repair it free of charge.'
    },
    {
      icon: Sparkles,
      title: 'Quiet Private Suite Etiquette',
      description: 'Atelier Sarah is designed as a tranquil escape. We kindly ask for no additional guests or pets in the private suite so we can maintain full artistic focus and relaxation.'
    }
  ];

  return (
    <section id="policies" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">
            05. Studio Guidelines
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Policies & Client Care Standards
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Transparent guidelines ensure every guest receives an uninterrupted, pristine, and punctual luxury appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-stone-50/70 border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 w-fit text-stone-900 mb-4 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
