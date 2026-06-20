import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { ServiceItem } from '../../pages/Admin';
import { CategoryItem } from '../../components/admin/AdminCategories';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { services as defaultCategories } from '../../data/content';

export default function ServicesSection({ showHomeOnly = false }: { showHomeOnly?: boolean }) {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const list: CategoryItem[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as CategoryItem);
      });
      
      // Sort to match order in content.ts
      list.sort((a, b) => {
        const indexA = defaultCategories.findIndex(c => c.slug === a.slug || c.title === a.title);
        const indexB = defaultCategories.findIndex(c => c.slug === b.slug || c.title === b.title);
        
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.title.localeCompare(b.title);
      });
      
      setCategories(list);
    }, (error) => {
      console.error("Error fetching categories:", error);
    });

    // Fetch services
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      const list: ServiceItem[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as ServiceItem);
      });
      setServicesList(list);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching services:", error);
      setLoading(false);
    });

    return () => {
      unsubCategories();
      unsubServices();
    };
  }, []);

  // Filter and Sort
  const filteredAndSortedServices = [...servicesList]
    .filter(service => {
      if (showHomeOnly && service.showOnHome === false) return false;
      if (activeCategory !== 'all' && service.categoryId !== activeCategory) return false;
      return true;
    })
    .sort((a, b) => {
      const aPriority = a.isTrendy || a.isSeasonal ? 1 : 0;
      const bPriority = b.isTrendy || b.isSeasonal ? 1 : 0;
      return bPriority - aPriority;
    });

  return (
    <section className="py-6 lg:py-8 bg-slate-50 relative shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-block uppercase tracking-widest text-sky-500 font-bold text-sm mb-2">
            What We Do
          </span>
          <h2 className="text-blue-900 text-3xl sm:text-4xl font-black mb-4">
            Professional <span className="text-sky-500">Services</span>
          </h2>
          <p className="text-slate-600 font-medium text-base">
            High-quality repairs and maintenance delivered by verified experts to keep your home running smoothly.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Services
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === category.slug
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 font-bold">Loading Services...</div>
        ) : filteredAndSortedServices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Services Available</h3>
            <p className="text-slate-500">We couldn't find any services in this category.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredAndSortedServices.map((service, idx) => (
            <Link 
              to={`/service/${service.slug}`}
              key={service.id}
              className="group bg-white rounded-[20px] p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-[0_5px_20px_rgb(0,0,0,0.08)] transition-all duration-300 border border-slate-100 relative"
            >
              {/* Badges */}
              {(service.isTrendy || service.isSeasonal) && (
                <div className="absolute -top-3 right-4 flex gap-2 z-10">
                   {service.isTrendy && <span className="bg-rose-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">Popular</span>}
                   {service.isSeasonal && <span className="bg-amber-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">Seasonal</span>}
                </div>
              )}

              <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] shrink-0 rounded-2xl overflow-hidden bg-slate-100 relative flex items-center justify-center">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200"></div>
                )}
              </div>
              
              <div className="flex flex-col flex-grow justify-between py-1 min-w-0">
                <div>
                  <h4 className="text-blue-600 font-medium text-base sm:text-[17px] leading-tight mb-1 transition-colors line-clamp-2">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-[13px] font-medium line-clamp-1 mb-1.5 list-inside">
                    - {service.description || "Vary After Inspection"}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {service.discountPrice ? (
                      <>
                        <span className="text-xs text-slate-500 line-through font-semibold border-b border-transparent">Rs:{service.discountPrice}</span>
                        <span className="text-sm font-bold text-slate-800">Rs:{service.price}</span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-slate-800">Rs:{service.price}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-50/80 border border-amber-100 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> 
                    <span>{service.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-center bg-white text-slate-900 border border-slate-900 rounded-lg px-2.5 py-1 font-bold text-[13px] transition-all group-hover:bg-slate-50">
                    Add 
                    <div className="ml-1.5 bg-slate-900 text-white w-[18px] h-[18px] rounded flex items-center justify-center">
                      <span className="text-[16px] leading-none -mt-0.5">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
