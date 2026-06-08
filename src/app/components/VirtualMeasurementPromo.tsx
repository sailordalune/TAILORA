import React from 'react';
import { Camera, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function VirtualMeasurementPromo({ onStart }: { onStart?: () => void } = {}) {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[#F5F1EC] border border-[#2C1810]/[0.05] p-8 md:p-14 relative overflow-hidden"
      >
        {/* Soft ambient circles */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#B8926A]/[0.06] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#D4B896]/[0.08] rounded-full blur-[80px] translate-x-1/3 translate-y-1/3"></div>

        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B8926A]/10 border border-[#B8926A]/15 text-[#B8926A] text-[9px] tracking-[0.25em] uppercase mb-6" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              <Camera className="w-3 h-3" /> Fitur Eksklusif
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#2C1810] mb-5 leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
              Ukur Tubuh<br/><span className="italic text-[#B8926A]">dengan Presisi.</span>
            </h2>

            <p className="text-[#2C1810] text-sm max-w-lg leading-relaxed mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Isi ukuran tubuhmu dengan panduan interaktif yang membantu setiap langkah pengukuran. Pilih ukuran standar, ikuti titik panduan pada figur
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button onClick={onStart} className="flex items-center gap-3 px-7 py-3 bg-[#2C1810] text-[#FAF8F5] rounded-full text-[12px] tracking-wide hover:bg-[#B8926A] transition-all group shadow-[0_8px_30px_rgba(44,24,16,0.15)]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Mulai Ukur <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-[#2C1810]/25 text-[11px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <ShieldCheck className="w-4 h-4 text-[#B8926A]/60" /> End-to-End Encrypted
              </div>
            </div>
          </div>

          {/* Visual element */}
          <div className="w-full md:w-72 flex justify-center">
            <div className="w-48 h-68 rounded-3xl bg-white border border-[#2C1810]/[0.05] flex flex-col items-center justify-center relative overflow-hidden shadow-[0_8px_40px_rgba(44,24,16,0.06)]">
              {/* Scan line */}
              <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8926A]/40 to-transparent animate-pulse"></div>

              {/* Body outline */}
              <div className="relative w-20 h-36 text-[#B8926A]/30 z-10 mt-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                  <circle cx="12" cy="3" r="2" />
                  <path d="M7 6h10c1.5 0 2.5 1.5 2 3l-2 5v9a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-9l-2-5c-.5-1.5.5-3 2-3z"/>
                  <line x1="4" y1="12" x2="20" y2="12" strokeDasharray="2 3" />
                  <line x1="12" y1="1" x2="12" y2="23" strokeDasharray="2 3" className="opacity-50" />
                </svg>
                <div className="absolute top-1/2 left-0 -translate-x-0.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B8926A] shadow-[0_0_6px_rgba(184,146,106,0.5)]"></div>
                <div className="absolute top-1/2 right-0 translate-x-0.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B8926A] shadow-[0_0_6px_rgba(184,146,106,0.5)]"></div>
              </div>

              <div className="mt-5 mb-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B8926A]/[0.08] border border-[#B8926A]/10 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B8926A] animate-pulse"></div>
                <span className="text-[9px] text-[#B8926A]/60 tracking-[0.2em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}