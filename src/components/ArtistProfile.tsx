import React from 'react';
import { Award, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

export const ArtistProfile: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/80 shadow-md aspect-square max-w-md mx-auto">
              <img
                src="/src/assets/images/artist_portrait_studio_1794495167957.jpg"
                alt="Sarah in her boutique nail studio"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-serif text-lg font-medium">Sarah Moreau</p>
                <p className="text-stone-200 text-[11px]">Master Technician & Founder, Atelier Sarah</p>
              </div>
            </div>
          </div>

          {/* Bio & Philosophy Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-medium">
              04. The Artist & Ethos
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
              A private, unhurried sanctuary for nail health and refined art.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                "After seven years in fast-paced high-volume salons, I founded Atelier Sarah as an antidote to rushed 30-minute appointments. I believe healthy natural nails are the true canvas for exceptional art."
              </p>
              <p>
                Every client sits in a private studio suite with bespoke lighting, serene acoustics, and one-on-one attention. Sarah specializes in the meticulous Russian dry manicure technique—using precision diamond e-file bits that gently clear non-living cuticle tissue without touching the sensitive nail matrix.
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-stone-200 text-stone-800 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Hospital-Grade Autoclave
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    All metal implements are sanitized in a Class B medical autoclave and unsealed fresh in front of you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-stone-200 text-stone-800 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Japanese & Korean Formulas
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    10-Free, HEMA-free, vegan cosmetic-grade gels that bond gently without destructive acid primers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
