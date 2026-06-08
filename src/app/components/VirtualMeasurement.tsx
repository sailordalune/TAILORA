import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Ruler, RotateCw, RotateCcw, Info, Sparkles,
  Camera, Upload, Save, Eye, ChevronRight, Lightbulb, AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Props = { onBack: () => void; onSave?: (data: any) => void };

type ClothingType = {
  id: string;
  label: string;
  category: 'atasan' | 'bawahan' | 'gaun' | 'tradisional';
  icon: string;
  measurements: string[];
};

const clothingTypes: ClothingType[] = [
  { id: 'kebaya', label: 'Kebaya', category: 'tradisional', icon: '👘', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lingkar-pinggul', 'panjang-kebaya', 'lebar-bahu', 'lingkar-lengan', 'panjang-lengan', 'kerung-lengan'] },
  { id: 'gaun', label: 'Gaun / Dress', category: 'gaun', icon: '👗', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lingkar-pinggul', 'panjang-gaun', 'lebar-bahu', 'panjang-lengan', 'kerung-lengan'] },
  { id: 'kemeja', label: 'Kemeja', category: 'atasan', icon: '👔', measurements: ['lingkar-leher', 'lingkar-dada', 'lingkar-pinggang', 'lebar-bahu', 'panjang-baju', 'panjang-lengan', 'lingkar-pergelangan'] },
  { id: 'tshirt', label: 'T-Shirt', category: 'atasan', icon: '👕', measurements: ['lingkar-dada', 'lebar-bahu', 'panjang-baju', 'panjang-lengan', 'lingkar-lengan'] },
  { id: 'jas', label: 'Jas / Blazer', category: 'atasan', icon: '🧥', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lebar-bahu', 'lebar-punggung', 'panjang-jas', 'panjang-lengan', 'kerung-lengan'] },
  { id: 'batik', label: 'Batik', category: 'tradisional', icon: '🪭', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lebar-bahu', 'panjang-baju', 'panjang-lengan'] },
  { id: 'celana', label: 'Celana', category: 'bawahan', icon: '👖', measurements: ['lingkar-pinggang', 'lingkar-pinggul', 'lingkar-paha', 'panjang-celana', 'lingkar-lutut', 'pesak'] },
  { id: 'rok', label: 'Rok', category: 'bawahan', icon: '👚', measurements: ['lingkar-pinggang', 'lingkar-pinggul', 'panjang-rok'] },
];

type FitStyle = {
  id: string;
  label: string;
  desc: string;
  ease: string;
  multiplier: number;
};

const fitStyles: FitStyle[] = [
  { id: 'slim', label: 'Slim Fit', desc: 'Ketat mengikuti bentuk tubuh, modern & fitted', ease: '+1 sampai +3 cm', multiplier: 1 },
  { id: 'regular', label: 'Regular Fit', desc: 'Pas di badan dengan ruang nyaman, klasik & versatile', ease: '+4 sampai +6 cm', multiplier: 1.04 },
  { id: 'loose', label: 'Loose Fit', desc: 'Longgar & santai, cocok untuk gaya kasual', ease: '+8 sampai +12 cm', multiplier: 1.1 },
  { id: 'oversized', label: 'Oversized', desc: 'Sangat longgar, gaya streetwear & statement', ease: '+15 cm atau lebih', multiplier: 1.18 },
  { id: 'crop', label: 'Cropped', desc: 'Pendek di bagian bawah, modern & trendy', ease: 'Panjang -10 sampai -20 cm', multiplier: 1 },
];

// Saran ukuran tubuh berdasarkan size chart standar Indonesia (rata-rata).
// Dipakai sebagai starting point — user bisa fine-tune setelah auto-fill.
const sizeChart: Record<string, Record<string, number>> = {
  XS: { 'lingkar-dada': 80, 'lingkar-pinggang': 60, 'lingkar-pinggul': 86, 'lingkar-leher': 33, 'lingkar-lengan': 24, 'lingkar-pergelangan': 14, 'lingkar-paha': 50, 'lingkar-lutut': 34, 'lebar-bahu': 36, 'lebar-punggung': 34, 'panjang-baju': 58, 'panjang-kebaya': 70, 'panjang-gaun': 95, 'panjang-jas': 68, 'panjang-rok': 60, 'panjang-celana': 95, 'panjang-lengan': 55, 'kerung-lengan': 38, 'pesak': 64 },
  S:  { 'lingkar-dada': 84, 'lingkar-pinggang': 64, 'lingkar-pinggul': 90, 'lingkar-leher': 35, 'lingkar-lengan': 26, 'lingkar-pergelangan': 15, 'lingkar-paha': 53, 'lingkar-lutut': 36, 'lebar-bahu': 37, 'lebar-punggung': 35, 'panjang-baju': 60, 'panjang-kebaya': 72, 'panjang-gaun': 98, 'panjang-jas': 70, 'panjang-rok': 62, 'panjang-celana': 98, 'panjang-lengan': 57, 'kerung-lengan': 40, 'pesak': 66 },
  M:  { 'lingkar-dada': 88, 'lingkar-pinggang': 68, 'lingkar-pinggul': 94, 'lingkar-leher': 37, 'lingkar-lengan': 28, 'lingkar-pergelangan': 16, 'lingkar-paha': 56, 'lingkar-lutut': 38, 'lebar-bahu': 38, 'lebar-punggung': 36, 'panjang-baju': 62, 'panjang-kebaya': 74, 'panjang-gaun': 100, 'panjang-jas': 72, 'panjang-rok': 64, 'panjang-celana': 100, 'panjang-lengan': 58, 'kerung-lengan': 42, 'pesak': 68 },
  L:  { 'lingkar-dada': 92, 'lingkar-pinggang': 72, 'lingkar-pinggul': 98, 'lingkar-leher': 39, 'lingkar-lengan': 30, 'lingkar-pergelangan': 17, 'lingkar-paha': 59, 'lingkar-lutut': 40, 'lebar-bahu': 40, 'lebar-punggung': 38, 'panjang-baju': 64, 'panjang-kebaya': 76, 'panjang-gaun': 102, 'panjang-jas': 74, 'panjang-rok': 66, 'panjang-celana': 102, 'panjang-lengan': 59, 'kerung-lengan': 44, 'pesak': 70 },
  XL: { 'lingkar-dada': 98, 'lingkar-pinggang': 78, 'lingkar-pinggul': 104, 'lingkar-leher': 41, 'lingkar-lengan': 33, 'lingkar-pergelangan': 18, 'lingkar-paha': 63, 'lingkar-lutut': 42, 'lebar-bahu': 42, 'lebar-punggung': 40, 'panjang-baju': 66, 'panjang-kebaya': 78, 'panjang-gaun': 104, 'panjang-jas': 76, 'panjang-rok': 68, 'panjang-celana': 104, 'panjang-lengan': 60, 'kerung-lengan': 46, 'pesak': 72 },
};

const sizeMeta: Record<string, string> = {
  XS: 'Tinggi 150-155, BB 40-45',
  S:  'Tinggi 155-160, BB 45-52',
  M:  'Tinggi 160-165, BB 52-60',
  L:  'Tinggi 165-170, BB 60-70',
  XL: 'Tinggi 170+,    BB 70+',
};

// Ease (selisih cm antara ukuran tubuh dan ukuran pakaian jadi) per fit style.
// Lengkungan tubuh (lingkar-*, kerung, pesak): selisih besar.
// Lebar bahu/punggung: selisih kecil.
// Panjang: hanya cropped yang memendekkan.
function easeForField(field: string, fitId: string): number {
  if (field.startsWith('panjang-')) {
    return fitId === 'crop' ? -15 : 0;
  }
  if (field === 'lebar-bahu' || field === 'lebar-punggung') {
    const map: Record<string, number> = { slim: 0, regular: 1, loose: 3, oversized: 6, crop: 0 };
    return map[fitId] ?? 0;
  }
  const map: Record<string, number> = { slim: 2, regular: 5, loose: 10, oversized: 18, crop: 2 };
  return map[fitId] ?? 0;
}

const measurementInfo: Record<string, { label: string; desc: string; tip: string; ideal?: string }> = {
  'lingkar-dada': { label: 'Lingkar Dada', desc: 'Lingkari pita ukur di bagian terlebar dada melewati puting', tip: 'Berdiri tegak, jangan menahan napas', ideal: '85-95 cm' },
  'lingkar-pinggang': { label: 'Lingkar Pinggang', desc: 'Ukur bagian terkecil pinggang, biasanya di atas pusar', tip: 'Pita ukur sejajar lantai, tidak terlalu kencang' },
  'lingkar-pinggul': { label: 'Lingkar Pinggul', desc: 'Ukur bagian terlebar pinggul', tip: 'Posisi kaki rapat, ukur 20cm di bawah pinggang' },
  'lingkar-leher': { label: 'Lingkar Leher', desc: 'Ukur lingkar di pangkal leher', tip: 'Beri ruang 1 jari supaya tidak ketat' },
  'lingkar-lengan': { label: 'Lingkar Lengan', desc: 'Lingkar bisep di bagian terlebar', tip: 'Lengan rileks, tidak ditegangkan' },
  'lingkar-pergelangan': { label: 'Lingkar Pergelangan', desc: 'Lingkar di pergelangan tangan', tip: 'Ukur tepat di tulang pergelangan' },
  'lingkar-paha': { label: 'Lingkar Paha', desc: 'Lingkar bagian terlebar paha atas', tip: 'Berat badan dibagi rata di kedua kaki' },
  'lingkar-lutut': { label: 'Lingkar Lutut', desc: 'Lingkar tepat di tempurung lutut', tip: 'Kaki lurus, tidak menekuk' },
  'lebar-bahu': { label: 'Lebar Bahu', desc: 'Ukur dari ujung bahu kiri ke ujung bahu kanan', tip: 'Lewatkan pita di belakang leher' },
  'lebar-punggung': { label: 'Lebar Punggung', desc: 'Lebar punggung dari ketiak ke ketiak', tip: 'Ukur sejajar 5cm di bawah leher belakang' },
  'panjang-baju': { label: 'Panjang Baju', desc: 'Dari ujung bahu hingga panjang baju yang diinginkan', tip: 'Sesuaikan dengan preferensi panjang' },
  'panjang-kebaya': { label: 'Panjang Kebaya', desc: 'Dari pundak hingga panjang kebaya yang diinginkan', tip: 'Standard: di atas pinggul / di bawah pinggul' },
  'panjang-gaun': { label: 'Panjang Gaun', desc: 'Dari pundak hingga panjang gaun', tip: 'Mini, midi, atau maxi' },
  'panjang-jas': { label: 'Panjang Jas', desc: 'Dari pundak hingga ujung bawah jas', tip: 'Idealnya menutupi pantat' },
  'panjang-rok': { label: 'Panjang Rok', desc: 'Dari pinggang hingga panjang rok', tip: 'Mini (di atas lutut), midi (selutut), maxi (di bawah lutut)' },
  'panjang-celana': { label: 'Panjang Celana', desc: 'Dari pinggang hingga panjang celana', tip: 'Ankle, full-length, atau cropped' },
  'panjang-lengan': { label: 'Panjang Lengan', desc: 'Dari ujung bahu hingga ujung lengan', tip: 'Pendek, 3/4, atau panjang' },
  'kerung-lengan': { label: 'Kerung Lengan', desc: 'Lingkar tempat lengan menempel ke badan', tip: 'Ukur dari atas bahu turun ke bawah ketiak dan kembali' },
  'pesak': { label: 'Pesak (Crotch)', desc: 'Dari pinggang depan, bawah, ke pinggang belakang', tip: 'Penting untuk kenyamanan duduk' },
};

const steps = [
  { num: 1, label: 'Jenis Pakaian' },
  { num: 2, label: 'Gaya Fit' },
  { num: 3, label: 'Pengukuran' },
  { num: 4, label: 'Konfirmasi' },
];

// Approximate y-position % for each measurement on body
const bodyPoints: Record<string, { y: number; side?: 'left' | 'right' | 'center'; x?: number }> = {
  'lingkar-leher': { y: 16, x: 50 },
  'lebar-bahu': { y: 22, x: 50 },
  'lebar-punggung': { y: 26, x: 50 },
  'lingkar-dada': { y: 32, x: 50 },
  'kerung-lengan': { y: 28, x: 30 },
  'lingkar-lengan': { y: 38, x: 22 },
  'panjang-lengan': { y: 50, x: 18 },
  'lingkar-pergelangan': { y: 60, x: 14 },
  'lingkar-pinggang': { y: 44, x: 50 },
  'lingkar-pinggul': { y: 54, x: 50 },
  'pesak': { y: 58, x: 50 },
  'lingkar-paha': { y: 64, x: 42 },
  'lingkar-lutut': { y: 78, x: 40 },
  'panjang-celana': { y: 92, x: 40 },
  'panjang-rok': { y: 70, x: 50 },
  'panjang-baju': { y: 50, x: 60 },
  'panjang-kebaya': { y: 56, x: 60 },
  'panjang-gaun': { y: 78, x: 60 },
  'panjang-jas': { y: 56, x: 60 },
};

export function VirtualMeasurement({ onBack, onSave }: Props) {
  const [step, setStep] = useState(1);
  const [clothingId, setClothingId] = useState<string | null>(null);
  const [fitId, setFitId] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [bodyView, setBodyView] = useState<'front' | 'back'>('front');
  const [presetSize, setPresetSize] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const applyPreset = (size: string) => {
    setPresetSize(size);
    const chart = sizeChart[size];
    const next: Record<string, string> = { ...measurements };
    requiredFields.forEach((f) => {
      if (chart[f] != null) next[f] = String(chart[f]);
    });
    setMeasurements(next);
  };

  const clothing = clothingTypes.find((c) => c.id === clothingId);
  const fit = fitStyles.find((f) => f.id === fitId);
  const requiredFields = clothing?.measurements ?? [];
  const filledCount = requiredFields.filter((f) => measurements[f] && parseFloat(measurements[f]) > 0).length;

  const canProceed = (() => {
    if (step === 1) return !!clothingId;
    if (step === 2) return !!fitId;
    if (step === 3) return filledCount === requiredFields.length;
    return true;
  })();

  const next = () => {
    if (step < 4) setStep(step + 1);
    else {
      onSave?.({ clothingId, fitId, measurements });
      setDone(true);
    }
  };
  const prev = () => step > 1 ? setStep(step - 1) : onBack();

  if (done) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-24 h-24 rounded-full bg-[#B8926A] flex items-center justify-center mx-auto mb-8 shadow-[0_20px_60px_rgba(184,146,106,0.4)]">
            <Save className="w-12 h-12 text-white" strokeWidth={2.5} />
          </motion.div>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-[#B8926A]"></div>
            <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Ukuran Tersimpan</div>
            <div className="w-12 h-px bg-[#B8926A]"></div>
          </div>
          <h1 className="text-4xl md:text-5xl text-[#2C1810] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            Selamat, Profil <span className="italic text-[#B8926A]">Tersimpan</span>
          </h1>
          <p className="text-[#2C1810]/75 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Profil ukuran {clothing?.label} ({fit?.label}) Anda berhasil disimpan dan akan otomatis terisi pada pesanan berikutnya.
          </p>
          <button onClick={onBack} className="px-10 py-3.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            <span className="text-[13px] tracking-[0.15em] uppercase">Selesai</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={prev} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#2C1810]/15 text-[#2C1810] hover:border-[#B8926A] transition-all" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-[13px]">{step === 1 ? 'Kembali' : 'Sebelumnya'}</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#B8926A] hidden md:block"></div>
            <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Virtual Measurement
            </div>
            <div className="w-12 h-px bg-[#B8926A] hidden md:block"></div>
          </div>
        </div>

        {step === 1 && (
          <>
            <PageHeader title="Pilih" italic="Jenis Pakaian" subtitle="Standar pengukuran berbeda untuk setiap jenis pakaian. Pilih yang ingin Anda ukur." />

            {/* Group by category */}
            {(['atasan', 'bawahan', 'gaun', 'tradisional'] as const).map((cat) => {
              const items = clothingTypes.filter((c) => c.category === cat);
              if (items.length === 0) return null;
              const labels = { atasan: 'Atasan', bawahan: 'Bawahan', gaun: 'Gaun & Dress', tradisional: 'Tradisional Indonesia' };
              return (
                <div key={cat} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      {labels[cat]}
                    </div>
                    <div className="flex-1 h-px bg-[#2C1810]/10"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {items.map((c) => {
                      const active = clothingId === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setClothingId(c.id)}
                          className={`text-left p-5 rounded-2xl border-2 transition-all ${
                            active ? 'border-[#B8926A] bg-[#B8926A]/10 shadow-md' : 'border-[#2C1810]/10 bg-white hover:border-[#B8926A]/50'
                          }`}
                        >
                          <div className="text-4xl mb-3">{c.icon}</div>
                          <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '17px' }}>{c.label}</div>
                          <div className="text-[11px] text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            {c.measurements.length} titik ukur
                          </div>
                          {active && <div className="mt-2 text-[10px] text-[#B8926A] flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}><Check className="w-3 h-3" strokeWidth={3} /> DIPILIH</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {step === 2 && (
          <>
            <PageHeader title="Pilih" italic="Gaya Fit" subtitle={`Tentukan seberapa pas atau longgar ${clothing?.label} yang Anda inginkan. Sistem akan menyesuaikan ukuran secara otomatis.`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {fitStyles.map((f) => {
                const active = fitId === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFitId(f.id)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all ${
                      active ? 'border-[#B8926A] bg-[#B8926A]/10 shadow-md' : 'border-[#2C1810]/10 bg-white hover:border-[#B8926A]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <FitIcon id={f.id} active={active} />
                      {active && <div className="w-6 h-6 rounded-full bg-[#2C1810] text-white flex items-center justify-center"><Check className="w-3.5 h-3.5" strokeWidth={3} /></div>}
                    </div>
                    <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '20px' }}>
                      {f.label}
                    </div>
                    <div className="text-[13px] text-[#2C1810]/75 mb-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      {f.desc}
                    </div>
                    <div className="text-[11px] tracking-[0.15em] uppercase text-[#8B6544] flex items-center gap-1.5 mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      <Sparkles className="w-3 h-3" /> Ease: {f.ease}
                    </div>
                    <div className="pt-3 border-t border-[#2C1810]/10">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#2C1810]/50 mb-1.5" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Contoh konkret</div>
                      <div className="text-[12px] text-[#2C1810]/85 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Lingkar dada tubuh <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>88 cm</span> → baju jadi <span className="text-[#B8926A]" style={{ fontWeight: 700 }}>{88 + easeForField('lingkar-dada', f.id)} cm</span>
                        {f.id === 'crop' && <span className="text-[#2C1810]/60"> · panjang -15 cm</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <PageHeader title="Pengukuran" italic="Tubuh" subtitle="Klik titik pada figur 3D untuk membaca panduan, atau isi langsung di sebelah kanan. Gunakan satuan sentimeter (cm)." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D-ish body */}
              <div className="bg-gradient-to-br from-[#FAF8F5] via-white to-[#B8926A]/10 border border-[#2C1810]/10 rounded-2xl p-6 relative overflow-hidden lg:sticky lg:top-24 lg:self-start">
                <div className="absolute top-4 right-4 flex items-center gap-1 z-20">
                  <button onClick={() => setBodyView('front')} className={`px-3 py-1.5 rounded-full text-[11px] transition-all ${bodyView === 'front' ? 'bg-[#2C1810] text-white' : 'bg-white text-[#2C1810]/70 border border-[#2C1810]/15'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    Depan
                  </button>
                  <button onClick={() => setBodyView('back')} className={`px-3 py-1.5 rounded-full text-[11px] transition-all ${bodyView === 'back' ? 'bg-[#2C1810] text-white' : 'bg-white text-[#2C1810]/70 border border-[#2C1810]/15'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    Belakang
                  </button>
                </div>
                <div className="absolute top-4 left-4 z-20">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Figur 3D
                  </div>
                  <div className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{filledCount}/{requiredFields.length} terisi</div>
                </div>

                <div className="relative h-[560px] flex items-center justify-center perspective-[1200px]">
                  <motion.div
                    key={bodyView}
                    initial={{ rotateY: bodyView === 'back' ? 180 : 0, opacity: 0 }}
                    animate={{ rotateY: bodyView === 'back' ? 180 : 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-[240px] h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <BodyFigure />

                    {/* Measurement points */}
                    {requiredFields.map((field) => {
                      const pos = bodyPoints[field];
                      if (!pos) return null;
                      const filled = !!measurements[field] && parseFloat(measurements[field]) > 0;
                      const active = activePoint === field;
                      return (
                        <button
                          key={field}
                          onClick={() => setActivePoint(field)}
                          onMouseEnter={() => setActivePoint(field)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group"
                          style={{ top: `${pos.y}%`, left: `${pos.x ?? 50}%`, transform: bodyView === 'back' ? `translate(-50%, -50%) scaleX(-1)` : `translate(-50%, -50%)` }}
                        >
                          <motion.div
                            animate={active ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                            transition={{ duration: 1, repeat: active ? Infinity : 0 }}
                            className={`relative w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${
                              filled ? 'bg-[#4A7A5C]' : active ? 'bg-[#B8926A]' : 'bg-white border-2 border-[#B8926A]'
                            } shadow-md`}
                          >
                            {filled && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                            {!filled && active && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </motion.div>
                          {active && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1 rounded-md bg-[#2C1810] text-white text-[10px] whitespace-nowrap z-30"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                            >
                              {measurementInfo[field]?.label}
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                </div>

                <div className="bg-white border border-[#2C1810]/10 rounded-sm p-4 mt-2 flex gap-3">
                  <Lightbulb className="w-4 h-4 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div className="text-[12px] text-[#2C1810]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>Tips:</span> Gunakan pita ukur lentur (bukan penggaris). Untuk hasil terbaik, minta bantuan orang lain atau berdiri di depan cermin.
                  </div>
                </div>
              </div>

              {/* Input list */}
              <div className="space-y-3">
                {/* Quick start size chart */}
                <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544] mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                        Quick Start
                      </div>
                      <div className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '17px' }}>
                        Mulai dari <span className="italic text-[#B8926A]">ukuran standar</span>
                      </div>
                      <div className="text-[12px] text-[#2C1810]/70 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Bingung mulai dari mana? Pilih size standar Indonesia, lalu fine-tune per field.
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.keys(sizeChart).map((s) => {
                      const active = presetSize === s;
                      return (
                        <button
                          key={s}
                          onClick={() => applyPreset(s)}
                          className={`p-2.5 rounded-sm border-2 transition-all text-center ${
                            active ? 'border-[#B8926A] bg-[#B8926A]/10' : 'border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A]/40'
                          }`}
                        >
                          <div className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px' }}>
                            {s}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {presetSize && (
                    <div className="mt-3 text-[11px] text-[#2C1810]/65 flex items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      <Info className="w-3 h-3 text-[#B8926A]" strokeWidth={2.5} />
                      <span>Auto-fill {presetSize} · {sizeMeta[presetSize]}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Detail Ukuran
                  </div>
                  <div className="text-[11px] text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Tap saran untuk mengisi cepat
                  </div>
                </div>

                {requiredFields.map((field) => {
                  const info = measurementInfo[field];
                  if (!info) return null;
                  const filled = !!measurements[field] && parseFloat(measurements[field]) > 0;
                  const isActive = activePoint === field;
                  return (
                    <div
                      key={field}
                      onClick={() => setActivePoint(field)}
                      className={`bg-white border-2 rounded-2xl p-4 transition-all cursor-pointer ${
                        isActive ? 'border-[#B8926A] shadow-md' : filled ? 'border-[#4A7A5C]/30' : 'border-[#2C1810]/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${filled ? 'bg-[#4A7A5C]' : 'bg-[#B8926A]'}`}></div>
                            <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{info.label}</div>
                          </div>
                          <div className="text-[12px] text-[#2C1810]/70 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{info.desc}</div>
                        </div>
                        <div className="relative shrink-0">
                          <input
                            type="number"
                            value={measurements[field] || ''}
                            onChange={(e) => setMeasurements({ ...measurements, [field]: e.target.value })}
                            onFocus={() => setActivePoint(field)}
                            placeholder="0"
                            className="w-24 pl-3 pr-9 py-2 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] focus:outline-none focus:border-[#B8926A] transition-colors text-right"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#2C1810]/50" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>cm</span>
                        </div>
                      </div>
                      {(() => {
                        const suggestSize = presetSize ?? 'M';
                        const suggested = sizeChart[suggestSize]?.[field];
                        if (suggested == null) return null;
                        const matches = filled && Math.abs(parseFloat(measurements[field]) - suggested) < 0.5;
                        return (
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#2C1810]/50" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                              Saran ukuran tubuh:
                            </span>
                            {(['S', 'M', 'L'] as const).map((s) => {
                              const v = sizeChart[s][field];
                              if (v == null) return null;
                              const isCurrent = filled && Math.abs(parseFloat(measurements[field]) - v) < 0.5;
                              return (
                                <button
                                  key={s}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMeasurements({ ...measurements, [field]: String(v) });
                                  }}
                                  className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
                                    isCurrent
                                      ? 'bg-[#2C1810] text-white'
                                      : 'bg-[#B8926A]/10 text-[#8B6544] hover:bg-[#B8926A] hover:text-white border border-[#B8926A]/25'
                                  }`}
                                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                                >
                                  {s}: {v} cm
                                </button>
                              );
                            })}
                            {!filled && (
                              <span className="text-[10px] text-[#2C1810]/50" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                                ← klik untuk isi
                              </span>
                            )}
                          </div>
                        );
                      })()}
                      {filled && fit && (() => {
                        const body = parseFloat(measurements[field]);
                        const ease = easeForField(field, fit.id);
                        const finished = body + ease;
                        return (
                          <div className="mt-2 p-3 rounded-sm bg-[#FAF8F5] border border-[#2C1810]/[0.06]">
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <div className="text-[11px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                                Tubuh → Baju jadi ({fit.label})
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[11px] text-[#2C1810]/55" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{body} cm</span>
                                <ChevronRight className="w-3 h-3 text-[#2C1810]/40" strokeWidth={2.5} />
                                <span className="text-[#B8926A]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '15px' }}>{finished} cm</span>
                                <span className="text-[10px] text-[#2C1810]/50" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                                  ({ease >= 0 ? '+' : ''}{ease})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[10px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                              {fitStyles.map((fs) => {
                                const v = body + easeForField(field, fs.id);
                                const isCurrent = fs.id === fit.id;
                                return (
                                  <span
                                    key={fs.id}
                                    className={`px-2 py-1 rounded-sm flex-1 text-center transition-colors ${
                                      isCurrent ? 'bg-[#2C1810] text-white' : 'bg-white border border-[#2C1810]/10 text-[#2C1810]/65'
                                    }`}
                                  >
                                    <span className="block text-[9px] tracking-wider uppercase opacity-70">{fs.label.split(' ')[0]}</span>
                                    <span style={{ fontWeight: 700 }}>{v}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="mt-2 pt-3 border-t border-[#2C1810]/10 flex items-start gap-2 text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                              <Info className="w-3.5 h-3.5 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2.5} />
                              <div>
                                <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>Cara ukur:</span> <span className="text-[#2C1810]/75">{info.tip}</span>
                                {info.ideal && <div className="text-[11px] text-[#8B6544] mt-1" style={{ fontWeight: 700 }}>Rentang umum: {info.ideal}</div>}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <PageHeader title="Konfirmasi" italic="Ukuran" subtitle="Tinjau ulang ukuran Anda. Profil ini akan tersimpan di akun dan otomatis terisi pada pesanan berikutnya." />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-[#2C1810]/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#2C1810]/10">
                  <div>
                    <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544] mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Profil Ukuran</div>
                    <div className="text-2xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                      {clothing?.icon} {clothing?.label} <span className="text-[#B8926A] italic">— {fit?.label}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {requiredFields.map((field) => {
                    const info = measurementInfo[field];
                    return (
                      <div key={field} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-2 h-2 rounded-full bg-[#B8926A] shrink-0"></div>
                          <span className="text-[13px] text-[#2C1810]/80 truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{info?.label}</span>
                        </div>
                        <span className="text-[#2C1810] shrink-0" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{measurements[field]} cm</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-[#2C1810] text-white rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[9rem] leading-none text-white/[0.04] pointer-events-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>T</div>
                <div className="relative">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Manfaat</div>
                  {[
                    'Otomatis terisi di pesanan baru',
                    'Bisa disimpan multi-profil',
                    'Bagikan ke penjahit dengan satu klik',
                    'Update kapan saja',
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-[13px] text-white/85 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      <Check className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Stepper at bottom + nav */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {steps.map((s) => {
              const active = step === s.num;
              const done = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] transition-all ${
                    done ? 'bg-[#B8926A] text-white' : active ? 'bg-[#2C1810] text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810]/40'
                  }`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.num}
                  </div>
                  {s.num < steps.length && <div className={`w-6 h-0.5 ${done ? 'bg-[#B8926A]' : 'bg-[#2C1810]/15'}`}></div>}
                </div>
              );
            })}
          </div>
          <button
            onClick={next}
            disabled={!canProceed}
            className="flex items-center gap-2 px-8 py-3.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] disabled:bg-[#2C1810]/20 disabled:cursor-not-allowed transition-all shadow-md"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            <span className="text-[13px] tracking-[0.1em] uppercase">{step === 4 ? 'Simpan Profil' : 'Lanjut'}</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ title, italic, subtitle }: { title: string; italic: string; subtitle: string }) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl md:text-5xl text-[#2C1810] mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
        {title} <span className="italic text-[#B8926A]">{italic}</span>
      </h1>
      <p className="text-[#2C1810]/75 max-w-2xl text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{subtitle}</p>
    </div>
  );
}

function FitIcon({ id, active }: { id: string; active: boolean }) {
  const widths: Record<string, number> = { slim: 28, regular: 36, loose: 48, oversized: 60, crop: 36 };
  const heights: Record<string, number> = { slim: 56, regular: 56, loose: 56, oversized: 56, crop: 36 };
  const w = widths[id] ?? 36;
  const h = heights[id] ?? 56;
  return (
    <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#2C1810]/10 flex items-center justify-center">
      <div className={`rounded-t-2xl rounded-b-md transition-colors ${active ? 'bg-[#B8926A]' : 'bg-[#2C1810]/40'}`} style={{ width: w, height: h }}></div>
    </div>
  );
}

function BodyFigure() {
  return (
    <svg viewBox="0 0 240 600" className="w-full h-full drop-shadow-[0_20px_40px_rgba(44,24,16,0.15)]" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FAF8F5" />
          <stop offset="50%" stopColor="#E8DCC8" />
          <stop offset="100%" stopColor="#B8926A" />
        </linearGradient>
        <linearGradient id="bodyShadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2C1810" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#2C1810" stopOpacity="0" />
          <stop offset="100%" stopColor="#2C1810" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Head */}
      <circle cx="120" cy="55" r="38" fill="url(#bodyGrad)" />
      <circle cx="120" cy="55" r="38" fill="url(#bodyShadow)" />
      {/* Neck */}
      <rect x="108" y="88" width="24" height="22" rx="6" fill="url(#bodyGrad)" />
      {/* Torso */}
      <path d="M 70 110 L 170 110 Q 188 115 188 135 L 180 280 Q 178 295 168 300 L 72 300 Q 62 295 60 280 L 52 135 Q 52 115 70 110 Z" fill="url(#bodyGrad)" />
      <path d="M 70 110 L 170 110 Q 188 115 188 135 L 180 280 Q 178 295 168 300 L 72 300 Q 62 295 60 280 L 52 135 Q 52 115 70 110 Z" fill="url(#bodyShadow)" />
      {/* Waist */}
      <path d="M 60 270 Q 70 290 120 290 Q 170 290 180 270 L 178 300 L 62 300 Z" fill="#B8926A" opacity="0.15" />
      {/* Arms left */}
      <path d="M 52 130 Q 38 140 32 180 L 28 250 Q 26 280 36 290 L 48 295 Q 58 290 56 270 L 60 200 Q 62 160 70 140 Z" fill="url(#bodyGrad)" />
      {/* Arms right */}
      <path d="M 188 130 Q 202 140 208 180 L 212 250 Q 214 280 204 290 L 192 295 Q 182 290 184 270 L 180 200 Q 178 160 170 140 Z" fill="url(#bodyGrad)" />
      <path d="M 188 130 Q 202 140 208 180 L 212 250 Q 214 280 204 290 L 192 295 Q 182 290 184 270 L 180 200 Q 178 160 170 140 Z" fill="url(#bodyShadow)" opacity="0.6" />
      {/* Hips & legs */}
      <path d="M 62 300 L 178 300 Q 186 305 184 320 L 175 540 Q 173 560 162 562 L 130 562 Q 122 560 122 545 L 122 400 Q 122 380 120 380 Q 118 380 118 400 L 118 545 Q 118 560 110 562 L 78 562 Q 67 560 65 540 L 56 320 Q 54 305 62 300 Z" fill="url(#bodyGrad)" />
      <path d="M 62 300 L 178 300 Q 186 305 184 320 L 175 540 Q 173 560 162 562 L 130 562 Q 122 560 122 545 L 122 400 Q 122 380 120 380 Q 118 380 118 400 L 118 545 Q 118 560 110 562 L 78 562 Q 67 560 65 540 L 56 320 Q 54 305 62 300 Z" fill="url(#bodyShadow)" opacity="0.4" />
      {/* Center reference line */}
      <line x1="120" y1="110" x2="120" y2="295" stroke="#B8926A" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}
