import React from 'react';
import { Target } from 'lucide-react';

export default function AboutWhoWeAre() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col">
            {/* Top Text */}
            <div className="mb-12 lg:mb-16">
               <span className="inline-block uppercase tracking-[0.1em] text-slate-500 font-bold text-xs mb-4">
                 Who We Are
               </span>
               <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-[#172e3e] tracking-tight">
                 We're built for those who value trust protection, craftsmanship, and believe every home quality.
               </h2>
            </div>
            
            {/* Bottom Image (Left) */}
            <div className="mt-auto h-[350px] lg:h-[400px]">
              <img 
                src="https://images.pexels.com/photos/8293699/pexels-photo-8293699.jpeg" 
                alt="Professional Technician" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col">
            
            {/* Top Double Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12 lg:mb-16">
              {/* Blue Card */}
              <div className="bg-[#1e88e5] text-white p-8 md:p-10 rounded-xl flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                  We create solutions that solve your home maintenance pain, respond to market needs, transform internal operations, and follow the latest trends.
                </p>
              </div>
              
              {/* Image Card */}
              <div className="h-[300px] sm:h-auto">
                <img 
                  src="https://images.pexels.com/photos/5463577/pexels-photo-5463577.jpeg" 
                  alt="Quality Work" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            
            {/* Bottom Text Reference */}
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl text-[#172e3e] font-bold leading-snug mb-6">
                Commercial & residential clients across <a href="#" className="text-[#1e88e5] underline decoration-2 underline-offset-4 font-bold">Islamabad & Rawalpindi rely on us for fast and reliable 24 hour</a> repair services.
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
