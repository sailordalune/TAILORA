import React from 'react';
import { Star, MapPin, ArrowRight, Award, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { TailorCard } from './TailorCard';
import { TailorData } from './TailorDetail';
import toko1Img from '../../imports/toko1.jpg';
import toko2Img from '../../imports/toko2.jpg';
import toko3Img from '../../imports/toko3.jpg';

const tailorsRaw = [
  {
    name: 'Rina Boutique',
    rating: 4.9,
    reviews: 312,
    specialty: 'Kebaya & Gaun Pengantin',
    clothing: 'Kebaya',
    service: 'Jahit Baru',
    price: 'Mulai Rp 350rb',
    image: toko1Img,
    location: 'Bandung',
    tag: 'Top Rated',
    yearsExp: 12,
    quote: 'Detail kebayanya rapii, fitting presisi',
  },
  {
    name: 'Atelier By Budi',
    rating: 4.9,
    reviews: 248,
    specialty: 'Jas Formal & Kemeja Pria',
    clothing: 'Jas Formal',
    service: 'Jahit Baru',
    price: 'Mulai Rp 700rb',
    image: toko2Img,
    location: 'Jakarta Selatan',
    tag: 'Top Rated',
    yearsExp: 15,
    quote: 'Jas custom terbaik yang pernah saya coba',
  },
  {
    name: 'Maison Sari',
    rating: 4.8,
    reviews: 196,
    specialty: 'Batik & Wastra Modern',
    clothing: 'Batik',
    service: 'Custom',
    price: 'Mulai Rp 250rb',
    image: toko3Img,
    location: 'Yogyakarta',
    tag: 'Featured',
    yearsExp: 8,
    quote: 'Sukaa banget perpaduan batik dengan model yang terkini',
  },
];

const tailors = [...tailorsRaw].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

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
        {tailors.map((tailor, idx) => (
          <TailorCard
            key={tailor.name}
            tailor={tailor}
            variant="recommendation"
            index={idx}
            onClick={() => onSelectTailor && onSelectTailor(tailor as TailorData)}
          />
        ))}
      </div>
    </section>
  );
}
