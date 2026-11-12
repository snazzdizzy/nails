import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/galleryData';

export const ClientReviews: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">
              06. Client Testimonials
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Loved by Discerning Hands
            </h2>
            <p className="mt-2 text-stone-600 text-sm">
              Read uncensored feedback from loyal clients who prioritize nail preservation and refined aesthetics.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-stone-700 bg-white px-4 py-2 rounded-lg border border-stone-200 shadow-2xs">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-mono tabular-nums font-semibold">4.98 / 5.0</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-500">240+ Appointments</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-semibold text-stone-900 font-serif">
                  {rev.author}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-stone-600" />
                  <span>{rev.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
