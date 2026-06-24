import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryItem } from './admin/AdminCategories';
import Logo from './Logo';

export default function Footer() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const unsubCategories = onSnapshot(query(collection(db, 'categories'), limit(5)), (snapshot) => {
      const list: CategoryItem[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as CategoryItem);
      });
      setCategories(list);
    }, (error) => {
      console.error("Error fetching categories:", error);
    });
    return () => unsubCategories();
  }, []);

  return (
    <footer className="bg-blue-950 text-slate-300 pt-12 pb-8 shrink-0">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-10">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg relative z-10 scale-[0.85] origin-left">
                 <Logo />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black italic text-white tracking-tight">Islamabad</span>
                <span className="text-sm font-black italic text-sky-500 tracking-tight">Technician</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs font-medium">
              Professional home maintenance, AC repair, plumbing, and cleaning services across Islamabad and Rawalpindi. Trusted by homeowners and businesses.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:text-white hover:border-transparent transition-all text-slate-400 shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:text-white hover:border-transparent transition-all text-slate-400 shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="!text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span> Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'All Services', path: '/services' },
                { name: 'Areas We Serve', path: '/areas' },
                { name: 'Contact Us', path: '/contact' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2 group font-medium">
                    <ArrowRight className="w-3 h-3 text-sky-500/50 group-hover:text-sky-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" /> 
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="!text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span> Our Services
            </h4>
            <ul className="space-y-3">
              {categories.map(category => (
                <li key={category.id}>
                  <Link to={`/services/${category.slug}`} className="text-sm text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2 group font-medium">
                     <ArrowRight className="w-3 h-3 text-sky-500/50 group-hover:text-sky-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" /> 
                    <span className="group-hover:translate-x-1 transition-transform">{category.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="!text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span> Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-sm font-medium">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">G-11, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-medium">
                <Phone className="w-5 h-5 text-sky-500 shrink-0" />
                <a href="tel:+923034370011" className="text-slate-400 hover:text-sky-400 transition-colors">+92 303 4370011</a>
              </li>
              <li className="flex items-center gap-4 text-sm font-medium">
                <a href="tel:+923364370011" className="text-slate-400 hover:text-sky-400 transition-colors ml-9">+92 336 4370011</a>
              </li>
              <li className="flex items-center gap-4 text-sm font-medium">
                <Mail className="w-5 h-5 text-sky-500 shrink-0" />
                <a href="mailto:islamabadtechnician.com@gmail.com" className="text-slate-400 hover:text-sky-400 transition-colors">islamabadtechnician.com@gmail.com</a>
              </li>
              <li className="flex items-start gap-4 text-sm font-medium">
                <Clock className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">Mon - Sun: 8:00 AM - 10:00 PM<br/><span className="text-sky-500/80 text-xs mt-1 block">Emergency: 24/7 Available</span></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} IslamabadTechnician. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
