import React from 'react';
import type { Metadata } from 'next';
import PetFriendlySection from '../../components/PetFriendlySection';
import EventsSection from '../../components/EventsSection';

export const metadata: Metadata = {
  title: 'Comunidad Kanda | Eventos y Pet Friendly',
  description: 'Descubre los próximos talleres, eventos y nuestra filosofía Pet Friendly en Kanda. Tu mascota también es bienvenida.',
};

export default function ComunidadPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#eeeeee]">
      <PetFriendlySection />
      <EventsSection />
    </main>
  );
}
