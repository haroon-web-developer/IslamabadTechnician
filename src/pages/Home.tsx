import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import SEOIntro from '../components/sections/SEOIntro';
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
      <Helmet>
        <title>Best Islamabad Technician | AC Repair & Electrician</title>
        <meta name="description" content="Need a reliable Islamabad technician? We offer top-rated AC repair, emergency electrician, and home maintenance services across Islamabad. Call 24/7!" />
        <meta name="keywords" content="islamabad technician, best electrician in islamabad, AC repair Islamabad, home maintenance services Islamabad, AC technician E11, Electrician F10, Plumbing F9" />
      </Helmet>
      {/* Home Route Sections */}
      <Hero />
      <SEOIntro />
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
