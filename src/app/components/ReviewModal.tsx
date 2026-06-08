import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ImagePlus, Check, Sparkles } from 'lucide-react';

export type ReviewOrder = {
  id: string;
  title: string;
  tailor: string;
  service: string;
  completedAt: string;
};

const CHIPS = [
  'Jahitan rapi',
  'Sesuai ukuran',
  'Tepat waktu',
  'Komunikasi baik',
  'Perlu revisi',
];

export function ReviewModal({
  open,
  order,
  onClose,
  onSubmitted,
}: {
  open: boolean;
  order: ReviewOrder | null;
  onClose: () => void;
  onSubmitted: (orderId: string) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setRating(0);
      setHover(0);
      setComment('');
      setChips([]);
      setPhotos([]);
      setDone(false);
    }
  }, [open, order?.id]);

  if (!order) return null;

  const toggleChip = (c: string) =>
    setChips((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).slice(0, 4 - photos.length).map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...next].slice(0, 4));
  };

  const ratingLabel = ['Pilih rating', 'Kurang memuaskan', 'Cukup', 'Baik', 'Sangat baik', 'Luar biasa'][hover || rating];
  const canSubmit = rating > 0;

  const submit = () => {
    setDone(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2C1810]/55 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl shadow-[0_30px_80px_-20px_rgba(44,24,16,0.4)] overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Decorative watermark */}
            <div className="absolute -top-10 -right-6 text-[10rem] leading-none text-[#2C1810]/[0.04] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
              {done ? '✓' : '★'}
            </div>

            {!done ? (
              <>
                {/* Header */}
                <div className="relative px-8 pt-8 pb-6 border-b border-[#2C1810]/8">
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#2C1810]/10 hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/70 transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-px bg-[#B8926A]" />
                    <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      Ulasan Pesanan
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-[2rem] leading-tight text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
                    Bagaimana hasil <span className="italic text-[#B8926A]">jahitannya</span>?
                  </h2>
                  <p className="text-[#2C1810]/65 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Berikan ulasan untuk membantu pengguna lain memilih penjahit yang tepat.
                  </p>
                </div>

                {/* Body */}
                <div className="overflow-y-auto px-8 py-6 space-y-7">
                  {/* Order summary card */}
                  <div className="bg-white border border-[#2C1810]/8 rounded-2xl p-5">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <SummaryItem label="Nama Pesanan" value={order.title} />
                      <SummaryItem label="Penjahit" value={order.tailor} />
                      <SummaryItem label="Jenis Layanan" value={order.service} />
                      <SummaryItem label="Tanggal Selesai" value={order.completedAt} />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/60" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                        Rating Layanan
                      </span>
                      <span className="text-xs text-[#2C1810]/55" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {ratingLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2" onMouseLeave={() => setHover(0)}>
                      {[1, 2, 3, 4, 5].map((n) => {
                        const active = (hover || rating) >= n;
                        return (
                          <button
                            key={n}
                            type="button"
                            onMouseEnter={() => setHover(n)}
                            onClick={() => setRating(n)}
                            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                              active
                                ? 'bg-[#B8926A]/12 border-[#B8926A]'
                                : 'bg-white border-[#2C1810]/10 hover:border-[#2C1810]/25'
                            }`}
                          >
                            <Star
                              className={`w-5 h-5 transition-all ${active ? 'text-[#B8926A]' : 'text-[#2C1810]/25'}`}
                              fill={active ? '#B8926A' : 'none'}
                              strokeWidth={1.5}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick chips */}
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/60 mb-3 block" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      Apa yang menonjol?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CHIPS.map((c) => {
                        const active = chips.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleChip(c)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs border transition-all ${
                              active
                                ? 'bg-[#2C1810] border-[#2C1810] text-[#FAF8F5]'
                                : 'bg-white border-[#2C1810]/12 text-[#2C1810]/75 hover:border-[#2C1810]/30'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {active && <Check className="w-3 h-3 text-[#B8926A]" strokeWidth={3} />}
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/60 mb-3 block" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      Ceritakan Pengalaman Anda
                    </span>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ceritakan pengalaman Anda…"
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-[#2C1810]/10 rounded-xl text-sm text-[#2C1810] placeholder:text-[#2C1810]/35 focus:outline-none focus:border-[#B8926A] focus:ring-4 focus:ring-[#B8926A]/10 transition-all resize-none"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                    <div className="text-right text-[10px] text-[#2C1810]/40 mt-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {comment.length}/500
                    </div>
                  </div>

                  {/* Photo upload */}
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/60 mb-3 block" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      Unggah Foto Hasil Jahitan (opsional)
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {photos.map((src, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#2C1810]/10 group">
                          <img src={src} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#2C1810]/80 text-[#FAF8F5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" strokeWidth={2} />
                          </button>
                        </div>
                      ))}
                      {photos.length < 4 && (
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="w-20 h-20 rounded-xl border border-dashed border-[#2C1810]/20 bg-white flex flex-col items-center justify-center gap-1 text-[#2C1810]/55 hover:border-[#B8926A] hover:text-[#B8926A] transition-colors"
                        >
                          <ImagePlus className="w-4 h-4" strokeWidth={1.5} />
                          <span className="text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>Tambah</span>
                        </button>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => onFiles(e.target.files)}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-[#2C1810]/8 bg-white flex flex-col-reverse sm:flex-row gap-3 sm:items-center sm:justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full text-[11px] tracking-[0.25em] uppercase text-[#2C1810]/70 hover:text-[#2C1810] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    Nanti Saja
                  </button>
                  <button
                    onClick={submit}
                    disabled={!canSubmit}
                    className="px-7 py-3.5 rounded-full bg-[#2C1810] text-[#FAF8F5] text-[11px] tracking-[0.25em] uppercase hover:bg-[#B8926A] hover:text-[#2C1810] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#2C1810] disabled:hover:text-[#FAF8F5]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </>
            ) : (
              // Success state
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-8 py-14 text-center relative"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  className="relative w-24 h-24 mx-auto mb-8"
                >
                  <div className="absolute inset-0 rounded-full bg-[#B8926A]/15" />
                  <div className="absolute inset-3 rounded-full bg-[#2C1810] flex items-center justify-center">
                    <Check className="w-9 h-9 text-[#B8926A]" strokeWidth={2.2} />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#B8926A]" strokeWidth={1.5} fill="#B8926A" />
                </motion.div>

                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-8 h-px bg-[#B8926A]" />
                  <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Terima Kasih
                  </div>
                  <div className="w-8 h-px bg-[#B8926A]" />
                </div>

                <h3 className="text-3xl md:text-4xl text-[#2C1810] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
                  Ulasan berhasil <span className="italic text-[#B8926A]">dikirim</span>
                </h3>
                <p className="text-[#2C1810]/65 max-w-sm mx-auto mb-10 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Terima kasih telah membantu meningkatkan kualitas layanan Tailora.
                </p>
                <button
                  onClick={() => {
                    onSubmitted(order.id);
                    onClose();
                  }}
                  className="px-8 py-4 rounded-full bg-[#2C1810] text-[#FAF8F5] text-[11px] tracking-[0.25em] uppercase hover:bg-[#B8926A] hover:text-[#2C1810] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  Kembali ke Pesanan
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] tracking-[0.3em] uppercase text-[#2C1810]/45 mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
        {label}
      </div>
      <div className="text-sm text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
        {value}
      </div>
    </div>
  );
}
