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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categoryServices.map(service => (
                <Link 
                  to={`/service/${service.slug}`}
                  key={service.id}
                  className="group relative flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/20 w-full min-h-[180px] sm:min-h-[220px]"
                >
                  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-900">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800"></div>
                    )}
                    {/* Heavy overlays to ensure text readability on ANY image (light or dark) */}
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/50 transition-colors duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow relative z-10 w-full h-full text-white">
                    {/* Badges */}
                    {(service.isTrendy || service.isSeasonal) && (
                      <div className="absolute top-4 right-4 flex gap-2 z-10">
                        {service.isTrendy && <span className="bg-rose-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded shadow-sm">Popular</span>}
                        {service.isSeasonal && <span className="bg-sky-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded shadow-sm">Seasonal</span>}
                      </div>
                    )}

                    <h4 className="font-bold text-lg sm:text-xl leading-tight mb-1 group-hover:text-blue-300 transition-colors line-clamp-2 drop-shadow-lg pr-16 text-white min-h-[1.5rem]">
                      {service.title}
                    </h4>
                    
                    <p className="text-slate-200 text-xs sm:text-sm leading-snug mb-4 line-clamp-2 drop-shadow flex-grow font-medium">
                      {service.description ? `- ${service.description}` : ''}
                    </p>
                    
                    <div className="flex items-end justify-between mt-auto w-full pt-3">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          {service.discountPrice ? (
                            <>
                              <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">Rs.{service.discountPrice}</span>
                              <span className="text-lg sm:text-xl font-black text-white drop-shadow-md">Rs.{service.price}</span>
                            </>
                          ) : (
                            <span className="text-lg sm:text-xl font-black text-white drop-shadow-md">Rs.{service.price}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-md w-fit border border-white/10">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> 
                          <span>{service.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center bg-white text-slate-900 border-2 border-white hover:bg-transparent hover:text-white rounded-lg px-4 py-1.5 font-bold transition-all shadow-lg group-hover:scale-105 duration-200">
                        Add <span className="ml-1 text-lg leading-none">+</span>
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
