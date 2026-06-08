import { Inbox, Cog, Scissors, Ruler, CheckCircle2 } from 'lucide-react';
import toko1Img from '../../imports/toko1.jpg';
import toko2Img from '../../imports/toko2.jpg';
import toko3Img from '../../imports/toko3.jpg';
import toko4Img from '../../imports/toko4.jpg';
import toko6Img from '../../imports/toko6.jpg';

export type OrderStatus = 'diterima' | 'diproses' | 'dijahit' | 'fitting' | 'selesai' | 'dibatalkan';

export type Order = {
  id: string;
  tailor: { name: string; image: string; location: string; rating: number };
  service: string;
  clothing: string;
  quantity: number;
  status: OrderStatus;
  stage: number;
  createdAt: string;
  eta: string;
  price: number;
  paid: number;
  notes?: string;
};

export const orderStages = [
  { id: 'diterima', label: 'Diterima', desc: 'Pesanan diterima & dikonfirmasi penjahit', icon: Inbox },
  { id: 'diproses', label: 'Diproses', desc: 'Persiapan bahan & pola', icon: Cog },
  { id: 'dijahit', label: 'Dijahit', desc: 'Proses jahit sedang berlangsung', icon: Scissors },
  { id: 'fitting', label: 'Fitting', desc: 'Pengepasan & penyesuaian akhir', icon: Ruler },
  { id: 'selesai', label: 'Selesai', desc: 'Pakaian siap diambil / dikirim', icon: CheckCircle2 },
];

export const mockOrders: Order[] = [
  {
    id: 'TLR-482931',
    tailor: {
      name: 'Rina Boutique', location: 'Bandung', rating: 4.9,
      image: toko1Img,
    },
    service: 'Jahit Baru', clothing: 'Kebaya Modern', quantity: 1,
    status: 'dijahit', stage: 2,
    createdAt: '15 Apr 2026', eta: '28 Apr 2026',
    price: 400000, paid: 120000,
    notes: 'Model kutubaru lengan panjang dengan detail payet di bagian dada.',
  },
  {
    id: 'TLR-471822',
    tailor: {
      name: 'Atelier By Budi', location: 'Jakarta Selatan', rating: 4.9,
      image: toko2Img,
    },
    service: 'Custom', clothing: 'Jas Formal 2-piece', quantity: 1,
    status: 'fitting', stage: 3,
    createdAt: '2 Apr 2026', eta: '24 Apr 2026',
    price: 850000, paid: 255000,
    notes: 'Warna navy, material wool Italia, slim fit.',
  },
  {
    id: 'TLR-465114',
    tailor: {
      name: 'Maison Sari', location: 'Yogyakarta', rating: 4.8,
      image: toko3Img,
    },
    service: 'Permak', clothing: 'Batik Parang', quantity: 2,
    status: 'diproses', stage: 1,
    createdAt: '19 Apr 2026', eta: '25 Apr 2026',
    price: 80000, paid: 24000,
  },
  {
    id: 'TLR-449022',
    tailor: {
      name: 'Dewi Couture', location: 'Bali', rating: 4.9,
      image: toko4Img,
    },
    service: 'Custom', clothing: 'Gaun Pengantin', quantity: 1,
    status: 'selesai', stage: 4,
    createdAt: '10 Feb 2026', eta: '20 Mar 2026',
    price: 1500000, paid: 1500000,
  },
  {
    id: 'TLR-442015',
    tailor: {
      name: 'Permak Express', location: 'Jakarta Pusat', rating: 4.7,
      image: toko6Img,
    },
    service: 'Permak', clothing: 'Kemeja', quantity: 3,
    status: 'diterima', stage: 0,
    createdAt: '22 Apr 2026', eta: '26 Apr 2026',
    price: 50000, paid: 15000,
  },
];

export const orderTabs = [
  { id: 'all', label: 'Semua' },
  { id: 'aktif', label: 'Aktif' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'dibatalkan', label: 'Dibatalkan' },
];
