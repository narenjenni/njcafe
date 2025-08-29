"use client";

import { useMemo, useState } from "react";
import { MENU, type MenuItem } from "@/lib/menu";
import MenuItemCard from "@/components/MenuItemCard";
import CartDrawer, { type CartItem } from "@/components/CartDrawer";
import { motion } from "framer-motion";

const categories = Array.from(new Set(MENU.map(m => m.category)));

export default function Page() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | "All">("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  function onAdd(item: MenuItem, qty: number, note: string) {
    setItems(prev => {
      const ex = prev.find(p => p.id === item.id && (p.note||"") === (note||""));
      if (ex) {
        return prev.map(p => p === ex ? { ...p, qty: p.qty + qty } : p);
      }
      return [...prev, { id: item.id + (note ? ":"+note : ""), title: item.title, price: item.price, qty, note }];
    });
  }
  function removeItem(id: string) {
    setItems(prev => prev.filter(p => p.id !== id));
  }
  function updateQty(id: string, qty: number) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
  }
  function clearCart() {
    setItems([]);
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MENU.filter(it =>
      (activeCat === "All" || it.category === activeCat) &&
      (it.title.toLowerCase().includes(q) || it.category.toLowerCase().includes(q))
    );
  }, [query, activeCat]);

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-neutral-950/60 border-b border-white/30 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-soft" />
            <div>
              <h1 className="text-xl font-extrabold leading-none">NJ Cafe</h1>
              <p className="text-xs -mt-0.5 text-neutral-500">Specialty coffee • Good food • Great vibes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Cari menu..."
              className="input w-56 md:w-80"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <motion.button whileTap={{scale:0.97}} onClick={()=>setCartOpen(true)} className="btn-press rounded-xl px-4 py-2 bg-brand-600 text-white font-semibold shadow-soft">
              Keranjang · Rp {subtotal.toLocaleString("id-ID")}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Temani harimu di <span className="text-brand-700">NJ Cafe</span></h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">Nikmati kopi spesial, hidangan lezat, dan suasana nyaman. Pesan online—mudah, cepat, dan praktis.</p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#menu" className="btn-press inline-block rounded-xl px-5 py-3 bg-brand-700 hover:bg-brand-800 text-white font-semibold shadow-soft">Lihat Menu</a>
              <button onClick={()=>setCartOpen(true)} className="btn-press rounded-xl px-5 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-semibold">Buka Keranjang</button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft border border-white/40 dark:border-neutral-800">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/50 to-brand-700/40" />
              <img src={`data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7287fd"/><stop offset="100%" stop-color="#4c5bf7"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white" font-family="Arial, sans-serif">NJ Cafe</text></svg>')}`} alt="NJ Cafe" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="menu" className="max-w-6xl mx-auto px-4 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={()=>setActiveCat('All')} className={`btn-press rounded-full px-4 py-2 border ${activeCat==='All' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'}`}>Semua</button>
          {categories.map(cat => (
            <button key={cat} onClick={()=>setActiveCat(cat)} className={`btn-press rounded-full px-4 py-2 border ${activeCat===cat ? 'bg-brand-600 text-white border-brand-600' : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'}`}>{cat}</button>
          ))}
        </div>
      </section>

      {/* Grid Menu */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(it => (
          <MenuItemCard key={it.id} item={it} onAdd={onAdd} />
        ))}
      </section>

      {/* Floating Cart Button (mobile) */}
      <motion.button whileTap={{scale:0.95}} onClick={()=>setCartOpen(true)}
        className="md:hidden fixed bottom-5 right-5 rounded-full px-5 py-3 bg-brand-700 text-white font-semibold shadow-soft">
        Keranjang · Rp {subtotal.toLocaleString("id-ID")}
      </motion.button>

      <CartDrawer open={cartOpen} setOpen={setCartOpen} items={items} removeItem={removeItem} updateQty={updateQty} clear={clearCart} />
      
      {/* Footer */}
      <footer className="border-t border-white/30 dark:border-neutral-800 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} NJ Cafe — Depok • IG: @jenfornaren
      </footer>
    </main>
  );
}
