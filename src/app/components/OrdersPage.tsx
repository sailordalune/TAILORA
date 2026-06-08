import React, { useState } from 'react';
import {
  ArrowLeft, Inbox, Cog, Scissors, Ruler, CheckCircle2, Clock, MessageCircle, Phone,
  MapPin, Star, ChevronRight, Package, Calendar, CreditCard, FileText, AlertCircle, X,
  TrendingUp, Sparkles, ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { ReviewModal, ReviewOrder } from './ReviewModal';
import toko1Img from '../../imports/toko1.jpg';
import toko2Img from '../../imports/toko2.jpg';
import toko3Img from '../../imports/toko3.jpg';
import toko4Img from '../../imports/toko4.jpg';
import toko5Img from '../../imports/toko5.jpg';
import toko6Img from '../../imports/toko6.jpg';

type OrderStatus = 'diterima' | 'diproses' | 'dijahit' | 'fitting' | 'selesai' | 'dibatalkan';

type Order = {
  id: string;
  tailor: { name: string; image: string; location: string; rating: number };
  service: string;
  clothing: string;
  quantity: number;
  status: OrderStatus;
  stage: number; // 0-4 matching steps
  createdAt: string;
  eta: string;
  price: number;
  paid: number;
  notes?: string;
};

const stages = [
  { id: 'diterima', label: 'Diterima', desc: 'Pesanan diterima & dikonfirmasi penjahit', icon: Inbox },
  { id: 'diproses', label: 'Diproses', desc: 'Persiapan bahan & pola', icon: Cog },
  { id: 'dijahit', label: 'Dijahit', desc: 'Proses jahit sedang berlangsung', icon: Scissors },
  { id: 'fitting', label: 'Fitting', desc: 'Pengepasan & penyesuaian akhir', icon: Ruler },
  { id: 'selesai', label: 'Selesai', desc: 'Pakaian siap diambil / dikirim', icon: CheckCircle2 },
];

const mockOrders: Order[] = [
  {
    id: 'TLR-482931',
    tailor: {
      name: 'Rina Boutique', location: 'Bandung', rating: 4.9,
      image: toko1Img,
    },
    service: 'Jahit Baru', clothing: 'Kebaya Modern', quantity: 1,
    status: 'dijahit', stage: 2,
    createdAt: '15 Apr 2026', eta: '28 Apr 2026',
    price: 400000, paid: 120000,
    notes: 'Model kutubaru lengan panjang dengan detail payet di bagian dada.',
  },
  {
    id: 'TLR-471822',
    tailor: {
      name: 'Atelier By Budi', location: 'Jakarta Selatan', rating: 4.9,
      image: toko2Img,
    },
    service: 'Custom', clothing: 'Jas Formal 2-piece', quantity: 1,
    status: 'fitting', stage: 3,
    createdAt: '2 Apr 2026', eta: '24 Apr 2026',
    price: 850000, paid: 255000,
    notes: 'Warna navy, material wool Italia, slim fit.',
  },
  {
    id: 'TLR-465114',
    tailor: {
      name: 'Maison Sari', location: 'Yogyakarta', rating: 4.8,
      image: toko3Img,
    },
    service: 'Permak', clothing: 'Batik Parang', quantity: 2,
    status: 'diproses', stage: 1,
    createdAt: '19 Apr 2026', eta: '25 Apr 2026',
    price: 80000, paid: 24000,
  },
  {
    id: 'TLR-449022',
    tailor: {
      name: 'Dewi Couture', location: 'Bali', rating: 4.9,
      image: toko4Img,
    },
    service: 'Custom', clothing: 'Gaun Pengantin', quantity: 1,
    status: 'selesai', stage: 4,
    createdAt: '10 Feb 2026', eta: '20 Mar 2026',
    price: 1500000, paid: 1500000,
  },
  {
    id: 'TLR-442015',
    tailor: {
      name: 'Permak Express', location: 'Jakarta Pusat', rating: 4.7,
      image: toko6Img,
    },
    service: 'Permak', clothing: 'Kemeja', quantity: 3,
    status: 'diterima', stage: 0,
    createdAt: '22 Apr 2026', eta: '26 Apr 2026',
    price: 50000, paid: 15000,
  },
];

const tabs = [
  { id: 'all', label: 'Semua' },
  { id: 'aktif', label: 'Aktif' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'dibatalkan', label: 'Dibatalkan' },
];

type Props = { onBack: () => void };

export function OrdersPage({ onBack }: Props) {
  const [tab, setTab] = useState<'all' | 'aktif' | 'selesai' | 'dibatalkan'>('all');
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = mockOrders.filter((o) => {
    if (tab === 'all') return true;
    if (tab === 'aktif') return ['diterima', 'diproses', 'dijahit', 'fitting'].includes(o.status);
    if (tab === 'selesai') return o.status === 'selesai';
    if (tab === 'dibatalkan') return o.status === 'dibatalkan';
    return true;
  });

  const counts = {
    all: mockOrders.length,
    aktif: mockOrders.filter((o) => ['diterima', 'diproses', 'dijahit', 'fitting'].includes(o.status)).length,
    selesai: mockOrders.filter((o) => o.status === 'selesai').length,
    dibatalkan: 0,
  };

  if (selected) {
    return <OrderDetail order={selected} onBack={() => setSelected(null)} />;
  }

  const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-6 text-[#2C1810]/70 hover:text-[#2C1810] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-[13px]">Kembali</span>
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#B8926A]"></div>
              <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                Dashboard Pelanggan
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              Pesanan <span className="italic text-[#B8926A]">Saya</span>
            </h1>
          </div>
        </div>

        {/* Ringkasan Pesanan */}
        <section aria-labelledby="ringkasan-pesanan" className="mb-10">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-[#B8926A]"></div>
                <div className="text-[10px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Ikhtisar
                </div>
              </div>
              <h2 id="ringkasan-pesanan" className="text-2xl md:text-[28px] text-[#2C1810] leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                Ringkasan <span className="italic text-[#B8926A]">Pesanan</span>
              </h2>
              <p className="text-[13px] text-[#2C1810]/65 mt-1 max-w-md" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Pantau status pesanan dan reward Tailora Anda dalam satu tampilan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Package}
              label="Total Pesanan"
              value={String(counts.all)}
              microcopy="Semua pesanan Anda"
              tint="neutral"
              index={0}
            />
            <StatCard
              icon={TrendingUp}
              label="Sedang Berjalan"
              value={String(counts.aktif)}
              microcopy="Masih dalam proses pengerjaan"
              tint="featured"
              badge="Prioritas"
              index={1}
            />
            <StatCard
              icon={CheckCircle2}
              label="Selesai"
              value={String(counts.selesai)}
              microcopy="Pesanan telah diterima"
              tint="sage"
              index={2}
            />
            <StatCard
              icon={Sparkles}
              label="Tailora Points"
              value="1.240"
              microcopy="Dapat digunakan untuk reward"
              tint="premium"
              index={3}
            />
          </div>
        </section>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white border border-[#2C1810]/10 rounded-full p-1.5 w-fit overflow-x-auto">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`px-5 py-2.5 rounded-full text-[13px] whitespace-nowrap transition-all flex items-center gap-2 ${
                  active ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]/75 hover:text-[#2C1810] hover:bg-[#2C1810]/5'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: active ? 700 : 600 }}
              >
                {t.label}
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-[#B8926A] text-white' : 'bg-[#2C1810]/10 text-[#2C1810]/75'}`} style={{ fontWeight: 700 }}>
                  {counts[t.id as keyof typeof counts]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#2C1810]/10 rounded-3xl p-16 text-center">
            <Package className="w-12 h-12 mx-auto text-[#2C1810]/30 mb-3" strokeWidth={1.5} />
            <h3 className="text-2xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              Belum ada pesanan
            </h3>
            <p className="text-[#2C1810]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Pesanan Anda akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, i) => (
              <OrderCard key={order.id} order={order} onClick={() => setSelected(order)} index={i} formatRp={formatRp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, microcopy, tint, badge, index = 0,
}: {
  icon: any;
  label: string;
  value: string;
  microcopy: string;
  tint: 'neutral' | 'featured' | 'sage' | 'premium';
  badge?: string;
  index?: number;
}) {
  const v = {
    neutral: {
      card: 'bg-white border-[#2C1810]/10 hover:border-[#B8926A]/40',
      shadow: 'shadow-[0_2px_12px_rgba(44,24,16,0.04)] hover:shadow-[0_12px_36px_rgba(44,24,16,0.08)]',
      iconWrap: 'bg-[#F5F0E8] text-[#8B6544] border border-[#B8926A]/15',
      label: 'text-[#8B6544]',
      value: 'text-[#2C1810]',
      micro: 'text-[#2C1810]/55',
      accent: 'bg-[#B8926A]/30',
    },
    featured: {
      card: 'bg-gradient-to-br from-[#FBF1E4] via-[#F8E9D9] to-[#FAF8F5] border-[#B8926A]/45 ring-1 ring-[#B8926A]/20',
      shadow: 'shadow-[0_8px_28px_rgba(184,146,106,0.18)] hover:shadow-[0_18px_48px_rgba(184,146,106,0.28)]',
      iconWrap: 'bg-[#B8926A] text-white border border-[#B8926A]',
      label: 'text-[#8B6544]',
      value: 'text-[#2C1810]',
      micro: 'text-[#2C1810]/70',
      accent: 'bg-[#B8926A]',
    },
    sage: {
      card: 'bg-white border-[#2C1810]/10 hover:border-[#7A9583]/50',
      shadow: 'shadow-[0_2px_12px_rgba(44,24,16,0.04)] hover:shadow-[0_12px_36px_rgba(74,122,92,0.12)]',
      iconWrap: 'bg-[#EAF1EC] text-[#4A7A5C] border border-[#7A9583]/30',
      label: 'text-[#4A7A5C]',
      value: 'text-[#2C1810]',
      micro: 'text-[#2C1810]/55',
      accent: 'bg-[#7A9583]/40',
    },
    premium: {
      card: 'bg-gradient-to-br from-[#2C1810] via-[#3A2418] to-[#1F110A] border-[#B8926A]/40',
      shadow: 'shadow-[0_10px_32px_rgba(44,24,16,0.35)] hover:shadow-[0_20px_56px_rgba(44,24,16,0.5)]',
      iconWrap: 'bg-gradient-to-br from-[#D4A87A] to-[#B8926A] text-[#2C1810] border border-[#D4A87A]/60',
      label: 'text-[#D4A87A]',
      value: 'text-white',
      micro: 'text-white/65',
      accent: 'bg-[#D4A87A]',
    },
  }[tint];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl border ${v.card} ${v.shadow} transition-all duration-300 p-5`}
    >
      {/* corner accent */}
      <div className={`absolute top-0 left-0 h-[3px] w-16 ${v.accent} rounded-br-full`}></div>

      {tint === 'premium' && (
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#B8926A]/20 blur-3xl pointer-events-none"></div>
      )}
      {tint === 'featured' && (
        <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-[#B8926A]/25 blur-2xl pointer-events-none"></div>
      )}

      <div className="relative flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${v.iconWrap} flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        {badge && (
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] tracking-[0.2em] uppercase bg-[#2C1810] text-[#D4A87A]"
            style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="relative">
        <div
          className={`text-[10px] tracking-[0.28em] uppercase mb-2 ${v.label}`}
          style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}
        >
          {label}
        </div>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span
            className={`text-[40px] leading-none ${v.value}`}
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            {value}
          </span>
          {tint === 'premium' && (
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#D4A87A]/80" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              pts
            </span>
          )}
        </div>
        <p
          className={`text-[12px] leading-snug ${v.micro}`}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          {microcopy}
        </p>
      </div>
    </motion.div>
  );
}

function OrderCard({ order, onClick, index, formatRp }: { order: Order; onClick: () => void; index: number; formatRp: (n: number) => string }) {
  const currentStage = stages[order.stage];
  const progress = ((order.stage + 1) / stages.length) * 100;
  const statusColor = order.status === 'selesai' ? 'text-[#4A7A5C] bg-[#4A7A5C]/10 border-[#4A7A5C]/30' :
                       order.status === 'dibatalkan' ? 'text-[#C07A50] bg-[#C07A50]/10 border-[#C07A50]/30' :
                       'text-[#8B6544] bg-[#B8926A]/15 border-[#B8926A]/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="bg-white border border-[#2C1810]/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#B8926A] hover:shadow-[0_20px_60px_rgba(44,24,16,0.1)] transition-all group"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="w-20 h-20 rounded-sm overflow-hidden shrink-0">
            <ImageWithFallback src={order.tailor.image} alt={order.tailor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] tracking-[0.15em] uppercase ${statusColor}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <currentStage.icon className="w-3 h-3" strokeWidth={2.5} />
                    {currentStage.label}
                  </span>
                  <span className="text-[11px] text-[#2C1810]/50" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>
                    #{order.id}
                  </span>
                </div>
                <h3 className="text-xl text-[#2C1810] leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  {order.clothing}
                </h3>
                <div className="flex items-center gap-3 text-[12px] text-[#2C1810]/75 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  <span>{order.service} · {order.quantity} pcs</span>
                  <span className="w-1 h-1 rounded-full bg-[#2C1810]/30"></span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-[#B8926A] text-[#B8926A]" /> {order.tailor.name}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#2C1810]/40 group-hover:text-[#B8926A] group-hover:translate-x-1 transition-all shrink-0" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Simple progress bar */}
        {order.status !== 'dibatalkan' && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#2C1810]/75" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Tahap: <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>{currentStage.label}</span>
              </span>
              {order.status !== 'selesai' && (
                <span className="text-[11px] text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  {Math.round(progress)}%
                </span>
              )}
            </div>
            <div className="relative h-1.5 w-full rounded-full bg-[#2C1810]/8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 h-full rounded-full bg-[#B8926A]"
              />
            </div>
          </div>
        )}

        {order.status === 'dibatalkan' && (
          <div className="mt-5 flex items-center justify-between px-4 py-3 rounded-xl bg-[#C07A50]/8 border border-[#C07A50]/20">
            <span className="flex items-center gap-2 text-[12px] text-[#C07A50]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              <X className="w-3.5 h-3.5" strokeWidth={2.5} /> Pesanan dibatalkan
            </span>
            <span className="text-[11px] text-[#2C1810]/55" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {order.eta}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#2C1810]/10 gap-4">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Total</div>
            <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{formatRp(order.price * order.quantity)}</div>
          </div>
          <div className="flex items-center gap-3">
            {order.status !== 'dibatalkan' && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  {order.status === 'selesai' ? 'Selesai' : 'Estimasi Selesai'}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-[#2C1810]/80" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  <Calendar className="w-3 h-3 text-[#B8926A]" strokeWidth={2.5} />
                  {order.eta}
                </span>
              </div>
            )}
            <button onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#2C1810]/15 flex items-center justify-center text-[#2C1810]/70 hover:border-[#B8926A] hover:text-[#B8926A] transition-all" aria-label="Chat">
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="px-4 py-2 rounded-full bg-[#2C1810] text-white text-[12px] hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  const [notesOpen, setNotesOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
  const remaining = order.price * order.quantity - order.paid;
  const progress = ((order.stage + 1) / stages.length) * 100;

  const timestamps: Record<string, string> = {
    diterima: '15 Apr · 14:20',
    diproses: '16 Apr · 09:15',
    dijahit: '18 Apr · 11:40',
    fitting: 'Diperkirakan 25 Apr',
    selesai: 'Diperkirakan 28 Apr',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-[#2C1810]/70 hover:text-[#2C1810] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-[13px]">Kembali ke Pesanan Saya</span>
        </button>

        {/* Header card */}
        <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-8 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex gap-5 flex-1 min-w-0">
              <div className="w-24 h-24 rounded-sm overflow-hidden shrink-0">
                <ImageWithFallback src={order.tailor.image} alt={order.tailor.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544] mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Pesanan #{order.id}
                </div>
                <h1 className="text-3xl md:text-4xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  {order.clothing}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#2C1810]/75" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  <span>{order.service} · {order.quantity} pcs</span>
                  <span className="w-1 h-1 rounded-full bg-[#2C1810]/30"></span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />{order.tailor.name}, {order.tailor.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  <div className="flex items-center gap-1.5 text-[#2C1810]/75">
                    <Calendar className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />
                    Dipesan {order.createdAt}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2C1810]/75">
                    <Clock className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />
                    ETA {order.eta}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-[#2C1810]/15 text-[#2C1810] rounded-full hover:border-[#B8926A] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-[12px] tracking-[0.1em] uppercase">Chat</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                <Phone className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-[12px] tracking-[0.1em] uppercase">Telepon</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking */}
            <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  Status <span className="italic text-[#B8926A]">Pengerjaan</span>
                </h2>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  {Math.round(progress)}% Selesai
                </div>
              </div>
              <p className="text-[#2C1810]/70 text-[13px] mb-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Pantau setiap tahap pengerjaan pesanan Anda secara real-time.
              </p>

              {/* Vertical timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#2C1810]/10"></div>
                <motion.div
                  className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-[#B8926A] to-[#8B6D4F]"
                  initial={{ height: 0 }}
                  animate={{ height: `${(order.stage / (stages.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
                <div className="space-y-6">
                  {stages.map((s, i) => {
                    const done = i < order.stage;
                    const current = i === order.stage;
                    const pending = i > order.stage;
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="relative flex items-start gap-5"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                          done ? 'bg-[#B8926A] text-white shadow-md' :
                          current ? 'bg-[#2C1810] text-white shadow-lg ring-4 ring-[#2C1810]/10' :
                          'bg-white border-2 border-[#2C1810]/15 text-[#2C1810]/30'
                        }`}>
                          {done ? <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} /> : <s.icon className="w-5 h-5" strokeWidth={2} />}
                        </div>
                        <div className={`flex-1 pb-2 ${pending ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <div className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px' }}>
                              {s.label}
                            </div>
                            {current && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#B8926A] text-white text-[9px] tracking-[0.2em] uppercase animate-pulse" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                                Sedang Berjalan
                              </span>
                            )}
                            {done && (
                              <span className="px-2 py-0.5 rounded-full bg-[#4A7A5C]/15 text-[#4A7A5C] text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                                Selesai
                              </span>
                            )}
                          </div>
                          <div className="text-[13px] text-[#2C1810]/75 mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            {s.desc}
                          </div>
                          <div className="text-[11px] text-[#8B6544] flex items-center gap-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>
                            <Clock className="w-3 h-3" /> {timestamps[s.id]}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-white border border-[#2C1810]/10 rounded-2xl overflow-hidden">
                <button onClick={() => setNotesOpen(!notesOpen)} className="w-full flex items-center justify-between p-6 hover:bg-[#FAF8F5] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#B8926A]/15 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Catatan Pesanan</div>
                      <div className="text-[12px] text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Detail spesifikasi dari Anda</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#2C1810]/60 transition-transform ${notesOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                </button>
                <AnimatePresence>
                  {notesOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <div className="p-4 bg-[#FAF8F5] border-l-2 border-[#B8926A] rounded-sm text-[14px] text-[#2C1810]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          "{order.notes}"
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Payment */}
              <div className="bg-[#2C1810] text-white rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[9rem] leading-none text-white/[0.04] pointer-events-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>T</div>
                <div className="relative">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Pembayaran</div>
                  <div className="flex justify-between text-[13px] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    <span className="text-white/75">Total Pesanan</span>
                    <span className="text-white" style={{ fontWeight: 700 }}>{formatRp(order.price * order.quantity)}</span>
                  </div>
                  <div className="flex justify-between text-[13px] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    <span className="text-white/75">Sudah Dibayar (DP)</span>
                    <span className="text-[#B8926A]" style={{ fontWeight: 700 }}>{formatRp(order.paid)}</span>
                  </div>
                  <div className="flex justify-between pt-3 mt-3 border-t border-white/10 text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <span className="text-white">Sisa Pembayaran</span>
                    <span className="text-white" style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>{formatRp(remaining)}</span>
                  </div>
                  {remaining > 0 && order.status !== 'dibatalkan' && (
                    <button className="w-full mt-5 flex items-center justify-center gap-2 py-3 bg-[#B8926A] text-[#2C1810] rounded-full hover:bg-white transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      <CreditCard className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-[12px] tracking-[0.1em] uppercase">Bayar Sisa</span>
                    </button>
                  )}
                  {order.status === 'selesai' && !hasReviewed && (
                    <button
                      onClick={() => setReviewOpen(true)}
                      className="w-full mt-5 flex items-center justify-center gap-2 py-3 bg-[#B8926A] text-[#2C1810] rounded-full hover:bg-white transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      <Star className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-[12px] tracking-[0.1em] uppercase">Beri Rating</span>
                    </button>
                  )}
                  {hasReviewed && (
                    <div className="w-full mt-5 flex items-center justify-center gap-2 py-3 bg-[#4A7A5C]/10 text-[#4A7A5C] rounded-full" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      <Star className="w-4 h-4" fill="#4A7A5C" strokeWidth={0} />
                      <span className="text-[12px] tracking-[0.1em] uppercase">Sudah Diulas</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Help */}
              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                  <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>Butuh Bantuan?</div>
                </div>
                <p className="text-[12px] text-[#2C1810]/70 leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Ada kendala dengan pesanan? Tim kami siap membantu.
                </p>
                <button className="w-full py-2.5 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-full text-[12px] text-[#2C1810] hover:border-[#B8926A] hover:text-[#B8926A] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Hubungi Customer Service
                </button>
                {order.status !== 'selesai' && order.status !== 'dibatalkan' && order.stage < 2 && (
                  <button className="w-full mt-2 py-2.5 text-[12px] text-[#C07A50] hover:bg-[#C07A50]/10 rounded-full transition-colors flex items-center justify-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                    Batalkan Pesanan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        open={reviewOpen}
        order={
          reviewOpen
            ? {
                id: order.id,
                title: order.clothing,
                tailor: order.tailor.name,
                service: order.service,
                completedAt: order.eta,
              }
            : null
        }
        onClose={() => setReviewOpen(false)}
        onSubmitted={() => {
          setHasReviewed(true);
          setReviewOpen(false);
        }}
      />
    </div>
  );
}
