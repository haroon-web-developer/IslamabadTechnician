import React from 'react';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessSection from '../components/sections/ProcessSection';
import AreasSection from '../components/sections/AreasSection';
import Testimonials from '../components/sections/Testimonials';
import FAQSection from '../components/sections/FAQSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection showHomeOnly={true} />
      <WhyChooseUs />
      <ProcessSection />
      <AreasSection />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  );
}
