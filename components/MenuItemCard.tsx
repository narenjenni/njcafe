"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MenuItem } from "@/lib/menu";
import { formatIDR } from "@/lib/utils";

type Props = {
  item: MenuItem;
  onAdd: (item: MenuItem, qty: number, note: string) => void;
};

function PlaceholderImage({ title }: { title: string }) {
  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#7287fd'/>
      <stop offset='100%' stop-color='#4c5bf7'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='white' font-family='Arial, sans-serif'>${title}</text>
</svg>`);
  return <img src={`data:image/svg+xml;charset=utf-8,${svg}`} alt={title} className="w-full h-40 object-cover rounded-xl" />;
}

export default function MenuItemCard({ item, onAdd }: Props) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  return (
    <div className="card p-4 flex flex-col gap-3 group hover:translate-y-[-2px] transition-transform duration-300">
      <PlaceholderImage title={item.title} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
          <p className="text-brand-700/90 dark:text-brand-300/90 font-semibold">{formatIDR(item.price)}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{item.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Decrease"
            className="btn-press w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-soft"
            onClick={() => setQty(Math.max(1, qty - 1))}
          >−</button>
          <span className="w-8 text-center font-semibold">{qty}</span>
          <button
            aria-label="Increase"
            className="btn-press w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-soft"
            onClick={() => setQty(qty + 1)}
          >+</button>
        </div>
      </div>

      <label className="text-sm font-medium">Catatan</label>
      <textarea
        placeholder='Contoh: "tidak pedas ya"'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="input min-h-[64px]"
      />

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onAdd(item, qty, note)}
        className="btn-press w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-3 font-semibold shadow-soft"
      >
        Tambah ke Keranjang
      </motion.button>
    </div>
  );
}
