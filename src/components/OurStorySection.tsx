import React from 'react';
import { motion } from 'motion/react';

export default function OurStorySection() {
  return (
    <section className="py-24" id="our-story">
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
    </section>
  );
}
