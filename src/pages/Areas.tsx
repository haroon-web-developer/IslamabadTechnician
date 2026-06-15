import React, { useEffect } from 'react';
import AreasSection from '../components/sections/AreasSection';
import ContactSection from '../components/sections/ContactSection';

export default function AreasPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative pt-6 pb-2 lg:pt-8 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-67.5 h-125 bg-blue-100/60 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-sky-100/50 rounded-full opacity-50 translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-1">
            Areas <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-sky-500">We Serve</span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            We cover a wide network across the twin cities. 
          </p>
        </div>
      </div>
      <div className="bg-white">
        <AreasSection />
      </div>
      <ContactSection />
    </>
  );
}
