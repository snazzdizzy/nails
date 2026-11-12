import React, { useState } from 'react';
import { Heart, X, Sparkles, Clock, ArrowRight, Check, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { GalleryItem } from '../types';

interface PhotoGalleryProps {
  onBookLook: (item: GalleryItem) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onBookLook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedLooks, setLikedLooks] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'chrome', label: 'Glazed & Chrome' },
    { id: 'handpainted', label: 'Hand-Painted Art' },
    { id: 'french', label: 'Modern French' },
    { id: 'biab', label: 'Structured BIAB' },
    { id: 'sculpt', label: '3D & Sculpt' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedLooks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">
              02. Studio Portfolio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Curated Work & Real Client Manicures
            </h2>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              Every set is captured under natural studio light with zero smoothing filters, demonstrating clean cuticle clearance and balanced structural apexes.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-mono">
            Showing {filteredItems.length} curated designs
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 border-b border-stone-200 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-stone-50 shadow-sm'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Bento / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => {
            const isLiked = likedLooks[item.id];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Image Container with Fallback */}
                <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Top Overlay: Category and Like Button */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-mono uppercase bg-stone-900/75 backdrop-blur-md text-stone-100 px-2.5 py-1 rounded">
                      {item.categoryLabel}
                    </span>
                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-colors ${
                        isLiked
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 hover:bg-white text-stone-700'
                      }`}
                      aria-label="Save look"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Bottom Hover Hint */}
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-xs font-medium">
                      <Eye className="w-3.5 h-3.5" />
                      View Look Formula
                    </span>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                      <span>{item.nailShape}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.nailLength}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{item.durationMinutes} min</span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                      {item.technique}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-xs font-medium text-stone-900 font-mono">
                      Est. ${item.priceEstimate}
                    </div>
                    <span className="text-xs text-stone-500 group-hover:text-stone-900 flex items-center gap-1 transition-colors">
                      Formula & Reviews <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox / Look Formula Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-sm transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Pane */}
              <div className="md:w-1/2 bg-stone-100 relative min-h-[280px] md:min-h-full">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 px-3 py-1 rounded text-xs font-mono">
                  {selectedItem.nailShape} · {selectedItem.nailLength}
                </div>
              </div>

              {/* Information Pane */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-1">
                    {selectedItem.categoryLabel}
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3">
                    {selectedItem.title}
                  </h3>

                  <div className="flex items-center gap-4 py-3 border-y border-stone-100 text-xs text-stone-600 mb-4">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Service Time</span>
                      <span className="font-mono font-medium text-stone-900">{selectedItem.durationMinutes} min</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Estimate</span>
                      <span className="font-mono font-medium text-stone-900">${selectedItem.priceEstimate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase">Silhouette</span>
                      <span className="font-medium text-stone-900">{selectedItem.nailShape}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1">
                        Application Technique & Layers
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200/60">
                        {selectedItem.technique}
                      </p>
                    </div>

                    {selectedItem.clientReview && (
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1">
                          Client Feedback
                        </h4>
                        <blockquote className="text-xs italic text-stone-600 border-l-2 border-stone-300 pl-3 py-1">
                          "{selectedItem.clientReview.comment}"
                          <cite className="block not-italic text-[11px] font-medium text-stone-800 mt-1">
                            — {selectedItem.clientReview.author}
                          </cite>
                        </blockquote>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      const itemToBook = selectedItem;
                      setSelectedItem(null);
                      onBookLook(itemToBook);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium uppercase tracking-wider rounded-md transition-colors"
                  >
                    <span>Book Similar Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
