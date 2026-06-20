import React from "react";
import { Clock, Shield, ThumbsUp, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  {
    icon: Clock,
    title: "On-Time Service",
    description:
      "Your time is valuable. We arrive exactly when scheduled, providing rapid response for emergencies.",
  },
  {
    icon: Shield,
    title: "Verified Experts",
    description:
      "Every technician is background-checked, fully trained, and highly experienced in their field.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Pricing",
    description:
      "No hidden fees. You get a clear, upfront estimate before any work begins.",
  },
  {
    icon: ThumbsUp,
    title: "Guaranteed Satisfaction",
    description:
      "We don't cut corners. High-quality materials and a commitment to doing the job right.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-4 lg:py-8 bg-slate-50 overflow-hidden relative isolate">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-200 h-200 bg-sky-200/40 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-70"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-150 h-150 bg-blue-200/40 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Images Section (Top on mobile, left on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 relative mt-4 lg:mt-0"
          >
            <div className="relative">
              {/* Visual Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10 w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="rounded-t-full rounded-b-4xl overflow-hidden shadow-xl h-56 sm:h-80 border-4 border-white bg-white"
                >
                  <img 
                    src="/whychoseus-1.jpg" 
                    alt="AC Repairing" 
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="rounded-b-full rounded-t-4xl overflow-hidden shadow-xl h-56 sm:h-80 translate-y-8 sm:translate-y-12 border-4 border-white bg-white"
                >
                  <img 
                    src="/whychoseus-2.jpg" 
                    alt="Electrician Fixing" 
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              </div>

              {/* Experience Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-linear-to-br from-blue-900 to-slate-900 rounded-4xl p-4 sm:p-5 shadow-2xl border-4 sm:border-[6px] border-white text-center transform hover:scale-110 transition-all duration-300"
              >
                <div className="relative z-10">
                  <span className="block text-3xl sm:text-4xl font-black text-sky-400 mb-0.5 drop-shadow-md">
                    10+
                  </span>
                  <span className="block text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-[0.15em] text-center">
                    Years
                    <br />
                    Experience
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="order-2 mt-8 sm:mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                <span className="uppercase tracking-widest text-sky-600 font-bold text-sm">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3 text-center lg:text-left leading-[1.15]">
                We Set the Standard for <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-500">Home Services</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-3 text-center lg:text-left">
                From AC repairs to deep cleaning, we provide a complete suite of
                services with peace of mind. We take away the stress of home
                maintenance by delivering reliable, professional results.
              </p>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0 flex items-center justify-center text-sky-500 border border-slate-100 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white transition-all duration-300 group-hover:shadow-sky-500/20 group-hover:-translate-y-1">
                    <reason.icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {reason.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
