import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scissors, Smartphone, TrendingUp, ShieldCheck } from 'lucide-react';
import toko1Img from '../../imports/abt1.jpg';
import portofolio1Img from '../../imports/abt2.jpg';
import portofolio2Img from '../../imports/abt3.jpg';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AboutModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-[#2C1810]/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-xl overflow-hidden shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex-none p-6 md:p-8 border-b border-[#2C1810]/10 flex items-center justify-between bg-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                <Scissors className="w-64 h-64 text-[#2C1810]" />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Cerita Kami
                </div>
                <h2 className="text-3xl md:text-4xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  Mengenal <span className="italic text-[#B8926A]">Tailora</span>
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-[#EAE5DF] transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <div className="max-w-3xl mx-auto space-y-12">
                
                {/* Hero / Intro Section */}
                <section className="space-y-8">
                  <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
                    <img src={toko1Img} alt="Tailora Workshop" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/20 to-transparent flex items-end p-6 md:p-8">
                      <p className="text-xl md:text-2xl text-[#FAF8F5] leading-relaxed max-w-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                        "Baju thrifting keren tapi kedodoran? Atau beli online tapi ukurannya ngaco? <br className="hidden md:block" /> Tenang, <strong>Tailora</strong> hadir buat nyelamatin outfit kamu!"
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-5 gap-8 items-center pt-2">
                    <div className="md:col-span-3 space-y-4">
                      <p className="text-[#2C1810]/80 leading-relaxed text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Di era digital yang serba cepat ini, mencari penjahit lokal yang <strong>terpercaya, transparan, dan sesuai gaya</strong> rasanya masih seperti mencari jarum di tumpukan jerami. 
                      </p>
                      <p className="text-[#2C1810]/80 leading-relaxed text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Tailora lahir sebagai jembatan yang mempertemukan kamu dengan para artisan jahit lokal terbaik, mengubah cara lama yang ribet menjadi pengalaman digital yang <i>seamless</i> dan modern.
                      </p>
                    </div>
                    <div className="md:col-span-2 flex gap-4 h-48 md:h-56">
                      <img src={portofolio1Img} alt="Tailor Work 1" className="w-1/2 h-full object-cover rounded-xl shadow-md -rotate-2" />
                      <img src={portofolio2Img} alt="Tailor Work 2" className="w-1/2 h-full object-cover rounded-xl shadow-md mt-6 rotate-3" />
                    </div>
                  </div>
                </section>

                {/* The "Why" Grid */}
                <section>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Kenapa Harus Tailora?</h3>
                    <div className="w-12 h-px bg-[#B8926A] mx-auto"></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-[#2C1810]/5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-[#B8926A]/10 rounded-full flex items-center justify-center mb-4 text-[#B8926A]">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg text-[#2C1810] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Pemesanan Super Gampang</h4>
                      <p className="text-sm text-[#2C1810]/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Tinggalkan cara manual! Alur pesanan kami terstruktur rapi. Gak perlu bingung lagi soal ukuran, karena ada fitur <strong>Virtual Measurement</strong> buat ngebantu kamu ngukur baju secara akurat dari rumah!
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-[#2C1810]/5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-[#B8926A]/10 rounded-full flex items-center justify-center mb-4 text-[#B8926A]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg text-[#2C1810] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Transparan & Aman</h4>
                      <p className="text-sm text-[#2C1810]/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Sering deg-degan nungguin baju jahitan? Di Tailora, progres pengerjaan baju kamu bisa <strong>dilacak secara real-time</strong>. Dari pemotongan pola sampai siap kirim, semuanya transparan!
                      </p>
                    </div>
                  </div>
                </section>

                {/* The Mission */}
                <section className="bg-[#2C1810] text-[#FAF8F5] rounded-xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 opacity-10">
                    <TrendingUp className="w-48 h-48" />
                  </div>
                  <div className="relative z-10 md:w-4/5">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-4" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      Misi Kami
                    </div>
                    <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                      Memberdayakan Penjahit Lokal (UMKM)
                    </h3>
                    <p className="text-[#FAF8F5]/80 leading-relaxed text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Banyak penjahit lokal dengan skill level dewa tapi belum <i>go digital</i>. 
                      Tailora hadir untuk mengedukasi dan membawa mereka ke panggung digital, 
                      memperluas pasar mereka, dan membuat manajemen pesanan mereka jauh lebih terstruktur dan efisien.
                    </p>
                    <p className="text-[#B8926A] mt-6 italic" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                      "Bersama Tailora, merawat pakaian tak lagi sekadar transaksi, tapi sebuah perjalanan kreatif."
                    </p>
                  </div>
                </section>

              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}