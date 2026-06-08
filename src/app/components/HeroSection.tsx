import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] max-h-[960px] flex flex-col overflow-hidden">
      {/* Background Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1691406874341-2d3f60d5accf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBib3V0aXF1ZSUyMGludGVyaW9yJTIwYnJpZ2h0JTIwbWluaW1hbHxlbnwxfHx8fDE3NzY2ODIzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Tailora Boutique Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#F5F5F1]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F1]/60 via-transparent to-[#F5F5F1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F1]/70 via-[#F5F5F1]/20 to-transparent" />

      {/* Content */}
      <div className="flex-1 flex items-center relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-[1px] bg-[#2D1B14]/25" />
            <span
              className="text-[11px] tracking-[0.35em] uppercase text-[#2D1B14]/40"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Bespoke Marketplace
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-7xl text-[#2D1B14] leading-[1.05] mb-6"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
          >
            Tailora:<br />
            <span className="italic">Bespoke</span><br />
            Marketplace
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[15px] text-[#2D1B14]/40 leading-[1.75] max-w-md mb-10"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Connect with verified artisan tailors for premium custom clothing and expert alterations — crafted to your exact measurements.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center gap-6"
          >
            <button
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2D1B14] text-white rounded-full text-[13px] tracking-[0.02em] hover:bg-[#1a0f0b] transition-all group shadow-[0_8px_32px_rgba(45,27,20,0.2)]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Start Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="text-[13px] text-[#2D1B14]/40 hover:text-[#2D1B14]/70 transition-colors underline underline-offset-4 decoration-[#2D1B14]/15"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              Learn more
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] text-[#2D1B14]/20 tracking-[0.25em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-[#2D1B14]/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
