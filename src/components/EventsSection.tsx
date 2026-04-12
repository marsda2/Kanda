'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, MapPin, Clock, ArrowRight, Dog, PenTool, X, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedEvent) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('event_reservations')
        .insert([{ email, event_title: selectedEvent }]);

      if (error) throw error;
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setSelectedEvent(null);
        setEmail('');
      }, 3000);
    } catch (err) {
      console.error('Error reserving event:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

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
                
                <button 
                  onClick={() => setSelectedEvent(event.title)}
                  className="w-full text-center bg-[#173018] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#705d00] transition-colors flex items-center justify-center gap-2"
                >
                  Reservar Cupo <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[#434841]/60 text-xs mt-4">Cupos limitados</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 text-[#1a1c1c]/50 hover:text-[#173018] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-8">
                <span className="text-[#705d00] font-bold tracking-widest uppercase text-xs mb-2 block">Reserva de Cupo</span>
                <h3 className="font-headline font-bold text-2xl text-[#173018] leading-tight pr-8">
                  {selectedEvent}
                </h3>
              </div>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-xl text-[#173018] mb-2">¡Solicitud Recibida!</h4>
                    <p className="text-[#434841] text-sm">Te contactaremos pronto a tu correo con los detalles para finalizar tu inscripción.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-sm font-body text-[#434841]">
                    Déjanos tu correo electrónico y nuestro equipo se pondrá en contacto contigo a la brevedad.
                  </p>
                  <div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full bg-[#eeeeee] border border-transparent focus:border-[#705d00] rounded-xl px-4 py-3 font-body text-sm outline-none transition-colors"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-xs text-red-500 font-medium text-center">
                      Ocurrió un error. Verifica tu conexión e inténtalo de nuevo.
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#173018] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#705d00] transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : "Solicitar Cupo"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
