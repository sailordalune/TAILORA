import toko1Img from '../../imports/toko1.jpg';
import toko2Img from '../../imports/toko2.jpg';
import toko3Img from '../../imports/toko3.jpg';
import toko4Img from '../../imports/toko4.jpg';
import toko5Img from '../../imports/toko5.jpg';
import toko6Img from '../../imports/toko6.jpg';
import portofolio1Img from '../../imports/portofolio1.jpg';
import portofolio2Img from '../../imports/portofolio2.jpg';
import portofolio3Img from '../../imports/portofolio3.jpg';
import portofolio4Img from '../../imports/portofolio4.jpg';
import portofolio5Img from '../../imports/portofolio5.jpg';
import portofolio6Img from '../../imports/portofolio6.jpg';
import avatar1Img from '../../imports/avatar1.jpg';
import avatar2Img from '../../imports/avatar2.jpg';
import avatar3Img from '../../imports/avatar3.jpg';
import budi1Img from '../../imports/budi1.jpg';
import budi2Img from '../../imports/budi2.jpg';
import budi3Img from '../../imports/budi3.jpg';
import dewi1Img from '../../imports/dewi1.jpg';
import dewi2Img from '../../imports/dewi2.jpg';
import dewi3Img from '../../imports/dewi3.jpg';
import dewi4Img from '../../imports/dewi4.jpg';
import dewi5Img from '../../imports/dewi5.jpg';
import dewi6Img from '../../imports/dewi6.jpg';
import budiPortofolio1Img from '../../imports/budi-portofolio1.jpg';
import budiPortofolio2Img from '../../imports/budi-portofolio2.jpg';
import budiPortofolio3Img from '../../imports/budi-portofolio3.jpg';
import budiPortofolio4Img from '../../imports/budi-portofolio4.jpg';
import budiPortofolio5Img from '../../imports/budi-portofolio5.jpg';
import budiPortofolio6Img from '../../imports/budi-portofolio6.jpg';
import maison1Img from '../../imports/maison1.jpg';
import maison2Img from '../../imports/maison2.jpg';
import maison3Img from '../../imports/maison3.jpg';
import maison4Img from '../../imports/maison4.jpg';
import maison5Img from '../../imports/maison5.jpg';
import maison6Img from '../../imports/maison6.jpg';

export type TailorData = {
  name: string;
  rating: number;
  reviews: number;
  clothing: string;
  service: string;
  location: string;
  image: string;
  price: string;
  yearsExp: number;
  specialty?: string;
  tag?: string;
  quote?: string;
};

export type TailorService = {
  id: string;
  name: string;
  duration: string;
  price: string;
  popular?: boolean;
};

export const locations = ['Semua Lokasi', 'Jakarta Selatan', 'Jakarta Pusat', 'Bandung', 'Yogyakarta', 'Surabaya', 'Bali', 'Medan'];
export const clothingTypes = ['Semua', 'Kebaya', 'Gaun Pengantin', 'Jas Formal', 'Kemeja', 'Batik', 'Casual Wear', 'Seragam'];
export const serviceTypes = ['Semua', 'Jahit Baru', 'Permak', 'Custom', 'Bordir'];

export const allTailors: TailorData[] = [
  {
    name: 'Rina Boutique',
    rating: 4.9,
    reviews: 312,
    specialty: 'Kebaya & Gaun Pengantin',
    clothing: 'Kebaya',
    service: 'Jahit Baru',
    price: 'Mulai Rp 350rb',
    image: toko1Img,
    location: 'Bandung',
    tag: 'Top Rated',
    yearsExp: 12,
    quote: 'Detail kebayanya rapii, fitting presisi',
  },
  {
    name: 'Dewi Couture',
    rating: 4.9,
    reviews: 265,
    clothing: 'Gaun Pengantin',
    service: 'Custom',
    location: 'Bali',
    image: toko4Img,
    price: 'Mulai Rp 1.5jt',
    yearsExp: 14,
  },
  {
    name: 'Atelier By Budi',
    rating: 4.9,
    reviews: 248,
    specialty: 'Jas Formal & Kemeja Pria',
    clothing: 'Jas Formal',
    service: 'Jahit Baru',
    price: 'Mulai Rp 700rb',
    image: toko2Img,
    location: 'Jakarta Selatan',
    tag: 'Top Rated',
    yearsExp: 15,
    quote: 'Jas custom terbaik yang pernah saya coba',
  },
  {
    name: 'Maison Sari',
    rating: 4.8,
    reviews: 196,
    specialty: 'Batik & Wastra Modern',
    clothing: 'Batik',
    service: 'Custom',
    price: 'Mulai Rp 250rb',
    image: toko3Img,
    location: 'Yogyakarta',
    tag: 'Featured',
    yearsExp: 8,
    quote: 'Sukaa banget perpaduan batik dengan model yang terkini',
  },
  {
    name: 'Bordir Nusantara',
    rating: 4.8,
    reviews: 178,
    clothing: 'Batik',
    service: 'Bordir',
    location: 'Surabaya',
    image: toko5Img,
    price: 'Mulai Rp 100rb',
    yearsExp: 10,
  },
  {
    name: 'Permak Express',
    rating: 4.7,
    reviews: 421,
    clothing: 'Kemeja',
    service: 'Permak',
    location: 'Jakarta Pusat',
    image: toko6Img,
    price: 'Mulai Rp 35rb',
    yearsExp: 6,
  },
];

export const recommendedTailors = allTailors
  .filter((tailor) => ['Rina Boutique', 'Atelier By Budi', 'Maison Sari'].includes(tailor.name))
  .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

const defaultPortfolioImages = [
  portofolio1Img,
  portofolio2Img,
  portofolio3Img,
  portofolio4Img,
  portofolio5Img,
  portofolio6Img,
];

export const getTailorPortfolio = (tailorName: string) => {
  if (tailorName === 'Bordir Nusantara' || tailorName === 'Permak Express') {
    return [];
  }
  if (tailorName === 'Dewi Couture') {
    return [dewi1Img, dewi2Img, dewi3Img, dewi4Img, dewi5Img, dewi6Img];
  }
  if (tailorName === 'Atelier By Budi') {
    return [budiPortofolio1Img, budiPortofolio2Img, budiPortofolio3Img, budiPortofolio4Img, budiPortofolio5Img, budiPortofolio6Img];
  }
  if (tailorName === 'Maison Sari') {
    return [maison1Img, maison2Img, maison3Img, maison4Img, maison5Img, maison6Img];
  }
  return defaultPortfolioImages;
};

export const getDynamicServices = (tailorName: string): TailorService[] => {
  if (tailorName === 'Rina Boutique') {
    return [
      { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '14-21 hari', price: 'Mulai Rp 450.000', popular: true },
      { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '7-10 hari', price: 'Mulai Rp 650.000' },
      { id: 'permak', name: 'Permak / Alterasi', duration: '3-5 hari', price: 'Mulai Rp 150.000' },
      { id: 'custom', name: 'Custom Design', duration: '3-4 minggu', price: 'Mulai Rp 1.200.000' },
      { id: 'bordir', name: 'Bordir & Detail', duration: '7-10 hari', price: 'Mulai Rp 350.000' },
    ];
  }
  if (tailorName === 'Atelier By Budi') {
    return [
      { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '14-21 hari', price: 'Mulai Rp 2.500.000', popular: true },
      { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '7-10 hari', price: 'Mulai Rp 3.500.000' },
      { id: 'permak', name: 'Permak / Alterasi', duration: '3-5 hari', price: 'Mulai Rp 200.000' },
      { id: 'custom', name: 'Custom Design', duration: '3-4 minggu', price: 'Mulai Rp 4.500.000' },
      { id: 'bordir', name: 'Bordir & Detail', duration: '5-7 hari', price: 'Mulai Rp 150.000' },
    ];
  }
  if (tailorName === 'Maison Sari') {
    return [
      { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '7-10 hari', price: 'Mulai Rp 350.000', popular: true },
      { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '3-5 hari', price: 'Mulai Rp 500.000' },
      { id: 'permak', name: 'Permak / Alterasi', duration: '2-4 hari', price: 'Mulai Rp 75.000' },
      { id: 'custom', name: 'Custom Design', duration: '14-21 hari', price: 'Mulai Rp 750.000' },
      { id: 'bordir', name: 'Bordir & Detail', duration: '5-7 hari', price: 'Mulai Rp 150.000' },
    ];
  }
  if (tailorName === 'Dewi Couture') {
    return [
      { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '1-2 bulan', price: 'Mulai Rp 5.500.000' },
      { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '3-4 minggu', price: 'Mulai Rp 7.500.000' },
      { id: 'permak', name: 'Permak / Alterasi', duration: '1-2 minggu', price: 'Mulai Rp 500.000' },
      { id: 'custom', name: 'Custom Design', duration: '2-3 bulan', price: 'Mulai Rp 8.500.000', popular: true },
      { id: 'bordir', name: 'Bordir & Detail', duration: '2-3 minggu', price: 'Mulai Rp 1.500.000' },
    ];
  }
  if (tailorName === 'Bordir Nusantara') {
    return [
      { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '10-14 hari', price: 'Mulai Rp 300.000' },
      { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '5-7 hari', price: 'Mulai Rp 450.000' },
      { id: 'permak', name: 'Permak / Alterasi', duration: '3-5 hari', price: 'Mulai Rp 80.000' },
      { id: 'custom', name: 'Custom Design', duration: '14-21 hari', price: 'Mulai Rp 650.000' },
      { id: 'bordir', name: 'Bordir & Detail', duration: '5-7 hari', price: 'Mulai Rp 250.000', popular: true },
    ];
  }
  if (tailorName === 'Permak Express') {
    return [
      { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '3-5 hari', price: 'Mulai Rp 150.000' },
      { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '1-2 hari', price: 'Mulai Rp 250.000' },
      { id: 'permak', name: 'Permak / Alterasi', duration: '1 hari', price: 'Mulai Rp 35.000', popular: true },
      { id: 'custom', name: 'Custom Design', duration: '7-10 hari', price: 'Mulai Rp 450.000' },
      { id: 'bordir', name: 'Bordir & Detail', duration: '2-3 hari', price: 'Mulai Rp 50.000' },
    ];
  }
  return [
    { id: 'jahit-baru', name: 'Jahit Baru â€” Reguler', duration: '7-10 hari', price: 'Mulai Rp 350.000', popular: true },
    { id: 'jahit-express', name: 'Jahit Baru â€” Express', duration: '3-5 hari', price: 'Mulai Rp 500.000' },
    { id: 'permak', name: 'Permak / Alterasi', duration: '2-3 hari', price: 'Mulai Rp 50.000' },
    { id: 'custom', name: 'Custom Design', duration: '14-21 hari', price: 'Mulai Rp 800.000' },
    { id: 'bordir', name: 'Bordir & Detail', duration: '5-7 hari', price: 'Mulai Rp 100.000' },
  ];
};

export const getDynamicReviews = (tailor: TailorData) => {
  const type = tailor.clothing.toLowerCase();

  let name1 = 'Luna Aura', name2 = 'Zamira Nasywa', name3 = 'Athaya Aryani';
  let ava1 = avatar1Img, ava2 = avatar2Img, ava3 = avatar3Img;

  if (tailor.name === 'Atelier By Budi' || type.includes('jas formal') || type.includes('jas')) {
    name1 = 'Hizkia Leandra';
    name2 = 'Rifky';
    name3 = 'Akmil';
    ava1 = budi1Img;
    ava2 = budi2Img;
    ava3 = budi3Img;
  }

  let review1 = `Wah gila sih, hasil jahitan ${type} di sini bener-bener melebihi ekspektasi! Cuttingannya pas banget di badan, recommended pol! ðŸ”¥`;
  let review2 = `Penjahitnya teliti banget, sabar dengerin bawelnya aku dan responsif parahhh. Sukses terus ${tailor.name}! âœ¨`;
  let review3 = `Kualitas jahitan emang bagus banget buat ${type}, cuma sayang waktu pengerjaannya dikittt lebih lama dari estimasi. But overall oke banget! ðŸ‘`;

  if (type.includes('kebaya')) {
    review1 = `Hasil kebayanya melebihi ekspektasi! , recommended.`;
    review2 = `Penjualnya detail, sabar dan responsiff`;
    review3 = `Kualitas jahitan bagus, hanya saja waktu pengerjaan sedikit lebih lama dari estimasi`;
  } else if (type.includes('gaun pengantin')) {
    review1 = `Sumpah gaun pengantin mimpiku jadi kenyataan! Mewah banget detailnya tapi tetep nyaman dipake seharian. Makasih banyak kak! ðŸ˜­ðŸ’–`;
    review2 = `Sabar banget ngadepin bridezilla kaya aku wkwk. Hasilnya juara sih, bener-bener fittingnya sempurrnaaa!`;
    review3 = `Jahitannya super rapi, harganya juga make sense banget buat kualitas segini. Sempet ngaret dikit tapi kebayar sama hasilnya.`;
  } else if (type.includes('jas formal') || type.includes('jas')) {
    review1 = `Cuttingan jasnya rapi dan pas banget di badan, bikin keliatan makin gagah pas dipake acara. Mantap abis! ðŸ˜Ž`;
    review2 = `Konsultasinya asik, bahannya juga dikasi rekomen yang oke banget gak bikin gerah. Puas pokoknya!`;
    review3 = `Pengerjaan jasnya lumayan cepet, kualitas jahitannya juga kuat. Cuma sempet salah panjang dikit di lengan tapi langsung direvisi cepet.`;
  } else if (type.includes('batik')) {
    review1 = `Jahitan batiknya super rapi, motifnya nyambung semua gak ada yang miring. Puas banget pesen kemeja di sini! ðŸ‘`;
    review2 = `Orangnya asik diajak diskusi soal potongan baju. Kain batikku yang biasa jadi keliatan mahal banget jadinya!`;
    review3 = `Bagus sih jahitannya, cuma antriannya lumayan panjang jadi harus sabar nunggu. Untung hasilnya gak ngecewain.`;
  }

  return [
    { name: name1, avatar: ava1, rating: 5, date: '2 minggu lalu', text: review1, verified: true },
    { name: name2, avatar: ava2, rating: 5, date: '1 bulan lalu', text: review2, verified: true },
    { name: name3, avatar: ava3, rating: 4, date: '2 bulan lalu', text: review3, verified: true },
  ];
};
