import React, { useState } from 'react';
import { Search, Bell, Menu, X, Scissors, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import profileImg from '../../imports/profile.png';

const navItems = ['Beranda', 'Penjahit', 'Pesanan'];

type Props = {
  onSearchClick?: () => void;
  onNavClick?: (item: string) => void;
  onProfileClick?: () => void;
  active?: 'home' | 'search' | 'orders' | 'profile' | 'measurement' | 'faq';
};

export function TopNav({ onSearchClick, onNavClick, onProfileClick, active = 'home' }: Props = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const activeItem = active === 'orders' ? 'Pesanan' : active === 'search' ? 'Penjahit' : active === 'home' ? 'Beranda' : '';

  return (
    <header className="sticky top-0 z-50 border-b border-[#2C1810]/[0.08]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-[#FAF8F5]/90 backdrop-blur-2xl">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button className="md:hidden text-[#2C1810]/70 hover:text-[#2C1810]" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B8926A] to-[#8B6D4F] flex items-center justify-center shadow-md">
                  <span className="text-white text-base leading-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>T</span>
                </div>
                <span className="text-[#2C1810] tracking-[0.3em] text-[14px] uppercase leading-none" style={{ fontWeight: 700 }}>
                  Tailora
                </span>
              </div>
            </div>

            {/* Center Nav — absolutely centered */}
            <nav className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navItems.map((item) => {
                const active = activeItem === item;
                return (
                  <button
                    key={item}
                    onClick={() => onNavClick?.(item)}
                    className={`px-5 py-2.5 rounded-full text-[14px] transition-all ${
                      active
                        ? 'bg-[#2C1810] text-white shadow-sm'
                        : 'text-[#2C1810]/75 hover:text-[#2C1810] hover:bg-[#2C1810]/[0.05]'
                    }`}
                    style={{ fontWeight: active ? 600 : 500 }}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button onClick={() => onNavClick?.('Penjahit')} className="w-10 h-10 rounded-full bg-white border border-[#2C1810]/10 flex items-center justify-center text-[#2C1810]/70 hover:text-[#2C1810] hover:border-[#B8926A] transition-all" aria-label="Cari">
                <Search className="w-[18px] h-[18px]" strokeWidth={2} />
              </button>
              
              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="relative w-10 h-10 rounded-full bg-white border border-[#2C1810]/10 flex items-center justify-center text-[#2C1810]/70 hover:text-[#2C1810] hover:border-[#B8926A] transition-all">
                  <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C07A50] ring-2 ring-[#FAF8F5]"></span>
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-3 w-80 bg-white border border-[#2C1810]/10 rounded-2xl shadow-[0_20px_60px_rgba(44,24,16,0.15)] z-50 overflow-hidden"
                      >
                        <div className="p-4 border-b border-[#2C1810]/10 flex items-center justify-between">
                          <h3 className="text-[15px] text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Notifikasi</h3>
                          <span className="text-[10px] tracking-[0.1em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>2 Baru</span>
                        </div>
                        <div className="max-h-[320px] overflow-y-auto">
                          <div className="p-4 hover:bg-[#FAF8F5] border-b border-[#2C1810]/[0.05] cursor-pointer transition-colors flex gap-3 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C07A50]"></div>
                            <div className="w-10 h-10 rounded-full bg-[#B8926A]/10 flex items-center justify-center shrink-0 text-[#B8926A]">
                              <Scissors className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[13px] text-[#2C1810] mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Pesanan #TLR-482931</div>
                              <div className="text-[12px] text-[#2C1810]/60 leading-tight mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Proses jahit Kebaya Modern telah dimulai oleh Rina Boutique.</div>
                              <div className="text-[10px] text-[#2C1810]/40" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 500 }}>2 Jam yang lalu</div>
                            </div>
                          </div>
                          <div className="p-4 hover:bg-[#FAF8F5] cursor-pointer transition-colors flex gap-3 relative">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C07A50]"></div>
                            <div className="w-10 h-10 rounded-full bg-[#4A7A5C]/10 flex items-center justify-center shrink-0 text-[#4A7A5C]">
                              <Check className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[13px] text-[#2C1810] mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Pesanan Selesai</div>
                              <div className="text-[12px] text-[#2C1810]/60 leading-tight mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Gaun Pengantin dari Dewi Couture siap untuk diambil/dikirim.</div>
                              <div className="text-[10px] text-[#2C1810]/40" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 500 }}>Kemarin</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 border-t border-[#2C1810]/10 bg-[#FAF8F5]">
                          <button onClick={() => setNotifOpen(false)} className="w-full py-2 text-[12px] text-[#B8926A] hover:text-[#2C1810] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            Tandai semua dibaca
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-8 w-px bg-[#2C1810]/10 mx-1 hidden sm:block"></div>
              <div onClick={onProfileClick} className={`flex items-center gap-3 cursor-pointer group rounded-full pr-1 pl-2 py-1 transition-all ${active === 'profile' ? 'bg-[#2C1810]/[0.06]' : 'hover:bg-[#2C1810]/[0.04]'}`}>
                <div className="hidden sm:block text-right">
                  <div className="text-[13px] text-[#2C1810] leading-tight" style={{ fontWeight: 600 }}>Akmal Baihaqii</div>
                </div>
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#B8926A]/20 group-hover:ring-[#B8926A]/40 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FAF8F5] border-b border-[#2C1810]/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => { onNavClick?.(item); setMenuOpen(false); }}
                  className={`text-left px-4 py-3 rounded-xl text-sm ${
                    activeItem === item ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]/75 hover:bg-[#2C1810]/[0.05]'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}