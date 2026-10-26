// Semua nilai dalam [kurung siku] adalah placeholder dari desain — ganti dengan data resmi rumah sakit.
export const SITE = {
  name: 'RS Harapan Sentosa',
  tagline: 'Sepenuh hati merawat, sepenuh ilmu melayani.',
  address: '[Alamat rumah sakit]',
  addressFull: '[Alamat lengkap]',
  city: '[Kota, Kode Pos]',
  phone: '[NO. TELEPON]',
  whatsapp: '[NO. WA]',
  igd: '[NO. IGD]',
  email: '[email]@[domain].co.id',
  accreditation: '[LEMBAGA / TINGKAT]',
  // Nomor dalam format internasional untuk tautan tel: / wa.me. Kosong = tautan diarahkan ke halaman kontak.
  phoneTel: '',
  igdTel: '',
  whatsappTel: '',
  portalUrl: '', // URL Portal Pasien (hasil lab, akun pasien)
  mapsUrl: '', // Tautan Google Maps lokasi rumah sakit
};

// Tautan <a> biasa (bukan <Link>) harus menyertakan base path agar jalan di GitHub Pages.
export const CONTACT_HREF = `${import.meta.env.BASE_URL}tentang#kontak`;
export const telHref = (tel) => (tel ? `tel:${tel}` : CONTACT_HREF);
export const waHref = (tel) => (tel ? `https://wa.me/${tel.replace(/\D/g, '')}` : CONTACT_HREF);

export const NAV = [
  { to: '/layanan', label: 'Layanan' },
  { to: '/dokter', label: 'Cari Dokter' },
  { to: '/pasien', label: 'Info Pasien' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/tentang', label: 'Tentang Kami' },
];

export const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const todayName = () => DAYS[new Date().getDay()];
