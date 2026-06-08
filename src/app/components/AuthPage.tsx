import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';

type Mode = 'login' | 'register';

const LOGIN_IMG = 'https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400';
const REGISTER_IMG = 'https://images.unsplash.com/photo-1633655442330-0b44ca0cce9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400';

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.3 12 2.3 6.6 2.3 2.2 6.7 2.2 12.1S6.6 21.9 12 21.9c6.9 0 9.5-4.8 9.5-7.3 0-.5-.1-.9-.1-1.3H12z"/>
      <path fill="#34A853" d="M3.6 7.4l3.2 2.4C7.7 7.7 9.7 6.1 12 6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.3 12 2.3 8.1 2.3 4.8 4.4 3.6 7.4z" opacity="0"/>
      <path fill="#FBBC05" d="M12 21.9c2.6 0 4.8-.9 6.4-2.3l-3-2.4c-.8.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1l-3.2 2.4C4.8 19.6 8.1 21.9 12 21.9z" opacity="0"/>
      <path fill="#4285F4" d="M21.4 12.1c0-.7-.1-1.3-.2-1.9H12v3.9h5.3c-.2 1.2-.9 2.2-2 2.9l3 2.4c1.8-1.6 2.9-4 3.1-7.3z"/>
    </svg>
  );
}

function Field({
  icon: Icon,
  type = 'text',
  placeholder,
  label,
  value,
  onChange,
  toggleable,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  type?: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  toggleable?: boolean;
}) {
  const [show, setShow] = useState(false);
  const inputType = toggleable ? (show ? 'text' : 'password') : type;
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/60 mb-2 block" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
        {label}
      </span>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C1810]/40 group-focus-within:text-[#B8926A] transition-colors" strokeWidth={1.5} />
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-11 py-3.5 bg-[#FAF8F5] border border-[#2C1810]/10 rounded-xl text-sm text-[#2C1810] placeholder:text-[#2C1810]/35 focus:outline-none focus:border-[#B8926A] focus:bg-white focus:ring-4 focus:ring-[#B8926A]/10 transition-all"
          style={{ fontFamily: 'Inter, sans-serif' }}
        />
        {toggleable && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#2C1810]/40 hover:text-[#2C1810] transition-colors"
          >
            {show ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
          </button>
        )}
      </div>
    </label>
  );
}

export function AuthPage({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [mode, setMode] = useState<Mode>('login');

  // login state
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');

  // register state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [role, setRole] = useState<'pelanggan' | 'penjahit'>('pelanggan');

  const isLogin = mode === 'login';
  const image = isLogin ? LOGIN_IMG : REGISTER_IMG;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C1810] grid lg:grid-cols-[1.05fr_1fr]">
      {/* LEFT — form */}
      <div className="relative flex flex-col px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
        {/* Brand mark */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-full bg-[#2C1810] text-[#FAF8F5] flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
            T
          </div>
          <div>
            <div className="leading-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '1.25rem' }}>
              Tail<span className="italic text-[#B8926A]">o</span>ra
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* Mode switcher pill */}
            <div className="inline-flex bg-[#2C1810]/5 rounded-full p-1 mb-10">
              <button
                onClick={() => setMode('login')}
                className={`px-5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all ${isLogin ? 'bg-[#2C1810] text-[#FAF8F5]' : 'text-[#2C1810]/60 hover:text-[#2C1810]'}`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Masuk
              </button>
              <button
                onClick={() => setMode('register')}
                className={`px-5 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all ${!isLogin ? 'bg-[#2C1810] text-[#FAF8F5]' : 'text-[#2C1810]/60 hover:text-[#2C1810]'}`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Daftar
              </button>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-px bg-[#B8926A]" />
                <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  {isLogin ? 'Selamat Datang Kembali' : 'Bergabung Bersama Kami'}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl leading-[1.05] mb-4" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800 }}>
                {isLogin ? (
                  <>
                    Masuk ke <span className="italic text-[#B8926A]">Tailora</span>
                  </>
                ) : (
                  <>
                    Buat Akun <span className="italic text-[#B8926A]">Tailora</span>
                  </>
                )}
              </h1>
              <p className="text-[#2C1810]/65 leading-relaxed text-[15px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {isLogin
                  ? 'Kelola pesanan jahit dan temukan penjahit terpercaya dengan mudah.'
                  : 'Mulai pesan layanan permak dan custom pakaian dari penjahit lokal terpercaya.'}
              </p>
            </div>

            {/* Forms */}
            {isLogin ? (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAuthenticated();
                }}
              >
                <Field icon={Mail} label="Email atau Nomor Telepon" placeholder="nama@email.com" value={loginId} onChange={setLoginId} />
                <div>
                  <Field icon={Lock} label="Kata Sandi" placeholder="Masukkan kata sandi" value={loginPw} onChange={setLoginPw} toggleable />
                  <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center gap-2 text-xs text-[#2C1810]/65 cursor-pointer" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <input type="checkbox" className="w-3.5 h-3.5 accent-[#2C1810] rounded" />
                      Ingat saya
                    </label>
                    <a href="#" className="text-xs text-[#B8926A] hover:text-[#2C1810] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Lupa kata sandi?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group w-full py-4 bg-[#2C1810] text-[#FAF8F5] rounded-full text-[11px] tracking-[0.3em] uppercase hover:bg-[#B8926A] hover:text-[#2C1810] transition-all flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  Masuk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-px bg-[#2C1810]/10" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#2C1810]/40" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    atau
                  </span>
                  <div className="flex-1 h-px bg-[#2C1810]/10" />
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-white border border-[#2C1810]/15 rounded-full text-sm text-[#2C1810] hover:border-[#2C1810] transition-all flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  <GoogleIcon className="w-5 h-5" />
                  Masuk dengan Google
                </button>

                <p className="text-center text-sm text-[#2C1810]/65 pt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Belum punya akun?{' '}
                  <button type="button" onClick={() => setMode('register')} className="text-[#2C1810] underline underline-offset-4 decoration-[#B8926A] decoration-2 hover:text-[#B8926A] transition-colors" style={{ fontWeight: 600 }}>
                    Daftar sekarang
                  </button>
                </p>
              </form>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAuthenticated();
                }}
              >
                {/* Role selection */}
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/60 mb-2 block" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    Saya mendaftar sebagai
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {(['pelanggan', 'penjahit'] as const).map((r) => {
                      const active = role === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`relative px-4 py-4 rounded-xl border text-left transition-all ${
                            active
                              ? 'border-[#2C1810] bg-[#2C1810] text-[#FAF8F5]'
                              : 'border-[#2C1810]/12 bg-[#FAF8F5] text-[#2C1810] hover:border-[#2C1810]/40'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm capitalize" style={{ fontWeight: 600 }}>
                                {r === 'pelanggan' ? 'Pelanggan' : 'Penjahit'}
                              </div>
                              <div className={`text-[11px] mt-0.5 ${active ? 'text-[#FAF8F5]/70' : 'text-[#2C1810]/55'}`}>
                                {r === 'pelanggan' ? 'Pesan jahit & permak' : 'Buka layanan jahit'}
                              </div>
                            </div>
                            {active && (
                              <div className="w-5 h-5 rounded-full bg-[#B8926A] flex items-center justify-center">
                                <Check className="w-3 h-3 text-[#2C1810]" strokeWidth={3} />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field icon={User} label="Nama Lengkap" placeholder="Misal: Aisyah Putri" value={name} onChange={setName} />
                <Field icon={Mail} label="Email" placeholder="nama@email.com" type="email" value={email} onChange={setEmail} />
                <Field icon={Phone} label="Nomor Telepon" placeholder="+62 812 3456 7890" type="tel" value={phone} onChange={setPhone} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field icon={Lock} label="Kata Sandi" placeholder="Minimal 8 karakter" value={pw} onChange={setPw} toggleable />
                  <Field icon={Lock} label="Konfirmasi Sandi" placeholder="Ulangi kata sandi" value={pw2} onChange={setPw2} toggleable />
                </div>

                <button
                  type="submit"
                  className="group w-full py-4 bg-[#2C1810] text-[#FAF8F5] rounded-full text-[11px] tracking-[0.3em] uppercase hover:bg-[#B8926A] hover:text-[#2C1810] transition-all flex items-center justify-center gap-2 mt-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  Daftar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </button>

                <p className="text-center text-xs text-[#2C1810]/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Dengan mendaftar, Anda menyetujui{' '}
                  <a href="#" className="text-[#2C1810] underline underline-offset-2 hover:text-[#B8926A] transition-colors" style={{ fontWeight: 600 }}>
                    syarat dan ketentuan
                  </a>{' '}
                  Tailora.
                </p>

                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-px bg-[#2C1810]/10" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#2C1810]/40" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                    atau
                  </span>
                  <div className="flex-1 h-px bg-[#2C1810]/10" />
                </div>

                <button
                  type="button"
                  className="w-full py-4 bg-white border border-[#2C1810]/15 rounded-full text-sm text-[#2C1810] hover:border-[#2C1810] transition-all flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  <GoogleIcon className="w-5 h-5" />
                  Daftar dengan Google
                </button>

                <p className="text-center text-sm text-[#2C1810]/65 pt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sudah punya akun?{' '}
                  <button type="button" onClick={() => setMode('login')} className="text-[#2C1810] underline underline-offset-4 decoration-[#B8926A] decoration-2 hover:text-[#B8926A] transition-colors" style={{ fontWeight: 600 }}>
                    Masuk
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="text-[10px] tracking-[0.3em] uppercase text-[#2C1810]/40 mt-10" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>
          &copy; 2026 Tailora.id
        </div>
      </div>

      {/* RIGHT — editorial visual */}
      <div className="relative hidden lg:block overflow-hidden bg-[#2C1810]">
        <ImageWithFallback
          src={image}
          alt="Tailora atelier"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810]/65 via-[#2C1810]/25 to-[#B8926A]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-transparent" />

        {/* Top right tag */}
        <div className="absolute top-10 right-10 flex items-center gap-3 text-[#FAF8F5]">
          <div className="text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
            Est. 2016
          </div>
          <div className="w-10 h-px bg-[#FAF8F5]/60" />
        </div>

        {/* Watermark */}
        <div className="absolute -bottom-10 -left-6 text-[16rem] leading-none text-[#FAF8F5]/[0.08] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
          T<span className="italic">o</span>
        </div>

        {/* Quote / editorial copy */}
        <div className="absolute bottom-14 left-12 right-12 text-[#FAF8F5]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#B8926A]" />
            <div className="text-[10px] tracking-[0.5em] uppercase text-[#B8926A]" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
              Editorial
            </div>
          </div>
          <p className="text-2xl md:text-3xl leading-[1.15] max-w-md mb-6" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
            “Setiap jahitan adalah <span className="italic text-[#B8926A]">cerita</span> — tentang ketelitian, rasa, dan jati diri.”
          </p>

        </div>

        {/* Stats strip */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col gap-6 text-[#FAF8F5] text-right">
          {[
            { v: '1.2K+', l: 'Penjahit Verified' },
            { v: '34K+', l: 'Pesanan Selesai' },
            { v: '4.9', l: 'Rating Atelier' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>
                {s.v}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-[#FAF8F5]/70 mt-1" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
