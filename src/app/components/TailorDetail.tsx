import React, { useState } from 'react';
import {
  ArrowLeft, Star, MapPin, Award, MessageCircle, Phone, Calendar, Clock, Heart, Share2,
  ShieldCheck, Scissors, CheckCircle2, ChevronRight, Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { OrderFlow } from './OrderFlow';
import { ChatDrawer } from './ChatDrawer';
import { getDynamicReviews, getDynamicServices, getTailorPortfolio, TailorData } from '../data/tailors';


const stats = [
  { label: 'Pesanan Selesai', value: '486' },
  { label: 'Repeat Customer', value: '72%' },
  { label: 'Response Time', value: '< 1 jam' },
  { label: 'On-Time Delivery', value: '98%' },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Tailor Terverifikasi' },
  { icon: Award, label: 'Top Rated 2025' },
  { icon: CheckCircle2, label: 'Milestone Payment' },
];

type Props = { tailor: TailorData; onBack: () => void };

export function TailorDetail({ tailor, onBack }: Props) {
  const [tab, setTab] = useState<'about' | 'services' | 'portfolio' | 'reviews'>('about');
  const [favorite, setFavorite] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [chatOpen, setChatOpen] = useState(false);

  const startOrder = (serviceId?: string) => {
    setPreselectedService(serviceId);
    setOrdering(true);
  };

  if (ordering) {
    return <OrderFlow tailor={tailor} initialService={preselectedService} onBack={() => setOrdering(false)} onComplete={onBack} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero banner */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <ImageWithFallback src={tailor.image} alt={tailor.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1810]/70 via-[#2C1810]/40 to-[#FAF8F5]"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 text-[#2C1810] hover:bg-white transition-all shadow-md"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-[13px]">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFavorite(!favorite)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${favorite ? 'bg-[#C07A50] text-white' : 'bg-white/95 text-[#2C1810] hover:bg-white'}`}
              aria-label="Favorit"
            >
              <Heart className="w-4 h-4" strokeWidth={2.5} fill={favorite ? 'currentColor' : 'none'} />
            </button>
            <button className="w-11 h-11 rounded-full bg-white/95 text-[#2C1810] hover:bg-white flex items-center justify-center transition-all shadow-md" aria-label="Bagikan">
              <Share2 className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 -mt-32 relative z-20 pb-20">
        {/* Profile header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#2C1810]/10 rounded-2xl p-8 shadow-[0_20px_60px_rgba(44,24,16,0.12)] mb-6"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <ImageWithFallback src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#B8926A] border-4 border-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex px-2.5 py-1 rounded-sm bg-[#B8926A]/15 border border-[#B8926A]/30 text-[#8B6544] text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  {tailor.clothing}
                </span>
                <span className="inline-flex px-2.5 py-1 rounded-sm bg-[#2C1810]/5 border border-[#2C1810]/15 text-[#2C1810]/80 text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                  Spesialis {tailor.service}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl text-[#2C1810] mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                {tailor.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#2C1810]/80" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#B8926A] text-[#B8926A]" />
                  <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>{tailor.rating}</span>
                  <span className="text-[13px] text-[#2C1810]/60" style={{ fontWeight: 500 }}>({tailor.reviews} review)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[13px]">
                  <MapPin className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                  {tailor.location}
                </div>
                <div className="flex items-center gap-1.5 text-[13px]">
                  <Award className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                  {tailor.yearsExp} tahun pengalaman
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex md:flex-col gap-2 w-full md:w-auto">
              <button onClick={() => startOrder()} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                <Calendar className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-[13px] tracking-[0.1em] uppercase">Pesan Sekarang</span>
              </button>
              <button onClick={() => setChatOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#2C1810]/20 text-[#2C1810] rounded-full hover:border-[#B8926A] hover:text-[#B8926A] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-[13px] tracking-[0.1em] uppercase">Hubungi</span>
              </button>
            </div>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 pt-6 border-t border-[#2C1810]/10">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-[12px] text-[#2C1810]/75" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                <b.icon className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-[#2C1810]/10 rounded-sm p-5">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544] mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{s.label}</div>
              <div className="text-2xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white border border-[#2C1810]/10 rounded-full p-1.5 w-fit overflow-x-auto">
          {(['about', 'services', 'portfolio', 'reviews'] as const).map((t) => {
            const labels: Record<typeof t, string> = { about: 'Tentang', services: 'Layanan & Harga', portfolio: 'Portofolio', reviews: 'Review' };
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full text-[13px] whitespace-nowrap transition-all ${
                  active ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]/75 hover:text-[#2C1810] hover:bg-[#2C1810]/5'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: active ? 700 : 600 }}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {tab === 'about' && (
              <>
                <div className="bg-white border border-[#2C1810]/10 rounded-sm p-8">
                  <h2 className="text-2xl text-[#2C1810] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    Tentang <span className="italic text-[#B8926A]">Penjahit</span>
                  </h2>
                  <p className="text-[#2C1810]/80 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    {tailor.name} adalah butik dengan pengalaman {tailor.yearsExp} tahun di industri pakaian custom. Kami mengkhususkan diri pada {tailor.clothing.toLowerCase()} dengan pendekatan bespoke, setiap potong dijahit dengan detail tinggi, mempertimbangkan proporsi tubuh, preferensi gaya, dan kualitas material terbaik dari pemasok lokal terpercaya.
                  </p>
                  <p className="text-[#2C1810]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Tim kami terdiri dari penjahit senior yang telah dilatih dengan teknik tradisional dan modern, memastikan setiap pesanan memiliki standar kualitas yang konsisten dari konsultasi hingga fitting akhir.
                  </p>
                </div>

                <div className="bg-white border border-[#2C1810]/10 rounded-sm p-8">
                  <h3 className="text-xl text-[#2C1810] mb-5" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    Spesialisasi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[tailor.clothing, tailor.service, 'Custom Fitting', 'Detail Embroidery', 'Premium Fabric', 'Bespoke Consultation'].map((s) => (
                      <div key={s} className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-sm">
                        <Scissors className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                        <span className="text-sm text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#2C1810]/10 rounded-sm p-8">
                  <h3 className="text-xl text-[#2C1810] mb-5" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    Lokasi Penjahit
                  </h3>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#B8926A] mt-0.5" strokeWidth={2.5} />
                    <div>
                      <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        Jl. Cipete Raya No. 24, {tailor.location}
                      </div>
                      <div className="text-[13px] text-[#2C1810]/70 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Buka Senin–Sabtu, 09.00–19.00 WIB
                      </div>
                    </div>
                  </div>
                  <div className="aspect-[16/7] rounded-sm overflow-hidden border border-[#2C1810]/10 relative">
                    <iframe 
                      title={`Peta lokasi ${tailor.name}`}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                      loading="lazy" 
                      allowFullScreen 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(`Jl. Cipete Raya No. 24, ${tailor.location}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  </div>
                </div>
              </>
            )}

            {tab === 'services' && (
              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-8">
                <h2 className="text-2xl text-[#2C1810] mb-6" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  Layanan & <span className="italic text-[#B8926A]">Harga</span>
                </h2>
                <div className="space-y-3">
                  {getDynamicServices(tailor.name).map((s) => (
                    <div key={s.id} onClick={() => startOrder(s.id)} className="flex items-center justify-between p-5 bg-[#FAF8F5] hover:bg-[#B8926A]/10 border border-transparent hover:border-[#B8926A]/30 rounded-sm transition-all cursor-pointer group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{s.name}</div>
                          {s.popular && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B8926A] text-white text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                              <Sparkles className="w-2.5 h-2.5" /> Populer
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          <Clock className="w-3.5 h-3.5" /> {s.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{s.price}</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#2C1810]/40 group-hover:text-[#B8926A] group-hover:translate-x-1 transition-all" strokeWidth={2.5} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'portfolio' && (
              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    Portofolio <span className="italic text-[#B8926A]">Pekerjaan</span>
                  </h2>
                  <button className="text-[12px] text-[#8B6544] hover:text-[#2C1810] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    Lihat Semua →
                  </button>
                </div>
                {getTailorPortfolio(tailor.name).length === 0 ? (
                  <div className="text-center py-10 text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Belum ada portofolio yang diunggah.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {getTailorPortfolio(tailor.name).map((src, i) => (
                      <div key={i} className="aspect-square rounded-sm overflow-hidden cursor-pointer group relative">
                        <ImageWithFallback src={src} alt={`Portofolio ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/30 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#2C1810]/10">
                  <div>
                    <h2 className="text-2xl text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                      Review <span className="italic text-[#B8926A]">Pelanggan</span>
                    </h2>
                    <div className="flex items-center gap-2 text-[#2C1810]/75 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      Berdasarkan {tailor.reviews} ulasan terverifikasi
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-6 h-6 fill-[#B8926A] text-[#B8926A]" />
                      <span className="text-3xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{tailor.rating}</span>
                    </div>
                    <div className="text-[11px] text-[#8B6544] tracking-[0.2em] uppercase mt-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>dari 5.0</div>
                  </div>
                </div>
                <div className="space-y-5">
                  {getDynamicReviews(tailor).map((r) => (
                    <div key={r.name} className="pb-5 border-b border-[#2C1810]/10 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {(r as any).avatar ? (
                            <img src={(r as any).avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B896] to-[#B8926A] flex items-center justify-center text-white text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                              {r.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[#2C1810] text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{r.name}</span>
                              {r.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />}
                            </div>
                            <div className="text-[11px] text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{r.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-[#B8926A] text-[#B8926A]' : 'text-[#2C1810]/15'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#2C1810]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky order sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-[#2C1810] text-white rounded-2xl p-7 shadow-[0_20px_60px_rgba(44,24,16,0.2)] relative overflow-hidden">
                <div className="absolute -top-12 -right-12 text-[10rem] leading-none text-white/[0.04] pointer-events-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>T</div>
                <div className="relative">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Mulai Pemesanan</div>
                  <div className="text-[13px] text-white/70 mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Estimasi mulai</div>
                  <div className="text-3xl text-white mb-5" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{tailor.price}</div>

                  <div className="space-y-2.5 mb-6 text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    {['Konsultasi gratis 30 menit', 'Milestone payment terlindungi', 'Revisi minor disertakan', 'Garansi quality check'].map((b) => (
                      <div key={b} className="flex items-center gap-2 text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                        {b}
                      </div>
                    ))}
                  </div>

                  <button onClick={() => startOrder()} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#B8926A] text-[#2C1810] rounded-full hover:bg-white transition-colors mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <Calendar className="w-4 h-4" strokeWidth={2.5} />
                    <span className="text-[13px] tracking-[0.1em] uppercase">Pesan Sekarang</span>
                  </button>
                  <button onClick={() => setChatOpen(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    <span className="text-[12px] tracking-[0.1em] uppercase">Hubungi Penjahit</span>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#8B6544] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Jam Operasional</div>
                <div className="space-y-2 text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {[
                    { d: 'Senin – Jumat', h: '09.00 – 19.00' },
                    { d: 'Sabtu', h: '10.00 – 17.00' },
                    { d: 'Minggu', h: 'Tutup', closed: true },
                  ].map((row) => (
                    <div key={row.d} className="flex items-center justify-between">
                      <span className="text-[#2C1810]/75">{row.d}</span>
                      <span className={row.closed ? 'text-[#C07A50]' : 'text-[#2C1810]'} style={{ fontWeight: 700 }}>{row.h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatDrawer tailor={tailor} open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
