import React, { useState } from 'react';
import { Calendar, ChevronRight, Check, ArrowUpRight, Star, MessageSquarePlus } from 'lucide-react';
import { motion } from 'motion/react';
import { ReviewModal, ReviewOrder } from './ReviewModal';

type HistoryOrder = {
  id: string;
  title: string;
  date: string;
  tailor: string;
  service: string;
  price: string;
};

export function OrderHistory() {
  const history: HistoryOrder[] = [
    { id: 'TR-7281B', title: 'Gaun Pesta Payet', date: '12 Okt 2026', tailor: 'Rina Boutique', service: 'Custom Design', price: 'Rp 1.250.000' },
    { id: 'TR-6192C', title: 'Permak Hem Lengan', date: '05 Sep 2026', tailor: 'Ibu Siti', service: 'Permak', price: 'Rp 75.000' },
    { id: 'TR-5122X', title: 'Celana Chino Custom', date: '14 Agu 2026', tailor: 'Atelier By Budi', service: 'Jahit Baru', price: 'Rp 450.000' },
  ];

  const [reviewed, setReviewed] = useState<Record<string, boolean>>({ 'TR-5122X': true });
  const [active, setActive] = useState<ReviewOrder | null>(null);

  const openReview = (o: HistoryOrder) =>
    setActive({ id: o.id, title: o.title, tailor: o.tailor, service: o.service, completedAt: o.date });

  return (
    <section className="mb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-[#2C1810] text-2xl md:text-3xl mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
            Riwayat <span className="italic text-[#B8926A]">Pesanan</span>
          </h2>
          <p className="text-[#2C1810]/30 text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>Karya seni yang telah selesai untukmu</p>
        </div>
        <button className="text-[11px] text-[#B8926A] hover:text-[#2C1810] flex items-center gap-1.5 transition-colors" style={{ fontFamily: 'Space Mono, monospace' }}>
          Semua <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {history.map((order, idx) => {
          const isReviewed = reviewed[order.id];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-[#2C1810]/[0.05] p-5 md:p-6 hover:border-[#B8926A]/20 transition-all group relative overflow-hidden shadow-[0_2px_20px_rgba(44,24,16,0.03)] hover:shadow-[0_8px_30px_rgba(184,146,106,0.08)]"
            >
              <div className="absolute top-0 left-0 w-[3px] h-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-[#B8926A] to-transparent"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#B8926A]/[0.06] border border-[#B8926A]/10">
                  <Check className="w-4 h-4 text-[#B8926A]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-[#2C1810] text-[15px] truncate" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                      {order.title}
                    </h3>
                    <span className="text-[9px] text-[#2C1810]/15 shrink-0" style={{ fontFamily: 'Space Mono, monospace' }}>{order.id}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B8926A]/10 text-[9px] tracking-[0.2em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      Selesai
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#2C1810]/30 flex-wrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#2C1810]/10"></span>
                    <span>{order.tailor}</span>
                    <span className="w-1 h-1 rounded-full bg-[#2C1810]/10"></span>
                    <span>{order.service}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:ml-auto">
                  <div className="text-right hidden sm:block" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="text-[9px] text-[#2C1810]/20 tracking-[0.2em] uppercase mb-0.5" style={{ fontFamily: 'Space Mono, monospace' }}>Total</div>
                    <div className="text-[#2C1810] text-sm" style={{ fontWeight: 700 }}>{order.price}</div>
                  </div>

                  {isReviewed ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#2C1810]/5 text-[#2C1810]/55 text-[11px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      <Star className="w-3.5 h-3.5 text-[#B8926A]" fill="#B8926A" strokeWidth={0} />
                      Sudah diulas
                    </div>
                  ) : (
                    <button
                      onClick={() => openReview(order)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2C1810] text-[#FAF8F5] text-[10px] tracking-[0.2em] uppercase hover:bg-[#B8926A] hover:text-[#2C1810] transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" strokeWidth={2} />
                      Beri Ulasan
                    </button>
                  )}

                  <div className="w-8 h-8 rounded-full bg-[#2C1810]/[0.03] border border-[#2C1810]/[0.06] flex items-center justify-center text-[#2C1810]/20 group-hover:bg-[#B8926A] group-hover:text-white group-hover:border-[#B8926A] transition-all cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ReviewModal
        open={!!active}
        order={active}
        onClose={() => setActive(null)}
        onSubmitted={(id) => setReviewed((r) => ({ ...r, [id]: true }))}
      />
    </section>
  );
}
