import { ArrowRight, ShieldCheck, Clock, PhoneCall, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden group bg-slate-100">
      
      {/* Background Image - Highly Optimized Single Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="/ac.png" 
          alt="Expert Home Maintenance" 
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover origin-center opacity-40 sm:opacity-50"
        />
      </div>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent z-0 pointer-events-none"></div>

      {/* Static Content */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start pt-8 sm:pt-14 lg:pt-18 pb-8 sm:pb-0 h-full pointer-events-auto">
          <div className="max-w-3xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block uppercase tracking-[0.15em] text-[#d9a651] font-bold text-[10px] sm:text-xs mb-3 bg-[#172e3e] px-4 py-1 rounded-full border border-[#d9a651]/20 shadow-sm">
                #1 Home Maintenance Service
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-black text-[#172e3e] leading-[1.1] mb-3 sm:mb-5 tracking-tight"
            >
              Expert Home Services <br className="hidden sm:block"/>
              <span className="text-[#d9a651] text-3xl sm:text-4xl lg:text-5xl drop-shadow-sm">For Your Modern Home.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-slate-700 mb-6 sm:mb-8 font-medium max-w-xl leading-relaxed border-l-4 border-[#d9a651] pl-4"
            >
              Professional AC repair, electrical, plumbing & appliance services. Reliable, fast, and 100% satisfaction guaranteed across Islamabad & Rawalpindi.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a 
                href="tel:+923034370011" 
                className="w-full sm:w-auto px-8 py-3.5 bg-[#d9a651] hover:bg-[#c69542] text-white font-black rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d9a651]/20 uppercase text-sm tracking-wider hover:-translate-y-1"
              >
                <PhoneCall className="w-5 h-5" /> Call Now
              </a>
              <Link 
                to="/services" 
                className="w-full sm:w-auto px-8 py-3.5 bg-[#172e3e] hover:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wider hover:-translate-y-1 shadow-lg shadow-slate-900/10"
              >
                Our Services <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature Banner at bottom of hero */}
      <div className="absolute bottom-0 left-0 w-full bg-[#172e3e]/95 backdrop-blur-md hidden lg:block border-t-[3px] border-[#d9a651] z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-4 text-white group cursor-default">
              <div className="bg-sky-500/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-sky-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold uppercase tracking-wider text-sm">Verified Professionals</span>
                <span className="text-xs text-sky-200/70 font-medium tracking-wide">Highly trained experts</span>
              </div>
            </div>
            
            <div className="w-px h-10 bg-white/10"></div>
            
            <div className="flex items-center gap-4 text-white group cursor-default">
              <div className="bg-sky-500/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-sky-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold uppercase tracking-wider text-sm">24/7 Support Available</span>
                <span className="text-xs text-sky-200/70 font-medium tracking-wide">Ready for emergencies</span>
              </div>
            </div>
            
            <div className="w-px h-10 bg-white/10"></div>
            
            <div className="flex items-center gap-4 text-white group cursor-default">
              <div className="bg-sky-500/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-sky-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold uppercase tracking-wider text-sm">100% Satisfaction</span>
                <span className="text-xs text-sky-200/70 font-medium tracking-wide">Quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
