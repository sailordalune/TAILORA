import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Scissors, Shirt, Sparkles, PenTool, Upload, Ruler,
  Calendar, Truck, Wallet, ShieldCheck, Clock, MapPin, CheckCircle2, CreditCard,
  Camera, Video, FileText, Plus, Minus, Star, Home, Store, Package, Bike, Send, MessageCircle, Loader2, BadgeCheck, Phone, PhoneOff, Mic, MicOff, Paperclip,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TailorData } from './TailorDetail';
import { ImageWithFallback } from './common/ImageWithFallback';
import { VirtualMeasurement } from './VirtualMeasurement';
import { ManualMeasurement } from './ManualMeasurement';
import { BCAPaymentPage } from './BCAPaymentPage';

type Props = { tailor: TailorData; onBack: () => void; onComplete: () => void; initialService?: string };

const serviceTypes = [
  { id: 'jahit-baru', icon: Scissors, label: 'Jahit Baru — Reguler', desc: 'Buat pakaian dari nol dengan bahan pilihan', price: 'Mulai Rp 350rb', eta: '7-10 hari' },
  { id: 'jahit-express', icon: Scissors, label: 'Jahit Baru — Express', desc: 'Pengerjaan prioritas, lebih cepat dari reguler', price: 'Mulai Rp 500rb', eta: '3-5 hari' },
  { id: 'permak', icon: Ruler, label: 'Permak / Alterasi', desc: 'Penyesuaian ukuran pakaian yang sudah ada', price: 'Mulai Rp 35rb', eta: '2-3 hari' },
  { id: 'custom', icon: PenTool, label: 'Custom Design', desc: 'Desain pakaian sesuai keinginan Anda', price: 'Mulai Rp 800rb', eta: '14-21 hari' },
  { id: 'bordir', icon: Sparkles, label: 'Bordir & Detail', desc: 'Bordir, payet, atau detail aksesoris khusus', price: 'Mulai Rp 100rb', eta: '5-7 hari' },
];

const clothingOptions = ['Kebaya', 'Gaun Pengantin', 'Jas Formal', 'Kemeja', 'Batik', 'Casual Wear', 'Seragam', 'Lainnya'];
const measurementOptions = [
  { id: 'virtual', icon: Camera, label: 'Virtual Measurement', desc: 'Panduan visual 3D + tip detail per jenis pakaian', badge: 'Recommended' },
  { id: 'fitting', icon: Store, label: 'Fitting Offline', desc: 'Datang langsung ke atelier untuk fitting presisi' },
  { id: 'manual', icon: FileText, label: 'Input Manual', desc: 'Sudah tahu ukuranmu? Tinggal ketik per field' },
];
const deliveryOptions = [
  { id: 'pickup', icon: Store, label: 'Ambil di Atelier', desc: 'Gratis, tanpa biaya pengiriman', price: 0 },
  { id: 'reguler', icon: Truck, label: 'Pengiriman Reguler', desc: 'JNE / J&T (2-4 hari)', price: 25000 },
  { id: 'instant', icon: Home, label: 'Instant Courier', desc: 'Gojek / Grab (same-day)', price: 35000 },
];
const paymentMethods = [
  { id: 'bca', label: 'Transfer BCA', subLabel: 'Virtual Account' },
  { id: 'bni', label: 'Transfer BNI', subLabel: 'Virtual Account' },
  { id: 'qris', label: 'QRIS', subLabel: 'Scan untuk bayar' },
  { id: 'card', label: 'Kartu Kredit/Debit', subLabel: 'Visa, Mastercard' },
];

const stepsDefault = [
  { num: 1, label: 'Layanan', icon: Scissors },
  { num: 2, label: 'Detail Pesanan', icon: Shirt },
  { num: 3, label: 'Ukuran', icon: Ruler },
  { num: 4, label: 'Jadwal & Pengiriman', icon: Calendar },
  { num: 5, label: 'Konfirmasi Penjahit', icon: MessageCircle },
  { num: 6, label: 'Pembayaran', icon: Wallet },
];
const stepsPermak = [
  { num: 1, label: 'Layanan', icon: Scissors },
  { num: 2, label: 'Detail Permak', icon: Shirt },
  { num: 3, label: 'Kirim Pakaian', icon: Package },
  { num: 4, label: 'Jadwal & Pengembalian', icon: Calendar },
  { num: 5, label: 'Konfirmasi Penjahit', icon: MessageCircle },
  { num: 6, label: 'Pembayaran', icon: Wallet },
];

const TOTAL_STEPS = 6;

const sendOptions = [
  { id: 'dropoff', icon: Store, label: 'Antar Sendiri ke Atelier', desc: 'Bawa langsung pakaian ke alamat atelier penjahit', price: 0 },
  { id: 'pickup', icon: Bike, label: 'Penjemputan Kurir', desc: 'Kurir Tailora akan menjemput pakaian dari alamat Anda', price: 20000 },
  { id: 'expedition', icon: Send, label: 'Kirim via Ekspedisi', desc: 'Anda kirim sendiri via JNE/J&T (ongkir ditanggung Anda)', price: 0 },
];

export function OrderFlow({ tailor, onBack, onComplete, initialService }: Props) {
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [service, setService] = useState<string | null>(initialService ?? null);
  const [clothing, setClothing] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [measurement, setMeasurement] = useState<string | null>(null);
  const [consultDate, setConsultDate] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderCode] = useState(() => `#TLR-${Math.floor(Math.random() * 900000) + 100000}`);
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [measurementData, setMeasurementData] = useState<any>(null);
  // Permak-specific state
  const [sendMethod, setSendMethod] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [permakNotes, setPermakNotes] = useState('');
  const [permakAreas, setPermakAreas] = useState<string[]>([]);
  // Tailor confirmation step state
  const [confirmMode, setConfirmMode] = useState<null | 'quick' | 'consult'>(null);
  const [tailorReplied, setTailorReplied] = useState(false);
  const [tailorAccepted, setTailorAccepted] = useState(false);
  const [tailorEstimate, setTailorEstimate] = useState<{ price: number; eta: string; note: string } | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ from: 'user' | 'tailor'; text: string; brief?: boolean; estimate?: { price: number; eta: string } }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [tailorTyping, setTailorTyping] = useState(false);
  const [callMode, setCallMode] = useState<null | 'voice' | 'video'>(null);
  const [callConnected, setCallConnected] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const isPermak = service === 'permak';
  const steps = isPermak ? stepsPermak : stepsDefault;

  const basePrice = service === 'jahit-baru' ? 350000 : service === 'jahit-express' ? 500000 : service === 'permak' ? 50000 : service === 'custom' ? 800000 : service === 'bordir' ? 100000 : 0;
  const deliveryPrice = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const sendPrice = isPermak ? (sendOptions.find((s) => s.id === sendMethod)?.price ?? 0) : 0;
  const subtotal = basePrice * quantity;
  const total = subtotal + deliveryPrice + sendPrice;
  const dp = Math.round(total * 0.3);

  useEffect(() => {
    if (step === 5 && confirmMode === 'consult' && chatMessages.length === 0) {
      const briefText = [
        `Layanan: ${serviceTypes.find((s) => s.id === service)?.label}`,
        `Pakaian: ${clothing} · ${quantity} pcs`,
        isPermak && permakAreas.length > 0 ? `Area: ${permakAreas.join(', ')}` : '',
        description ? `"${description}"` : '',
        permakNotes ? `"${permakNotes}"` : '',
      ].filter(Boolean).join('\n');
      setChatMessages([{ from: 'user', text: briefText, brief: true }]);
      setTailorTyping(true);
      const t1 = setTimeout(() => {
        setTailorTyping(false);
        setChatMessages((prev) => [...prev, {
          from: 'tailor',
          text: isPermak
            ? `Halo, saya sudah lihat brief-nya. Untuk ${permakAreas.length} area permak ini saya bisa kerjakan. Ada hal khusus yang ingin didiskusikan dulu?`
            : `Halo! Terima kasih atas pesanannya. Saya sudah pelajari briefnya — ada beberapa hal yang mungkin perlu kita bicarakan dulu. Silakan tanya apa saja.`,
        }]);
      }, 1800);
      return () => clearTimeout(t1);
    }
  }, [step, confirmMode]); // eslint-disable-line

  useEffect(() => {
    if (callMode && !callConnected) {
      const t = setTimeout(() => setCallConnected(true), 1800);
      return () => clearTimeout(t);
    }
  }, [callMode, callConnected]);

  useEffect(() => {
    if (callConnected) {
      const i = setInterval(() => setCallDuration((d) => d + 1), 1000);
      return () => clearInterval(i);
    }
  }, [callConnected]);

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { from: 'user', text }]);
    setChatInput('');
    setTailorTyping(true);
    setTimeout(() => {
      setTailorTyping(false);
      const lower = text.toLowerCase();
      let reply = 'Baik, dicatat. Ada lagi yang ingin Anda tanyakan?';
      if (/harga|price|biaya|berapa/.test(lower)) reply = `Untuk pesanan ini estimasi saya ${formatRp(subtotal)}. Bisa berubah ±10% tergantung detail finishing yang kita sepakati.`;
      else if (/lama|kapan|waktu|berapa hari|timeline|selesai/.test(lower)) reply = isPermak ? 'Sekitar 2-3 hari setelah pakaian saya terima.' : 'Untuk timeline standar 7-10 hari kerja. Kalau buru-buru bisa saya prioritaskan.';
      else if (/bahan|kain|material/.test(lower)) reply = 'Saya bisa pakai bahan dari toko langganan, atau Anda bawa sendiri kainnya juga bisa.';
      else if (/bisa|sanggup|bisakah/.test(lower)) reply = 'Bisa, saya sanggupi. Mari kita lanjut ke detail.';
      else if (/halo|hi|hai/.test(lower)) reply = 'Halo juga 👋 Silakan tanya kalau ada yang ingin didiskusikan sebelum mulai.';
      setChatMessages((prev) => [...prev, { from: 'tailor', text: reply }]);
    }, 1400 + Math.random() * 800);
  };

  const sendEstimate = () => {
    setTailorTyping(true);
    setTimeout(() => {
      setTailorTyping(false);
      setChatMessages((prev) => [...prev, {
        from: 'tailor',
        text: isPermak
          ? 'Baik, saya kirim estimasi finalnya ya.'
          : 'Oke, semua sudah jelas. Ini estimasi finalnya:',
        estimate: { price: subtotal, eta: isPermak ? '2-3 hari setelah pakaian diterima' : '7-10 hari kerja' },
      }]);
      setTailorEstimate({
        price: subtotal,
        eta: isPermak ? '2-3 hari setelah pakaian diterima' : '7-10 hari kerja',
        note: '',
      });
    }, 1200);
  };

  const formatCallTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const endCall = () => {
    if (callConnected) {
      setChatMessages((prev) => [...prev, { from: 'tailor', text: `Terima kasih sudah menelepon. Durasi panggilan: ${formatCallTime(callDuration)}.` }]);
    }
    setCallMode(null);
    setCallConnected(false);
    setCallDuration(0);
    setCallMuted(false);
  };

  const canProceed = (() => {
    if (step === 1) return !!service;
    if (step === 2) return !!clothing;
    if (step === 3) {
      if (isPermak) {
        if (!sendMethod || permakAreas.length === 0) return false;
        if (sendMethod === 'pickup') return !!pickupDate && pickupAddress.trim().length > 5;
        return true;
      }
      return !!measurement;
    }
    if (step === 4) return !!consultDate && !!delivery && (delivery === 'pickup' || address.trim().length > 5);
    if (step === 5) {
      if (!confirmMode) return false;
      if (confirmMode === 'quick') return true;
      return tailorAccepted;
    }
    if (step === 6) return !!payment;
    return false;
  })();

  const next = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else if (payment === 'bca') setShowPayment(true);
    else setDone(true);
  };
  const prev = () => step > 1 ? setStep(step - 1) : onBack();

  const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

  if (done) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 rounded-full bg-[#B8926A] flex items-center justify-center mx-auto mb-8 shadow-[0_20px_60px_rgba(184,146,106,0.4)]"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-[#B8926A]"></div>
            <div className="text-[11px] tracking-[0.5em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Pesanan Diterima</div>
            <div className="w-12 h-px bg-[#B8926A]"></div>
          </div>
          <h1 className="text-4xl md:text-5xl text-[#2C1810] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            Terima <span className="italic text-[#B8926A]">Kasih!</span>
          </h1>
          <p className="text-[#2C1810]/75 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Pesanan Anda berhasil dikirim ke {tailor.name}.
          </p>
          <p className="text-[#2C1810]/75 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Penjahit akan menghubungi Anda dalam waktu kurang dari 1 jam untuk konfirmasi.
          </p>
          <div className="bg-white border border-[#2C1810]/10 rounded-sm p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#2C1810]/10">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Nomor Pesanan</div>
              <div className="text-[#2C1810]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{orderCode}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[13px] text-[#2C1810]/75" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>DP yang harus dibayar</div>
              <div className="text-xl text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{formatRp(dp)}</div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-10 py-3.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            <span className="text-[13px] tracking-[0.15em] uppercase">Kembali ke Beranda</span>
          </button>
        </motion.div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <BCAPaymentPage
        dp={dp}
        orderCode={orderCode}
        onBack={() => setShowPayment(false)}
        onConfirmed={() => { setShowPayment(false); setDone(true); }}
      />
    );
  }

  if (showMeasurement) {
    return (
      <VirtualMeasurement
        onBack={() => setShowMeasurement(false)}
        onSave={(data) => { setMeasurementData(data); setShowMeasurement(false); }}
      />
    );
  }

  if (showManual) {
    return (
      <ManualMeasurement
        onBack={() => setShowManual(false)}
        onSave={(data) => { setMeasurementData(data); setShowManual(false); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Top header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prev}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#2C1810]/15 text-[#2C1810] hover:border-[#B8926A] transition-all"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-[13px]">{step === 1 ? 'Batal' : 'Kembali'}</span>
          </button>
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Pemesanan · {tailor.name}
          </div>
        </div>

        {/* Stepper */}
        <div className="bg-white border border-[#2C1810]/10 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-[#2C1810]/10 -z-0" />
            <motion.div
              className="absolute top-6 left-6 h-0.5 bg-[#B8926A] -z-0"
              initial={false}
              animate={{ width: `calc((100% - 3rem) * ${(step - 1) / (steps.length - 1)})` }}
              transition={{ duration: 0.4 }}
            />
            {steps.map((s) => {
              const active = step === s.num;
              const completed = step > s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 ${
                    completed ? 'bg-[#B8926A] border-[#B8926A] text-white' :
                    active ? 'bg-[#2C1810] border-[#2C1810] text-white shadow-[0_0_0_6px_rgba(44,24,16,0.1)]' :
                    'bg-white border-[#2C1810]/15 text-[#2C1810]/40'
                  }`}>
                    {completed ? <Check className="w-5 h-5" strokeWidth={3} /> : <s.icon className="w-5 h-5" strokeWidth={2} />}
                  </div>
                  <div className={`text-[11px] text-center hidden md:block ${active ? 'text-[#2C1810]' : completed ? 'text-[#8B6544]' : 'text-[#2C1810]/50'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: active ? 700 : 600 }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-[#2C1810]/10 rounded-2xl p-8"
              >
                {step === 1 && (
                  <>
                    <StepHeader eyebrow="Langkah 1 dari 6" title="Pilih" italic="Layanan" subtitle="Tentukan jenis layanan yang sesuai dengan kebutuhan pakaian Anda." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {serviceTypes.map((s) => {
                        const active = service === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setService(s.id)}
                            className={`text-left p-5 rounded-sm border-2 transition-all ${
                              active ? 'border-[#B8926A] bg-[#B8926A]/10 shadow-md' : 'border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A]/50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${active ? 'bg-[#B8926A] text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810]/70'}`}>
                                <s.icon className="w-5 h-5" strokeWidth={2} />
                              </div>
                              {active && <div className="w-6 h-6 rounded-full bg-[#2C1810] text-white flex items-center justify-center"><Check className="w-3.5 h-3.5" strokeWidth={3} /></div>}
                            </div>
                            <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px' }}>{s.label}</div>
                            <div className="text-[12px] text-[#2C1810]/70 mb-3 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{s.desc}</div>
                            <div className="flex items-center justify-between pt-3 border-t border-[#2C1810]/10">
                              <div className="text-[12px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{s.price}</div>
                              <div className="flex items-center gap-1 text-[11px] text-[#8B6544]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                                <Clock className="w-3 h-3" /> {s.eta}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <StepHeader eyebrow="Langkah 2 dari 6" title="Detail" italic="Pesanan" subtitle="Beri detail spesifik tentang pakaian yang Anda inginkan." />

                    <div className="mb-6">
                      <Label>Jenis Pakaian</Label>
                      <div className="flex flex-wrap gap-2">
                        {clothingOptions.map((c) => {
                          const active = clothing === c;
                          return (
                            <button
                              key={c}
                              onClick={() => setClothing(c)}
                              className={`px-4 py-2 rounded-full border text-[13px] transition-all ${
                                active ? 'bg-[#2C1810] text-white border-[#2C1810]' : 'bg-white text-[#2C1810]/75 border-[#2C1810]/15 hover:border-[#B8926A]'
                              }`}
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: active ? 700 : 600 }}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label>Deskripsi Detail (Opsional)</Label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ceritakan bahan yang diinginkan, warna, potongan, detail khusus, inspirasi..."
                        rows={5}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#B8926A] transition-colors resize-none"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      />
                      <div className="flex justify-end text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        <span className="text-[#2C1810]/50">{description.length}/500</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label>Foto Referensi (Opsional)</Label>
                      <button className="w-full border-2 border-dashed border-[#2C1810]/15 rounded-sm p-8 hover:border-[#B8926A] hover:bg-[#B8926A]/5 transition-all text-center group">
                        <Upload className="w-7 h-7 mx-auto mb-2 text-[#B8926A]" strokeWidth={2} />
                        <div className="text-sm text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Unggah foto atau drag & drop</div>
                        <div className="text-[12px] text-[#2C1810]/60 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>PNG, JPG, max 5MB (hingga 5 foto)</div>
                      </button>
                    </div>

                    <div>
                      <Label>Jumlah</Label>
                      <div className="inline-flex items-center gap-4 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-full px-2 py-1">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-full bg-white border border-[#2C1810]/15 hover:border-[#B8926A] flex items-center justify-center text-[#2C1810]">
                          <Minus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                        <div className="w-10 text-center text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px' }}>{quantity}</div>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-full bg-[#2C1810] hover:bg-[#B8926A] flex items-center justify-center text-white">
                          <Plus className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && isPermak && (
                  <>
                    <StepHeader eyebrow="Langkah 3 dari 6" title="Kirim" italic="Pakaian" subtitle="Permak butuh pakaian asli untuk diukur & disesuaikan. Pilih cara mengirim pakaian Anda ke penjahit." />

                    <div className="bg-[#FAF8F5] border-l-2 border-[#B8926A] p-4 mb-6 flex gap-3">
                      <Package className="w-5 h-5 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <div className="text-[13px] text-[#2C1810] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Sebelum mengirim</div>
                        <div className="text-[12px] text-[#2C1810]/75 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          Pastikan pakaian sudah dicuci & disetrika. Sertakan catatan kecil dengan nama & nomor pesanan untuk memudahkan identifikasi.
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label>Bagian yang Ingin Dipermak</Label>
                      <div className="flex flex-wrap gap-2">
                        {['Pinggang dikecilkan', 'Pinggang dilebarkan', 'Panjang celana', 'Panjang lengan', 'Bahu', 'Dada', 'Ganti resleting', 'Ganti kancing', 'Sobek/lubang', 'Lainnya'].map((a) => {
                          const active = permakAreas.includes(a);
                          return (
                            <button
                              key={a}
                              onClick={() => setPermakAreas(active ? permakAreas.filter((x) => x !== a) : [...permakAreas, a])}
                              className={`px-3.5 py-2 rounded-full border text-[12px] transition-all ${
                                active ? 'bg-[#2C1810] text-white border-[#2C1810]' : 'bg-white text-[#2C1810]/75 border-[#2C1810]/15 hover:border-[#B8926A]'
                              }`}
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: active ? 700 : 600 }}
                            >
                              {active && '✓ '}{a}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label>Catatan Permak (Opsional)</Label>
                      <textarea
                        value={permakNotes}
                        onChange={(e) => setPermakNotes(e.target.value)}
                        placeholder="Misal: kecilkan pinggang ±3cm, panjang celana hingga mata kaki, hindari ubah panjang lengan..."
                        rows={3}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#B8926A] transition-colors resize-none"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      />
                    </div>

                    <Label>Metode Pengiriman Pakaian</Label>
                    <div className="space-y-2.5 mb-6">
                      {sendOptions.map((opt) => {
                        const active = sendMethod === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSendMethod(opt.id)}
                            className={`w-full flex items-center gap-3 p-4 rounded-sm border-2 transition-all text-left ${
                              active ? 'border-[#B8926A] bg-[#B8926A]/10' : 'border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A]/50'
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-[#B8926A] text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810]/70'}`}>
                              <opt.icon className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>{opt.label}</div>
                              <div className="text-[12px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{opt.desc}</div>
                            </div>
                            <div className="text-[#2C1810] shrink-0" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                              {opt.price === 0 ? 'Gratis' : formatRp(opt.price)}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {sendMethod === 'pickup' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-5">
                        <div>
                          <Label>Tanggal Penjemputan</Label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                            <input
                              type="date"
                              value={pickupDate}
                              onChange={(e) => setPickupDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] focus:outline-none focus:border-[#B8926A] transition-colors"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Alamat Penjemputan</Label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-4 w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                            <textarea
                              value={pickupAddress}
                              onChange={(e) => setPickupAddress(e.target.value)}
                              placeholder="Nama jalan, nomor, kelurahan, kecamatan, kota, kode pos, patokan..."
                              rows={3}
                              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#B8926A] transition-colors resize-none"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {sendMethod === 'expedition' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-5 rounded-sm border border-[#B8926A]/40 bg-[#B8926A]/5">
                        <div className="text-[13px] text-[#2C1810] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Alamat Tujuan Pengiriman</div>
                        <div className="text-[13px] text-[#2C1810]/80 leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {tailor.name} — Jl. Cipete Raya No. 24, {tailor.location}<br />
                          Telp: 0812-3456-7890
                        </div>
                        <div className="text-[11px] text-[#8B6544]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                          Setelah dikirim, masukkan nomor resi pada halaman pesanan agar penjahit bisa melacak.
                        </div>
                      </motion.div>
                    )}

                    {sendMethod === 'dropoff' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-5 rounded-sm border border-[#B8926A]/40 bg-[#B8926A]/5">
                        <div className="text-[13px] text-[#2C1810] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Alamat Atelier</div>
                        <div className="text-[13px] text-[#2C1810]/80 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {tailor.name} — Jl. Cipete Raya No. 24, {tailor.location}<br />
                          Buka Senin–Sabtu, 09.00–19.00 WIB
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

                {step === 3 && !isPermak && (
                  <>
                    <StepHeader eyebrow="Langkah 3 dari 6" title="Metode" italic="Pengukuran" subtitle="Pilih cara pengambilan ukuran yang paling nyaman untuk Anda." />
                    <div className="space-y-3">
                      {measurementOptions.map((m) => {
                        const active = measurement === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setMeasurement(m.id)}
                            className={`w-full text-left p-5 rounded-sm border-2 transition-all flex items-center gap-4 ${
                              active ? 'border-[#B8926A] bg-[#B8926A]/10 shadow-md' : 'border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A]/50'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-[#B8926A] text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810]/70'}`}>
                              <m.icon className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px' }}>{m.label}</span>
                                {m.badge && <span className="px-2 py-0.5 rounded-full bg-[#B8926A] text-white text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{m.badge}</span>}
                              </div>
                              <div className="text-[13px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{m.desc}</div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${active ? 'bg-[#2C1810] border-[#2C1810]' : 'border-[#2C1810]/25'}`}>
                              {active && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {(measurement === 'virtual' || measurement === 'manual') && (
                      <div className="mt-5 p-5 rounded-sm border-2 border-[#B8926A]/40 bg-[#B8926A]/5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#B8926A] text-white flex items-center justify-center shrink-0">
                          {measurement === 'virtual' ? <Camera className="w-5 h-5" strokeWidth={2} /> : <FileText className="w-5 h-5" strokeWidth={2} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#2C1810] mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                            {measurementData ? 'Ukuran tersimpan' : measurement === 'virtual' ? 'Mulai Virtual Measurement' : 'Mulai Input Manual'}
                          </div>
                          <div className="text-[12px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            {measurementData
                              ? 'Data sudah dikirim ke penjahit. Anda bisa mengulang kapan saja.'
                              : measurement === 'virtual'
                                ? 'Pilih jenis pakaian, gaya fit, dan ukur dengan panduan visual step-by-step.'
                                : 'Pilih jenis pakaian, lalu ketik ukuran per field dalam cm.'}
                          </div>
                        </div>
                        <button
                          onClick={() => measurement === 'virtual' ? setShowMeasurement(true) : setShowManual(true)}
                          className="px-5 py-2.5 rounded-full bg-[#2C1810] text-white text-[12px] hover:bg-[#B8926A] transition-colors shrink-0"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                        >
                          {measurementData ? 'Ukur Ulang' : 'Buka'}
                        </button>
                      </div>
                    )}
                  </>
                )}

                {step === 4 && (
                  <>
                    <StepHeader
                      eyebrow="Langkah 4 dari 6"
                      title="Jadwal &"
                      italic={isPermak ? 'Pengembalian' : 'Pengiriman'}
                      subtitle={isPermak ? 'Tentukan target pakaian selesai & metode pengembalian setelah dipermak.' : 'Tentukan target pakaian selesai & metode pengiriman ke Anda.'}
                    />

                    <div className="mb-6">
                      <Label>Target Tanggal Pakaian Selesai</Label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                        <input
                          type="date"
                          value={consultDate}
                          onChange={(e) => setConsultDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] focus:outline-none focus:border-[#B8926A] transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        />
                      </div>
                      <div className="text-[11px] text-[#2C1810]/60 mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        Hanya target — penjahit akan konfirmasi kesanggupan saat sesi konsultasi di langkah berikutnya.
                      </div>
                    </div>

                    <div className="mb-6">
                      <Label>Metode Pengiriman</Label>
                      <div className="space-y-2.5">
                        {deliveryOptions.map((d) => {
                          const active = delivery === d.id;
                          return (
                            <button
                              key={d.id}
                              onClick={() => setDelivery(d.id)}
                              className={`w-full flex items-center gap-3 p-4 rounded-sm border-2 transition-all text-left ${
                                active ? 'border-[#B8926A] bg-[#B8926A]/10' : 'border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A]/50'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-[#B8926A] text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810]/70'}`}>
                                <d.icon className="w-4 h-4" strokeWidth={2} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>{d.label}</div>
                                <div className="text-[12px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{d.desc}</div>
                              </div>
                              <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                                {d.price === 0 ? 'Gratis' : formatRp(d.price)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {delivery && delivery !== 'pickup' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <Label>Alamat Pengiriman</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 w-4 h-4 text-[#B8926A]" strokeWidth={2.5} />
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nama jalan, nomor, kelurahan, kecamatan, kota, kode pos..."
                            rows={3}
                            className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-sm text-[14px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#B8926A] transition-colors resize-none"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

                {step === 5 && (
                  <>
                    <StepHeader
                      eyebrow="Langkah 5 dari 6"
                      title="Konfirmasi"
                      italic="Penjahit"
                      subtitle="Sebelum bayar DP, mari pastikan penjahit menyanggupi pesanan Anda. Pilih cara konfirmasi di bawah."
                    />

                    {!confirmMode && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                        <button
                          onClick={() => { setConfirmMode('quick'); }}
                          className="text-left p-5 rounded-sm border-2 border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A] transition-all"
                        >
                          <div className="w-11 h-11 rounded-full bg-white border border-[#2C1810]/15 text-[#2C1810]/70 flex items-center justify-center mb-3">
                            <BadgeCheck className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '17px' }}>Quick Order</div>
                          <div className="text-[12px] text-[#2C1810]/70 leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Lanjut langsung ke pembayaran. Cocok untuk pesanan standar (permak ringan, jahit reguler).
                          </div>
                          <div className="text-[11px] text-[#8B6544]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Tanpa menunggu balasan</div>
                        </button>
                        <button
                          onClick={() => { setConfirmMode('consult'); }}
                          className="text-left p-5 rounded-sm border-2 border-[#B8926A]/40 bg-[#B8926A]/5 hover:border-[#B8926A] transition-all relative"
                        >
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#B8926A] text-white text-[9px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Recommended</span>
                          <div className="w-11 h-11 rounded-full bg-[#B8926A] text-white flex items-center justify-center mb-3">
                            <MessageCircle className="w-5 h-5" strokeWidth={2} />
                          </div>
                          <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '17px' }}>Konsultasi Dulu</div>
                          <div className="text-[12px] text-[#2C1810]/70 leading-relaxed mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Brief dikirim ke penjahit. Penjahit balas dalam &lt; 1 jam dengan estimasi harga & timeline. Bayar setelah penjahit menerima.
                          </div>
                          <div className="text-[11px] text-[#8B6544]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Disarankan untuk custom & kompleks</div>
                        </button>
                      </div>
                    )}

                    {confirmMode === 'quick' && (
                      <div className="p-6 rounded-sm border-2 border-[#B8926A]/40 bg-[#B8926A]/5">
                        <div className="flex items-start gap-3 mb-4">
                          <BadgeCheck className="w-6 h-6 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <div>
                            <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px' }}>Quick Order Aktif</div>
                            <div className="text-[13px] text-[#2C1810]/75 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                              Pesanan akan langsung diteruskan ke {tailor.name} setelah Anda bayar DP. Penjahit tetap bisa menghubungi Anda jika ada pertanyaan.
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setConfirmMode(null)}
                          className="text-[12px] text-[#8B6544] hover:text-[#2C1810] underline"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Ganti ke Konsultasi Dulu
                        </button>
                      </div>
                    )}

                    {confirmMode === 'consult' && (
                      <div className="border-2 border-[#2C1810]/10 rounded-sm overflow-hidden bg-white">
                        {/* Header */}
                        <div className="bg-[#2C1810] text-white px-5 py-4 flex items-center gap-3">
                          <div className="relative shrink-0">
                            <div className="w-11 h-11 rounded-full overflow-hidden">
                              <ImageWithFallback src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#2C1810]"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>{tailor.name}</span>
                              <BadgeCheck className="w-3.5 h-3.5 text-[#B8926A]" />
                            </div>
                            <div className="text-[11px] text-white/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                              {tailorTyping ? 'Mengetik...' : 'Online · biasanya balas dalam 5 menit'}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setCallMode('voice')}
                              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8926A] flex items-center justify-center transition-colors"
                              aria-label="Telepon suara"
                            >
                              <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </button>
                            <button
                              onClick={() => setCallMode('video')}
                              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8926A] flex items-center justify-center transition-colors"
                              aria-label="Video call"
                            >
                              <Video className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Messages */}
                        <div className="p-5 space-y-3 bg-[#FAF8F5] h-[420px] overflow-y-auto flex flex-col">
                          {chatMessages.map((m, i) => (
                            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line ${
                                m.from === 'user' ? 'bg-[#2C1810] text-white rounded-tr-sm' : 'bg-white border border-[#2C1810]/10 text-[#2C1810] rounded-tl-sm'
                              }`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                                {m.brief && (
                                  <div className="text-[10px] text-white/60 tracking-[0.2em] uppercase mb-1.5" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Brief Otomatis</div>
                                )}
                                {m.text}
                                {m.estimate && (
                                  <div className="bg-[#FAF8F5] rounded-sm p-3 border border-[#B8926A]/30 mt-2.5">
                                    <div className="flex justify-between items-center mb-1.5">
                                      <span className="text-[11px] text-[#8B6544] tracking-[0.15em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Estimasi Final</span>
                                      <BadgeCheck className="w-4 h-4 text-[#B8926A]" />
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                      <span className="text-[12px] text-[#2C1810]/70">Harga</span>
                                      <span className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '16px' }}>{formatRp(m.estimate.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mt-1">
                                      <span className="text-[12px] text-[#2C1810]/70">Timeline</span>
                                      <span className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px' }}>{m.estimate.eta}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          {tailorTyping && (
                            <div className="flex justify-start">
                              <div className="bg-white border border-[#2C1810]/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B8926A] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B8926A] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B8926A] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Quick replies (suggestion chips) */}
                        {chatMessages.length > 0 && !tailorEstimate && !tailorTyping && (
                          <div className="px-5 py-2.5 border-t border-[#2C1810]/10 bg-white flex flex-wrap gap-2">
                            {['Harganya berapa ya?', 'Berapa lama selesai?', 'Bahan dari mana?'].map((q) => (
                              <button
                                key={q}
                                onClick={() => { setChatInput(q); }}
                                className="px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#2C1810]/15 text-[11px] text-[#2C1810]/80 hover:border-[#B8926A] hover:text-[#2C1810] transition-all"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                              >
                                {q}
                              </button>
                            ))}
                            <button
                              onClick={sendEstimate}
                              className="px-3 py-1.5 rounded-full bg-[#B8926A]/15 border border-[#B8926A]/40 text-[11px] text-[#8B6544] hover:bg-[#B8926A] hover:text-white transition-all"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                            >
                              Minta estimasi final
                            </button>
                          </div>
                        )}

                        {/* Composer */}
                        <div className="px-5 py-3 border-t border-[#2C1810]/10 bg-white flex items-center gap-2">
                          <button className="w-9 h-9 rounded-full hover:bg-[#FAF8F5] flex items-center justify-center text-[#2C1810]/60 hover:text-[#B8926A] shrink-0" aria-label="Lampiran">
                            <Paperclip className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') sendChat(); }}
                            placeholder="Tulis pesan ke penjahit..."
                            className="flex-1 px-3 py-2 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-full text-[13px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:border-[#B8926A] transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          />
                          <button
                            onClick={sendChat}
                            disabled={!chatInput.trim()}
                            className="w-10 h-10 rounded-full bg-[#2C1810] hover:bg-[#B8926A] disabled:bg-[#2C1810]/20 flex items-center justify-center text-white shrink-0 transition-colors"
                            aria-label="Kirim"
                          >
                            <Send className="w-4 h-4" strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Agreement footer */}
                        {tailorEstimate && !tailorAccepted && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-5 py-4 border-t-2 border-[#B8926A]/30 bg-[#B8926A]/10">
                            <div className="text-[13px] text-[#2C1810] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                              Sudah sepakat dengan estimasi penjahit? Klik setuju untuk lanjut ke pembayaran.
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setTailorAccepted(true)}
                                className="flex-1 py-2.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] transition-colors text-[12px] tracking-[0.1em] uppercase"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                              >
                                ✓ Setuju & Lanjut
                              </button>
                              <button
                                onClick={() => { setTailorEstimate(null); }}
                                className="px-5 py-2.5 bg-white border border-[#2C1810]/20 text-[#2C1810] rounded-full hover:border-[#B8926A] transition-all text-[12px]"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                              >
                                Diskusi lagi
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {tailorAccepted && (
                          <div className="px-5 py-3 border-t-2 border-[#B8926A]/40 bg-[#B8926A]/15 flex items-center gap-2">
                            <BadgeCheck className="w-5 h-5 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                            <span className="text-[13px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                              Sepakat! Klik "Lanjut" di bawah untuk bayar DP.
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Call modal */}
                    {callMode && (
                      <div className="fixed inset-0 z-50 bg-[#2C1810]/95 backdrop-blur-md flex items-center justify-center p-6">
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-full max-w-md text-center"
                        >
                          <div className="text-[10px] tracking-[0.4em] uppercase text-[#B8926A] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                            {callMode === 'voice' ? 'Panggilan Suara' : 'Video Call'}
                          </div>

                          {callMode === 'video' && callConnected ? (
                            <div className="relative w-full aspect-[3/4] bg-[#1a0e08] rounded-2xl overflow-hidden mb-6 shadow-2xl">
                              <ImageWithFallback src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                              <div className="absolute bottom-3 right-3 w-24 h-32 rounded-lg bg-[#2C1810] border-2 border-white/20 overflow-hidden flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-[#B8926A] flex items-center justify-center text-white text-xl" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>A</div>
                              </div>
                              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2C1810]/80 backdrop-blur text-white text-[11px]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                                ● {formatCallTime(callDuration)}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-6">
                              <motion.div
                                animate={callConnected ? {} : { scale: [1, 1.08, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 border-[#B8926A] shadow-[0_0_60px_rgba(184,146,106,0.4)]"
                              >
                                <ImageWithFallback src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                              </motion.div>
                              <div className="text-2xl text-white mt-5" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{tailor.name}</div>
                              <div className="text-[13px] text-white/60 mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                                {callConnected ? formatCallTime(callDuration) : 'Memanggil...'}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => setCallMuted(!callMuted)}
                              disabled={!callConnected}
                              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                                callMuted ? 'bg-white text-[#2C1810]' : 'bg-white/15 text-white hover:bg-white/25'
                              } disabled:opacity-40`}
                              aria-label="Mute"
                            >
                              {callMuted ? <MicOff className="w-5 h-5" strokeWidth={2.5} /> : <Mic className="w-5 h-5" strokeWidth={2.5} />}
                            </button>
                            <button
                              onClick={endCall}
                              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all shadow-lg"
                              aria-label="Akhiri"
                            >
                              <PhoneOff className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </button>
                            {callMode === 'voice' && (
                              <button
                                onClick={() => setCallMode('video')}
                                disabled={!callConnected}
                                className="w-14 h-14 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center transition-all disabled:opacity-40"
                                aria-label="Video"
                              >
                                <Video className="w-5 h-5" strokeWidth={2.5} />
                              </button>
                            )}
                          </div>

                          <div className="text-[11px] text-white/50 mt-6 max-w-[260px] mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                            Panggilan dilakukan via Tailora — nomor pribadi Anda dan penjahit tetap terjaga.
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </>
                )}

                {step === 6 && (
                  <>
                    <StepHeader eyebrow="Langkah 6 dari 6" title="Metode" italic="Pembayaran" subtitle="Bayar 30% DP sekarang, sisanya dibayar saat pakaian siap (milestone payment)." />

                    <div className="bg-[#FAF8F5] border-l-2 border-[#B8926A] p-4 mb-6 flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <div className="text-[13px] text-[#2C1810] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Pembayaran Aman Terlindungi</div>
                        <div className="text-[12px] text-[#2C1810]/75 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          Dana DP Anda ditahan oleh Tailora dan baru diteruskan ke penjahit saat milestone tercapai. Uang kembali 100% jika pesanan dibatalkan.
                        </div>
                      </div>
                    </div>

                    <Label>Pilih Metode Pembayaran</Label>
                    <div className="space-y-2.5">
                      {paymentMethods.map((p) => {
                        const active = payment === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPayment(p.id)}
                            className={`w-full flex items-center gap-3 p-4 rounded-sm border-2 transition-all text-left ${
                              active ? 'border-[#B8926A] bg-[#B8926A]/10' : 'border-[#2C1810]/10 bg-[#FAF8F5] hover:border-[#B8926A]/50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-[#B8926A] text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810]/70'}`}>
                              <CreditCard className="w-4 h-4" strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>{p.label}</div>
                              <div className="text-[12px] text-[#2C1810]/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{p.subLabel}</div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${active ? 'bg-[#2C1810] border-[#2C1810]' : 'border-[#2C1810]/25'}`}>
                              {active && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prev}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-[#2C1810]/75 hover:text-[#2C1810] hover:bg-[#2C1810]/5 transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-[13px]">Kembali</span>
              </button>
              <button
                onClick={next}
                disabled={!canProceed}
                className="flex items-center gap-2 px-8 py-3.5 bg-[#2C1810] text-white rounded-full hover:bg-[#B8926A] disabled:bg-[#2C1810]/20 disabled:cursor-not-allowed transition-all shadow-md"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                <span className="text-[13px] tracking-[0.1em] uppercase">{step === 6 ? 'Bayar DP & Konfirmasi' : 'Lanjut'}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-[#2C1810] text-white rounded-2xl p-6 shadow-[0_20px_60px_rgba(44,24,16,0.2)] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[9rem] leading-none text-white/[0.04] pointer-events-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>T</div>
                <div className="relative">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#B8926A] mb-4" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Ringkasan Pesanan</div>

                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
                    <div className="w-12 h-12 rounded-sm overflow-hidden shrink-0">
                      <ImageWithFallback src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white truncate" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{tailor.name}</div>
                      <div className="flex items-center gap-1 text-[11px] text-white/70" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        <Star className="w-3 h-3 fill-[#B8926A] text-[#B8926A]" /> {tailor.rating} · {tailor.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-[13px] mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    <SummaryRow label="Layanan" value={serviceTypes.find((s) => s.id === service)?.label || '—'} />
                    <SummaryRow label="Jenis Pakaian" value={clothing || '—'} />
                    <SummaryRow label="Jumlah" value={`${quantity} pcs`} />
                    {isPermak ? (
                      <>
                        <SummaryRow label="Area Permak" value={permakAreas.length ? `${permakAreas.length} area` : '—'} />
                        <SummaryRow label="Kirim Pakaian" value={sendOptions.find((s) => s.id === sendMethod)?.label || '—'} />
                      </>
                    ) : (
                      <SummaryRow label="Pengukuran" value={measurementOptions.find((m) => m.id === measurement)?.label || '—'} />
                    )}
                    <SummaryRow label={isPermak ? 'Pengembalian' : 'Pengiriman'} value={deliveryOptions.find((d) => d.id === delivery)?.label || '—'} />
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    <div className="flex justify-between text-white/75">
                      <span>Subtotal</span>
                      <span className="text-white" style={{ fontWeight: 600 }}>{formatRp(subtotal)}</span>
                    </div>
                    {isPermak && sendMethod && (
                      <div className="flex justify-between text-white/75">
                        <span>Jemput Pakaian</span>
                        <span className="text-white" style={{ fontWeight: 600 }}>{sendPrice === 0 ? 'Gratis' : formatRp(sendPrice)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/75">
                      <span>{isPermak ? 'Pengembalian' : 'Pengiriman'}</span>
                      <span className="text-white" style={{ fontWeight: 600 }}>{deliveryPrice === 0 ? '—' : formatRp(deliveryPrice)}</span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2 border-t border-white/10">
                      <span className="text-white" style={{ fontWeight: 700 }}>Total</span>
                      <span className="text-xl text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{formatRp(total)}</span>
                    </div>
                    <div className="flex justify-between text-[#B8926A]" style={{ fontWeight: 700 }}>
                      <span>DP 30% (bayar sekarang)</span>
                      <span>{formatRp(dp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#2C1810]/10 rounded-sm p-5">
                <div className="flex items-center gap-2 text-[13px] text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  <CheckCircle2 className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                  Milestone payment terlindungi
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#2C1810] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  <CheckCircle2 className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                  Gratis revisi minor
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#2C1810] mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  <CheckCircle2 className="w-4 h-4 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                  Refund 100% jika batal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepHeader({ eyebrow, title, italic, subtitle }: { eyebrow: string; title: string; italic: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="text-[11px] tracking-[0.3em] uppercase text-[#8B6544] mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
        {eyebrow}
      </div>
      <h2 className="text-3xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
        {title} <span className="italic text-[#B8926A]">{italic}</span>
      </h2>
      <p className="text-[#2C1810]/75 text-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{subtitle}</p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[0.2em] uppercase text-[#2C1810] mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-white/60 shrink-0">{label}</span>
      <span className="text-white text-right truncate" style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}
