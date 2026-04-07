'use client';
import React, { useState } from 'react';

const menuData = [
  {
    title: "Desayunos y Toasts",
    description: "Disponibles de 9 AM - 9 PM",
    subcategories: [
      {
        title: "Toasts",
        description: "Pan rústico tostado con toque verde y aceite de oliva",
        items: [
          { name: "Aguacate y Huevos", price: "$1500", description: "2 huevos, aguacate, rúcula, tomate, lechuga, relish, mayonesa saborizada" },
          { name: "Benedicto", price: "$1900", description: "Huevos, salsa holandesa, queso gouda, lechuga, tomate, rúcula" },
          { name: "Salame, Queso y Huevos", price: "$2250", description: "Salame, huevo, queso gouda, rúcula, tomate" },
          { name: "Avocado Toast", price: "$1000", description: "Aguacate, rúcula, tomate, lechuga, relish, mayonesa saborizada" },
          { name: "Aguacate y Serrano", price: "$2000", description: "Aguacate, jamón serrano, rúcula, tomate, lechuga, crema balsamica" },
          { name: "Caprese", price: "$1500", description: "Tomate, mozzarella, albahaca, aceite de oliva" },
        ]
      },
      {
        title: "Huevos al Gusto",
        items: [
          { name: "Dos huevos preparados al gusto", price: "$1000", description: "Fritos, hervidos, revueltos u omelette. Acompañados de panecillo del chef" }
        ]
      },
      {
        title: "Tostadas Clásicas",
        items: [
          { name: "Tostadas con Mantequilla y Mermelada", price: "$750" },
          { name: "Tostadas con Mantequilla", price: "$550" }
        ]
      }
    ]
  },
  {
    title: "Agregos",
    description: "Porciones adicionales",
    items: [
      { name: "Huevo Extra 1u", price: "$250" },
      { name: "Bacon 40gr", price: "$650" },
      { name: "Vegetales 60gr", price: "$250" },
      { name: "Mantequilla/Jalea 50gr", price: "$450" },
      { name: "Queso Gouda 50gr", price: "$550" },
      { name: "Queso Crema 20gr", price: "$550" },
      { name: "Toast Pan Masa Madre 1u", price: "$500" },
      { name: "Jamón York 50gr", price: "$500" },
      { name: "Jamón Serrano 50gr", price: "$1000" },
      { name: "Jamón de Pavo 50gr", price: "$800" },
      { name: "Coppa Nostrana 50gr", price: "$1200" }
    ]
  },
  {
    title: "Panadería y Dulcería",
    subcategories: [
      {
        title: "Clásicos",
        items: [
          { name: "Cesta de Pan", price: "$1200", description: "Cesta de surtido Viena con mantequilla" },
          { name: "Focaccia de Masa Madre", price: "$2000", description: "Porción de focaccia con mortadella siciliana y de olivas, pesto y queso feta" },
          { name: "Dulces de Hojaldre y Fríos", price: "Consultar", description: "Consultar en vitrina" }
        ]
      },
      {
        title: "Croissants Dulces",
        items: [
          { name: "Cacao", price: "$850" },
          { name: "Nutella", price: "$1800" },
          { name: "Pistacho", price: "$1800" }
        ]
      },
      {
        title: "Croissants Salados",
        items: [
          { name: "Ibérico", price: "$2500" },
          { name: "Jamón y queso gouda o queso crema", price: "$2500" }
        ]
      }
    ]
  },
  {
    title: "Bocatas",
    description: "Media Baguette",
    items: [
      { name: "Jamón y Queso Gouda o Queso Crema", price: "$2000" },
      { name: "Vegetariano", price: "$2000" },
      { name: "Ibérico", price: "$2000" },
      { name: "Tomate, Quesos y Pesto", price: "$2250", description: "Viene en 2 Medias Baguette" }
    ]
  },
  {
    title: "Waffles KANDA & Bowls",
    subcategories: [
      {
        title: "Waffles",
        items: [
          { name: "Waffle Natural c/frutas y miel", price: "$1300" },
          { name: "Waffle Natural Salado", price: "$1500", description: "Con Jamón Ibérico o Jamón York y queso crema, rúcula y tomate" },
          { name: "Waffle Carbonara", price: "$1650", description: "Relleno de salsa carbonara con bacon. Topping de: Jamón ibérico o Jamón York y queso crema, rúcula y tomate" },
          { name: "Waffle Ragú de Cerdo", price: "$1650", description: "Relleno de ragú de cerdo, con topping de rúcula y tomate" }
        ]
      },
      {
        title: "Bowls",
        items: [
          { name: "Bowl de Yogurt", price: "$1500", description: "Con fruta y granola" },
          { name: "Bowl de Frutas Frescas", price: "$800" }
        ]
      }
    ]
  },
  {
    title: "Café",
    subcategories: [
      {
        title: "Caliente",
        description: "Leches Vegetales: $700 (Consulte con nuestro equipo las opciones disponibles)",
        items: [
          { name: "Espresso", price: "$300" },
          { name: "Americano", price: "$450" },
          { name: "Cortadito Macchiato", price: "$400" },
          { name: "Café Bombón", price: "$650" },
          { name: "Café con Leche", price: "$500" },
          { name: "Cappuccino", price: "$600" },
          { name: "Cappuccino | Canela | Cocoa", price: "$650" },
          { name: "Latte", price: "$700" },
          { name: "Caramel Macchiato", price: "$750" },
          { name: "Mocha | Chai Latte", price: "$750" },
          { name: "Matcha Latte | Taro Latte", price: "$850" },
          { name: "Carajillo", price: "$1000" }
        ]
      },
      {
        title: "Frío",
        description: "8 oz / 12 oz",
        items: [
          { name: "Shakerato", price: "$400 / $600" },
          { name: "Iced Latte", price: "$500 / $700" },
          { name: "Iced Caramel Macchiato", price: "$900 / $1100" },
          { name: "Iced Matcha Latte", price: "$1000 / $1200" },
          { name: "Iced Taro Latte", price: "$1000 / $1200" },
          { name: "Iced Chai Latte", price: "$900 / $1000" },
          { name: "Iced Mocha", price: "$800 / $1000" },
          { name: "Dalgona", price: "$900 / $1000" },
          { name: "Iced Coconut Cloud", price: "$1200", description: "Agua de coco con nube de Matcha / Taro / Coffee. Tamaño único" }
        ]
      }
    ]
  },
  {
    title: "Bebidas Frías",
    subcategories: [
      {
        title: "KANDA Shakes",
        description: "8 oz / 12 oz",
        items: [
          { name: "Matcha | Taro", price: "$1100 / $1300" },
          { name: "Fresas con Crema", price: "$1100 / $1300" },
          { name: "Cookies & Cream", price: "$1100 / $1300" },
          { name: "Taro con Frutos del Bosque", price: "$1500", description: "Tamaño único" },
          { name: "Matcha con Frutos del Bosque", price: "$1500", description: "Tamaño único" },
          { name: "Shake de Frutos del Bosque", price: "$1500", description: "Tamaño único" }
        ]
      },
      {
        title: "Frappuccinos",
        description: "8 oz / 12 oz",
        items: [
          { name: "Natural", price: "$1000 / $1200" },
          { name: "Moka", price: "$1000 / $1200" },
          { name: "Cookies & Cream", price: "$1000 / $1200" }
        ]
      },
      {
        title: "Detox y Batidos",
        items: [
          { name: "Detox Tropical", price: "$700" },
          { name: "Detox Verde", price: "$1000" },
          { name: "Batido de Frutas", price: "$1000", description: "Consulte disponibilidad" }
        ]
      },
      {
        title: "Sodas y Slush",
        items: [
          { name: "Sodas", price: "$1200", description: "Tropical, Pepino, Manzana, Higos" },
          { name: "Slush", price: "$950", description: "Sandía con Chile, Chicle, Cherry" }
        ]
      },
      {
        title: "Bebidas y Alcohol",
        items: [
          { name: "Agua Natural", price: "$450" },
          { name: "Agua Gaseada", price: "$850" },
          { name: "Agua Tónica", price: "$850" },
          { name: "Redbull", price: "$750" },
          { name: "Refrescos Ginger Ale", price: "$650", description: "Pepsi, 7Up, Mirinda" },
          { name: "Refrescos", price: "$750", description: "CocaCola, Sprite, Fanta" },
          { name: "Cervezas Importadas", price: "$1000" },
          { name: "Vinos por Copa", price: "$800", description: "Consultar disponibilidad" }
        ]
      }
    ]
  }
];

const ExpandableItemList = ({ items, isSubcategory = false }: { items: any[], isSubcategory?: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 3;
  const hasMore = items.length > limit;
  const displayedItems = expanded ? items : items.slice(0, limit);

  return (
    <div className="flex flex-col">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-16 ${isSubcategory ? 'gap-y-6 mt-6' : 'gap-y-8'}`}>
        {displayedItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start group border-b border-[#173018]/10 pb-4 hover:border-[#173018] transition-colors">
            <div className="pr-4">
              <h4 className={`font-body font-semibold text-[#173018] uppercase tracking-wide ${isSubcategory ? 'text-base' : 'text-lg'}`}>{item.name}</h4>
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

const featuredItems = [
  {
    title: "Toast Benedicto",
    description: "Pan rústico tostado, huevo poché, salsa holandesa y un toque de hierbas frescas.",
    price: "$1600",
    image: "/toastBenedicto.png"
  },
  {
    title: "Matcha Latte",
    description: "El equilibrio perfecto entre el dulzor y el sabor umami del matcha premium.",
    price: "$1200",
    image: "/matchaLatte.png"
  },
  {
    title: "Croissant Pistachio",
    description: "Crujiente croissant relleno de crema de pistacho artesanal.",
    price: "$1900",
    image: "/croissant.png"
  }
];

export default function MenuSection() {
  return (
    <section className="mb-32" id="menu">
      <div className="max-w-7xl mx-auto px-8">
        <header className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
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
        </header>

        {/* Featured Items Carousel */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-headline font-bold text-3xl text-[#173018] uppercase tracking-tight">Recomendaciones</h2>
            <div className="h-[1px] bg-gradient-to-r from-[#173018]/20 flex-grow"></div>
          </div>
          <div className="flex overflow-x-auto pb-8 -mx-8 px-8 gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {featuredItems.map((item, idx) => (
              <div key={idx} className="min-w-[340px] md:min-w-[500px] flex flex-row bg-[#eeeeee] rounded-2xl overflow-hidden snap-center shadow-sm h-[180px] md:h-[220px]">
                <div className="w-2/5 md:w-5/12 h-full overflow-hidden shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
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
        
        <div className="space-y-24">
          {menuData.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline font-bold text-4xl text-[#173018] uppercase tracking-tight">{category.title}</h2>
                <div className="h-[1px] bg-gradient-to-r from-[#173018]/20 flex-grow"></div>
              </div>
              {category.description && (
                <p className="font-body text-[#434841] mb-8 text-lg">{category.description}</p>
              )}
              
              {category.items && (
                <ExpandableItemList items={category.items} />
              )}

              {category.subcategories && (
                <div className="space-y-12">
                  {category.subcategories.map((sub, subIdx) => (
                    <div key={subIdx}>
                      <h3 className="font-headline font-bold text-2xl text-[#173018] uppercase tracking-tight mb-2">{sub.title}</h3>
                      {sub.description && <p className="font-body text-[#434841] text-sm mb-6 italic">{sub.description}</p>}
                      <ExpandableItemList items={sub.items} isSubcategory={true} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
