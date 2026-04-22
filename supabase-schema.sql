-- ============================================
-- Kanda Admin Panel — Database Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. Menu Categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Menu Subcategories (optional groupings within a category)
CREATE TABLE IF NOT EXISTS menu_subcategories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  subcategory_id UUID REFERENCES menu_subcategories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row Level Security
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- 5. Public read access (anyone can view the menu)
CREATE POLICY "Public can read categories" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public can read subcategories" ON menu_subcategories FOR SELECT USING (true);
CREATE POLICY "Public can read items" ON menu_items FOR SELECT USING (true);

-- 6. Authenticated users can manage everything (admin)
CREATE POLICY "Auth users can insert categories" ON menu_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update categories" ON menu_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete categories" ON menu_categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert subcategories" ON menu_subcategories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update subcategories" ON menu_subcategories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete subcategories" ON menu_subcategories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth users can insert items" ON menu_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update items" ON menu_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete items" ON menu_items FOR DELETE TO authenticated USING (true);

-- ============================================
-- 7. SEED DATA — Migrates current hardcoded menu
-- ============================================

-- Desayunos y Toasts
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Desayunos y Toasts', 'Disponibles de 9 AM - 9 PM', 1);

INSERT INTO menu_subcategories (id, category_id, title, description, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Toasts', 'Pan rústico tostado con toque verde y aceite de oliva', 1),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Huevos al Gusto', NULL, 2),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'Tostadas Clásicas', NULL, 3);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, is_featured, is_vegan, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Aguacate y Huevos', '$1500', '2 huevos, aguacate, rúcula, tomate, lechuga, relish, mayonesa saborizada', false, false, 1),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Benedicto', '$1900', 'Huevos, salsa holandesa, queso gouda, lechuga, tomate, rúcula', true, false, 2),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Salame, Queso y Huevos', '$2250', 'Salame, huevo, queso gouda, rúcula, tomate', false, false, 3),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Avocado Toast', '$1000', 'Aguacate, rúcula, tomate, lechuga, relish, mayonesa saborizada', false, true, 4),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Aguacate y Serrano', '$2000', 'Aguacate, jamón serrano, rúcula, tomate, lechuga, crema balsamica', false, false, 5),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Caprese', '$1500', 'Tomate, mozzarella, albahaca, aceite de oliva', false, false, 6),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'Dos huevos preparados al gusto', '$1000', 'Fritos, hervidos, revueltos u omelette. Acompañados de panecillo del chef', false, false, 1),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'Tostadas con Mantequilla y Mermelada', '$750', NULL, false, false, 1),
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'Tostadas con Mantequilla', '$550', NULL, false, false, 2);

-- Agregos
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000002', 'Agregos', 'Porciones adicionales', 2);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Huevo Extra 1u', '$250', NULL, 1),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Bacon 40gr', '$650', NULL, 2),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Vegetales 60gr', '$250', NULL, 3),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Mantequilla/Jalea 50gr', '$450', NULL, 4),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Queso Gouda 50gr', '$550', NULL, 5),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Queso Crema 20gr', '$550', NULL, 6),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Toast Pan Masa Madre 1u', '$500', NULL, 7),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Jamón York 50gr', '$500', NULL, 8),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Jamón Serrano 50gr', '$1000', NULL, 9),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Jamón de Pavo 50gr', '$800', NULL, 10),
  ('a1000000-0000-0000-0000-000000000002', NULL, 'Coppa Nostrana 50gr', '$1200', NULL, 11);

-- Panadería y Dulcería
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'Panadería y Dulcería', NULL, 3);

INSERT INTO menu_subcategories (id, category_id, title, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'Clásicos', 1),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003', 'Croissants Dulces', 2),
  ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'Croissants Salados', 3);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'Cesta de Pan', '$1200', 'Cesta de surtido Viena con mantequilla', 1),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'Focaccia de Masa Madre', '$2000', 'Porción de focaccia con mortadella siciliana y de olivas, pesto y queso feta', 2),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'Dulces de Hojaldre y Fríos', 'Consultar', 'Consultar en vitrina', 3),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000005', 'Cacao', '$850', NULL, 1),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000005', 'Nutella', '$1800', NULL, 2),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000005', 'Pistacho', '$1800', NULL, 3),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000006', 'Ibérico', '$2500', NULL, 1),
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000006', 'Jamón y queso gouda o queso crema', '$2500', NULL, 2);

-- Bocatas
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000004', 'Bocatas', 'Media Baguette', 4);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000004', NULL, 'Jamón y Queso Gouda o Queso Crema', '$2000', NULL, 1),
  ('a1000000-0000-0000-0000-000000000004', NULL, 'Vegetariano', '$2000', NULL, 2),
  ('a1000000-0000-0000-0000-000000000004', NULL, 'Ibérico', '$2000', NULL, 3),
  ('a1000000-0000-0000-0000-000000000004', NULL, 'Tomate, Quesos y Pesto', '$2250', 'Viene en 2 Medias Baguette', 4);

-- Waffles KANDA & Bowls
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000005', 'Waffles KANDA & Bowls', NULL, 5);

INSERT INTO menu_subcategories (id, category_id, title, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000005', 'Waffles', 1),
  ('b1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000005', 'Bowls', 2);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, is_featured, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000007', 'Waffle Natural c/frutas y miel', '$1300', NULL, false, 1),
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000007', 'Waffle Natural Salado', '$1500', 'Con Jamón Ibérico o Jamón York y queso crema, rúcula y tomate', false, 2),
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000007', 'Waffle Carbonara', '$1650', 'Relleno de salsa carbonara con bacon. Topping de: Jamón ibérico o Jamón York y queso crema, rúcula y tomate', true, 3),
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000007', 'Waffle Ragú de Cerdo', '$1650', 'Relleno de ragú de cerdo, con topping de rúcula y tomate', false, 4),
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000008', 'Bowl de Yogurt', '$1500', 'Con fruta y granola', false, 1),
  ('a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000008', 'Bowl de Frutas Frescas', '$800', NULL, false, 2);

-- Café
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000006', 'Café', NULL, 6);

INSERT INTO menu_subcategories (id, category_id, title, description, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000006', 'Caliente', 'Leches Vegetales: $700 (Consulte con nuestro equipo las opciones disponibles)', 1),
  ('b1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000006', 'Frío', '8 oz / 12 oz', 2);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, is_featured, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Espresso', '$300', NULL, false, 1),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Americano', '$450', NULL, false, 2),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Cortadito Macchiato', '$400', NULL, false, 3),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Café Bombón', '$650', NULL, false, 4),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Café con Leche', '$500', NULL, false, 5),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Cappuccino', '$600', NULL, false, 6),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Cappuccino | Canela | Cocoa', '$650', NULL, false, 7),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Latte', '$700', NULL, false, 8),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Caramel Macchiato', '$750', NULL, false, 9),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Mocha | Chai Latte', '$750', NULL, false, 10),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Matcha Latte | Taro Latte', '$850', NULL, true, 11),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'Carajillo', '$1000', NULL, false, 12),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Shakerato', '$400 / $600', NULL, false, 1),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Latte', '$500 / $700', NULL, false, 2),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Caramel Macchiato', '$900 / $1100', NULL, false, 3),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Matcha Latte', '$1000 / $1200', NULL, false, 4),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Taro Latte', '$1000 / $1200', NULL, false, 5),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Chai Latte', '$900 / $1000', NULL, false, 6),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Mocha', '$800 / $1000', NULL, false, 7),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Dalgona', '$900 / $1000', NULL, false, 8),
  ('a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000010', 'Iced Coconut Cloud', '$1200', 'Agua de coco con nube de Matcha / Taro / Coffee. Tamaño único', false, 9);

-- Bebidas Frías
INSERT INTO menu_categories (id, title, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000007', 'Bebidas Frías', NULL, 7);

INSERT INTO menu_subcategories (id, category_id, title, description, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000007', 'KANDA Shakes', '8 oz / 12 oz', 1),
  ('b1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000007', 'Frappuccinos', '8 oz / 12 oz', 2),
  ('b1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000007', 'Detox y Batidos', NULL, 3),
  ('b1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000007', 'Sodas y Slush', NULL, 4),
  ('b1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000007', 'Bebidas y Alcohol', NULL, 5);

INSERT INTO menu_items (category_id, subcategory_id, name, price, description, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'Matcha | Taro', '$1100 / $1300', NULL, 1),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'Fresas con Crema', '$1100 / $1300', NULL, 2),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'Cookies & Cream', '$1100 / $1300', NULL, 3),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'Taro con Frutos del Bosque', '$1500', 'Tamaño único', 4),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'Matcha con Frutos del Bosque', '$1500', 'Tamaño único', 5),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'Shake de Frutos del Bosque', '$1500', 'Tamaño único', 6),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000012', 'Natural', '$1000 / $1200', NULL, 1),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000012', 'Moka', '$1000 / $1200', NULL, 2),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000012', 'Cookies & Cream', '$1000 / $1200', NULL, 3),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000013', 'Detox Tropical', '$700', NULL, 1),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000013', 'Detox Verde', '$1000', NULL, 2),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000013', 'Batido de Frutas', '$1000', 'Consulte disponibilidad', 3),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000014', 'Sodas', '$1200', 'Tropical, Pepino, Manzana, Higos', 1),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000014', 'Slush', '$950', 'Sandía con Chile, Chicle, Cherry', 2),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Agua Natural', '$450', NULL, 1),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Agua Gaseada', '$850', NULL, 2),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Agua Tónica', '$850', NULL, 3),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Redbull', '$750', NULL, 4),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Refrescos Ginger Ale', '$650', 'Pepsi, 7Up, Mirinda', 5),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Refrescos', '$750', 'CocaCola, Sprite, Fanta', 6),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Cervezas Importadas', '$1000', NULL, 7),
  ('a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000015', 'Vinos por Copa', '$800', 'Consultar disponibilidad', 8);
