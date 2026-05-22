import React from 'react';
import { EXHIBITIONS } from '../data/galleryData';
import { EditorialReveal } from './EditorialReveal';
import { ArrowRight } from 'lucide-react';

export const Exhibitions: React.FC = () => (
  <section className="bg-[#D9D2C5] text-black py-24 md:py-32 px-8 md:px-24 border-t border-black/5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
        <div className="space-y-4">
          <EditorialReveal delay={0.1}>
            <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-[#C5A059] block">Agenda</span>
          </EditorialReveal>
          <EditorialReveal delay={0.2}>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-none uppercase font-light">Upcoming Events.</h2>
          </EditorialReveal>
        </div>
        <EditorialReveal delay={0.3}>
          <p className="font-sans text-sm md:text-base text-black/60 max-w-sm leading-loose">
            Join us for exclusive physical directives, private viewings, and artist talks.
          </p>
        </EditorialReveal>
      </div>

      <div className="flex flex-col border-t border-black/5">
        {EXHIBITIONS.map((event, i) => (
          <EditorialReveal key={i} delay={0.2 + (i * 0.1)}>
            <div className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-12 border-b border-black/5 hover:bg-white/30 transition-colors duration-500 px-4 md:px-8 cursor-none">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto mb-6 md:mb-0">
                <p className="font-mono text-sm md:text-base tracking-[0.2em] text-[#C5A059] font-bold w-24">
                  {event.date}
                </p>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-4xl tracking-tight uppercase text-black group-hover:translate-x-2 transition-transform duration-500">
                    {event.title}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-black/40 mt-1">
                    {event.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-black/50 px-4 py-2 border border-black/20 rounded-full group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors bg-transparent">
                  {event.status}
                </span>
                <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all duration-500">
                  <ArrowRight size={14} className="text-black group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </EditorialReveal>
        ))}
      </div>
    </div>
  </section>
);
