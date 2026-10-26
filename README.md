# Website RS Harapan Sentosa

Website rumah sakit (Vite + React) berdasarkan desain "Brand Design — RS Harapan Sentosa".

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka http://localhost:5173.

## Halaman

Beranda, Layanan, Cari Dokter (+ profil), Pendaftaran Online (4 langkah), Info Pasien,
Artikel (+ detail), Tentang Kami, Pencarian, dan 404.

## Mengganti data

Semua isi berada di `src/data/`. Nilai dalam `[kurung siku]` masih placeholder dan perlu diganti
dengan data resmi rumah sakit. Pendaftaran online untuk sementara menyimpan janji di browser
(`src/lib/bookings.js`); sambungkan ke sistem pendaftaran rumah sakit sebelum dipakai sungguhan.

## Publikasi ke GitHub Pages

```bash
npm run deploy
```

Perintah ini membangun situs dan mendorong hasilnya ke branch `gh-pages`.
