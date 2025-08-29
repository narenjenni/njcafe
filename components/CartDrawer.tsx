"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatIDR } from "@/lib/utils";
import type { MenuItem } from "@/lib/menu";
import { z } from "zod";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  note?: string;
};

const OrderSchema = z.object({
  customerName: z.string().min(1, "Nama wajib diisi"),
  customerEmail: z.string().email("Email tidak valid").optional().or(z.literal("")),
  customerPhone: z.string().min(6, "Nomor telepon wajib diisi"),
  orderType: z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]),
  address: z.string().optional(),
});

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  items: CartItem[];
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

export default function CartDrawer({ open, setOpen, items, removeItem, updateQty, clear }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    orderType: "DINE_IN",
    address: "",
  } as any);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const service = subtotal > 0 ? 3000 : 0;
  const total = subtotal + tax + service;

  async function submitOrder() {
    const parsed = OrderSchema.safeParse(form);
    if (!parsed.success) {
      alert(parsed.error.issues.map(i => i.message).join("\n"));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
          totals: { subtotal, tax, service, total },
          cafe: "NJ Cafe",
          timestamp: new Date().toISOString()
        })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Gagal mengirim pesanan");
      }
      clear();
      setOpen(false);
      alert("Pesanan terkirim! Cek email notifikasi.");
    } catch (e: any) {
      alert("Gagal mengirim pesanan: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed inset-y-0 right-0 w-full max-w-md z-50 bg-white dark:bg-neutral-950 shadow-soft border-l border-neutral-200 dark:border-neutral-800 flex flex-col"
        >
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">Keranjang</h2>
            <button className="btn-press px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800" onClick={() => setOpen(false)}>Tutup</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 && <p className="text-neutral-500">Belum ada item di keranjang.</p>}
            {items.map(it => (
              <div key={it.id} className="card p-3 flex gap-3 items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{it.title}</h3>
                    <button onClick={() => removeItem(it.id)} className="text-sm text-red-500">Hapus</button>
                  </div>
                  {it.note && <p className="text-xs text-neutral-500 mt-0.5">Catatan: {it.note}</p>}
                  <p className="text-sm mt-1">{formatIDR(it.price)} × {it.qty} = <b>{formatIDR(it.price * it.qty)}</b></p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-press w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800" onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}>−</button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button className="btn-press w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800" onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                </div>
              </div>
            ))}

            <div className="card p-3">
              <div className="flex items-center justify-between py-1"><span>Subtotal</span><b>{formatIDR(subtotal)}</b></div>
              <div className="flex items-center justify-between py-1"><span>Pajak (10%)</span><b>{formatIDR(tax)}</b></div>
              <div className="flex items-center justify-between py-1"><span>Biaya Layanan</span><b>{formatIDR(service)}</b></div>
              <div className="flex items-center justify-between py-2 border-t border-neutral-200 dark:border-neutral-800 mt-2"><span>Total</span><b className="text-lg">{formatIDR(total)}</b></div>
            </div>

            <div className="card p-3 space-y-3">
              <h3 className="font-semibold">Detail Pemesan</h3>
              <input className="input" placeholder="Nama lengkap" value={form.customerName} onChange={(e)=>setForm({...form, customerName: e.target.value})} />
              <input className="input" placeholder="Email (opsional)" value={form.customerEmail} onChange={(e)=>setForm({...form, customerEmail: e.target.value})} />
              <input className="input" placeholder="No. HP / WhatsApp" value={form.customerPhone} onChange={(e)=>setForm({...form, customerPhone: e.target.value})} />
              <div className="grid grid-cols-3 gap-2">
                {["DINE_IN","TAKEAWAY","DELIVERY"].map(opt => (
                  <button key={opt}
                    onClick={()=>setForm({...form, orderType: opt})}
                    className={`btn-press rounded-xl px-3 py-2 border ${form.orderType===opt ? "bg-brand-600 text-white border-brand-600" : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"}`}
                  >
                    {opt.replace("_"," ")}
                  </button>
                ))}
              </div>
              {form.orderType==="DELIVERY" && (
                <textarea className="input" placeholder="Alamat pengantaran" value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} />
              )}
              <motion.button whileTap={{scale:0.97}} onClick={submitOrder} disabled={loading || items.length===0}
                className="btn-press w-full rounded-xl bg-brand-700 hover:bg-brand-800 text-white px-4 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Mengirim..." : "Kirim Pesanan"}
              </motion.button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
