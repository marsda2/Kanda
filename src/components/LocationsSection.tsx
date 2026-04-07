import React from 'react';

export default function LocationsSection() {
  return (
    <section className="py-24" id="locations">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-headline font-bold text-5xl text-[#173018] uppercase tracking-tighter mb-16">Location</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-[#eeeeee] p-10 rounded-2xl space-y-6">
            <h4 className="font-headline font-bold text-3xl text-[#173018]">Kanda Vedado</h4>
            <div className="space-y-2 font-body text-[#434841] text-lg">
              <p>Calle J #460 entre 21 y 23</p>
              <p>Vedado, La Habana, Cuba</p>
            </div>
            
            <div className="pt-6 border-t border-[#173018]/10 space-y-2 font-body text-[#434841]">
              <p className="font-bold text-[#173018] uppercase tracking-widest text-xs mb-4">Horario</p>
              <div className="flex justify-between"><span className="capitalize">Lunes</span><span>9 a.m. – 9 p.m.</span></div>
              <div className="flex justify-between"><span className="capitalize">Martes</span><span>9 a.m. – 9 p.m.</span></div>
              <div className="flex justify-between"><span className="capitalize">Miércoles</span><span>9 a.m. – 9 p.m.</span></div>
              <div className="flex justify-between"><span className="capitalize">Jueves</span><span>9 a.m. – 9 p.m.</span></div>
              <div className="flex justify-between"><span className="capitalize">Viernes</span><span>9 a.m. – 9 p.m.</span></div>
              <div className="flex justify-between"><span className="capitalize">Sábado</span><span>9 a.m. – 9 p.m.</span></div>
              <div className="flex justify-between"><span className="capitalize">Domingo</span><span>9 a.m. – 9 p.m.</span></div>
            </div>
          </div>

          <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <iframe 
              title="Kanda Location"
              src="https://maps.google.com/maps?q=Calle+J+%23460+entre+21+y+23,+Vedado,+La+Habana&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
