'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Heart, Dog } from 'lucide-react';

export default function PetFriendlySection() {
  return (
    <section className="py-24 bg-[#eeeeee] relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[140%] bg-[#f9f9f9] rounded-l-[100px] transform -rotate-6 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <span className="flex items-center gap-2 text-[#705d00] font-bold tracking-widest uppercase text-xs mb-4">
              <Dog className="w-4 h-4" /> Kanda Pet Friendly
            </span>
            <h2 className="font-headline font-extrabold text-5xl md:text-7xl text-[#173018] uppercase tracking-tighter leading-none">
              Ellos<br/>también son<br/>familia
            </h2>
          </div>
          
          <div className="w-16 h-1 bg-[#705d00]"></div>
          
          <div className="space-y-6 font-body text-lg text-[#434841] leading-relaxed">
            <p className="font-semibold text-[#173018]">
              En Kanda, tu mascota no solo es bienvenida… es parte de la familia.
            </p>
            <p>
              Creamos un espacio adaptado para que disfruten juntos de la pausa perfecta, y muy pronto estaremos estrenando un menú exclusivo diseñado para ellos.
            </p>
            <div className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-[#173018]/10 shadow-sm">
              <Heart className="w-6 h-6 text-green-600 shrink-0 mt-1" />
              <p className="text-sm font-medium">
                Además, una parte de lo recaudado en Kanda será donada a proyectos que transforman la vida de animalitos callejeros.
              </p>
            </div>
            <p className="font-headline text-xl text-[#705d00] italic pt-4">
              "¿Tienes mascota con la que te gustaría venir? Cuéntanos por Instagram cómo se llama."
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[500px] w-full"
        >
          {/* Subtle decoration */}
          <div className="absolute inset-0 bg-[#705d00]/5 rounded-[40%_60%_70%_30%_/_40%_70%_30%_60%] animate-[spin_25s_linear_infinite] scale-105"></div>
          
          <div className="absolute inset-4 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
            {/* Placeholder until the actual dog image is uploaded */}
            <img 
              src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1456&auto=format&fit=crop" 
              alt="Mascota en Kanda" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Floating badge */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.6, stiffness: 200 }}
            className="absolute -bottom-6 -left-6 bg-[#173018] text-white p-6 rounded-[2rem] rounded-tl-none shadow-xl border border-white/20"
          >
            <p className="font-headline font-bold uppercase text-2xl tracking-tighter leading-tight">
              Muy pronto<br/><span className="text-[#705d00]">Su propio menú</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
