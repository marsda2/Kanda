'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

export default function OurStorySection() {
  return (
    <section className="py-24 overflow-hidden" id="our-story">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center items-center h-[400px] w-full"
        >
          {/* Animated organic background shapes */}
          <div className="absolute inset-0 bg-[#173018]/5 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] animate-[spin_20s_linear_infinite] scale-105"></div>
          <div className="absolute inset-0 bg-[#705d00]/5 rounded-[40%_60%_70%_30%_/_40%_70%_30%_60%] animate-[spin_25s_linear_infinite_reverse] scale-95"></div>
          
          {/* Central organic image shape */}
          <div className="relative bg-[#eeeeee] rounded-[50%_50%_40%_60%_/_60%_40%_50%_50%] h-80 w-80 md:h-96 md:w-96 flex items-center justify-center overflow-hidden shadow-sm border border-[#173018]/5">
             <img src="/OurStory.png" alt="Kanda Our Story" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="font-headline font-extrabold text-5xl md:text-7xl text-[#173018] uppercase tracking-tighter leading-none">
            Nuestra<br/>Historia
          </h2>
          
          <div className="w-16 h-1 bg-[#705d00]"></div>
          
          <div className="space-y-6 font-body text-lg text-[#434841] leading-relaxed">
            <p>
              Kanda nació de la búsqueda de un refugio en medio del bullicio urbano. Un espacio donde el tiempo se detiene, diseñado para elevar tus sentidos a través de la pureza botánica y el grano perfecto.
            </p>
            <p>
              Creemos en la calma, en la calidad sin concesiones y en el arte de la pausa. Cada taza que servimos y cada plato que preparamos es una invitación a reconectar contigo mismo y con tu entorno.
            </p>
            <p className="font-headline text-xl text-[#705d00] italic pt-4">
              "Tu cafecito perfecto para recargar energías y seguir tu día con flow."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Instagram Grid Section */}
      <div className="max-w-7xl mx-auto px-8 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12"
        >
          <div>
            <span className="text-[#705d00] font-bold tracking-widest uppercase text-xs mb-3 block">Únete a la comunidad</span>
            <h3 className="font-headline font-bold text-4xl text-[#173018] uppercase tracking-tight">The Vibe</h3>
          </div>
          <a href="https://www.instagram.com/kanda_vedado/" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-2 text-[#173018] border-b border-[#173018] pb-1 hover:text-[#705d00] hover:border-[#705d00] transition-colors group">
            <Instagram className="w-5 h-5 group-hover:-rotate-6 transition-transform" />
            <span className="font-headline font-bold text-sm uppercase tracking-widest">@kanda_vedado</span>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {/* Asymmetric Grid Layout */}
          <a href="https://www.instagram.com/kanda_vedado/" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <Instagram className="text-white w-10 h-10" />
            </div>
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1447&auto=format&fit=crop" alt="Coffee Vibe 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </a>
          <a href="https://www.instagram.com/kanda_vedado/" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden rounded-2xl md:col-span-1 md:row-span-1">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
            <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1470&auto=format&fit=crop" alt="Coffee Vibe 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </a>
          <a href="https://www.instagram.com/kanda_vedado/" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden rounded-2xl md:col-span-1 md:row-span-2">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
            <img src="https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596726/matchaLatte_vkc16n.png" alt="Matcha" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </a>
          <a href="https://www.instagram.com/kanda_vedado/" target="_blank" rel="noopener noreferrer" className="relative group overflow-hidden rounded-2xl md:col-span-1 md:row-span-1">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
            <img src="https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596727/toastBenedicto_ggbrwn.png" alt="Toast" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
