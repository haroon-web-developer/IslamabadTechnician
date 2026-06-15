import React, { useEffect } from 'react';
import ContactSection from '../components/sections/ContactSection';
import FAQSection from '../components/sections/FAQSection';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ContactSection />
      <FAQSection />
    </>
  );
}
