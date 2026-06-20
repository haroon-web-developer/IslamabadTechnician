import { useState } from 'react';
import { faqs } from '../../data/content';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQSection() {
  const [openIndex, setIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const toggleFaq = (index: number) => {
    setIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 3);

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
    <section className="py-4 md:py-8 bg-slate-50 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-slate-200/50 to-transparent -z-0 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-6 lg:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-14 h-14 bg-white rounded-2xl mx-auto mb-5 flex items-center justify-center text-[#d9a651] shadow-md shadow-[#d9a651]/10 border border-[#d9a651]/20"
          >
            <MessageCircleQuestion className="w-7 h-7" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block uppercase tracking-widest text-[#d9a651] font-bold text-xs mb-3 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
              Got Questions?
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172e3e] mb-6 leading-tight tracking-tight"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9a651] to-[#b88c45]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto"
          >
            Clear answers about our home maintenance, repair, and installation services. Can't find what you're looking for? Reach out to us.
          </motion.p>
        </div>

        <div className="space-y-4">
          {displayedFaqs.map((faq, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (idx % 5) }}
              key={faq.question} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === idx ? 'border-[#d9a651] shadow-xl shadow-[#d9a651]/5' : 'border-slate-200 shadow-sm hover:border-[#d9a651]/50 hover:shadow-md'}`}
            >
              <button 
                className="w-full px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between focus:outline-none group"
                onClick={() => toggleFaq(idx)}
              >
                <span className={`font-bold text-base sm:text-lg text-left pr-4 transition-colors ${openIndex === idx ? 'text-[#172e3e]' : 'text-slate-700 group-hover:text-[#172e3e]'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === idx ? 'bg-[#172e3e] text-white shadow-md rotate-180' : 'bg-slate-50 text-slate-400 border border-slate-100 group-hover:bg-slate-100 group-hover:text-[#172e3e]'}`}>
                  {openIndex === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-0 text-slate-600 font-medium text-[15px] sm:text-base leading-relaxed border-t border-slate-50 mt-2 mx-5 sm:mx-8 pt-5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {faqs.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white border border-[#d9a651]/30 hover:border-[#d9a651] text-[#172e3e] font-bold rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              {showAll ? 'Show Less FAQs' : 'Load More FAQs'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
