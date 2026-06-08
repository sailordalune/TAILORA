# Tailora

Tailora adalah website marketplace jasa permak dan custom pakaian yang dirancang untuk menghubungkan pelanggan dengan penjahit lokal secara lebih mudah, transparan, dan terstruktur. Platform ini membantu pengguna dalam mencari penjahit, melihat portofolio, melakukan pemesanan jasa, mengisi ukuran tubuh, serta memantau progres pengerjaan pesanan.

Project ini dibuat sebagai bagian dari tugas akhir mata kuliah Desain Antarmuka Pengguna dengan fokus pada perancangan UI Kit, desain website, desain mobile app, dan implementasi front-end website responsif.

## Live Demo

Website Tailora dapat diakses melalui link berikut:

```text
https://tailoraa.vercel.app/
```

## Latar Belakang

Banyak pelanggan mengalami kesulitan dalam menemukan penjahit lokal yang sesuai dengan kebutuhan karena keterbatasan informasi, minimnya portofolio, serta tidak adanya sistem pelacakan pesanan yang transparan. Di sisi lain, banyak penjahit lokal memiliki keterampilan yang baik, tetapi belum memiliki visibilitas digital yang memadai.

Tailora hadir sebagai solusi digital untuk mempertemukan pelanggan dan penjahit lokal melalui platform yang lebih terstruktur, informatif, dan mudah digunakan.

## Tujuan Project

Tujuan dari pengembangan Tailora adalah:

* Mempermudah pelanggan dalam menemukan penjahit lokal yang sesuai dengan kebutuhan.
* Menyediakan informasi penjahit secara lebih transparan melalui profil, portofolio, rating, dan ulasan.
* Membantu pengguna melakukan pemesanan jasa permak dan custom pakaian secara lebih terstruktur.
* Menyediakan fitur panduan pengukuran tubuh untuk mengurangi risiko kesalahan ukuran.
* Memberikan fitur pelacakan pesanan agar pelanggan dapat memantau progres pengerjaan pakaian.
* Membantu penjahit lokal memperluas jangkauan pasar melalui platform digital.

## Fitur Utama

* Homepage Tailora
* Katalog penjahit
* Detail profil penjahit
* Form pemesanan jasa permak dan custom pakaian
* Virtual measurement / panduan pengukuran tubuh
* Halaman pesanan dan tracking pesanan
* Profil pengguna
* Review pesanan setelah selesai
* Tampilan responsif untuk desktop dan mobile

## User Flow Utama

Alur utama pengguna pada platform Tailora adalah sebagai berikut:

1. Pengguna membuka halaman beranda Tailora.
2. Pengguna mencari atau memilih penjahit melalui halaman katalog.
3. Pengguna melihat detail profil penjahit, layanan, portofolio, dan ulasan.
4. Pengguna membuat pesanan jasa permak atau custom pakaian.
5. Pengguna mengisi detail pesanan dan ukuran tubuh melalui fitur virtual measurement.
6. Pengguna memilih metode pengiriman dan melakukan konfirmasi pesanan.
7. Pengguna memantau progres pengerjaan melalui halaman tracking pesanan.
8. Setelah pesanan selesai, pengguna dapat memberikan ulasan terhadap penjahit.

## Konsep Desain

Tailora mengusung konsep visual yang hangat, elegan, modern, dan premium. Desain dibuat dengan pendekatan fashion-tech agar sesuai dengan karakter layanan jahit, permak, dan custom pakaian.

Warna utama yang digunakan terdiri dari nuansa ivory, warm white, deep brown, muted gold, dan soft beige. Tipografi yang digunakan mengombinasikan Playfair Display untuk memberikan kesan elegan pada heading dan Inter untuk menjaga keterbacaan pada isi konten.

## UI Kit

UI Kit Tailora disusun sebagai dasar konsistensi visual pada desain website dan mobile app. Struktur UI Kit mencakup:

* Color system
* Typography system
* Grid / layout system
* Button component
* Input dan form component
* Card component
* Navigation component
* Badge dan status component
* Progress tracking component

UI Kit digunakan untuk menjaga agar tampilan Tailora tetap konsisten, reusable, dan mudah diterapkan dalam implementasi front-end.

## Teknologi yang Digunakan

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Motion
* Vercel untuk deployment

## Struktur Project

```text
TAILORA/
├── src/
│   ├── app/
│   ├── imports/
│   ├── styles/
│   ├── main.tsx
│   └── vite-env.d.ts
├── default_shadcn_theme.css
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Folder `src/app` berisi struktur utama aplikasi dan komponen halaman. Folder `src/imports` digunakan untuk menyimpan aset gambar yang digunakan pada tampilan website. Folder `src/styles` digunakan untuk pengaturan styling tambahan.

## Cara Menjalankan Project

Pastikan Node.js sudah terpasang pada perangkat.

1. Clone repository

```bash
git clone https://github.com/sailordalune/TAILORA.git
```

2. Masuk ke folder project

```bash
cd TAILORA
```

3. Install dependency

```bash
npm install
```

4. Jalankan project

```bash
npm run dev
```

5. Buka project di browser melalui alamat yang muncul di terminal, biasanya:

```text
http://localhost:5173
```

## Build Project

Untuk membuat versi production, jalankan:

```bash
npm run build
```

Hasil build akan tersimpan pada folder `dist`.

## Deployment

Project ini dideploy menggunakan Vercel. Setiap perubahan yang sudah di-push ke repository GitHub dapat terhubung dengan Vercel untuk proses deployment secara otomatis.

## Status Project

Project ini masih berupa implementasi front-end. Data yang digunakan pada website masih bersifat dummy dan digunakan untuk kebutuhan demonstrasi desain, alur interaksi, serta implementasi antarmuka pengguna.

## Batasan Project

* Project ini belum menggunakan backend dan database.
* Data penjahit, pesanan, profil pengguna, pembayaran, dan ulasan masih bersifat statis/dummy.
* Sistem autentikasi, pembayaran, dan tracking pesanan masih berupa simulasi front-end.
* Fokus utama project berada pada desain antarmuka, konsistensi UI Kit, dan implementasi front-end responsif.

## Tim Pengembang

Project ini dikembangkan oleh kelompok mahasiswa pada mata kuliah Desain Antarmuka Pengguna.

Anggota kelompok:

* Zamira Nasywa Udhata
* Muhammad Akmal Baihaqii
* Hizkia Leandra Putra Sadewa

## Catatan

Tailora dibuat sebagai prototype front-end untuk menunjukkan konsep antarmuka marketplace jasa jahit. Fokus utama project ini adalah konsistensi desain, alur pengguna, UI Kit, dan implementasi website responsif.
