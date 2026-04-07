import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const isOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 21;
  };

  return (
    <footer className="bg-[#eeeeee] w-full rounded-t-[2rem] mt-20 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 px-12 pt-16 pb-12 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="text-xl font-bold text-[#173018] font-headline uppercase tracking-tighter">
            Kanda
          </div>
          <p className="max-w-xs text-sm font-body text-[#1a1c1c]/70 leading-relaxed">
            Calle J #460 entre 21 y 23, Vedado.
          </p>
          <p className="text-sm font-body text-[#1a1c1c]/70">
            Hoy estamos {isOpen() ? <span className="text-green-600 font-bold">abiertos</span> : <span className="text-red-600 font-bold">cerrados</span>} (9 a.m. – 9 p.m.)
          </p>
          <div className="flex gap-4">
            <a className="text-[#1a1c1c]/70 hover:opacity-80 transition-opacity" href="#">Instagram</a>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-20 gap-y-12">
          <div className="space-y-4">
            <h5 className="font-headline font-bold text-xs uppercase tracking-widest text-[#173018]">Menu</h5>
            <ul className="space-y-2 text-sm font-body text-[#1a1c1c]/70">
              <li><Link to="/" className="hover:text-[#705d00] transition-colors">Matcha & Teas</Link></li>
              <li><Link to="/" className="hover:text-[#705d00] transition-colors">Coffee</Link></li>
              <li><Link to="/" className="hover:text-[#705d00] transition-colors">Treats</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-headline font-bold text-xs uppercase tracking-widest text-[#173018]">Connect</h5>
            <ul className="space-y-2 text-sm font-body text-[#1a1c1c]/70">
              <li><Link to="/privacy" className="hover:text-[#705d00] transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-[#705d00] transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <h5 className="font-headline font-bold text-xs uppercase tracking-widest mb-6 text-[#173018]">Suscríbete</h5>
          <div className="relative">
            <input className="bg-transparent border-b border-[#1a1c1c]/20 py-2 w-full md:w-64 focus:outline-none focus:border-[#705d00] transition-colors font-body text-sm" placeholder="email@kanda.com" type="email"/>
            <button className="absolute right-0 bottom-2">
              <ArrowRight className="text-[#705d00] w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1a1c1c]/10 py-6 text-center">
        <p className="text-sm font-body text-[#1a1c1c]/70">
          Hecho con amor por <a href="https://texhco.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#173018] hover:text-[#705d00] transition-colors">Texh Co.</a>
        </p>
      </div>
    </footer>
  );
}
