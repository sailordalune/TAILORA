import React, { useState } from 'react';
import {
  ArrowLeft, Ruler, MapPin, CreditCard, Bell, Shield, ChevronRight,
  Sparkles, Edit3, Plus, Check, Camera, Mail, Phone, Calendar,
} from 'lucide-react';
import { motion } from 'motion/react';
import profileImg from '../../imports/profile.png';
import {
  addresses,
  notificationPreferences,
  paymentMethods,
  profileStats,
  savedMeasurements,
  securityRows,
} from '../data/profile';

type Props = { onBack: () => void; onOpenMeasurement: () => void };

type SectionId = 'measurement' | 'address' | 'payment' | 'notif' | 'security';

export function ProfilePage({ onBack, onOpenMeasurement }: Props) {
  const [section, setSection] = useState<SectionId>('measurement');

  const sections: { id: SectionId; label: string; icon: any; desc: string }[] = [
    { id: 'measurement', label: 'Ukuran Tersimpan', icon: Ruler, desc: 'Body measurement untuk pemesanan' },
    { id: 'address', label: 'Alamat Pengiriman', icon: MapPin, desc: 'Kelola alamat penerima' },
    { id: 'payment', label: 'Metode Pembayaran', icon: CreditCard, desc: 'Kartu, e-wallet, virtual account' },
    { id: 'notif', label: 'Notifikasi', icon: Bell, desc: 'Preferensi email & push' },
    { id: 'security', label: 'Keamanan', icon: Shield, desc: 'Password & verifikasi 2 langkah' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 mb-8 rounded-full bg-white border border-[#2C1810]/15 text-[#2C1810] hover:border-[#B8926A] transition-all"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-[13px]">Kembali</span>
        </button>

        {/* Profile header */}
        <div className="bg-gradient-to-br from-[#2C1810] to-[#3D2418] rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#B8926A]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 text-[14rem] leading-none text-white/[0.03] pointer-events-none select-none" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>
            A
          </div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={profileImg}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-white/10"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#B8926A] border-2 border-[#2C1810] flex items-center justify-center text-white hover:bg-white hover:text-[#2C1810] transition-colors">
                <Camera className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8926A]/20 border border-[#B8926A]/30 text-[#D4B896] text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                MEMBER TAILORA
              </div>
              <h1 className="text-3xl md:text-4xl text-white mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Akmal Baihaqii</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-white/70 text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> akmalhaqii41@gmail.com</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +62 812-3456-7890</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Bergabung Sept 2024</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#2C1810] hover:bg-[#B8926A] hover:text-white transition-colors text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              <Edit3 className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit Profil
            </button>
          </div>

          <div className="relative grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
            {profileStats.map((s) => (
              <div key={s.label}>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#D4B896] mb-1.5" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                  {s.label}
                </div>
                <div className="text-2xl text-white" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body: side menu + content */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Side menu */}
          <aside className="bg-white border border-[#2C1810]/10 rounded-2xl p-3 h-fit lg:sticky lg:top-24">
            {sections.map((s) => {
              const active = section === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    active ? 'bg-[#2C1810] text-white' : 'text-[#2C1810]/80 hover:bg-[#2C1810]/[0.05]'
                  }`}
                >
                  <s.icon className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      {s.label}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${active ? 'translate-x-0.5' : 'opacity-40'}`} strokeWidth={2} />
                </button>
              );
            })}
          </aside>

          {/* Content */}
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[#2C1810]/10 rounded-2xl p-8"
          >
            {section === 'measurement' && (
              <>
                <SectionHeader
                  title="Ukuran Tubuh"
                  italic="Tersimpan"
                  desc="Pengukuran ini otomatis terpakai saat Anda memesan jasa jahit baru."
                  action={
                    <button
                      onClick={onOpenMeasurement}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C1810] text-white text-[12px] hover:bg-[#B8926A] transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                    >
                      <Ruler className="w-3.5 h-3.5" strokeWidth={2.5} /> Ukur Ulang
                    </button>
                  }
                />
                <div className="grid sm:grid-cols-2 gap-3">
                  {savedMeasurements.map((m) => (
                    <div key={m.label} className="flex items-center justify-between p-4 bg-[#FAF8F5] border border-[#2C1810]/[0.06] rounded-sm">
                      <div className="text-[13px] text-[#2C1810]/75" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        {m.label}
                      </div>
                      <div className="text-[#2C1810]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '17px' }}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-sm bg-[#B8926A]/[0.06] border border-[#B8926A]/15 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#B8926A] shrink-0 mt-0.5" strokeWidth={2} />
                  <div className="text-[12px] text-[#2C1810]/75 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                    Terakhir diperbarui <span className="text-[#2C1810]" style={{ fontWeight: 700 }}>3 hari yang lalu</span>. Disarankan untuk mengukur ulang setiap 3-6 bulan untuk akurasi terbaik.
                  </div>
                </div>
              </>
            )}

            {section === 'address' && (
              <>
                <SectionHeader
                  title="Alamat"
                  italic="Pengiriman"
                  desc="Atur alamat tujuan pengiriman pakaian Anda."
                  action={
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C1810] text-white text-[12px] hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Tambah Alamat
                    </button>
                  }
                />
                <div className="space-y-3">
                  {addresses.map((a) => (
                    <div key={a.id} className="p-5 bg-[#FAF8F5] border border-[#2C1810]/[0.08] rounded-sm hover:border-[#B8926A]/40 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-[#2C1810] text-white text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                            {a.label}
                          </span>
                          {a.primary && (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#B8926A]/15 text-[#8B6544] text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                              <Check className="w-3 h-3" strokeWidth={3} /> Utama
                            </span>
                          )}
                        </div>
                        <button className="text-[12px] text-[#B8926A] hover:text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                          Edit
                        </button>
                      </div>
                      <div className="text-[#2C1810] mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                        {a.name} <span className="text-[#2C1810]/60" style={{ fontWeight: 500 }}>· {a.phone}</span>
                      </div>
                      <div className="text-[13px] text-[#2C1810]/75 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        {a.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === 'payment' && (
              <>
                <SectionHeader
                  title="Metode"
                  italic="Pembayaran"
                  desc="Kelola kartu, e-wallet, dan virtual account untuk transaksi cepat."
                  action={
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C1810] text-white text-[12px] hover:bg-[#B8926A] transition-colors" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} /> Tambah Metode
                    </button>
                  }
                />
                <div className="space-y-3">
                  {paymentMethods.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-5 bg-[#FAF8F5] border border-[#2C1810]/[0.08] rounded-sm hover:border-[#B8926A]/40 transition-colors">
                      <div className="w-14 h-10 rounded-sm bg-white border border-[#2C1810]/10 flex items-center justify-center text-[11px] tracking-wider text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        {p.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#2C1810] flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>
                          {p.label}
                          {p.primary && (
                            <span className="px-2 py-0.5 rounded-full bg-[#B8926A]/15 text-[#8B6544] text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-[#2C1810]/60" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                          •••• {p.last}
                        </div>
                      </div>
                      <button className="text-[12px] text-[#B8926A] hover:text-[#2C1810]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        Kelola
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === 'notif' && (
              <>
                <SectionHeader title="Preferensi" italic="Notifikasi" desc="Pilih bagaimana kami menghubungi Anda." />
                <div className="space-y-3">
                  {notificationPreferences.map((n) => (
                    <ToggleRow key={n.label} label={n.label} desc={n.desc} on={n.on} />
                  ))}
                </div>
              </>
            )}

            {section === 'security' && (
              <>
                <SectionHeader title="Akun &" italic="Keamanan" desc="Lindungi akun Anda dengan password kuat dan 2FA." />
                <div className="space-y-3">
                  {securityRows.map((row) => (
                    <SecurityRow key={row.label} label={row.label} value={row.value} cta={row.cta} danger={row.danger} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, italic, desc, action }: { title: string; italic: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-[#2C1810]/[0.08]">
      <div className="min-w-0">
        <h2 className="text-2xl md:text-3xl text-[#2C1810] mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          {title} <span className="italic text-[#B8926A]">{italic}</span>
        </h2>
        <p className="text-[13px] text-[#2C1810]/70 max-w-md" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          {desc}
        </p>
      </div>
      {action}
    </div>
  );
}

function ToggleRow({ label, desc, on: initial }: { label: string; desc: string; on: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-[#FAF8F5] border border-[#2C1810]/[0.08] rounded-sm">
      <div className="flex-1 min-w-0">
        <div className="text-[#2C1810] mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px' }}>
          {label}
        </div>
        <div className="text-[12px] text-[#2C1810]/65" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          {desc}
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${on ? 'bg-[#B8926A]' : 'bg-[#2C1810]/20'}`}
        aria-label={label}
      >
        <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

function SecurityRow({ label, value, cta, danger }: { label: string; value: string; cta: string; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 bg-[#FAF8F5] border border-[#2C1810]/[0.08] rounded-sm">
      <div className="flex-1 min-w-0">
        <div className="text-[#2C1810] mb-0.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px' }}>
          {label}
        </div>
        <div className="text-[12px] text-[#2C1810]/65" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          {value}
        </div>
      </div>
      <button className={`px-5 py-2.5 rounded-full text-[12px] transition-colors ${
        danger ? 'bg-transparent border border-[#C04040]/40 text-[#C04040] hover:bg-[#C04040] hover:text-white' : 'bg-white border border-[#2C1810]/15 text-[#2C1810] hover:border-[#B8926A]'
      }`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
        {cta}
      </button>
    </div>
  );
}
