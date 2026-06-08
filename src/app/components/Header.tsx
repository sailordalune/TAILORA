import React, { useState, useEffect } from 'react';
import { User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = ['Dashboard', 'My Orders', 'Artisans', 'Measurement'];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#F5F5F1]/90 backdrop-blur-xl border-b border-[#2D1B14]/[0.06] shadow-[0_1px_20px_rgba(45,27,20,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-baseline gap-0.5 shrink-0">
            <span
              className="text-[22px] tracking-[0.02em] text-[#2D1B14]"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            >
              Tail<span className="italic">o</span>ra
            </span>
          </a>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`relative px-5 py-2 text-[13px] tracking-[0.01em] transition-colors ${
                  activeNav === item
                    ? 'text-[#2D1B14]'
                    : 'text-[#2D1B14]/35 hover:text-[#2D1B14]/60'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: activeNav === item ? 500 : 400 }}
              >
                {item}
                {activeNav === item && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-5 right-5 h-[1.5px] bg-[#2D1B14]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full border border-[#2D1B14]/[0.08] flex items-center justify-center text-[#2D1B14]/40 hover:text-[#2D1B14] hover:border-[#2D1B14]/20 transition-all bg-white/50">
              <User className="w-[16px] h-[16px]" />
            </button>
            <button
              className="md:hidden w-9 h-9 rounded-full border border-[#2D1B14]/[0.08] flex items-center justify-center text-[#2D1B14]/40 bg-white/50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#F5F5F1] border-b border-[#2D1B14]/[0.06] overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => { setActiveNav(item); setMenuOpen(false); }}
                  className={`text-left px-4 py-3 rounded-xl text-[14px] transition-colors ${
                    activeNav === item ? 'bg-[#2D1B14]/[0.04] text-[#2D1B14]' : 'text-[#2D1B14]/35'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: activeNav === item ? 500 : 400 }}
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
