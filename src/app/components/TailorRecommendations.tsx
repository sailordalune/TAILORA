import React from 'react';
import { TailorCard } from './TailorCard';
import { recommendedTailors, TailorData } from '../data/tailors';

type Props = {
  onSelectTailor?: (tailor: TailorData) => void;
};
export function TailorRecommendations({ onSelectTailor }: Props = {}) {
  return (
    <section className="py-24">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-[#B8926A]"></div>
          <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Rekomendasi Penjahit
          </div>
          <div className="w-12 h-px bg-[#B8926A]"></div>
        </div>
        <h2 className="text-4xl md:text-5xl text-[#2C1810] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          Penjahit <span className="italic text-[#B8926A]">Terbaik</span> untuk Anda
        </h2>
        <p className="text-[#2C1810]/75 text-base max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          Diurutkan berdasarkan rating dan jumlah review tertinggi dari pelanggan kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedTailors.map((tailor, idx) => (
          <TailorCard
            key={tailor.name}
            tailor={tailor}
            variant="recommendation"
            index={idx}
            onClick={() => onSelectTailor && onSelectTailor(tailor)}
          />
        ))}
      </div>
    </section>
  );
}
