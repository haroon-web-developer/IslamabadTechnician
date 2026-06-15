import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/sections/ContactSection';
import { ServiceItem } from './Admin';
import { services as contentServices } from '../data/content';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<string[]>([
    "Professional & Certified Technicians",
    "Transparent Pricing",
    "Quick and Reliable Service",
    "Customer Satisfaction Guaranteed"
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      let allServices: ServiceItem[] = [];
      snapshot.forEach(doc => {
        allServices.push({ id: doc.id, ...doc.data() } as ServiceItem);
      });
      
      const found = allServices.find(s => s.slug === slug);
      if (found) {
        setService(found);
        const matchingCategory = contentServices.find(cs => cs.slug === slug || found.title.toLowerCase().includes(cs.title.toLowerCase()));
        if (matchingCategory && matchingCategory.features) {
           setFeatures(matchingCategory.features);
        }
      } else {
        setService(null);
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      setService(null);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [slug]);

  if (loading) {
     return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2>Service Not Found</h2>
        <p className="text-slate-600 mt-2 mb-6">We couldn't find the service you are looking for.</p>
        <button onClick={() => navigate('/services')} className="text-blue-600 hover:underline">
          Go back to Services
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title} | IslamabadTechnician</title>
        <meta name="description" content={`Book professional ${service.title} services starting from Rs. ${service.price}. We offer quick and reliable maintenance in Islamabad and Rawalpindi.`} />
        <meta name="keywords" content={`${service.title}, Islamabad, Rawalpindi, professional repair, home maintenance`} />
        
        <link rel="canonical" href={`https://islamabadtechnician.com/service/${service.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://islamabadtechnician.com/service/${service.slug}`} />
        <meta property="og:title" content={`${service.title} | IslamabadTechnician`} />
        <meta property="og:description" content={`Book professional ${service.title} services starting from Rs. ${service.price}.`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} | IslamabadTechnician`} />
        <meta name="twitter:description" content={`Book professional ${service.title} services starting from Rs. ${service.price}.`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "provider": {
              "@type": "LocalBusiness",
              "name": "IslamabadTechnician",
              "image": "https://islamabadtechnician.com/logo.jpeg"
            },
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
            "offers": {
              "@type": "Offer",
              "priceCurrency": "PKR",
              "price": String(service.price),
              "url": `https://islamabadtechnician.com/service/${service.slug}`
            },
            "description": `Book professional ${service.title} services starting from Rs. ${service.price}. We offer quick and reliable maintenance in Islamabad and Rawalpindi.`
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://islamabadtechnician.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://islamabadtechnician.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": service.title,
                "item": `https://islamabadtechnician.com/service/${service.slug}`
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="bg-slate-50 py-8 lg:py-12 border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all services
          </Link>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              {service.imageUrl && (
                <div className="w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <h1 className="mb-6 leading-tight text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">{service.title}</h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {service.description} We bring the best experts to your doorstep to ensure high-quality and lasting results for your home or business.
              </p>
              
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
                <h3 className="text-xl font-bold mb-4 text-slate-900">What's included in this service?</h3>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 bg-white border border-slate-200 rounded-3xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-slate-900">Request this Service</h3>
              <div className="mb-6 text-sm text-slate-600 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pricing Guide</div>
                 <div className="text-lg font-bold text-slate-900">Starting from: Rs. {service.price}</div>
                 {service.discountPrice && <div className="text-slate-400 line-through text-xs font-bold">Compare at: Rs. {service.discountPrice}</div>}
              </div>
              <p className="text-sm font-semibold text-slate-500 mb-6">Our technicians are ready to deploy to your location.</p>
              
              <div className="space-y-3">
                <a href={`https://wa.me/923034370011?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(service.title)}%20service.`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20">
                  Book via WhatsApp
                </a>
                <a href="tel:+923034370011" className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </>
  );
}
