import { useState } from 'react';
import { faqs } from '../../data/content';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function FAQSection() {
  const [openIndex, setIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-6 lg:py-10 bg-white relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl mx-auto mb-4 flex items-center justify-center text-sky-500 border border-slate-100 shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="inline-block uppercase tracking-widest text-sky-500 font-bold text-sm mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-4">
            Frequently Asked <span className="text-sky-500">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-medium">Clear answers to help you make the best choice for your home.</p>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === idx ? 'border-sky-300 shadow-xl shadow-sky-500/10' : 'border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md'}`}
            >
              <button 
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between focus:outline-none"
                onClick={() => toggleFaq(idx)}
              >
                <span className={`font-black text-lg text-left pr-4 transition-colors ${openIndex === idx ? 'text-blue-900' : 'text-slate-700 hover:text-blue-900'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? 'bg-sky-500 text-white shadow-md' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                  {openIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-slate-600 font-medium text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
