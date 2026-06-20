import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, ChevronDown, Clock, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryItem } from './admin/AdminCategories';
import { services as defaultCategories } from '../data/content';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const list: CategoryItem[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as CategoryItem);
      });
      // Sort to match order or title
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
    return () => unsubCategories();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Areas', path: '/areas' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 will-change-transform font-sans shadow-sm">
      {/* Top Bar - Hidden on Mobile */}
      <div className={`hidden lg:flex transition-all duration-300 overflow-hidden bg-blue-700 text-white text-xs font-semibold ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-2 opacity-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <a href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details." 
              target="_blank" rel="noopener"
              className="hover:text-sky-300 transition">+92 303 4370011</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <a href="mailto:islamabadtechnician.com@gmail.com" className="hover:text-sky-300 transition">islamabadtechnician.com@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Mon - Sun: 8:00 AM - 10:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sky-200">Emergency Service Available 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 bg-white ${isScrolled ? 'py-3 shadow-md' : 'py-4 lg:py-5 border-b border-slate-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group relative z-10 shrink-0">
            {/* Mosque Graphic Abstraction */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0 bg-gradient-to-b from-[#e0b462] to-[#d4a048] rounded-full overflow-hidden shadow-sm flex items-center justify-center transform transition-transform group-hover:scale-105 duration-300">
              <div className="absolute top-[18%] left-[40%] w-2.5 h-2.5 border-b-[2px] border-l-[2px] border-white rounded-full -rotate-[40deg]"></div>
              <div className="absolute top-[28%] left-[55%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_2px_white]"></div>
              
              <div className="absolute bottom-0 w-[120%] h-[60%] flex gap-1 -translate-x-2">
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[35px] border-b-[#1f5940] translate-y-4"></div>
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[45px] border-b-[#16422d] -translate-x-5 translate-y-2 z-10"></div>
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[35px] border-b-[#266e4a] -translate-x-8 translate-y-5"></div>
              </div>
              
              <svg viewBox="0 0 100 100" className="absolute bottom-0 w-[95%] h-[95%] drop-shadow-md z-20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 12 90 L 14 30 L 16 90 Z" fill="#172e3e" />
                <path d="M 84 90 L 86 30 L 88 90 Z" fill="#172e3e" />
                <circle cx="14" cy="30" r="1.5" fill="#172e3e" />
                <circle cx="86" cy="30" r="1.5" fill="#172e3e" />
                <path d="M 20 85 L 50 45 L 80 85 Z" fill="#ffffff" />
                <path d="M 28 85 L 50 55 L 72 85 Z" fill="#f0f5f9" />
                <path d="M 50 55 L 50 85" stroke="#172e3e" strokeWidth="2.5" />
                <path d="M 50 55 L 42 85" stroke="#172e3e" strokeWidth="2.5" />
                <path d="M 50 55 L 58 85" stroke="#172e3e" strokeWidth="2.5" />
                <path d="M 50 55 L 34 85" stroke="#172e3e" strokeWidth="2.5" />
                <path d="M 50 55 L 66 85" stroke="#172e3e" strokeWidth="2.5" />
                <path d="M 15 80 L 25 65 L 35 85 Z" fill="#e2e8f0" />
                <path d="M 85 80 L 75 65 L 65 85 Z" fill="#e2e8f0" />
                <path d="M 0 85 Q 25 75 50 85 T 100 85 Q 100 100 50 100 Q 0 100 0 85 Z" fill="#ffffff" />
                <path d="M -10 92 Q 30 75 110 92 L 110 100 L -10 100 Z" fill="#d9a651" />
                <path d="M -10 96 Q 40 85 110 100 L -10 100 Z" fill="#1b5035" />
              </svg>
            </div>

            <div className="flex flex-col pt-0.5 max-w-[200px] sm:max-w-none">
              <div className="flex items-end gap-2">
                <div className="flex flex-col leading-[0.95]">
                  <span className="text-[1.3rem] sm:text-[1.5rem] font-black italic text-[#172e3e] tracking-tight">Islamabad</span>
                  <span className="text-[1rem] sm:text-[1.4rem] font-black italic text-[#1b5035] tracking-tight">Technician</span>
                </div>
              </div>
              <div className="w-full h-[1.5px] bg-gradient-to-r from-[#172e3e] via-[#d9a651] to-[#1b5035] mt-1 mb-0.5"></div>
              <span className="text-[0.4rem] sm:text-[0.5rem] font-extrabold text-[#172e3e] tracking-[0.12em] uppercase pl-0.5">
                AC SERVICES <span className="text-[#1b5035] mx-0.5">•</span> ELECTRICAL <span className="text-[#1b5035] mx-0.5">•</span> PLUMBING
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 ml-8">
            <Link to="/" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-sky-500 ${location.pathname === '/' ? 'text-sky-500' : 'text-blue-900'}`}>
              Home
            </Link>

            <div className="relative group"
                 onMouseEnter={() => setDropdownOpen(true)}
                 onMouseLeave={() => setDropdownOpen(false)}>
              <Link to="/services" className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 py-4 -my-4 transition-colors hover:text-sky-500 ${location.pathname.startsWith('/services') ? 'text-sky-500' : 'text-blue-900'}`}>
                Services <ChevronDown className="w-4 h-4 ml-0.5" />
              </Link>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-b-xl shadow-xl shadow-blue-900/10 border-t-2 border-sky-400 overflow-hidden z-50">
                  <div className="max-h-[60vh] overflow-y-auto">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/services/${category.slug}`}
                        className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors group/item border-b border-slate-100 last:border-0"
                      >
                        <div className="text-sm font-bold text-slate-700 group-hover/item:text-sky-600 transition-colors">{category.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-sky-500 ${location.pathname === '/about' ? 'text-sky-500' : 'text-blue-900'}`}>
              About
            </Link>
            
            <Link to="/areas" className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-sky-500 ${location.pathname === '/areas' ? 'text-sky-500' : 'text-blue-900'}`}>
              Areas
            </Link>

            <a href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details." target="_blank" rel="noreferrer" className="text-sm font-bold uppercase tracking-wide transition-colors hover:text-sky-500 text-blue-900">
              Contact
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4 lg:ml-auto">
            {/* Phone CTA hidden on mobile, shown on tablet/desktop */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sky-500 shrink-0">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Call for support</span>
                <a href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details." target="_blank" rel="noreferrer" className="text-sm font-black text-blue-900">
                  +92 303 4370011
                </a>
              </div>
            </div>

            <a href="/contact" className="hidden lg:flex bg-sky-500 hover:bg-blue-800 text-white px-6 py-2.5 rounded-md font-bold transition-all items-center shadow-lg shadow-sky-500/20 uppercase text-xs tracking-wider">
              Get A Quote
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-blue-900 hover:text-sky-500 transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full h-[calc(100vh-72px)] overflow-y-auto bg-white flex flex-col border-t border-slate-100 shadow-xl">
          <nav className="flex flex-col px-4 pt-4 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-4 px-4 font-bold text-base border-b border-slate-100 uppercase tracking-wide ${
                  location.pathname === link.path ? 'text-sky-500' : 'text-blue-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <a
              href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details."
              target="_blank"
              rel="noreferrer"
              className="py-4 px-4 font-bold text-base border-b border-slate-100 uppercase tracking-wide text-blue-900 hover:text-sky-500"
            >
              Contact
            </a>
            
            <div className="py-4 px-4">
               <div className="font-bold text-slate-400 text-xs tracking-wider uppercase mb-3">Services</div>
               <div className="flex flex-col gap-2 pl-4 border-l-2 border-slate-100">
                 {categories.map(c => (
                    <Link key={c.id} to={`/services/${c.slug}`} className="py-2 text-[14px] font-bold text-slate-600 hover:text-sky-500 transition-colors">
                      {c.title}
                    </Link>
                 ))}
               </div>
            </div>
          </nav>
          
          <div className="mt-auto bg-slate-50 p-6 flex flex-col gap-3">
            <a href="tel:+923034370011" className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-900 text-white font-bold rounded-md uppercase text-sm tracking-wide">
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
            <a href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details." target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md bg-[#25D366] text-white font-bold uppercase text-sm tracking-wide">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
