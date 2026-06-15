import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ServiceItem } from './Admin';
import { services as categories } from '../data/content';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import ContactSection from '../components/sections/ContactSection';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const [categoryServices, setCategoryServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = categories.find(c => c.slug === categorySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      let list: ServiceItem[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as ServiceItem);
      });
      const filtered = list.filter(s => s.categoryId === categorySlug);
      setCategoryServices(filtered);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setCategoryServices([]);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [categorySlug]);

  if (loading) {
     return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (!currentCategory) {
     return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
         <h2 className="text-2xl font-bold">Category Not Found</h2>
         <Link to="/services" className="text-blue-600 hover:underline mt-4">Go back to Services</Link>
       </div>
     );
  }

  return (
    <>
      <Helmet>
        <title>{currentCategory.title} | IslamabadTechnician</title>
        <meta name="description" content={`Explore our professional ${currentCategory.title.toLowerCase()} services in Islamabad and Rawalpindi. ${currentCategory.description}`} />
        <meta name="keywords" content={`${currentCategory.title}, Islamabad, Rawalpindi, home maintenance, professional services`} />
        
        <link rel="canonical" href={`https://islamabadtechnician.com/services/${currentCategory.slug}`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://islamabadtechnician.com/services/${currentCategory.slug}`} />
        <meta property="og:title" content={`${currentCategory.title} | IslamabadTechnician`} />
        <meta property="og:description" content={`Explore our professional ${currentCategory.title.toLowerCase()} services. ${currentCategory.description}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${currentCategory.title} | IslamabadTechnician`} />
        <meta name="twitter:description" content={`Explore our professional ${currentCategory.title.toLowerCase()} services. ${currentCategory.description}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": currentCategory.title,
            "description": currentCategory.description,
            "url": `https://islamabadtechnician.com/services/${currentCategory.slug}`,
            "provider": {
              "@type": "LocalBusiness",
              "name": "IslamabadTechnician",
              "image": "https://islamabadtechnician.com/logo.jpeg"
            }
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
                "name": currentCategory.title,
                "item": `https://islamabadtechnician.com/services/${currentCategory.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">{currentCategory.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{currentCategory.description}</p>
        </div>
      </div>

      <div className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {categoryServices.length > 0 && (
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Available Services</h2>
              <Link to="/services" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                 <ArrowLeft className="w-4 h-4" /> All Categories
              </Link>
            </div>
          )}

          {categoryServices.length === 0 ? (
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
                  <h3 className="text-xl font-bold mb-4 text-slate-900">What's included in this service?</h3>
                  <ul className="space-y-4">
                    {currentCategory.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                    {!currentCategory.features && (
                      <>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                          <span className="text-slate-700 font-medium">Professional & Certified Technicians</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                          <span className="text-slate-700 font-medium">Transparent Pricing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                          <span className="text-slate-700 font-medium">Quick and Reliable Service</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 bg-white border border-slate-200 rounded-3xl p-6 sticky top-24 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-slate-900">Request this Service</h3>
                <p className="text-sm font-semibold text-slate-500 mb-6">Our technicians are ready to deploy to your location.</p>
                
                <div className="space-y-3">
                  <a href={`https://wa.me/923034370011?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(currentCategory.title)}%20service.`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20">
                    Book via WhatsApp
                  </a>
                  <a href="tel:+923034370011" className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {categoryServices.map(service => (
                <Link 
                  to={`/service/${service.slug}`}
                  key={service.id}
                  className="group relative overflow-hidden rounded-2xl h-[220px] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer isolate flex flex-col justify-end"
                >
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-slate-800 z-0 group-hover:scale-105 transition-transform duration-700"></div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
                    
                  {(service.isTrendy || service.isSeasonal) && (
                    <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                      {service.isTrendy && <span className="bg-rose-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm">Popular</span>}
                      {service.isSeasonal && <span className="bg-sky-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm">Seasonal</span>}
                    </div>
                  )}
                  
                  <div className="relative z-20 p-5 flex flex-col h-full justify-end">
                    <h4 className="text-white font-bold text-lg lg:text-xl mb-1.5 leading-tight">
                      {service.title}
                    </h4>
                    
                    <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          {service.discountPrice ? (
                            <>
                              <span className="text-xs text-slate-400 line-through font-medium">Rs.{service.discountPrice}</span>
                              <span className="text-xl font-black text-white">Rs.{service.price}</span>
                            </>
                          ) : (
                            <span className="text-xl font-black text-white">Rs.{service.price}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-yellow-400">
                          <Star className="w-3.5 h-3.5 fill-current" /> {service.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center w-8 h-8 bg-white/10 backdrop-blur-sm text-white rounded-full group-hover:bg-white group-hover:text-blue-900 transition-all shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ContactSection />
    </>
  );
}
