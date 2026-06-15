import { areasServed } from '../../data/content';
import { MapPin } from 'lucide-react';

export default function AreasSection() {
  return (
    <section className="py-6 lg:py-8 bg-blue-900 border-y border-blue-800 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500 rounded-full blur-3xl opacity-10 -z-10 pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-center lg:text-left max-w-2xl">
            <span className="inline-block uppercase tracking-widest text-sky-400 font-bold text-xs mb-2">
              Coverage Areas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
              We Serve <span className="text-sky-400">Your Area</span>
            </h2>
            <p className="text-sky-100 font-medium text-sm sm:text-base leading-relaxed">
              Our technicians are stationed across Islamabad and Rawalpindi to ensure rapid response times, especially for emergency repairs.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {areasServed.map((area, idx) => (
            <div key={idx} className="bg-white/10 p-3 justify-center items-center flex gap-2 rounded-xl border border-white/20 hover:border-sky-400 hover:bg-sky-500 hover:text-blue-900 transition-all text-xs sm:text-sm font-bold text-white group cursor-default shadow-sm backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-sky-400 group-hover:text-blue-900 transition-colors shrink-0" />
              <span className="truncate">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
