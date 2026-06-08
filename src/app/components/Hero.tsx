import React from 'react';
import { ChevronDown, ShieldCheck, Clock, Award, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';

const trustBadges = [
  { icon: ShieldCheck, label: 'Tailor Verified' },
  { icon: Clock, label: 'Milestone Payment' },
  { icon: Award, label: 'Quality Checked' },
  { icon: Truck, label: 'On-Time Delivery' },
];

type Props = { onCtaClick?: () => void };

export function Hero({ onCtaClick }: Props = {}) {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex flex-col overflow-hidden">
      {/* Full background image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1635790073975-ac99496914e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdGFpbG9yJTIwYmF0aWslMjBzZXdpbmclMjBhcnRpc2FuJTIwd29ya3Nob3B8ZW58MXx8fHwxNzc2ODMzNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Pengrajin batik Indonesia"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Light elegant overlays for better text readability */}
      <div className="absolute inset-0 bg-[#FAF8F5]/65"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/30 to-[#FAF8F5]/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF8F5]"></div>

      {/* Main content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          {/* Thin ornament line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#B8926A]"></div>
            <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Est. 2016
            </div>
            <div className="w-12 h-px bg-[#B8926A]"></div>
          </div>

          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-[#2C1810] leading-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
            Tail<span className="italic text-[#B8926A]">o</span>ra
          </h1>

          {/* Elegant divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-8 h-px bg-[#2C1810]/30"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8926A]"></div>
            <div className="w-8 h-px bg-[#2C1810]/30"></div>
          </div>

          <div className="text-[11px] tracking-[0.4em] uppercase text-[#2C1810]/70 mt-4" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>
            Bespoke Tailoring Marketplace
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#2C1810]/80 text-base md:text-lg max-w-md leading-relaxed mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          Platform marketplace untuk layanan permak & jahit pakaian custom dari penjahit lokal bertalenta yang terverifikasi.
        </motion.p>

        <motion.button
          onClick={onCtaClick}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="px-10 py-3.5 bg-[#2C1810] text-[#FAF8F5] rounded-full text-[12px] tracking-[0.15em] uppercase hover:bg-[#B8926A] transition-all shadow-[0_8px_30px_rgba(44,24,16,0.15)]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          Jelajahi Penjahit
        </motion.button>
      </div>

      {/* Bottom badges bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 border-t border-[#2C1810]/[0.1] bg-[#FAF8F5]/90 backdrop-blur-xl"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-[#2C1810]/80 text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              <badge.icon className="w-4 h-4 text-[#B8926A]" strokeWidth={2} />
              {badge.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="text-[10px] text-[#2C1810]/60 tracking-[0.3em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>Scroll</div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#2C1810]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
