import React from 'react';
import { PlusCircle, Ruler, Search, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function QuickActions() {
  const actions = [
    {
      title: "Buat Pesanan",
      desc: "Mulai perjalanan custom-mu",
      icon: PlusCircle,
      accent: '#2C1810',
      bg: 'bg-[#2C1810]',
      textColor: 'text-[#FAF8F5]',
      descColor: 'text-[#FAF8F5]/50',
      number: '01',
    },
    {
      title: "Ukur Tubuh",
      desc: "Panduan interaktif presisi AI",
      icon: Ruler,
      accent: '#B8926A',
      bg: 'bg-gradient-to-br from-[#B8926A] to-[#D4B896]',
      textColor: 'text-white',
      descColor: 'text-white/60',
      number: '02',
    },
    {
      title: "Cari Penjahit",
      desc: "Temukan artisan terbaik",
      icon: Search,
      accent: '#B8926A',
      bg: 'bg-white',
      textColor: 'text-[#2C1810]',
      descColor: 'text-[#2C1810]/30',
      number: '03',
    },
  ];

  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {actions.map((action, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`${action.bg} rounded-2xl border border-[#2C1810]/[0.05] p-7 cursor-pointer group hover:-translate-y-1 transition-all relative overflow-hidden shadow-[0_2px_20px_rgba(44,24,16,0.04)] hover:shadow-[0_12px_40px_rgba(44,24,16,0.08)]`}
          >
            <div className="flex items-start justify-between mb-10 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${idx === 0 ? 'bg-white/10 text-[#D4B896]' : idx === 1 ? 'bg-white/20 text-white' : 'bg-[#B8926A]/10 text-[#B8926A] border border-[#B8926A]/15'}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 ${idx === 2 ? 'bg-[#B8926A]/10 text-[#B8926A]' : 'bg-white/15 text-white/80'}`}>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10">
              <div className={`text-[10px] tracking-[0.3em] mb-2 uppercase ${idx === 2 ? 'text-[#B8926A]/40' : idx === 0 ? 'text-[#FAF8F5]/20' : 'text-white/30'}`} style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                {action.number}
              </div>
              <h3 className={`text-xl mb-1.5 ${action.textColor}`} style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                {action.title}
              </h3>
              <p className={`text-[12px] ${action.descColor}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {action.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
