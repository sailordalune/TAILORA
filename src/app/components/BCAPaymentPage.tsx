import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, ShieldCheck, Clock, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  dp: number;
  orderCode: string;
  onBack: () => void;
  onConfirmed: () => void;
}

const DURATION_SECONDS = 2 * 60 * 60; // 2 hours

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, [remaining]);
  const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  return { h, m, s, expired: remaining <= 0 };
}

const VA_NUMBER = '8277 0813 4567 8901';
const BANK_CODE = '014';

type TabId = 'atm' | 'mobile' | 'internet';

const instructions: Record<TabId, { step: string; detail: string }[]> = {
  atm: [
    { step: 'Masukkan kartu ATM', detail: 'Masukkan kartu ATM BCA Anda dan masukkan PIN.' },
    { step: 'Pilih Transaksi Lainnya', detail: 'Dari menu utama, pilih "Transaksi Lainnya".' },
    { step: 'Pilih Transfer', detail: 'Pilih menu "Transfer" kemudian "Ke Rek BCA Virtual Account".' },
    { step: 'Masukkan nomor VA', detail: `Ketik nomor Virtual Account: ${VA_NUMBER.replace(/\s/g, '')} dan tekan Benar.` },
    { step: 'Konfirmasi pembayaran', detail: 'Periksa detail pesanan dan jumlah pembayaran, lalu tekan "Ya" untuk melanjutkan.' },
    { step: 'Selesai', detail: 'Simpan struk sebagai bukti pembayaran. Pesanan Anda otomatis terkonfirmasi.' },
  ],
  mobile: [
    { step: 'Buka aplikasi myBCA', detail: 'Login menggunakan User ID dan PIN myBCA Anda.' },
    { step: 'Pilih Transfer', detail: 'Dari beranda, pilih "Send Money" atau "Transfer".' },
    { step: 'Transfer ke BCA Virtual Account', detail: 'Pilih opsi "BCA Virtual Account" sebagai tujuan transfer.' },
    { step: 'Masukkan nomor VA', detail: `Ketik nomor VA: ${VA_NUMBER.replace(/\s/g, '')} dan tekan Lanjut.` },
    { step: 'Konfirmasi & bayar', detail: 'Periksa nominal, lalu masukkan PIN myBCA untuk mengkonfirmasi pembayaran.' },
    { step: 'Selesai', detail: 'Notifikasi berhasil akan muncul. Pesanan Anda otomatis terkonfirmasi.' },
  ],
  internet: [
    { step: 'Login KlikBCA', detail: 'Buka klikbca.com dan login dengan User ID serta PIN Internet Banking Anda.' },
    { step: 'Pilih Transfer Dana', detail: 'Klik menu "Transfer Dana" di navigasi atas.' },
    { step: 'Transfer ke BCA Virtual Account', detail: 'Pilih "Transfer ke BCA Virtual Account".' },
    { step: 'Masukkan nomor VA', detail: `Masukkan nomor VA: ${VA_NUMBER.replace(/\s/g, '')} lalu klik Lanjutkan.` },
    { step: 'Konfirmasi dengan KeyBCA', detail: 'Masukkan respons KeyBCA APPLI 1 dan tekan Kirim.' },
    { step: 'Selesai', detail: 'Bukti transfer tampil di layar. Pesanan Anda otomatis terkonfirmasi.' },
  ],
};

export function BCAPaymentPage({ dp, orderCode, onBack, onConfirmed }: Props) {
  const { h, m, s, expired } = useCountdown(DURATION_SECONDS);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('mobile');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  const copyVA = useCallback(() => {
    navigator.clipboard.writeText(VA_NUMBER.replace(/\s/g, '')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const checkPayment = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      onConfirmed();
    }, 2200);
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'mobile', label: 'myBCA' },
    { id: 'atm', label: 'ATM BCA' },
    { id: 'internet', label: 'KlikBCA' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10 py-10">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-[#2C1810]/70 hover:text-[#2C1810] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-[13px]">Kembali pilih metode pembayaran</span>
        </button>

        {/* Page heading */}
        <div className="mb-8">
          <div className="text-[11px] tracking-[0.35em] uppercase text-[#8B6544] mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Langkah 6 dari 6 · Pembayaran DP
          </div>
          <h1 className="text-4xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            Transfer <span className="italic text-[#B8926A]">BCA</span>
          </h1>
          <p className="text-[#2C1810]/70 mt-2 text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Selesaikan pembayaran sebelum batas waktu agar pesanan tidak dibatalkan otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: VA card + instructions */}
          <div className="lg:col-span-3 space-y-5">
            {/* VA number card */}
            <div className="bg-[#2C1810] text-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(44,24,16,0.2)] relative">
              {/* decorative stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-[#0066AE] via-[#0066AE] to-[#00AEEF]" />
              <div className="px-7 py-6 relative">
                <div className="absolute -top-8 -right-8 text-[9rem] leading-none text-white/[0.03] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>B</div>

                {/* Bank logo row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#0066AE] flex items-center justify-center shrink-0">
                      <span className="text-white text-[11px] tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>BCA</span>
                    </div>
                    <div>
                      <div className="text-[11px] tracking-[0.2em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Virtual Account</div>
                      <div className="text-white/70 text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Kode Bank {BANK_CODE}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-0.5" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>No. Pesanan</div>
                    <div className="text-[13px] text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{orderCode}</div>
                  </div>
                </div>

                {/* VA number */}
                <div className="mb-1">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Nomor Virtual Account</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 text-3xl md:text-4xl tracking-[0.15em] text-white" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      {VA_NUMBER}
                    </div>
                    <button
                      onClick={copyVA}
                      className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all text-[12px] ${
                        copied
                          ? 'bg-[#4A7A5C] border-[#4A7A5C] text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-[#B8926A] hover:border-[#B8926A]'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <Copy className="w-3.5 h-3.5" strokeWidth={2.5} />}
                      {copied ? 'Disalin!' : 'Salin'}
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 my-5" />

                {/* Amount */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Total Pembayaran (DP 30%)</div>
                    <div className="text-3xl text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{formatRp(dp)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Bayar sebelum</div>
                    {expired ? (
                      <div className="text-red-400 text-[14px]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Kedaluwarsa</div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {[h, m, s].map((val, i) => (
                          <React.Fragment key={i}>
                            <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center">
                              <span className="text-[#B8926A] text-[18px]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{val}</span>
                            </div>
                            {i < 2 && <span className="text-white/50 text-[18px]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>:</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Important notes */}
            <div className="bg-[#B8926A]/10 border border-[#B8926A]/30 rounded-sm p-4 flex gap-3">
              <AlertCircle className="w-4 h-4 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2.5} />
              <div className="text-[12px] text-[#2C1810]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Bayar tepat nominal yang tertera (<span style={{ fontWeight: 700 }}>{formatRp(dp)}</span>). Transfer kurang atau lebih satu rupiah pun tidak akan terkonfirmasi otomatis.
              </div>
            </div>

            {/* Instruction tabs */}
            <div className="bg-white border border-[#2C1810]/10 rounded-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-0">
                <div className="text-[11px] tracking-[0.25em] uppercase text-[#8B6544] mb-4" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Cara Pembayaran
                </div>
                <div className="flex gap-1 border-b border-[#2C1810]/10">
                  {tabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`px-5 py-2.5 text-[12px] border-b-2 transition-all -mb-px ${
                        activeTab === t.id
                          ? 'border-[#B8926A] text-[#2C1810]'
                          : 'border-transparent text-[#2C1810]/50 hover:text-[#2C1810]/80'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: activeTab === t.id ? 700 : 500 }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="px-6 py-5"
                >
                  <div className="space-y-2">
                    {instructions[activeTab].map((item, i) => {
                      const open = expandedStep === i;
                      return (
                        <div key={i} className="border border-[#2C1810]/10 rounded-sm overflow-hidden">
                          <button
                            onClick={() => setExpandedStep(open ? null : i)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAF8F5] transition-colors text-left"
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] transition-all ${
                              open ? 'bg-[#B8926A] text-white' : 'bg-[#FAF8F5] border border-[#2C1810]/15 text-[#2C1810]/60'
                            }`} style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                              {i + 1}
                            </div>
                            <span className="flex-1 text-[13px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                              {item.step}
                            </span>
                            {open
                              ? <ChevronUp className="w-4 h-4 text-[#2C1810]/40 shrink-0" strokeWidth={2.5} />
                              : <ChevronDown className="w-4 h-4 text-[#2C1810]/40 shrink-0" strokeWidth={2.5} />
                            }
                          </button>
                          <AnimatePresence>
                            {open && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-1 text-[13px] text-[#2C1810]/75 leading-relaxed border-t border-[#2C1810]/8 bg-[#FAF8F5]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                                  {item.detail}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: sticky action panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Status card */}
              <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#8B6544] mb-4" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Status Pembayaran
                </div>

                <div className="flex items-center gap-3 mb-5 p-3 rounded-sm bg-[#FAF8F5] border border-[#2C1810]/10">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span className="text-[13px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Menunggu Pembayaran</span>
                </div>

                <div className="space-y-2.5 text-[13px] mb-5">
                  <div className="flex justify-between">
                    <span className="text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Metode</span>
                    <span className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>BCA Virtual Account</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>No. VA</span>
                    <button onClick={copyVA} className="flex items-center gap-1 text-[#0066AE] hover:text-[#2C1810] transition-colors" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      {VA_NUMBER.replace(/\s/g, '').slice(0, 10)}…
                      <Copy className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Total DP</span>
                    <span className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '16px' }}>{formatRp(dp)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#2C1810]/10">
                    <span className="text-[#2C1810]/60 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      <Clock className="w-3.5 h-3.5" strokeWidth={2.5} /> Batas waktu
                    </span>
                    <span className={`text-[13px] ${expired ? 'text-red-500' : 'text-[#2C1810]'}`} style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                      {expired ? 'Kedaluwarsa' : `${h}:${m}:${s}`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={checkPayment}
                  disabled={checking || expired}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] disabled:bg-[#2C1810]/20 disabled:cursor-not-allowed transition-all shadow-md"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  {checking
                    ? <><RefreshCw className="w-4 h-4 animate-spin" strokeWidth={2.5} /><span className="text-[12px] tracking-[0.1em] uppercase">Mengecek...</span></>
                    : <><Check className="w-4 h-4" strokeWidth={2.5} /><span className="text-[12px] tracking-[0.1em] uppercase">Saya Sudah Bayar</span></>
                  }
                </button>

                <p className="text-center text-[11px] text-[#2C1810]/50 mt-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Verifikasi otomatis dalam 1–5 menit setelah transfer berhasil.
                </p>
              </div>

              {/* Security note */}
              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                  <span className="text-[13px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Pembayaran Aman</span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Dana ditahan Tailora, bukan langsung ke penjahit',
                    'Refund 100% jika pesanan tidak terpenuhi',
                    'Transaksi terenkripsi SSL 256-bit',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                      <span className="text-[#B8926A] shrink-0 mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
