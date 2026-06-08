export const profileStats = [
  { label: 'Total Pesanan', value: '12' },
  { label: 'Penjahit Favorit', value: '4' },
  { label: 'Total Spending', value: 'Rp 6jt' },
];

export const savedMeasurements = [
  { label: 'Lingkar Dada', value: '88 cm' },
  { label: 'Lingkar Pinggang', value: '68 cm' },
  { label: 'Lingkar Pinggul', value: '94 cm' },
  { label: 'Panjang Lengan', value: '58 cm' },
  { label: 'Panjang Bahu', value: '38 cm' },
  { label: 'Tinggi Badan', value: '165 cm' },
];

export const addresses = [
  { id: 1, label: 'Rumah', name: 'Akmal Baihaqii', phone: '+62 812-3456-7890', detail: 'Cluster Silver Sand Blok B7 No. 18, CitraLand Puncak Tidar, Malang, Jawa Timur 65151', primary: true },
  { id: 2, label: 'Kantor', name: 'Akmal Baihaqii', phone: '+62 812-3456-7890', detail: 'Araya Business Center, Jl. Raya Araya, Kota Malang, Jawa Timur 65126', primary: false },
];

export const paymentMethods = [
  { id: 1, type: 'BCA', label: 'Virtual Account', last: '7821', primary: true },
  { id: 2, type: 'Visa', label: 'Kredit â€¢â€¢â€¢â€¢ 4242', last: '4242', primary: false },
  { id: 3, type: 'OVO', label: 'E-Wallet', last: '7890', primary: false },
];

export const notificationPreferences = [
  { label: 'Update progress pesanan', desc: 'Notifikasi saat status pesanan berubah', on: true },
  { label: 'Pesan baru dari penjahit', desc: 'Chat dan konsultasi langsung', on: true },
  { label: 'Promo & editorial', desc: 'Newsletter mingguan dari Tailora', on: false },
  { label: 'Reminder fitting', desc: 'Pengingat jadwal fitting offline', on: true },
];

export const securityRows = [
  { label: 'Password', value: 'Diperbarui 2 bulan lalu', cta: 'Ubah' },
  { label: 'Verifikasi 2 Langkah', value: 'SMS ke +62 812-3456-7890', cta: 'Kelola' },
  { label: 'Sesi Aktif', value: '2 perangkat', cta: 'Lihat' },
  { label: 'Hapus Akun', value: 'Permanen â€” tidak dapat dibatalkan', cta: 'Hapus', danger: true },
];
