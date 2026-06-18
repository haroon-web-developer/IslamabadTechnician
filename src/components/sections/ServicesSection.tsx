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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {filteredAndSortedServices.map((service, idx) => (
            <Link 
              to={`/service/${service.slug}`}
              key={service.id}
              className="group relative overflow-hidden rounded-2xl h-55 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer isolate flex flex-col justify-end"
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
              
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
                
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
    </section>
  );
}
