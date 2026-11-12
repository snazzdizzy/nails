import React from 'react';
import { Sparkles, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow, onExploreServices }) => {
  return (
    <section className="relative overflow-hidden bg-stone-100/60 border-b border-stone-200">
      {/* 2-Column Split Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed kicker metadata */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium">
              <span>Freelance Nail Artist</span>
              <span aria-hidden="true">·</span>
              <span>Private Studio Suite</span>
              <span aria-hidden="true">·</span>
              <span>Bellevue District</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-[1.12] tracking-tight text-balance">
              Impeccable nail artistry & structured gel care.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Specializing in bespoke Russian e-file manicures, natural nail strengthening with structured BIAB, and fine-line editorial nail art. Every appointment is an unhurried, private one-on-one session.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookNow}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs uppercase tracking-widest font-medium rounded-md transition-all shadow-sm group"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs uppercase tracking-widest font-medium rounded-md transition-colors"
              >
                <span>View Service Menu</span>
              </button>
            </div>

            {/* Hygiene & Product Ethics Badges (unboxed textual trust markers) */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                Hospital-grade autoclave sterilized tools
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>10-Free & HEMA-free Japanese/Korean gels</span>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/80 shadow-md aspect-[4/3] lg:aspect-[5/4] group">
              <img
                src="/src/assets/images/hero_nail_art_editorial_1794495166284.jpg"
                alt="Editorial macro photograph of pearlescent chrome manicure by Sarah"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-stone-50 text-xs">
                <div>
                  <p className="font-serif text-sm tracking-wide text-white">Signature Pearlescent Glaze</p>
                  <p className="text-stone-300 text-[11px]">Structured BIAB on Medium Almond</p>
                </div>
                <span className="text-[11px] font-mono bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-stone-200">
                  4-Week Retention
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column metric strip below the split */}
      <div className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="pt-2 md:pt-0">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tabular-nums">
                4.98<span className="text-base text-stone-400">/5</span>
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">240+ Verified Reviews</p>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tabular-nums">
                7+ Years
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">Certified Master Artist</p>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tabular-nums">
                3 to 4 Weeks
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">Chip-Free Guarantee</p>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                1 : 1 Private
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">Boutique Suite Comfort</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
