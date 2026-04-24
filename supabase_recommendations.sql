-- SQL Schema for Kanda Menu Recommendations
-- Run this in your Supabase SQL Editor

CREATE TABLE recommendations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  price text,
  image_url text,
  sort_order int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone." ON recommendations FOR SELECT USING (true);
CREATE POLICY "Users can insert recommendations." ON recommendations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update recommendations." ON recommendations FOR UPDATE USING (true);
CREATE POLICY "Users can delete recommendations." ON recommendations FOR DELETE USING (true);

-- Insert initial hardcoded recommendations
INSERT INTO recommendations (title, description, price, image_url, sort_order) VALUES
('Toast Benedicto', 'Pan rústico tostado, huevo poché, salsa holandesa y un toque de hierbas frescas.', '$1600', 'https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596727/toastBenedicto_ggbrwn.png', 1),
('Matcha Latte', 'El equilibrio perfecto entre el dulzor y el sabor umami del matcha premium.', '$1200', 'https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596726/matchaLatte_vkc16n.png', 2),
('Croissant Pistachio', 'Crujiente croissant relleno de crema de pistacho artesanal.', '$1900', 'https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596725/croissant_xxfjle.png', 3);

-- Create storage bucket for Kanda images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('kanda-images', 'kanda-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'kanda-images' );
CREATE POLICY "Anon Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'kanda-images' );
CREATE POLICY "Anon Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'kanda-images' );
CREATE POLICY "Anon Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'kanda-images' );
