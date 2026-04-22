'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { LogOut, Loader2, Coffee, CalendarDays } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MenuManager from '../../components/admin/MenuManager';
import EventsManager from '../../components/admin/EventsManager';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'events'>('menu');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setUserEmail(user.email || '');
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#173018]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#f9f9f9]/80 backdrop-blur-md border-b border-[#173018]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/KandaLogoHorizontal.png" alt="Kanda Logo" className="h-6" />
            <div className="hidden sm:flex items-center gap-2 bg-[#705d00]/10 text-[#705d00] px-3 py-1 rounded-full">
              <Coffee className="w-3 h-3" />
              <span className="font-headline font-bold text-[10px] uppercase tracking-widest">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-body text-[#434841]">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#434841] hover:text-red-600 transition-colors text-sm font-body"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-[#173018] uppercase tracking-tighter leading-none">
              Gestión Kanda
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-10 border-b border-[#173018]/10">
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 pb-3 font-headline font-bold text-sm uppercase tracking-widest transition-colors ${
                activeTab === 'menu'
                  ? 'text-[#173018] border-b-2 border-[#705d00]'
                  : 'text-[#434841]/60 hover:text-[#173018]'
              }`}
            >
              <Coffee className="w-4 h-4" /> Menú
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 pb-3 font-headline font-bold text-sm uppercase tracking-widest transition-colors ${
                activeTab === 'events'
                  ? 'text-[#173018] border-b-2 border-[#705d00]'
                  : 'text-[#434841]/60 hover:text-[#173018]'
              }`}
            >
              <CalendarDays className="w-4 h-4" /> Eventos
            </button>
          </div>

          {activeTab === 'menu' ? <MenuManager /> : <EventsManager />}
        </motion.div>
      </main>
    </div>
  );
}
