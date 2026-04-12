'use client';
import React from 'react';
import { motion } from 'motion/react';
import { CalendarDays, MapPin, Clock, ArrowRight, Dog, PenTool } from 'lucide-react';

const events = [
  {
    title: "Taller para Amantes de Mascotas",
    collaborator: "Gaby Mascotas",
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1456&auto=format&fit=crop", // placeholder
    icon: <Dog className="w-5 h-5" />,
    description: "Aprende a preparar snacks naturales para tu mascota de forma sencilla, saludable y deliciosa.",
    date: "Domingo 29 de Marzo",
    time: "3:00 PM - 5:00 PM",
    included: [
      "Ingredientes y materiales",
      "Experiencia PetFriendly",
      "Sorpresa artesanal para tu mascota",
      "1 Bebida a elegir (Espresso, Cortado, Capuccino o Iced Latte)",
      "1 Galleta artesanal de la casa"
    ]
  },
  {
    title: "Taller de Cerámica",
    collaborator: "@arca_ceramics",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1470&auto=format&fit=crop", // placeholder
    icon: <PenTool className="w-5 h-5" />,
    description: "Taller de cerámica moldeado. Cada participante creará su propia pieza aprendiendo técnicas básicas.",
    date: "Domingo 12 de Abril",
    time: "3:00 PM - 5:00 PM",
    included: [
      "Todos los materiales necesarios",
      "1 Bebida a elegir (Espresso, Cortado, Capuccino o Iced Latte)",
      "Galleta artesanal"
    ]
  }
];

export default function EventsSection() {
  return (
    <section className="py-32 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[#705d00] font-bold tracking-widest uppercase text-xs mb-4 block">Agenda Kanda</span>
          <h2 className="font-headline font-extrabold text-5xl md:text-7xl text-[#173018] uppercase tracking-tighter leading-none mb-6">
            Próximos<br/>Eventos
          </h2>
          <div className="w-16 h-1 bg-[#705d00]"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#173018]/10 hover:shadow-xl transition-all duration-500"
            >
              {/* Event Image Banner */}
              <div className="h-64 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#173018]/20 z-10 group-hover:bg-[#173018]/10 transition-colors duration-500"></div>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm text-[#173018] px-4 py-2 rounded-full font-headline font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  {event.icon} <span>Con {event.collaborator}</span>
                </div>
              </div>
              
              {/* Event Details */}
              <div className="p-8 md:p-10">
                <h3 className="font-headline font-bold text-3xl text-[#173018] mb-4 group-hover:text-[#705d00] transition-colors">
                  {event.title}
                </h3>
                <p className="font-body text-[#434841] mb-8 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-4 mb-8 text-sm font-body text-[#1a1c1c]/80">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-[#705d00]" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#705d00]" />
                    <span className="font-semibold">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#705d00]" />
                    <span className="font-semibold">Kanda Vedado</span>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="font-headline font-bold text-[#173018] uppercase tracking-widest text-xs mb-4">¿Qué incluye?</h4>
                  <ul className="space-y-2">
                    {event.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-body text-[#434841]">
                        <span className="text-[#705d00] text-lg leading-none mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="https://www.instagram.com/kanda_vedado/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#173018] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#705d00] transition-colors flex items-center justify-center gap-2"
                >
                  Reservar Cupo al DM <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-[#434841]/60 text-xs mt-4 mt-3">Cupos limitados</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
