'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Lock } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message === 'Invalid login credentials'
          ? 'Credenciales incorrectas. Verifica tu email y contraseña.'
          : error.message);
        setStatus('error');
        return;
      }

      router.push('/admin');
    } catch {
      setErrorMsg('Error de conexión. Intenta de nuevo.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#173018]/5 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#705d00]/5 rounded-[40%_60%_70%_30%_/_40%_70%_30%_60%] animate-[spin_25s_linear_infinite_reverse]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <img src="/KandaLogoHorizontal.png" alt="Kanda Logo" className="h-8 mx-auto mb-6" />
          <div className="inline-flex items-center gap-2 bg-[#173018] text-white px-4 py-1.5 rounded-full">
            <Lock className="w-3 h-3" />
            <span className="font-headline font-bold text-[10px] uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#173018]/10">
          <h1 className="font-headline font-bold text-2xl text-[#173018] mb-2">Iniciar Sesión</h1>
          <p className="font-body text-sm text-[#434841] mb-8">Acceso exclusivo para administradores de Kanda.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kanda.com"
                required
                disabled={status === 'loading'}
                className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-[#173018] mb-2 block">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={status === 'loading'}
                className="w-full bg-[#f9f9f9] border border-[#173018]/10 rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-[#705d00] transition-colors disabled:opacity-50"
              />
            </div>

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs font-medium text-center bg-red-50 p-3 rounded-xl"
              >
                {errorMsg}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-br from-[#173018] to-[#2D472C] text-white py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Acceder'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#434841]/50 text-xs mt-6">
          Panel de gestión interna de Kanda
        </p>
      </motion.div>
    </div>
  );
}
