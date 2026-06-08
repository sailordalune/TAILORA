import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, MapPin, Star, Award, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { TailorDetail } from './TailorDetail';
import { allTailors, clothingTypes, locations, serviceTypes, TailorData } from '../data/tailors';

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  icon?: React.ReactNode;
};

function Dropdown({ label, value, options, onChange, icon }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 bg-white border rounded-full transition-all ${
          open ? 'border-[#B8926A] shadow-md' : 'border-[#2C1810]/15 hover:border-[#B8926A]/60'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon}
          <div className="text-left min-w-0">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              {label}
            </div>
            <div className="text-[14px] text-[#2C1810] truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              {value}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#2C1810]/60 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-2 left-0 right-0 bg-white border border-[#2C1810]/10 rounded-2xl shadow-[0_20px_60px_rgba(44,24,16,0.15)] overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto py-2">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`w-full text-left px-5 py-2.5 text-[14px] flex items-center justify-between transition-colors ${
                      value === opt
                        ? 'bg-[#B8926A]/10 text-[#2C1810]'
                        : 'text-[#2C1810]/80 hover:bg-[#FAF8F5] hover:text-[#2C1810]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: value === opt ? 700 : 500 }}
                  >
                    {opt}
                    {value === opt && <Check className="w-4 h-4 text-[#B8926A]" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

type Props = { onClose: () => void };

export function SearchPage({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [location, setLocation] = useState('Semua Lokasi');
  const [clothing, setClothing] = useState('Semua');
  const [service, setService] = useState('Semua');
  const [selected, setSelected] = useState<TailorData | null>(null);

  const results = useMemo(() => {
    return allTailors.filter((t) => {
      if (query && !t.name.toLowerCase().includes(query.toLowerCase()) && !t.clothing.toLowerCase().includes(query.toLowerCase())) return false;
      if (location !== 'Semua Lokasi' && t.location !== location) return false;
      if (clothing !== 'Semua' && t.clothing !== clothing) return false;
      if (service !== 'Semua' && t.service !== service) return false;
      return true;
    }).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  }, [query, location, clothing, service]);

  const activeFilterCount = [location !== 'Semua Lokasi', clothing !== 'Semua', service !== 'Semua'].filter(Boolean).length;

  if (selected) {
    return <TailorDetail tailor={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#B8926A]"></div>
              <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                Cari Penjahit
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              Temukan <span className="italic text-[#B8926A]">Penjahit</span> Anda
            </h1>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-white border border-[#2C1810]/15 flex items-center justify-center text-[#2C1810]/70 hover:text-[#2C1810] hover:border-[#B8926A] transition-all"
            aria-label="Tutup pencarian"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Search bar + Add filter */}
        <div className="bg-white border border-[#2C1810]/10 rounded-3xl p-3 shadow-[0_10px_40px_rgba(44,24,16,0.06)] mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-5">
              <Search className="w-5 h-5 text-[#B8926A] shrink-0" strokeWidth={2.5} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama penjahit, jenis pakaian, atau layanan..."
                className="flex-1 py-3 bg-transparent text-[15px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#2C1810]/40 hover:text-[#2C1810]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all shrink-0 ${
                filtersOpen
                  ? 'bg-[#2C1810] text-white hover:bg-[#B8926A]'
                  : 'bg-[#B8926A] text-white hover:bg-[#2C1810]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-[13px] tracking-[0.1em] uppercase">
                {filtersOpen ? 'Close Filter' : 'Add Filter'}
              </span>
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-white text-[#2C1810] text-[11px] flex items-center justify-center" style={{ fontWeight: 800 }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter row */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-visible"
            >
              <div className="bg-white/50 border border-[#2C1810]/10 rounded-3xl p-5 mb-8">
                <div className="flex items-center gap-3 mb-4 px-2">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Cari Berdasarkan
                  </div>
                  <div className="flex-1 h-px bg-[#2C1810]/10"></div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => { setLocation('Semua Lokasi'); setClothing('Semua'); setService('Semua'); }}
                      className="text-[11px] text-[#8B6544] hover:text-[#2C1810] tracking-[0.15em] uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Dropdown
                    label="Lokasi"
                    value={location}
                    options={locations}
                    onChange={setLocation}
                    icon={<MapPin className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />}
                  />
                  <Dropdown label="Jenis Pakaian" value={clothing} options={clothingTypes} onChange={setClothing} />
                  <Dropdown label="Jenis Jasa" value={service} options={serviceTypes} onChange={setService} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-[14px] text-[#2C1810]/75" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Menampilkan <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>{results.length}</span> penjahit
            {location !== 'Semua Lokasi' && <> di <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>{location}</span></>}
          </div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Urut: Rating Tertinggi
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="bg-white border border-[#2C1810]/10 rounded-3xl p-16 text-center">
            <div className="text-[#2C1810]/40 mb-3">
              <Search className="w-12 h-12 mx-auto" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
              Tidak ada penjahit ditemukan
            </h3>
            <p className="text-[#2C1810]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((t, i) => (
              <motion.div
                key={t.name}
                onClick={() => setSelected(t)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#2C1810]/10 rounded-sm overflow-hidden group cursor-pointer hover:border-[#B8926A] hover:shadow-[0_20px_60px_rgba(44,24,16,0.12)] transition-all"
              >
                <div className="relative h-[240px] overflow-hidden">
                  <ImageWithFallback src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" style={{ objectPosition: '50% 25%' }} />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#2C1810] shadow-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <Star className="w-4 h-4 fill-[#B8926A] text-[#B8926A]" />
                    <span className="text-sm">{t.rating}</span>
                    <span className="text-[11px] text-[#2C1810]/60" style={{ fontWeight: 500 }}>({t.reviews})</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1810]/90 backdrop-blur-md text-white text-[11px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    <MapPin className="w-3 h-3 text-[#B8926A]" strokeWidth={2.5} />
                    {t.location}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="inline-flex px-2.5 py-1 rounded-sm bg-[#B8926A]/15 border border-[#B8926A]/30 text-[#8B6544] text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      {t.clothing}
                    </span>
                    <span className="inline-flex px-2.5 py-1 rounded-sm bg-[#2C1810]/5 border border-[#2C1810]/15 text-[#2C1810]/80 text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      {t.service}
                    </span>
                  </div>
                  <h3 className="text-xl text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    {t.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#2C1810]/70 text-[12px] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    <Award className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />
                    {t.yearsExp} tahun pengalaman
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2C1810]/10">
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Harga</div>
                      <div className="text-[14px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{t.price}</div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelected(t); }} className="w-10 h-10 rounded-full bg-[#2C1810] text-white flex items-center justify-center hover:bg-[#B8926A] transition-colors">
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
