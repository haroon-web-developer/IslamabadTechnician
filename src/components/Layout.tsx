import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import DeveloperPromo from './DeveloperPromo';

export default function Layout() {
  const location = useLocation();

  const getSeoMetadata = () => {
    switch (true) {
      case location.pathname === '/about':
        return {
          title: 'About Us | IslamabadTechnician',
          description: 'Learn about IslamabadTechnician, the premier home maintenance service provider in Islamabad and Rawalpindi. We offer expert AC, plumbing, and electrical services.',
          url: 'https://islamabadtechnician.com/about'
        };
      case location.pathname === '/services':
        return {
          title: 'Our Services | Residential & Commercial | IslamabadTechnician',
          description: 'Explore our complete range of professional services, including AC repair, plumbing, electrician work, deep cleaning, fridge maintenance, and home shifting.',
          url: 'https://islamabadtechnician.com/services'
        };
      case location.pathname.startsWith('/services/'):
      case location.pathname.startsWith('/service/'):
        return {
          title: 'Service Details | IslamabadTechnician',
          description: 'Get detailed information about our specific maintenance services, prices, and what we include.',
          url: `https://islamabadtechnician.com${location.pathname}`
        };
      case location.pathname === '/areas':
        return {
          title: 'Coverage Areas: Islamabad & Rawalpindi | IslamabadTechnician',
          description: 'IslamabadTechnician provides fast and reliable home maintenance services across all major areas in Islamabad and Rawalpindi. See our full coverage map.',
          url: 'https://islamabadtechnician.com/areas'
        };
      case location.pathname === '/contact':
        return {
          title: 'Contact IslamabadTechnician | Book a Service Today',
          description: 'Reach out to us today for any inquiries or to book a professional repair, maintenance, or emergency service in Islamabad & Rawalpindi.',
          url: 'https://islamabadtechnician.com/contact'
        };
      case location.pathname === '/admin':
        return {
          title: 'Admin Dashboard | IslamabadTechnician',
          description: 'Admin panel for IslamabadTechnician.',
          url: 'https://islamabadtechnician.com/admin'
        };
      default:
        return {
          title: 'IslamabadTechnician | Expert Home Maintenance & Repair Services',
          description: 'Your trusted partner for quick, reliable, and professional home services. We specialize in AC repair, plumbing, electrical, and appliance maintenance across Islamabad & Rawalpindi.',
          url: 'https://islamabadtechnician.com/'
        };
    }
  };

  const seo = getSeoMetadata();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IslamabadTechnician",
    "image": "https://islamabadtechnician.com/logo.png",
    "description": "Expert home maintenance, AC repair, plumbing, electrician, and cleaning services in Islamabad and Rawalpindi.",
    "url": "https://islamabadtechnician.com",
    "telephone": "+923034370011",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Islamabad"
      },
      {
        "@type": "City",
        "name": "Rawalpindi"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Islamabad",
      "addressRegion": "ICT",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.facebook.com/islamabadtechnician",
      "https://www.instagram.com/islamabadtechnician"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IslamabadTechnician",
    "url": "https://islamabadtechnician.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://islamabadtechnician.com/services?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <html lang="en" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content="Islamabad, Rawalpindi, home maintenance, AC repair, plumbing, electrician, handyman services, emergency home repair, same-day repair services" />
        
        {/* Canonical Link */}
        <link rel="canonical" href={seo.url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content="https://islamabadtechnician.com/logo.png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="IslamabadTechnician" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seo.url} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://islamabadtechnician.com/logo.png" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      <main className="flex-grow pt-[80px] lg:pt-[110px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <DeveloperPromo />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
