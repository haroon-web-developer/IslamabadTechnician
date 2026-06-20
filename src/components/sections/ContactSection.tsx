import React, { useState } from 'react';
import { Phone, Clock, MessageCircle, Info, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address || !formData.service) {
      alert("Please fill in all required fields (Name, Phone, Address, Service).");
      return;
    }

    const message = `Hello, I'd like to request a service callback.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}%0A*Service:* ${formData.service}%0A*Details:* ${formData.message || 'N/A'}`;
    const whatsappUrl = `https://wa.me/923034370011?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden" id="contact">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-block uppercase tracking-widest text-sky-500 font-bold text-sm mb-2">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-900 mb-4">
            Get A <span className="text-sky-500">Free Quote</span>
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Contact us today to schedule your service. Our support team is available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Information */}
          <div className="lg:col-span-5 space-y-4">
            <a href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details." target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-green-400 hover:bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm border border-slate-100 shrink-0 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-blue-900 mb-0.5">WhatsApp Us</h4>
                <p className="text-slate-500 text-xs font-bold">Fastest way to get an estimate</p>
              </div>
            </a>

            <a href="tel:+923034370011" className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-sky-400 hover:bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sky-500 shadow-sm border border-slate-100 shrink-0 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-blue-900 mb-0.5">Call Us Directly</h4>
                <p className="text-slate-500 text-xs font-bold">Available for urgent needs</p>
              </div>
            </a>
            
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-900 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-blue-900 mb-1">Operating Hours</h4>
                <div className="space-y-1 text-xs font-bold text-slate-500">
                  <div className="flex justify-between w-full max-w-[200px]">
                    <span>Mon - Sun:</span>
                    <span className="text-blue-900">8:00 AM - 10:00 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-sky-700 bg-sky-100/80 px-2 py-1 rounded-lg font-bold mt-2 w-fit">
                  <Info className="w-3.5 h-3.5" />
                  24/7 Emergency Support
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-blue-900 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-blue-900 mb-0.5">Our Location</h4>
                <p className="text-slate-500 text-xs font-bold">Islamabad & Rawalpindi</p>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-blue-900 p-5 sm:p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-bl-full opacity-10"></div>
            
            <h3 className="mb-0.5 font-black text-2xl text-white">Book Online</h3>
            <p className="mb-4 font-medium text-sky-200 text-sm">Fill out this form and our team will get back to you immediately.</p>
            
            <form className="space-y-3 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition-all text-sm"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition-all text-sm"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              
              <div>
                <input 
                  type="text" 
                  id="address" 
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition-all text-sm"
                  placeholder="Service Location / Address"
                />
              </div>

              <div>
                <div className="relative">
                  <select 
                    id="service" 
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition-all appearance-none cursor-pointer [&>option]:text-slate-900 text-sm"
                  >
                    <option value="" className="text-slate-400">Select required service...</option>
                    <option value="ac-repair">AC Repair & Service</option>
                    <option value="plumbing">Plumbing Services</option>
                    <option value="electrician">Electrician Services</option>
                    <option value="cleaning">Cleaning Services</option>
                    <option value="appliance">Appliance Repair</option>
                    <option value="moving">Home Shifting</option>
                  </select>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <textarea 
                  id="message" 
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition-all resize-none text-sm"
                  placeholder="Additional Details (Optional)"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-sky-500 hover:bg-sky-400 text-blue-950 font-black tracking-wide uppercase text-sm py-4 rounded-xl transition-all shadow-lg hover:shadow-sky-500/30 hover:-translate-y-0.5 mt-1"
              >
                Submit Request
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
