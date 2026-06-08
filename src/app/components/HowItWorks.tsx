import React from 'react';
import { motion } from 'motion/react';
import { Search, Ruler, Scissors, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Pilih Penjahit',
    description: 'Jelajahi rekomendasi artisan terverifikasi dan pilih yang sesuai dengan gaya Anda.',
  },
  {
    icon: Ruler,
    number: '02',
    title: 'Ukur & Konsultasi',
    description: 'Gunakan Virtual Measurement atau konsultasi langsung untuk mendapatkan ukuran presisi.',
  },
  {
    icon: Scissors,
    number: '03',
    title: 'Proses Pengerjaan',
    description: 'Pantau progress pengerjaan melalui dashboard dengan milestone payment yang aman.',
  },
  {
    icon: PackageCheck,
    number: '04',
    title: 'Terima Pakaian',
    description: 'Pakaian selesai dikirim ke rumah Anda dengan jaminan quality check.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-[#B8926A]"></div>
          <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            How It Works
          </div>
          <div className="w-12 h-px bg-[#B8926A]"></div>
        </div>
        <h2 className="text-4xl md:text-5xl text-[#2C1810] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          Empat Langkah <span className="italic text-[#B8926A]">Sederhana</span>
        </h2>
        <p className="text-[#2C1810]/75 text-base max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          Proses yang transparan dari awal hingga pakaian custom Anda siap dikenakan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative bg-[#FAF8F5] border border-[#2C1810]/[0.06] rounded-sm p-8 hover:border-[#B8926A]/30 transition-all group"
          >
            <div className="text-[11px] tracking-[0.3em] text-[#8B6544] mb-6" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              {step.number}
            </div>
            <div className="w-12 h-12 rounded-full border border-[#2C1810]/25 flex items-center justify-center mb-6 group-hover:border-[#B8926A] group-hover:bg-[#B8926A]/10 transition-all">
              <step.icon className="w-5 h-5 text-[#2C1810] group-hover:text-[#B8926A] transition-colors" strokeWidth={2} />
            </div>
            <h3 className="text-xl text-[#2C1810] mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              {step.title}
            </h3>
            <p className="text-[#2C1810]/75 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
