// Penyimpanan janji temu di browser. Ini batas integrasi: ganti fungsi-fungsi di bawah
// dengan panggilan ke API sistem pendaftaran rumah sakit saat backend tersedia.
const KEY = 'rshs-bookings';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

function save(all) {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Penyimpanan diblokir (mode privat): janji tetap dikonfirmasi di layar.
  }
}

function makeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `HS-${s}`;
}

export async function createBooking(data) {
  const all = load();
  const code = makeCode();
  const booking = { ...data, code, status: 'aktif', createdAt: new Date().toISOString() };
  all[code] = booking;
  save(all);
  return booking;
}

export async function findBooking(code, phone) {
  const b = load()[code.trim().toUpperCase()];
  if (!b) return null;
  const digits = (v) => v.replace(/\D/g, '');
  return digits(b.phone) === digits(phone) ? b : null;
}

export async function cancelBooking(code) {
  const all = load();
  if (all[code]) {
    all[code].status = 'dibatalkan';
    save(all);
  }
  return all[code] ?? null;
}
