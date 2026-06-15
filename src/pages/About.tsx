import React, { useEffect } from 'react';
import ContactSection from '../components/sections/ContactSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessSection from '../components/sections/ProcessSection';
import AboutWhoWeAre from '../components/sections/AboutWhoWeAre';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AboutWhoWeAre />
      <WhyChooseUs />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
