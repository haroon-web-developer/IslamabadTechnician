import { processSteps } from '../../data/content';
import { CalendarCheck, Wrench, CheckCircle } from 'lucide-react';

const icons = [CalendarCheck, Wrench, CheckCircle];

export default function ProcessSection() {
  return (
    <section className="py-6 lg:py-10 bg-white px-4 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block uppercase tracking-widest text-[#d9a651] font-bold text-xs mb-2">
            Our Working Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172e3e] mb-4">
            How It <span className="text-[#d9a651]">Works</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            Getting your home repairs done is simple and hassle-free with our straightforward 3-step process. No delays, no confusion.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-6 relative">
          
          {/* Connecting Line - desktop only */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-1 border-t-2 border-dashed border-[#d9a651]/30 -z-10"></div>

          {processSteps.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <div key={step.id} className="flex-1 relative flex flex-col items-center text-center group">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 mb-6 z-10 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#d9a651] group-hover:text-white text-[#172e3e] transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#172e3e] flex items-center justify-center text-white font-black text-sm border-[3px] border-white shadow-sm">
                    {step.id}
                  </div>
                </div>
                <h4 className="text-xl font-black text-[#172e3e] mb-2">{step.title}</h4>
                <p className="text-slate-600 font-medium leading-relaxed px-4 sm:px-6 text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
