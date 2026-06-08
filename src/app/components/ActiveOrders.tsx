import React from 'react';
import { Package, Scissors, Shirt, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import toko2Img from '../../imports/toko2.jpg';

const steps = [
  { label: 'Diterima', icon: Package, done: true },
  { label: 'Diproses', icon: Package, done: true },
  { label: 'Dijahit', icon: Scissors, active: true },
  { label: 'Fitting', icon: Shirt, done: false },
  { label: 'Selesai', icon: CheckCircle, done: false },
];

export function ActiveOrders() {
  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-[#2C1810] text-2xl md:text-3xl mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
            Pesanan <span className="italic text-[#B8926A]">Aktif</span>
          </h2>
          <p className="text-[#2C1810]/30 text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>3 pesanan sedang berjalan</p>
        </div>
        <button className="text-[11px] text-[#B8926A] hover:text-[#2C1810] flex items-center gap-1.5 transition-colors" style={{ fontFamily: 'Space Mono, monospace' }}>
          Lihat Semua <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main tracking card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 bg-white rounded-3xl border border-[#2C1810]/[0.05] p-7 lg:p-9 relative overflow-hidden shadow-[0_2px_20px_rgba(44,24,16,0.04)]"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#B8926A]/[0.04] to-transparent rounded-full blur-[80px]"></div>

          <div className="flex items-start gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 ring-1 ring-[#2C1810]/[0.06] shadow-sm">
              <ImageWithFallback
                src={toko2Img}
                alt="Tailor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-[#2C1810] text-lg truncate" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  Jas Custom Pria
                </h3>
                <span className="shrink-0 text-[9px] px-2.5 py-1 rounded-full bg-[#B8926A]/10 text-[#B8926A] border border-[#B8926A]/15" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  AKTIF
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#2C1810]/30" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#2C1810]/50">Atelier By Budi</span>
                <span className="w-1 h-1 rounded-full bg-[#2C1810]/15"></span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Est. 12 Nov</span>
                <span className="w-1 h-1 rounded-full bg-[#2C1810]/15"></span>
                <span className="text-[#2C1810]/20">#TR-8921A</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-[#2C1810]/[0.05]">
              <div className="h-full bg-gradient-to-r from-[#B8926A] to-[#D4B896] w-[45%] rounded-full"></div>
            </div>

            <div className="flex justify-between relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2.5 w-1/5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.active
                      ? 'bg-gradient-to-br from-[#B8926A] to-[#8B6D4F] text-white shadow-[0_4px_16px_rgba(184,146,106,0.35)] scale-110'
                      : step.done
                      ? 'bg-[#B8926A]/10 text-[#B8926A] border border-[#B8926A]/20'
                      : 'bg-[#2C1810]/[0.03] text-[#2C1810]/15 border border-[#2C1810]/[0.06]'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] tracking-wider uppercase ${
                    step.active ? 'text-[#B8926A]' : step.done ? 'text-[#2C1810]/35' : 'text-[#2C1810]/15'
                  }`} style={{ fontWeight: 600 }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Side cards */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {[
            { title: 'Pengecilan Pinggang', tailor: 'Ibu Siti', type: 'Permak', progress: 33, color: '#C07A50', date: 'Besok' },
            { title: 'Kebaya Modern', tailor: 'Rina Boutique', type: 'Custom', progress: 80, color: '#B8926A', date: '20 Nov' },
          ].map((order, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className="bg-white rounded-2xl border border-[#2C1810]/[0.05] p-5 hover:border-[#B8926A]/20 transition-all cursor-pointer group shadow-[0_2px_20px_rgba(44,24,16,0.03)] hover:shadow-[0_8px_30px_rgba(184,146,106,0.1)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: order.color, borderColor: `${order.color}20`, background: `${order.color}08` }}>
                  {order.type}
                </span>
                <span className="text-[11px] text-[#2C1810]/20" style={{ fontFamily: 'Space Mono, monospace' }}>{order.date}</span>
              </div>
              <h4 className="text-[#2C1810] text-[15px] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{order.title}</h4>
              <p className="text-[#2C1810]/25 text-[11px] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{order.tailor}</p>
              <div className="h-1.5 bg-[#2C1810]/[0.04] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${order.progress}%`, background: `linear-gradient(to right, ${order.color}, ${order.color}88)` }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
