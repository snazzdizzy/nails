import React, { useState } from 'react';
import { Clock, Check, Sparkles, ArrowRight, Info } from 'lucide-react';
import { SERVICES, ADD_ONS, NAIL_SHAPES } from '../data/servicesData';
import { Service } from '../types';

interface ServiceMenuProps {
  onSelectServiceToBook: (service: Service) => void;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedShape, setSelectedShape] = useState<string>(NAIL_SHAPES[0].name);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'biab', label: 'Builder Gel (BIAB)' },
    { id: 'extensions', label: 'Extensions (Gel-X)' },
    { id: 'art', label: 'Nail Art Tiers' },
    { id: 'natural', label: 'Natural & Pedicure' },
    { id: 'removal', label: 'Removals' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const activeShapeData = NAIL_SHAPES.find((s) => s.name === selectedShape) || NAIL_SHAPES[0];

  return (
    <section id="services" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">
            01. Curated Offerings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Service Menu & Craftsmanship
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Every appointment begins with in-depth e-file cuticle care and nail bed assessment. Prices reflect unhurried precision, medical-grade hygiene, and premium non-toxic Japanese gel products.
          </p>
        </div>

        {/* Category Filter Tabs */}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between bg-white rounded-xl border p-6 sm:p-7 transition-shadow hover:shadow-md ${
                service.popular ? 'border-stone-400/80 shadow-sm' : 'border-stone-200'
              }`}
            >
              <div>
                {/* Header row: Title + Price */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
                      {service.categoryLabel}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium">
                      {service.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tabular-nums">
                      ${service.price}
                    </span>
                    <div className="flex items-center justify-end gap-1 text-[11px] text-stone-500 mt-0.5 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{service.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed mt-3 mb-5">
                  {service.description}
                </p>

                {/* What's included */}
                <div className="space-y-2 py-4 border-t border-stone-100">
                  <p className="text-xs font-medium text-stone-900 uppercase tracking-wider">
                    Included in this session:
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-stone-800 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended For */}
                <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                  <span className="font-medium text-stone-700">Ideal for: </span>
                  {service.recommendedFor}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                {service.popular ? (
                  <span className="text-[11px] font-medium text-stone-600 uppercase tracking-wider">
                    ★ Client Favorite
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400">
                    Deposit: ${Math.round(service.price * 0.25)}
                  </span>
                )}
                <button
                  onClick={() => onSelectServiceToBook(service)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-stone-900 bg-stone-100 hover:bg-stone-900 hover:text-stone-50 rounded-md transition-colors"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mt-16 bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-stone-900">
                Service Add-Ons & Enhancements
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Customize your base service during booking or consult with Sarah at your appointment.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-mono">Selectable at checkout</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADD_ONS.map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-lg bg-stone-50/80 border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-medium text-xs text-stone-900 leading-snug">
                      {addon.name}
                    </h4>
                    <span className="font-serif text-base font-medium text-stone-900 tabular-nums shrink-0">
                      +${addon.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
                {addon.durationMinutes > 0 && (
                  <div className="text-[10px] text-stone-400 font-mono mt-3">
                    +{addon.durationMinutes} minutes added to appointment
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Nail Shape Guide Section */}
        <div id="shapes" className="mt-16 pt-12 border-t border-stone-200">
          <div className="max-w-2xl mb-8">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-1">
              Visual Consultation
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900">
              Nail Shape & Length Guide
            </h3>
            <p className="text-stone-600 text-sm mt-2">
              Unsure which silhouette suits your lifestyle and finger shape? Sarah will customize the apex and sidewall taper during your session. Select a shape below to preview details:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NAIL_SHAPES.map((shape) => {
              const isSelected = selectedShape === shape.name;
              return (
                <button
                  key={shape.name}
                  onClick={() => setSelectedShape(shape.name)}
                  className={`p-4 rounded-xl text-center border transition-all flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-sm'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {/* Vector SVG Silhouette */}
                  <div className="w-12 h-16 mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 60 100" className="w-full h-full">
                      <path
                        d={shape.svgPath}
                        fill="none"
                        stroke={isSelected ? '#fafaf9' : '#44403c'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium tracking-wide">
                    {shape.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Shape Detail Card */}
          <div className="mt-4 p-5 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-lg font-medium text-stone-900">
                  {activeShapeData.name} Shape
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">{activeShapeData.description}</span>
              </div>
              <p className="text-xs text-stone-600">
                <strong className="font-medium text-stone-800">Best For: </strong>
                {activeShapeData.idealFor}
              </p>
            </div>
            <span className="text-[11px] font-mono text-stone-500 whitespace-nowrap bg-stone-100 px-3 py-1.5 rounded">
              Standard complimentary shaping in all services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
