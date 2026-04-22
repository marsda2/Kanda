-- ============================================
-- Kanda Admin Panel — Events Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  collaborator TEXT,
  image TEXT,
  icon TEXT, -- e.g., "Dog" or "PenTool"
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  included JSONB, -- Array of strings
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 3. Public read access
CREATE POLICY "Public can read events" ON events FOR SELECT USING (true);

-- 4. Authenticated users can manage events
CREATE POLICY "Auth users can insert events" ON events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update events" ON events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete events" ON events FOR DELETE TO authenticated USING (true);

-- 5. Seed Data for Events
INSERT INTO events (title, collaborator, image, icon, description, date, time, included) VALUES
  (
    'Taller para Amantes de Mascotas',
    'Gaby Mascotas',
    'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1456&auto=format&fit=crop',
    'Dog',
    'Aprende a preparar snacks naturales para tu mascota de forma sencilla, saludable y deliciosa.',
    'Domingo 29 de Marzo',
    '3:00 PM - 5:00 PM',
    '["Ingredientes y materiales", "Experiencia PetFriendly", "Sorpresa artesanal para tu mascota", "1 Bebida a elegir (Espresso, Cortado, Capuccino o Iced Latte)", "1 Galleta artesanal de la casa"]'::jsonb
  ),
  (
    'Taller de Cerámica',
    '@arca_ceramics',
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1470&auto=format&fit=crop',
    'PenTool',
    'Taller de cerámica moldeado. Cada participante creará su propia pieza aprendiendo técnicas básicas.',
    'Domingo 12 de Abril',
    '3:00 PM - 5:00 PM',
    '["Todos los materiales necesarios", "1 Bebida a elegir (Espresso, Cortado, Capuccino o Iced Latte)", "Galleta artesanal"]'::jsonb
  );
