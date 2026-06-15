import { Star, MapPin, Quote } from 'lucide-react';
import { testimonials } from '../../data/content';

export default function Testimonials() {
  return (
    <section className="py-6 lg:py-10 bg-slate-50 border-y border-slate-200/50 overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-block uppercase tracking-widest text-sky-500 font-bold text-sm mb-2">
            Real Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-4">
            Loved By <span className="text-sky-500">Local Families</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            Don't just take our word for it. Read what your neighbors in Islamabad and Rawalpindi have to say about our complete home services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-100 relative group hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2 transition-all duration-300">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-slate-100 group-hover:text-blue-50 transition-colors duration-300" strokeWidth={1} fill="currentColor" />
              
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-sky-400 fill-sky-400' : 'text-slate-200 fill-slate-200'}`} 
                  />
                ))}
              </div>
              
              <p className="text-slate-600 font-medium leading-relaxed italic flex-grow mb-8 relative z-10 text-lg">"{testimonial.review}"</p>
              
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-black text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-blue-900 font-black text-lg leading-tight mb-1">{testimonial.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
