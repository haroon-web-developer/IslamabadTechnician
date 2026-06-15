import { ArrowRight, ShieldCheck, Clock, PhoneCall, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    image: "/ac.png",
    title: "Expert AC Repair",
    subtitle: "Stay Cool & Relaxed",
    desc: "Professional installation, repair & tuning tailored for premium homes and optimal performance."
  },
  {
    image: "/electricalwork.jpg",
    title: "Electrical Works",
    subtitle: "Certified & Safe",
    desc: "Certified electricians for wiring, panels, and appliance fixes. We ensure zero hazards in your home."
  },
  
  {
    image: "/plumbing.jpg",
    title: "Plumbing Services",
    subtitle: "Leak-Free Guarantee",
    desc: "Expert pipe installation, kitchen fitting, and fast leak detection to keep your water flowing."
  },
  {
    image: "/appliance.jpg",
    title: "Appliance Repairs",
    subtitle: "Fast & Reliable",
    desc: "Quick turnaround for all major appliances. Refrigerators, ovens, washing machines, and more."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden group bg-slate-100">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentSlide}
           className="absolute inset-0 w-full h-full"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8 }}
        >
          {/* Continuous Zoom (Ken Burns) */}
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 10, ease: "linear" }}
            src={SLIDES[currentSlide].image} 
            alt={SLIDES[currentSlide].title} 
            className="w-full h-full object-cover origin-center opacity-40 sm:opacity-50"
          />
          {/* Light Overlay to make dark text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent"></div>
          
          {/* Top align content with specific padding offset to reduce empty space */}
          <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start pt-8 sm:pt-14 lg:pt-18 pb-8 sm:pb-0 z-10">
            <div className="max-w-3xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-block uppercase tracking-[0.15em] text-[#d9a651] font-bold text-[10px] sm:text-xs mb-3 bg-[#172e3e] px-4 py-1 rounded-full border border-[#d9a651]/20 shadow-sm">
                  {SLIDES[currentSlide].subtitle || "#1 Home Maintenance Service"}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-black text-[#172e3e] leading-[1.1] mb-3 sm:mb-5 tracking-tight"
              >
                {SLIDES[currentSlide].title} <br className="hidden sm:block"/>
                <span className="text-[#d9a651] text-3xl sm:text-4xl lg:text-5xl drop-shadow-sm">For Your Modern Home.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-sm sm:text-base md:text-lg text-slate-700 mb-6 sm:mb-8 font-medium max-w-xl leading-relaxed border-l-4 border-[#d9a651] pl-4"
              >
                {SLIDES[currentSlide].desc} Reliable, fast, and 100% satisfaction guaranteed across Islamabad & Rawalpindi.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
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
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#172e3e]/10 bg-white/50 text-[#172e3e] flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#d9a651] hover:text-white hover:border-[#d9a651] z-20 shadow-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#172e3e]/10 bg-white/50 text-[#172e3e] flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-[#d9a651] hover:text-white hover:border-[#d9a651] z-20 shadow-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-24 lg:bottom-12 left-0 right-0 z-20 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full h-2 ${
              currentSlide === idx ? "w-8 bg-[#d9a651]" : "w-2 bg-[#172e3e]/30 hover:bg-[#172e3e]/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
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
