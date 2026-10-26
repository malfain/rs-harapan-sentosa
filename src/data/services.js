export const SERVICES = [
  {
    slug: 'poliklinik',
    icon: 'stethoscope',
    title: 'Poliklinik Spesialis',
    text: 'Konsultasi dengan dokter spesialis sesuai jadwal praktik. Daftar online agar tidak antre panjang.',
  },
  {
    slug: 'igd',
    icon: 'plus',
    title: 'IGD 24 Jam',
    text: 'Instalasi Gawat Darurat dengan tim medis dan ambulans yang siap setiap saat.',
    emergency: true,
  },
  {
    slug: 'rawat-inap',
    icon: 'bed',
    title: 'Rawat Inap & Kamar',
    text: 'Pilihan kelas kamar rawat inap dan informasi ketersediaannya.',
  },
  {
    slug: 'bedah-icu',
    icon: 'activity',
    title: 'Bedah Sentral & ICU',
    text: 'Kamar operasi dan perawatan intensif untuk pasien dengan kebutuhan khusus.',
  },
  {
    slug: 'laboratorium',
    icon: 'flask',
    title: 'Laboratorium',
    text: 'Pemeriksaan darah, urine, dan penunjang lain. Hasil dapat dicek secara online.',
  },
  {
    slug: 'radiologi',
    icon: 'scan',
    title: 'Radiologi',
    text: 'Pemeriksaan pencitraan untuk membantu dokter menegakkan diagnosis.',
  },
  {
    slug: 'mcu',
    icon: 'heart',
    title: 'Medical Check-up',
    text: 'Paket pemeriksaan kesehatan untuk perorangan maupun perusahaan.',
  },
];

// Pusat layanan unggulan, sesuai artboard Beranda.
export const CENTERS = [
  {
    slug: 'ibu-anak',
    title: 'Ibu & Anak',
    text: 'Kehamilan, persalinan, imunisasi, dan tumbuh kembang anak.',
    covers: ['Kehamilan', 'Persalinan', 'Imunisasi', 'Tumbuh kembang'],
    photo: 'ruang bersalin atau poli anak',
    link: { to: '/dokter?poli=Anak', label: 'Dokter anak & kandungan' },
  },
  {
    slug: 'jantung',
    title: 'Jantung & Pembuluh Darah',
    text: 'Pemeriksaan EKG, treadmill, ekokardiografi, dan konsultasi spesialis.',
    covers: ['EKG', 'Treadmill', 'Ekokardiografi'],
    photo: 'pemeriksaan ekokardiografi',
    link: { to: '/dokter?poli=Jantung', label: 'Dokter jantung' },
  },
  {
    slug: 'rehabilitasi',
    title: 'Rehabilitasi Medik',
    text: 'Fisioterapi dan terapi pemulihan pasca-operasi maupun stroke.',
    covers: ['Fisioterapi', 'Pasca-operasi', 'Pasca-stroke'],
    photo: 'sesi fisioterapi',
    link: { to: '/tentang#kontak', label: 'Tanya jadwal terapi' },
  },
];

export const POLIES = ['Anak', 'Penyakit Dalam', 'Kandungan', 'Jantung', 'Saraf'];
