import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search, Plus, Minus, MessageCircle, Mail, Phone, Sparkles, ShoppingBag, Ruler, CreditCard, Truck, RefreshCw, Shield } from 'lucide-react';

type Category = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

type FAQItem = {
  q: string;
  a: string;
  cat: string;
};

const categories: Category[] = [
  { id: 'all', label: 'Semua', icon: Sparkles },
  { id: 'umum', label: 'Umum', icon: ShoppingBag },
  { id: 'pemesanan', label: 'Pemesanan', icon: ShoppingBag },
  { id: 'ukuran', label: 'Ukuran & Virtual Measurement', icon: Ruler },
  { id: 'pembayaran', label: 'Pembayaran', icon: CreditCard },
  { id: 'pengiriman', label: 'Pengiriman', icon: Truck },
  { id: 'pengembalian', label: 'Penukaran & Pengembalian', icon: RefreshCw },
  { id: 'jaminan', label: 'Jaminan Kualitas', icon: Shield },
];

const faqs: FAQItem[] = [
  {
    cat: 'umum',
    q: 'Apa itu Tailora?',
    a: 'Tailora adalah marketplace yang menghubungkan Anda dengan penjahit lokal terverifikasi di seluruh Indonesia. Anda bisa memesan layanan permak, jahit baru reguler, hingga custom design dengan harga transparan dan jaminan kualitas.',
  },
  {
    cat: 'umum',
    q: 'Apakah semua penjahit di Tailora terverifikasi?',
    a: 'Ya. Setiap penjahit melalui proses verifikasi identitas, portofolio, dan tes jahit oleh tim kurasi Tailora sebelum dapat menerima pesanan. Anda dapat melihat label "Verified" pada profil penjahit.',
  },
  {
    cat: 'pemesanan',
    q: 'Bagaimana cara memesan layanan jahit di Tailora?',
    a: 'Pilih penjahit di halaman Penjahit, tentukan jenis layanan (permak, jahit baru, atau custom), unggah referensi, isi ukuran melalui Virtual Measurement, konfirmasi alamat, lalu lakukan pembayaran DP. Pesanan akan langsung diteruskan ke penjahit.',
  },
  {
    cat: 'pemesanan',
    q: 'Berapa kisaran harga layanan di Tailora?',
    a: 'Permak mulai dari Rp 35.000–Rp 50.000, jahit baru reguler mulai Rp 350.000, dan custom design mulai Rp 800.000. Harga final ditentukan oleh penjahit berdasarkan kompleksitas pesanan.',
  },
  {
    cat: 'pemesanan',
    q: 'Berapa lama waktu pengerjaan pesanan?',
    a: 'Permak rata-rata 3–5 hari kerja, jahit baru 10–14 hari kerja, dan custom design 14–21 hari kerja. Estimasi spesifik akan ditampilkan di halaman penjahit sebelum Anda checkout.',
  },
  {
    cat: 'pemesanan',
    q: 'Bisakah saya berkomunikasi langsung dengan penjahit?',
    a: 'Tentu. Setelah pesanan dikonfirmasi, fitur Chat Live akan aktif di halaman pesanan Anda sehingga Anda dapat berdiskusi detail desain, bahan, dan progres pengerjaan.',
  },
  {
    cat: 'ukuran',
    q: 'Apa itu Virtual Measurement?',
    a: 'Virtual Measurement adalah fitur 3D figure interaktif yang memandu Anda mengisi ukuran tubuh dengan akurat. Anda cukup memasukkan beberapa parameter dasar dan sistem akan menghasilkan profil ukuran lengkap yang dapat disimpan di profil.',
  },
  {
    cat: 'ukuran',
    q: 'Apakah saya bisa menggunakan ukuran manual?',
    a: 'Bisa. Selain Virtual Measurement, kami menyediakan opsi Manual Measurement untuk Anda yang sudah memiliki data ukuran lengkap. Anda juga dapat datang ke Atelier Tailora terdekat untuk diukur langsung.',
  },
  {
    cat: 'pembayaran',
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Kami menerima transfer Virtual Account BCA & PERMATA, e-wallet (OVO, DANA), kartu kredit VISA/Mastercard, serta pembayaran via QRIS.',
  },
  {
    cat: 'pembayaran',
    q: 'Mengapa saya hanya membayar DP di awal?',
    a: 'Tailora menggunakan sistem escrow. Anda membayar 50% sebagai DP di awal, dan sisa 50% saat pesanan selesai dikerjakan dan siap dikirim. Dana ditahan di Tailora dan baru diteruskan ke penjahit setelah Anda menerima pesanan.',
  },
  {
    cat: 'pembayaran',
    q: 'Berapa lama batas waktu pembayaran DP?',
    a: 'Setelah checkout, Anda memiliki waktu 2 jam untuk menyelesaikan pembayaran DP. Jika melewati batas, pesanan akan otomatis dibatalkan dan slot penjahit dilepas.',
  },
  {
    cat: 'pengiriman',
    q: 'Kurir apa yang digunakan untuk pengiriman?',
    a: 'Kami bekerja sama dengan JNE, J&T, SiCepat untuk pengiriman antar kota, serta Gosend dan GrabExpress untuk area dalam kota. Pilihan kurir dapat Anda tentukan saat checkout.',
  },
  {
    cat: 'pengiriman',
    q: 'Bagaimana cara melacak pesanan saya?',
    a: 'Setiap pesanan memiliki status real-time melalui Order Tracking 5 Tahap: Menunggu Pembayaran → Diproses Penjahit → Sedang Dijahit → Quality Check → Dalam Pengiriman. Anda dapat memantaunya kapan saja di halaman Pesanan.',
  },
  {
    cat: 'pengembalian',
    q: 'Bisakah saya menukar atau mengembalikan pesanan?',
    a: 'Untuk pakaian custom, pengembalian hanya berlaku jika hasil jahit tidak sesuai dengan spesifikasi yang disepakati. Anda memiliki waktu 3x24 jam setelah pesanan diterima untuk mengajukan klaim melalui pusat bantuan.',
  },
  {
    cat: 'pengembalian',
    q: 'Bagaimana jika ukuran tidak pas?',
    a: 'Tailora memberikan garansi free alteration satu kali untuk pesanan jahit baru dan custom design jika ukuran tidak sesuai. Cukup ajukan permintaan alterasi di halaman pesanan dalam 7 hari setelah pesanan diterima.',
  },
  {
    cat: 'jaminan',
    q: 'Apakah kualitas pesanan dijamin?',
    a: 'Setiap pesanan melalui tahap Quality Check oleh tim Tailora sebelum dikirim. Kami memeriksa jahitan, ukuran, dan finishing untuk memastikan sesuai standar. Jika tidak lolos QC, pesanan akan diperbaiki tanpa biaya tambahan.',
  },
  {
    cat: 'jaminan',
    q: 'Apa yang terjadi jika penjahit telat menyelesaikan pesanan?',
    a: 'Jika penjahit melewati estimasi waktu tanpa pemberitahuan, Anda berhak mendapatkan kompensasi berupa voucher Tailora atau opsi pembatalan dengan pengembalian dana penuh.',
  },
];

export function FAQPage({ onBack }: { onBack: () => void }) {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchCat = activeCat === 'all' || f.cat === activeCat;
      const matchQ = query.trim() === '' || (f.q + ' ' + f.a).toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [activeCat, query]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C1810]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#2C1810]/10">
        <div className="absolute -top-20 -right-20 text-[18rem] leading-none text-[#2C1810]/[0.04] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
          FAQ
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-12 pb-20 relative">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-[#2C1810]/70 hover:text-[#2C1810] mb-10 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Kembali
          </button>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#B8926A]" />
              <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                Pusat Bantuan
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
              Pertanyaan yang sering <span className="italic text-[#B8926A]">ditanyakan</span>
            </h1>
            <p className="text-[#2C1810]/70 text-base md:text-lg leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              Temukan jawaban cepat seputar layanan Tailora — dari proses pemesanan, pengukuran, hingga garansi kualitas pesanan Anda.
            </p>

            {/* Search */}
            <div className="mt-10 relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C1810]/40" strokeWidth={1.5} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari pertanyaan, misalnya: pembayaran, ukuran, pengiriman..."
                className="w-full pl-14 pr-6 py-5 bg-white border border-[#2C1810]/10 rounded-full text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#B8926A] focus:ring-2 focus:ring-[#B8926A]/20 transition-all shadow-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar categories */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-5" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Kategori
            </div>
            <ul className="space-y-1">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = activeCat === c.id;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setActiveCat(c.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm transition-all ${
                        active
                          ? 'bg-[#2C1810] text-[#FAF8F5]'
                          : 'text-[#2C1810]/75 hover:bg-[#2C1810]/5 hover:text-[#2C1810]'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-[#B8926A]' : ''}`} strokeWidth={1.5} />
                      <span className="text-left flex-1">{c.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Accordion */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                Menampilkan <span className="text-[#2C1810]" style={{ fontWeight: 600 }}>{filtered.length}</span> pertanyaan
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-12 text-center">
                <p className="text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Tidak menemukan pertanyaan yang cocok. Coba kata kunci lain atau hubungi tim kami di bawah.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filtered.map((f, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <li
                      key={i}
                      className={`bg-white border rounded-2xl transition-all overflow-hidden ${
                        isOpen ? 'border-[#B8926A] shadow-[0_8px_30px_-12px_rgba(184,146,106,0.35)]' : 'border-[#2C1810]/10 hover:border-[#2C1810]/25'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="w-full flex items-start gap-6 text-left px-7 py-6"
                      >
                        <span className="text-[11px] tracking-[0.2em] text-[#B8926A] pt-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-lg leading-snug text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
                          {f.q}
                        </span>
                        <span
                          className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center border transition-all ${
                            isOpen ? 'bg-[#2C1810] border-[#2C1810] text-[#FAF8F5]' : 'border-[#2C1810]/15 text-[#2C1810]'
                          }`}
                        >
                          {isOpen ? <Minus className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-7 pb-7 pl-[4.25rem] text-[#2C1810]/75 leading-relaxed text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {f.a}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Contact CTA */}
            <div className="mt-16 relative overflow-hidden rounded-3xl bg-[#2C1810] text-[#FAF8F5] p-10 md:p-12">
              <div className="absolute -bottom-10 -right-6 text-[12rem] leading-none text-[#FAF8F5]/[0.04] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
                Help
              </div>
              <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-end">
                <div>
                  <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A] mb-4" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Masih bingung?
                  </div>
                  <h3 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
                    Tim kami siap <span className="italic text-[#B8926A]">membantu</span>
                  </h3>
                  <p className="text-[#FAF8F5]/75 max-w-xl text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Hubungi customer care Tailora setiap hari pukul 08.00–22.00 WIB. Rata-rata respons di bawah 5 menit.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#B8926A] text-[#2C1810] hover:bg-[#FAF8F5] transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    WhatsApp
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#FAF8F5]/25 hover:bg-[#FAF8F5]/10 transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <Mail className="w-4 h-4" strokeWidth={2} />
                    Email
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#FAF8F5]/25 hover:bg-[#FAF8F5]/10 transition-colors text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    <Phone className="w-4 h-4" strokeWidth={2} />
                    Telepon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
