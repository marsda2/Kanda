'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Leaf, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Category { id: string; title: string; description: string | null; sort_order: number; }
interface Subcategory { id: string; category_id: string; title: string; description: string | null; sort_order: number; }
interface MenuItem { id: string; category_id: string; subcategory_id: string | null; name: string; price: string; description: string | null; is_featured: boolean; is_vegan: boolean; sort_order: number; }

const featuredItems = [
  {
    title: "Toast Benedicto",
    description: "Pan rústico tostado, huevo poché, salsa holandesa y un toque de hierbas frescas.",
    price: "$1600",
    image: "https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596727/toastBenedicto_ggbrwn.png"
  },
  {
    title: "Matcha Latte",
    description: "El equilibrio perfecto entre el dulzor y el sabor umami del matcha premium.",
    price: "$1200",
    image: "https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596726/matchaLatte_vkc16n.png"
  },
  {
    title: "Croissant Pistachio",
    description: "Crujiente croissant relleno de crema de pistacho artesanal.",
    price: "$1900",
    image: "https://res.cloudinary.com/dtajpvp8x/image/upload/q_auto/f_auto/v1775596725/croissant_xxfjle.png"
  }
];

const ExpandableItemList = ({ items, isSubcategory = false }: { items: MenuItem[], isSubcategory?: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 3;
  const hasMore = items.length > limit;
  const displayedItems = expanded ? items : items.slice(0, limit);

  return (
    <div className="flex flex-col">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-16 ${isSubcategory ? 'gap-y-6 mt-6' : 'gap-y-8'}`}>
        {displayedItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start group border-b border-[#173018]/10 pb-4 hover:border-[#173018] transition-colors">
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <h4 className={`font-body font-semibold text-[#173018] uppercase tracking-wide ${isSubcategory ? 'text-base' : 'text-lg'}`}>{item.name}</h4>
                {item.is_featured && <Star className="w-4 h-4 text-[#705d00] fill-[#705d00]" />}
                {item.is_vegan && <Leaf className="w-4 h-4 text-[#c3c8be]" />}
              </div>
              {item.description && <p className="font-body font-light text-[#434841] text-sm mt-1">{item.description}</p>}
            </div>
            <span className={`font-headline text-[#173018] whitespace-nowrap ${isSubcategory ? 'text-base' : 'text-lg'}`}>{item.price}</span>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs uppercase tracking-widest font-bold text-[#173018] border-b border-[#173018] pb-1 hover:text-[#705d00] hover:border-[#705d00] transition-colors"
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      )}
    </div>
  );
};

export default function MenuSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const [cRes, sRes, iRes, rRes] = await Promise.all([
        supabase.from('menu_categories').select('*').order('sort_order'),
        supabase.from('menu_subcategories').select('*').order('sort_order'),
        supabase.from('menu_items').select('*').order('sort_order'),
        supabase.from('recommendations').select('*').order('sort_order'),
      ]);
      setCategories(cRes.data || []);
      setSubcategories(sRes.data || []);
      setItems(iRes.data || []);
      setRecommendations(rRes.data || []);
      setLoading(false);
    };
    fetchMenu();
  }, []);

  return (
    <section className="mb-32" id="menu">
      <div className="max-w-7xl mx-auto px-8">
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-[#705d00] font-bold tracking-widest uppercase text-xs mb-4 block">La pausa perfecta</span>
            <h1 className="font-headline font-extrabold text-7xl md:text-9xl text-[#173018] leading-none -tracking-widest">
              MENÚ<br/><span className="text-[#c3c8be]/30">KANDA</span>
            </h1>
          </div>
          <div className="max-w-xs text-right">
            <p className="font-body text-[#434841] font-light text-lg leading-relaxed italic">
              "Un rinconcito de calma en medio del ruido. Tu cafecito perfecto para recargar energías y seguir tu día con flow."
            </p>
          </div>
        </motion.header>

        {/* Featured Items Carousel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-headline font-bold text-3xl text-[#173018] uppercase tracking-tight">Recomendaciones</h2>
            <div className="h-[1px] bg-gradient-to-r from-[#173018]/20 flex-grow"></div>
          </div>
          <div className="flex overflow-hidden pb-8 -mx-8 px-8 w-[calc(100%+4rem)] group">
            <div className="flex items-center gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...(recommendations.length > 0 ? recommendations : featuredItems), ...(recommendations.length > 0 ? recommendations : featuredItems)].map((item, idx) => (
                <div key={idx} className="w-[340px] md:w-[500px] flex flex-row bg-[#eeeeee] rounded-2xl overflow-hidden shadow-sm h-[180px] md:h-[220px] shrink-0">
                  <div className="w-2/5 md:w-5/12 h-full overflow-hidden shrink-0">
                    <img src={item.image_url || item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-3/5 md:w-7/12 p-5 md:p-6 flex flex-col justify-center space-y-2 md:space-y-3">
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-1 xl:gap-4">
                      <h4 className="font-headline font-bold text-lg md:text-xl text-[#173018] leading-tight">{item.title}</h4>
                      <span className="font-headline font-bold text-[#705d00] whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="font-body text-xs md:text-sm text-[#434841] line-clamp-3 md:line-clamp-4">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#173018]" />
          </div>
        )}
        
        {/* Menu from Database */}
        {!loading && (
          <div className="space-y-24">
            {categories.map((category, idx) => {
              const catSubs = subcategories.filter(s => s.category_id === category.id);
              const directItems = items.filter(i => i.category_id === category.id && !i.subcategory_id);

              return (
                <motion.div 
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-headline font-bold text-4xl text-[#173018] uppercase tracking-tight">{category.title}</h2>
                    <div className="h-[1px] bg-gradient-to-r from-[#173018]/20 flex-grow"></div>
                  </div>
                  {category.description && (
                    <p className="font-body text-[#434841] mb-8 text-lg">{category.description}</p>
                  )}
                  
                  {directItems.length > 0 && (
                    <ExpandableItemList items={directItems} />
                  )}

                  {catSubs.length > 0 && (
                    <div className="space-y-12">
                      {catSubs.map((sub) => {
                        const subItems = items.filter(i => i.subcategory_id === sub.id);
                        return (
                          <div key={sub.id}>
                            <h3 className="font-headline font-bold text-2xl text-[#173018] uppercase tracking-tight mb-2">{sub.title}</h3>
                            {sub.description && <p className="font-body text-[#434841] text-sm mb-6 italic">{sub.description}</p>}
                            <ExpandableItemList items={subItems} isSubcategory={true} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
