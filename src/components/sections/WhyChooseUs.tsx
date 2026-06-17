import React from "react";
import { Clock, Shield, ThumbsUp, HeartHandshake } from "lucide-react";

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
    <section className="py-6 lg:py-10 bg-white overflow-hidden relative">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -z-10 hidden lg:block"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Visual Frame Background */}
            <div className="absolute inset-0 bg-sky-500 rounded-3xl transform -translate-x-6 translate-y-6 hidden sm:block"></div>

            {/* Visual Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10 w-full bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-slate-100">
              <img
                src="public\whychoseus-1.jpg"
                alt="AC Repairing"
                loading="lazy"
                className="w-full h-48 sm:h-72 object-cover rounded-2xl shadow-sm"
              />
              <img
                src="public\whychoseus-2.jpg"
                alt="Electrician Fixing"
                loading="lazy"
                className="w-full h-48 sm:h-72 object-cover rounded-2xl shadow-sm translate-y-8"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-blue-900 rounded-2xl p-5 sm:p-6 shadow-2xl border-4 border-white text-center transform hover:scale-105 transition-transform duration-300">
              <span className="block text-4xl font-black text-sky-400 mb-1">
                10+
              </span>
              <span className="block text-xs font-bold text-white uppercase tracking-widest text-center">
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block uppercase tracking-widest text-sky-500 font-bold text-sm mb-3 text-center lg:text-left w-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-6 text-center lg:text-left leading-tight">
              We Set the Standard for <br className="hidden lg:block" />
              <span className="text-sky-500">Home Services</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10 text-center lg:text-left">
              From AC repairs to deep cleaning, we provide a complete suite of
              services with peace of mind. We take away the stress of home
              maintenance by delivering reliable, professional results.
            </p>

            <div className="space-y-6 sm:space-y-8">
              {reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start group"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-50 shrink-0 flex items-center justify-center text-sky-500 border border-slate-100 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                    <reason.icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900 mb-2 text-center sm:text-left">
                      {reason.title}
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base text-center sm:text-left">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
