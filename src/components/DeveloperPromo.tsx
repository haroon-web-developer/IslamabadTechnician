import { ExternalLink, MessageCircle, Code2 } from 'lucide-react';

export default function DeveloperPromo() {
  return (
    <section className="bg-gradient-to-r from-sky-50 to-blue-50 border-t border-sky-100 py-10 md:py-12 relative overflow-hidden shrink-0">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/60 rounded-full blur-3xl shadow-2xl -z-10 transform translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
          <div className="w-14 h-14 bg-white shadow-sm border border-sky-100 rounded-2xl flex items-center justify-center shrink-0 text-sky-500">
            <Code2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-blue-950 mb-1.5 flex items-center justify-center md:justify-start gap-2">
              Need a Website Like This?
            </h3>
            <p className="text-slate-600 font-medium text-sm md:text-base">
              We build professional, fast, and SEO-optimized websites for small businesses.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <a 
            href="https://haroondev.vercel.app/#about" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:text-sky-600 border border-slate-200 transition-all text-sm uppercase tracking-wide"
          >
            <ExternalLink className="w-4 h-4" /> View Portfolio
          </a>
          <a 
            href="https://wa.me/923214576734?text=Hello!%20I%20saw%20the%20IslamabadTechnician%20website%20and%20I'm%20interested%20in%20getting%20a%20professional%20website%20built%20for%20my%20business.%20Could%20we%20discuss%20the%20details?" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 bg-sky-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
