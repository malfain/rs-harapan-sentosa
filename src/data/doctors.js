import { DAYS } from './site';

// Data dokter contoh. Nama dan jam praktik masih placeholder; hari praktik hanya contoh
// agar filter dan alur pendaftaran bisa dicoba. Ganti dengan jadwal resmi.
export const DOCTORS = [
  { id: 'anak-1', name: 'dr. [Nama], Sp.A', poli: 'Anak', specialty: 'Spesialis Anak', days: ['Senin', 'Rabu', 'Jumat'], hours: '[jam]' },
  { id: 'anak-2', name: 'dr. [Nama], Sp.A', poli: 'Anak', specialty: 'Spesialis Anak', days: ['Selasa', 'Kamis', 'Sabtu'], hours: '[jam]' },
  { id: 'pd-1', name: 'dr. [Nama], Sp.PD', poli: 'Penyakit Dalam', specialty: 'Spesialis Penyakit Dalam', days: ['Senin', 'Selasa', 'Kamis'], hours: '[jam]' },
  { id: 'pd-2', name: 'dr. [Nama], Sp.PD', poli: 'Penyakit Dalam', specialty: 'Spesialis Penyakit Dalam', days: ['Rabu', 'Jumat', 'Sabtu'], hours: '[jam]' },
  { id: 'og-1', name: 'dr. [Nama], Sp.OG', poli: 'Kandungan', specialty: 'Spesialis Kandungan', days: ['Senin', 'Kamis'], hours: '[jam]' },
  { id: 'jp-1', name: 'dr. [Nama], Sp.JP', poli: 'Jantung', specialty: 'Spesialis Jantung & Pembuluh Darah', days: ['Selasa', 'Jumat'], hours: '[jam]' },
  { id: 'n-1', name: 'dr. [Nama], Sp.N', poli: 'Saraf', specialty: 'Spesialis Saraf', days: ['Rabu', 'Sabtu'], hours: '[jam]' },
];

export const findDoctor = (id) => DOCTORS.find((d) => d.id === id);

export const practicesOn = (doctor, dayName) => doctor.days.includes(dayName);

/** Hari praktik berikutnya (termasuk hari ini) sebagai nama hari. */
export function nextPracticeDay(doctor, from = new Date()) {
  for (let i = 0; i < 7; i++) {
    const day = DAYS[(from.getDay() + i) % 7];
    if (doctor.days.includes(day)) return i === 0 ? 'Hari ini' : i === 1 ? 'Besok' : day;
  }
  return null;
}

/** Tanggal-tanggal praktik dalam n hari ke depan. */
export function upcomingDates(doctor, n = 21, from = new Date()) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    if (doctor.days.includes(DAYS[d.getDay()])) out.push(d);
  }
  return out;
}
