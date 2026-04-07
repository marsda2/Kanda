import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-[#173018] font-bold border-b-2 border-[#705d00] pb-1 font-body text-sm"
      : "text-[#1a1c1c]/60 font-medium hover:text-[#705d00] transition-all duration-200 font-body text-sm";
  };

  const getMobileLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-[#705d00] font-headline font-bold text-4xl uppercase tracking-tight"
      : "text-[#173018] font-headline font-bold text-4xl uppercase tracking-tight";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f9]/80 backdrop-blur-md transition-colors duration-300">
        <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="text-2xl font-bold tracking-tighter text-[#173018] font-headline uppercase">
            Kanda
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link className={getLinkClass("/")} to="/">Menu</Link>
            <Link className={getLinkClass("/locations")} to="/locations">Locations</Link>
            <Link className={getLinkClass("/our-story")} to="/our-story">Our Story</Link>
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-br from-[#173018] to-[#2D472C] text-white rounded-md px-6 py-2 scale-95 active:scale-90 font-headline font-bold text-xs uppercase tracking-widest transition-all"
            >
              Kanda Club
            </button>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            className="md:hidden text-[#173018] p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-[#f9f9f9] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-bold tracking-tighter text-[#173018] font-headline uppercase">
                Kanda
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#173018] p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-10 text-center mt-10">
              <Link onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/")} to="/">Menu</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/locations")} to="/locations">Locations</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass("/our-story")} to="/our-story">Our Story</Link>
              
              <div className="pt-12">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-br from-[#173018] to-[#2D472C] text-white rounded-md px-8 py-4 font-headline font-bold text-sm uppercase tracking-widest transition-all w-full"
                >
                  Kanda Club
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanda Club Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[#f9f9f9] p-10 rounded-2xl max-w-md w-full shadow-2xl space-y-6 text-center" onClick={e => e.stopPropagation()}>
            <h2 className="font-headline font-bold text-3xl text-[#173018]">Kanda Club</h2>
            <p className="font-body text-[#434841] italic text-lg">Nuestro programa de fidelidad.</p>
            <p className="font-body text-[#434841] text-sm">
              Visítanos y comparte tu experiencia subiendo una historia desde nuestro local. Luego, solicita tu tarjeta en barra y empieza a sumar.
            </p>
            <p className="font-headline font-bold text-xl text-[#705d00]">Tómate 9 y el 10 va por Kanda.</p>
            
            <div className="pt-6 border-t border-[#173018]/10">
              <p className="text-xs uppercase tracking-widest font-bold text-[#173018] mb-4">Suscríbete para novedades</p>
              <input type="email" placeholder="Tu email" className="w-full p-3 rounded-md border border-[#173018]/20 mb-4" />
              <button className="w-full bg-[#173018] text-white py-3 rounded-md font-bold uppercase text-xs tracking-widest">Enviar</button>
            </div>
            
            <button onClick={() => setIsModalOpen(false)} className="text-xs text-[#434841]/60 underline">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
