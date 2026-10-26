// Artikel: judul berupa contoh topik, isi dan tanggal masih placeholder untuk diisi tim rumah sakit.
export const ARTICLE_CATEGORIES = ['Artikel Kesehatan', 'Berita & Kegiatan', 'Promo & Paket', 'Seminar Awam'];

export const ARTICLES = [
  { slug: 'demam-anak', category: 'Artikel Kesehatan', title: 'Kapan demam pada anak perlu diperiksakan ke dokter?', date: '[tanggal]', excerpt: '[Ringkasan artikel, 1–2 kalimat.]' },
  { slug: 'persiapan-mcu', category: 'Artikel Kesehatan', title: 'Persiapan sebelum menjalani medical check-up', date: '[tanggal]', excerpt: '[Ringkasan artikel, 1–2 kalimat.]' },
  { slug: 'kegiatan-donor-darah', category: 'Berita & Kegiatan', title: '[Judul berita kegiatan rumah sakit]', date: '[tanggal]', excerpt: '[Ringkasan berita, 1–2 kalimat.]' },
  { slug: 'paket-mcu', category: 'Promo & Paket', title: '[Nama paket medical check-up]', date: '[periode promo]', excerpt: '[Isi paket dan syarat singkat.]' },
  { slug: 'seminar-jantung', category: 'Seminar Awam', title: '[Judul seminar awam kesehatan jantung]', date: '[tanggal & tempat]', excerpt: '[Narasumber dan cara mendaftar.]' },
  { slug: 'gejala-stroke', category: 'Artikel Kesehatan', title: 'Mengenali tanda awal stroke dan pentingnya segera ke IGD', date: '[tanggal]', excerpt: '[Ringkasan artikel, 1–2 kalimat.]' },
];

export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export const OUTPATIENT_FLOW = [
  { title: 'Daftar online atau di loket', text: 'Pilih poliklinik, dokter, dan jadwal lewat Pendaftaran Online, atau datang ke loket pendaftaran.' },
  { title: 'Verifikasi data', text: 'Tunjukkan kartu identitas dan kartu BPJS/asuransi di loket untuk pasien baru maupun lama.' },
  { title: 'Pemeriksaan di poliklinik', text: 'Tunggu panggilan sesuai nomor antrean, lalu periksa dengan dokter.' },
  { title: 'Farmasi & pembayaran', text: 'Ambil obat di farmasi dan selesaikan administrasi di kasir.' },
];

export const INPATIENT_FLOW = [
  { title: 'Surat pengantar rawat inap', text: 'Diberikan dokter poliklinik atau IGD setelah pemeriksaan.' },
  { title: 'Pendaftaran rawat inap', text: 'Pilih kelas kamar dan lengkapi berkas penjaminan di bagian admisi.' },
  { title: 'Perawatan', text: 'Pasien diantar ke ruang rawat dan ditangani dokter penanggung jawab.' },
  { title: 'Pulang', text: 'Selesaikan administrasi; terima resume medis dan jadwal kontrol.' },
];

export const FAQ = [
  { q: 'Bagaimana cara mendaftar online?', a: 'Buka Pendaftaran Online, pilih poliklinik dan dokter, pilih tanggal praktik, lalu isi data pasien. Anda akan menerima kode pendaftaran di layar.' },
  { q: 'Apakah rumah sakit menerima BPJS Kesehatan?', a: 'Ya. Bawa kartu BPJS/KIS dan surat rujukan dari faskes tingkat pertama, kecuali untuk kondisi gawat darurat.' },
  { q: 'Bagaimana jika saya ingin mengubah atau membatalkan janji?', a: 'Gunakan bagian Ubah / Batalkan Janji di halaman Pendaftaran Online dengan kode pendaftaran Anda.' },
  { q: 'Apakah IGD perlu mendaftar terlebih dahulu?', a: 'Tidak. Untuk kondisi gawat darurat langsung datang ke IGD atau hubungi nomor IGD.' },
  { q: 'Jam berapa jam besuk pasien rawat inap?', a: '[Jam besuk resmi].' },
];

export const PATIENT_RIGHTS = [
  'Memperoleh informasi tentang tata tertib dan peraturan rumah sakit.',
  'Mendapat layanan yang manusiawi, adil, jujur, dan tanpa diskriminasi.',
  'Mendapat penjelasan tentang diagnosis, tindakan, dan risikonya.',
  'Menjaga kerahasiaan penyakit dan data medis.',
];

export const PATIENT_DUTIES = [
  'Memberikan informasi yang jujur dan lengkap tentang masalah kesehatan.',
  'Mematuhi nasihat dan petunjuk tenaga kesehatan.',
  'Mematuhi tata tertib rumah sakit.',
  'Memberikan imbalan jasa atas layanan yang diterima.',
];
