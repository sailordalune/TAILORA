import React, { useEffect, useRef, useState } from 'react';
import {
  X, Send, Paperclip, Smile, Phone, Video, MoreVertical, Check, CheckCheck,
  Image as ImageIcon, FileText, Calendar, Ruler, Sparkles, ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { TailorData } from './TailorDetail';

type Msg = {
  id: number;
  from: 'tailor' | 'user' | 'system';
  text: string;
  time: string;
  read?: boolean;
};

const quickReplies = [
  { icon: Sparkles, label: 'Tanya ketersediaan' },
  { icon: Calendar, label: 'Jadwal konsultasi' },
  { icon: Ruler, label: 'Tanya pengukuran' },
  { icon: FileText, label: 'Estimasi harga' },
];

const tailorReplies = [
  'Halo! Terima kasih sudah menghubungi kami. Apakah ada yang bisa saya bantu terkait pesanan Anda?',
  'Baik, saya catat. Boleh saya minta referensi desain atau inspirasi yang Anda inginkan?',
  'Untuk pengerjaan reguler biasanya 7-10 hari kerja. Apakah Anda memiliki deadline tertentu?',
  'Saya bisa menawarkan jadwal konsultasi besok pukul 10.00 atau 14.00 WIB. Mana yang lebih nyaman untuk Anda?',
  'Baik, saya siapkan terlebih dahulu. Setelah konfirmasi, Anda dapat langsung melanjutkan ke pembayaran DP melalui tombol Pesan Sekarang.',
];

type Props = { tailor: TailorData; open: boolean; onClose: () => void };

export function ChatDrawer({ tailor, open, onClose }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, from: 'system', text: 'Percakapan dimulai. Semua pesan terlindungi Tailora Protection.', time: '' },
    { id: 2, from: 'tailor', text: `Halo! Saya dari ${tailor.name}. Senang bisa terhubung dengan Anda — ada rencana pakaian apa yang ingin dibuat?`, time: 'Sekarang' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const replyIdx = useRef(0);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const now = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now(), from: 'user', text: text.trim(), time: now(), read: false };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setMessages((m) => m.map((msg) => msg.id === userMsg.id ? { ...msg, read: true } : msg));
    }, 600);

    setTimeout(() => {
      setTyping(false);
      const reply = tailorReplies[replyIdx.current % tailorReplies.length];
      replyIdx.current += 1;
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'tailor', text: reply, time: now() }]);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2C1810]/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#FAF8F5] z-[70] flex flex-col shadow-[-20px_0_60px_rgba(44,24,16,0.2)]"
          >
            {/* Header */}
            <div className="bg-white border-b border-[#2C1810]/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/70 transition-colors" aria-label="Tutup">
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white ring-2 ring-[#B8926A]/20">
                    <ImageWithFallback src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#4A7A5C] border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="text-[#2C1810] truncate" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '16px' }}>
                      {tailor.name}
                    </div>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B8926A] shrink-0" strokeWidth={2.5} />
                  </div>
                  <div className="text-[11px] text-[#4A7A5C] flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A7A5C]"></span>
                    Online · Respons &lt; 1 jam
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-9 h-9 rounded-full hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/70 transition-colors" aria-label="Telepon">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <button className="w-9 h-9 rounded-full hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/70 transition-colors" aria-label="Video">
                    <Video className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <button className="w-9 h-9 rounded-full hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/70 transition-colors" aria-label="Lainnya">
                    <MoreVertical className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-3 bg-[#FAF8F5]">
              {/* Date separator */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-[#2C1810]/10"></div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Hari ini
                </div>
                <div className="flex-1 h-px bg-[#2C1810]/10"></div>
              </div>

              {messages.map((msg) => {
                if (msg.from === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center my-3">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8926A]/15 border border-[#B8926A]/30 text-[#8B6544] text-[11px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2.5} />
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                const isUser = msg.from === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[78%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        isUser
                          ? 'bg-[#2C1810] text-white rounded-br-sm'
                          : 'bg-white text-[#2C1810] rounded-bl-sm border border-[#2C1810]/10 shadow-sm'
                      }`}>
                        <p className="text-[14px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          {msg.text}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] text-[#2C1810]/50 px-1`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        <span>{msg.time}</span>
                        {isUser && (
                          msg.read
                            ? <CheckCheck className="w-3 h-3 text-[#B8926A]" strokeWidth={2.5} />
                            : <Check className="w-3 h-3" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing */}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white border border-[#2C1810]/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#B8926A]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-5 pb-3 bg-[#FAF8F5]">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#8B6544] mb-2" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  Balasan Cepat
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => sendMessage(q.label)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#2C1810]/15 rounded-full text-[12px] text-[#2C1810] hover:border-[#B8926A] hover:bg-[#B8926A]/10 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <q.icon className="w-3.5 h-3.5 text-[#B8926A]" strokeWidth={2.5} />
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-[#2C1810]/10 px-4 py-3">
              <div className="flex items-end gap-2">
                <button className="w-10 h-10 rounded-full hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/60 hover:text-[#B8926A] transition-colors shrink-0" aria-label="Lampirkan foto">
                  <ImageIcon className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>
                <button className="w-10 h-10 rounded-full hover:bg-[#2C1810]/5 flex items-center justify-center text-[#2C1810]/60 hover:text-[#B8926A] transition-colors shrink-0" aria-label="Lampirkan file">
                  <Paperclip className="w-[18px] h-[18px]" strokeWidth={2} />
                </button>
                <div className="flex-1 bg-[#FAF8F5] border border-[#2C1810]/15 rounded-3xl px-4 py-2.5 flex items-end gap-2 focus-within:border-[#B8926A] transition-colors">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    placeholder="Tulis pesan..."
                    rows={1}
                    className="flex-1 bg-transparent text-[14px] text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none resize-none max-h-24"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  />
                  <button className="text-[#2C1810]/50 hover:text-[#B8926A] transition-colors" aria-label="Emoji">
                    <Smile className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-11 h-11 rounded-full bg-[#2C1810] text-white hover:bg-[#B8926A] disabled:bg-[#2C1810]/20 disabled:cursor-not-allowed flex items-center justify-center transition-all shrink-0 shadow-md"
                  aria-label="Kirim"
                >
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
              <div className="text-[10px] text-[#2C1810]/50 text-center mt-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Tekan <span className="font-mono bg-[#2C1810]/5 px-1 rounded">Enter</span> untuk kirim · <span className="font-mono bg-[#2C1810]/5 px-1 rounded">Shift + Enter</span> untuk baris baru
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
