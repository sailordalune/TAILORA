import React, { useState } from 'react';
import { Instagram, MessageCircle, Mail, Music2, Youtube, Facebook, ArrowRight } from 'lucide-react';
import { AboutModal } from './AboutModal';

const customerCare = ['FAQ', 'Cara Pemesanan', 'Revisi & Komplain Pesanan', 'Informasi pengiriman', 'Hubungi Customer Service'];
const about = ['Tentang Tailora', 'Editorial', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Newsroom'];
const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Music2, label: 'TikTok' },
  { icon: Youtube, label: 'Youtube' },
  { icon: Mail, label: 'Email' },
];

export function SupportSection({ onNavigate }: { onNavigate?: (key: string) => void } = {}) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <section className="relative mt-24 w-full bg-[#2C1810] text-[#FAF8F5] overflow-hidden">
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      {/* Decorative watermark */}
      <div className="absolute -bottom-16 -right-10 text-[20rem] leading-none text-[#FAF8F5]/[0.03] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
        Tail<span className="italic">o</span>ra
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-20">
        {/* Brand intro */}
        <div className="max-w-3xl mb-16 pb-12 border-b border-[#FAF8F5]/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#B8926A]"></div>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Est. 2016
            </div>
          </div>
          <p className="text-[#FAF8F5]/90 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="text-[#B8926A]" style={{ fontWeight: 600 }}>TAILORA.ID</span> adalah marketplace terdepan di Indonesia untuk layanan permak dan jahit pakaian custom. Kami menghubungkan Anda dengan penjahit lokal bertalenta yang sudah terverifikasi, menghadirkan pengalaman jahit custom yang transparan, aman, dan berkualitas — dari konsultasi hingga pakaian tiba di tangan Anda.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-6" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Tentang
            </div>
            <ul className="space-y-3">
              {about.map((item) => (
                <li 
                  key={item} 
                  onClick={() => { if (item === 'Tentang Tailora') setShowAbout(true); }}
                  className="text-sm text-[#FAF8F5]/85 hover:text-[#FAF8F5] cursor-pointer transition-colors" 
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-6" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Layanan Pelanggan
            </div>
            <ul className="space-y-3">
              {customerCare.map((item) => (
                <li
                  key={item}
                  onClick={() => onNavigate?.(item)}
                  className="text-sm text-[#FAF8F5]/85 hover:text-[#B8926A] cursor-pointer transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-6" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Metode Pembayaran
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['TRANSFER\nBANK', 'QRIS', 'GOPAY', 'OVO', 'DANA', 'KARTU DEBIT/\nKREDIT'].map((method) => (
                <div key={method} className="aspect-[3/2] bg-[#FAF8F5] rounded-sm flex items-center justify-center text-[10px] text-[#2C1810] tracking-wider text-center whitespace-pre-line leading-tight px-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  {method}
                </div>
              ))}
            </div>
            <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Pengiriman
            </div>
            <div className="flex flex-wrap gap-2">
              {['JNE', 'J&T', 'SiCepat', 'Gosend'].map((ship) => (
                <div key={ship} className="px-2 py-1 bg-[#FAF8F5]/5 border border-[#FAF8F5]/10 rounded-sm text-[10px] text-[#FAF8F5]/90" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {ship}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-6" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Newsletter
            </div>
            <p className="text-sm text-[#FAF8F5]/85 leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
              Daftar dan dapatkan info penjahit terbaru, editorial, dan penawaran eksklusif.
            </p>
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="w-full bg-transparent border-b border-[#FAF8F5]/20 py-3 pr-10 text-sm text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 focus:outline-none focus:border-[#B8926A] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8926A] cursor-pointer" strokeWidth={1.5} />
            </div>
            <button className="w-full py-3 bg-[#B8926A] text-[#2C1810] rounded-full text-[11px] tracking-[0.2em] uppercase hover:bg-[#FAF8F5] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Daftar Sekarang
            </button>
          </div>
        </div>

        {/* Social icons row */}
        <div className="flex items-center justify-center gap-4 pt-10 border-t border-[#FAF8F5]/10">
          {socials.map((s, i) => (
            <a
              key={i}
              href="#"
              aria-label={s.label}
              className="w-11 h-11 rounded-full border border-[#FAF8F5]/20 flex items-center justify-center hover:border-[#B8926A] hover:bg-[#B8926A] hover:text-[#2C1810] transition-all group"
            >
              <s.icon className="w-4 h-4 text-[#FAF8F5]/90 group-hover:text-[#2C1810] transition-colors" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 text-center text-[10px] tracking-[0.3em] uppercase text-[#FAF8F5]/60" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>
          &copy; 2026 Tailora.id — All Rights Reserved
        </div>
      </div>
    </section>
  );
}