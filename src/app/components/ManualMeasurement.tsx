import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, FileText, Save, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Props = { onBack: () => void; onSave?: (data: any) => void };

const clothingTypes = [
  { id: 'kebaya', label: 'Kebaya', icon: '👘', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lingkar-pinggul', 'panjang-kebaya', 'lebar-bahu', 'lingkar-lengan', 'panjang-lengan'] },
  { id: 'gaun', label: 'Gaun / Dress', icon: '👗', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lingkar-pinggul', 'panjang-gaun', 'lebar-bahu', 'panjang-lengan'] },
  { id: 'kemeja', label: 'Kemeja', icon: '👔', measurements: ['lingkar-leher', 'lingkar-dada', 'lingkar-pinggang', 'lebar-bahu', 'panjang-baju', 'panjang-lengan'] },
  { id: 'tshirt', label: 'T-Shirt', icon: '👕', measurements: ['lingkar-dada', 'lebar-bahu', 'panjang-baju', 'panjang-lengan'] },
  { id: 'jas', label: 'Jas / Blazer', icon: '🧥', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lebar-bahu', 'lebar-punggung', 'panjang-jas', 'panjang-lengan'] },
  { id: 'batik', label: 'Batik', icon: '🪭', measurements: ['lingkar-dada', 'lingkar-pinggang', 'lebar-bahu', 'panjang-baju', 'panjang-lengan'] },
  { id: 'celana', label: 'Celana', icon: '👖', measurements: ['lingkar-pinggang', 'lingkar-pinggul', 'lingkar-paha', 'panjang-celana'] },
  { id: 'rok', label: 'Rok', icon: '👚', measurements: ['lingkar-pinggang', 'lingkar-pinggul', 'panjang-rok'] },
];

const labels: Record<string, string> = {
  'lingkar-dada': 'Lingkar Dada',
  'lingkar-pinggang': 'Lingkar Pinggang',
  'lingkar-pinggul': 'Lingkar Pinggul',
  'lingkar-leher': 'Lingkar Leher',
  'lingkar-lengan': 'Lingkar Lengan',
  'lingkar-paha': 'Lingkar Paha',
  'lebar-bahu': 'Lebar Bahu',
  'lebar-punggung': 'Lebar Punggung',
  'panjang-baju': 'Panjang Baju',
  'panjang-kebaya': 'Panjang Kebaya',
  'panjang-gaun': 'Panjang Gaun',
  'panjang-jas': 'Panjang Jas',
  'panjang-rok': 'Panjang Rok',
  'panjang-celana': 'Panjang Celana',
  'panjang-lengan': 'Panjang Lengan',
};

export function ManualMeasurement({ onBack, onSave }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [clothingId, setClothingId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const clothing = clothingTypes.find((c) => c.id === clothingId);
  const filledCount = clothing ? clothing.measurements.filter((m) => values[m]?.trim()).length : 0;
  const totalCount = clothing?.measurements.length ?? 0;
  const allFilled = clothing && filledCount === totalCount;

  const handleSave = () => {
    onSave?.({ clothingId, values, mode: 'manual' });
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-[#B8926A] flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Check className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Tersimpan
          </div>
          <h2 className="text-3xl text-[#2C1810] mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            Ukuran <span className="italic text-[#B8926A]">Berhasil Disimpan</span>
          </h2>
          <p className="text-[#2C1810]/70 text-sm mb-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Ukuran {clothing?.label} kamu sudah terkirim ke penjahit dan akan otomatis terpakai untuk pesanan ini.
          </p>
          <button onClick={onBack} className="px-10 py-3.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            Kembali
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-10 py-10">
        {/* Top */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => (step === 1 ? onBack() : setStep(1))}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#2C1810]/15 text-[#2C1810] hover:border-[#B8926A] transition-all"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-[13px]">{step === 1 ? 'Batal' : 'Kembali'}</span>
          </button>
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Input Manual · Langkah {step} dari 2
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#B8926A]/15 border border-[#B8926A]/25 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
            </div>
            <div className="text-[10px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              {step === 1 ? 'Pilih Jenis Pakaian' : 'Masukkan Ukuran'}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl text-[#2C1810] leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            {step === 1 ? (
              <>Sudah tahu ukuranmu?<br /><span className="italic text-[#B8926A]">Tinggal isi.</span></>
            ) : (
              <>Detail Ukuran <span className="italic text-[#B8926A]">{clothing?.label}</span></>
            )}
          </h1>
          <p className="text-[#2C1810]/70 text-base mt-3 max-w-2xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            {step === 1
              ? 'Cocok kalau kamu sudah punya angka pasti dari pengukuran sebelumnya. Pilih jenis pakaian, lalu masukkan ukurannya.'
              : 'Isi semua field dalam sentimeter (cm). Kosongkan jika ragu — kamu bisa konsultasi dengan penjahit nanti.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {clothingTypes.map((c) => {
                const active = clothingId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => { setClothingId(c.id); setStep(2); }}
                    className={`p-5 rounded-sm border-2 transition-all text-left ${
                      active ? 'border-[#B8926A] bg-[#B8926A]/10' : 'border-[#2C1810]/10 bg-white hover:border-[#B8926A]/40'
                    }`}
                  >
                    <div className="text-3xl mb-3">{c.icon}</div>
                    <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                      {c.label}
                    </div>
                    <div className="text-[11px] text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      {c.measurements.length} field ukuran
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {step === 2 && clothing && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1fr_320px] gap-6"
            >
              {/* Form */}
              <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {clothing.measurements.map((m) => (
                    <div key={m}>
                      <label className="block text-[12px] text-[#2C1810]/70 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {labels[m] ?? m}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          inputMode="decimal"
                          value={values[m] ?? ''}
                          onChange={(e) => setValues({ ...values, [m]: e.target.value })}
                          placeholder="0"
                          className="w-full px-4 py-3 pr-12 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[#2C1810] focus:outline-none focus:border-[#B8926A] transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '15px' }}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C1810]/40 text-[12px]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                          cm
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-sm bg-[#B8926A]/[0.06] border border-[#B8926A]/15 flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2} />
                  <div className="text-[12px] text-[#2C1810]/75 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Belum yakin dengan ukurannya? Pakai mode <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>Virtual Measurement</span> untuk panduan visual step-by-step, atau pilih <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>Fitting Offline</span> untuk pengukuran langsung di atelier.
                  </div>
                </div>
              </div>

              {/* Sidebar summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-[#2C1810] text-white rounded-2xl p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#D4B896] mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Ringkasan
                  </div>
                  <div className="text-2xl mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    {clothing.label}
                  </div>
                  <div className="text-[12px] text-white/60 mb-5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    {filledCount} dari {totalCount} field terisi
                  </div>

                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
                    <motion.div
                      className="h-full bg-[#B8926A]"
                      initial={false}
                      animate={{ width: `${(filledCount / totalCount) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={filledCount === 0}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full transition-all ${
                      filledCount === 0
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-[#B8926A] text-white hover:bg-white hover:text-[#2C1810]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px' }}
                  >
                    <Save className="w-4 h-4" strokeWidth={2.5} />
                    Simpan Ukuran
                  </button>

                  {!allFilled && filledCount > 0 && (
                    <div className="mt-4 flex items-start gap-2 text-[11px] text-white/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      <Sparkles className="w-3 h-3 text-[#B8926A] shrink-0 mt-0.5" />
                      Field kosong akan ditandai untuk konsultasi dengan penjahit.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step === 2 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#2C1810]/15 text-[#2C1810] hover:border-[#B8926A] transition-colors text-[13px]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Ganti Jenis Pakaian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
