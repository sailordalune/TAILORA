import React from 'react';
import { Star, MapPin, ArrowRight, Award, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';

export type TailorCardProps = {
  tailor: any;
  variant: 'recommendation' | 'search';
  index?: number;
  onClick?: () => void;
};

export function TailorCard({ tailor, variant, index = 0, onClick }: TailorCardProps) {
  if (variant === 'recommendation') {
    return (
      <motion.div
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white border border-[#2C1810]/10 rounded-sm overflow-hidden group cursor-pointer hover:border-[#B8926A] hover:shadow-[0_20px_60px_rgba(44,24,16,0.12)] transition-all"
      >
        {/* Image */}
        <div className="relative h-[280px] overflow-hidden">
          <ImageWithFallback
            src={tailor.image}
            alt={tailor.name}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.2s]"
          />
          {/* Rank badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1810] text-white text-[11px] shadow-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            <Award className="w-3.5 h-3.5 text-[#B8926A]" fill="#B8926A" />
            #{index + 1} {tailor.tag}
          </div>
          {/* Rating prominent */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-[#2C1810] shadow-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            <Star className="w-4 h-4 fill-[#B8926A] text-[#B8926A]" />
            <span className="text-sm">{tailor.rating}</span>
            <span className="text-[11px] text-[#2C1810]/60" style={{ fontWeight: 500 }}>({tailor.reviews})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Specialty badge - prominent */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-sm bg-[#B8926A]/15 border border-[#B8926A]/30 text-[#8B6544] text-[11px] tracking-[0.15em] uppercase mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {tailor.specialty || tailor.clothing}
          </div>

          <h3 className="text-2xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            {tailor.name}
          </h3>

          <div className="flex items-center gap-3 text-[#2C1810]/75 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2} />
              {tailor.location}
            </div>
            <div className="w-1 h-1 rounded-full bg-[#2C1810]/30"></div>
            <div>{tailor.yearsExp} thn pengalaman</div>
          </div>

          {/* Review quote */}
          <div className="flex gap-2 p-3 bg-[#FAF8F5] border-l-2 border-[#B8926A] mb-5">
            <MessageSquareQuote className="w-4 h-4 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[#2C1810]/80 text-sm italic leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              "{tailor.quote}"
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#2C1810] text-white rounded-full text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            Lihat Profil
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white border border-[#2C1810]/10 rounded-sm overflow-hidden group cursor-pointer hover:border-[#B8926A] hover:shadow-[0_20px_60px_rgba(44,24,16,0.12)] transition-all"
    >
      <div className="relative h-[240px] overflow-hidden">
        <ImageWithFallback src={tailor.image} alt={tailor.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" style={{ objectPosition: '50% 25%' }} />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#2C1810] shadow-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
          <Star className="w-4 h-4 fill-[#B8926A] text-[#B8926A]" />
          <span className="text-sm">{tailor.rating}</span>
          <span className="text-[11px] text-[#2C1810]/60" style={{ fontWeight: 500 }}>({tailor.reviews})</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1810]/90 backdrop-blur-md text-white text-[11px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
          <MapPin className="w-3 h-3 text-[#B8926A]" strokeWidth={2.5} />
          {tailor.location}
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="inline-flex px-2.5 py-1 rounded-sm bg-[#B8926A]/15 border border-[#B8926A]/30 text-[#8B6544] text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {tailor.clothing || tailor.specialty}
          </span>
          {tailor.service && (
            <span className="inline-flex px-2.5 py-1 rounded-sm bg-[#2C1810]/5 border border-[#2C1810]/15 text-[#2C1810]/80 text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              {tailor.service}
            </span>
          )}
        </div>
        <h3 className="text-xl text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          {tailor.name}
        </h3>
        <div className="flex items-center gap-2 text-[#2C1810]/70 text-[12px] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          <Award className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />
          {tailor.yearsExp} tahun pengalaman
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[#2C1810]/10">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Harga</div>
            <div className="text-[14px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{tailor.price || '-'}</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#2C1810] text-white flex items-center justify-center hover:bg-[#B8926A] transition-colors pointer-events-none">
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
