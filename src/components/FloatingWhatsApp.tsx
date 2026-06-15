import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/923034370011?text=Hello!%20I%E2%80%99m%20looking%20for%20AC%20repair,%20electrician,%20or%20other%20home%20services.%20Please%20share%20details."
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-16 right-6 sm:bottom-8 sm:right-6 md:bottom-10 md:right-12 z-[9999] bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      style={{ width: "60px", height: "60px", borderRadius: "50%" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
    </a>
  );
}
