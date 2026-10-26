import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { CenterShowcase, DoctorRoster, EmergencyBand } from '../components/Shared';
import { POLIES } from '../data/services';
import { DOCTORS } from '../data/doctors';
import { SITE, todayName } from '../data/site';

const QUICK_LINKS = [
  { to: '/dokter', icon: 'calendar', title: 'Jadwal Dokter', text: 'Lihat jam praktik hari ini' },
  { to: '/pasien#hasil-lab', icon: 'flask', title: 'Hasil Lab Online', text: 'Cek hasil pemeriksaan Anda' },
  { to: '/layanan#rawat-inap', icon: 'home', title: 'Kamar Rawat Inap', text: 'Ketersediaan & kelas kamar' },
  { to: '/layanan#mcu', icon: 'heart', title: 'Medical Check-up', text: 'Paket pemeriksaan kesehatan' },
];

function QuickBooking() {
  const navigate = useNavigate();
  const [poli, setPoli] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const doctors = useMemo(() => DOCTORS.filter((d) => !poli || d.poli === poli), [poli]);
  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <form
      className="booking-card"
      aria-labelledby="quick-booking-title"
      onSubmit={(e) => {
        e.preventDefault();
        const p = new URLSearchParams();
        if (poli) p.set('poli', poli);
        if (doctor) p.set('dokter', doctor);
        if (date) p.set('tanggal', date);
        navigate(`/janji?${p}`);
      }}
    >
      <h2 id="quick-booking-title">Buat janji temu</h2>
      <label className="field">
        <span className="field__label">Poliklinik</span>
        <select value={poli} onChange={(e) => { setPoli(e.target.value); setDoctor(''); }}>
          <option value="">Pilih poliklinik</option>
          {POLIES.map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>
      <label className="field">
        <span className="field__label">Dokter</span>
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          <option value="">Semua dokter</option>
          {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} · {d.poli}</option>)}
        </select>
      </label>
      <label className="field">
        <span className="field__label">Tanggal kunjungan</span>
        <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <button type="submit" className="btn btn--primary btn--block btn--lg">Cari jadwal</button>
      <p className="booking-card__note">
        Gawat darurat? Langsung ke IGD atau hubungi {SITE.igd}.
      </p>
    </form>
  );
}

export default function Home() {
  const today = todayName();
  const featured = [...DOCTORS].sort((a, b) => Number(b.days.includes(today)) - Number(a.days.includes(today))).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="badge badge--green">Terakreditasi {SITE.accreditation}</span>
            <h1>Sepenuh hati merawat keluarga Anda</h1>
            <p className="hero__lead">
              Dokter spesialis, layanan 24 jam, dan pendaftaran online tanpa antre panjang — semuanya di satu tempat.
            </p>
            <ul className="hero__assurances">
              <li><Icon name="check" size={18} stroke={2.5} />Menerima BPJS Kesehatan</li>
              <li><Icon name="check" size={18} stroke={2.5} />Asuransi rekanan</li>
            </ul>
          </div>
          <QuickBooking />
        </div>
      </section>

      <nav className="container" aria-label="Akses cepat">
        <ul className="quick-bar">
          {QUICK_LINKS.map((q) => (
            <li key={q.title}>
              <Link to={q.to} className="quick-bar__link">
                <Icon name={q.icon} size={22} />
                <span className="quick-bar__text">
                  <span className="quick-bar__title">{q.title}</span>
                  <span className="quick-bar__sub">{q.text}</span>
                </span>
                <Icon name="arrow" size={18} className="quick-bar__go" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section" aria-labelledby="layanan-title">
        <div className="container">
          <div className="section-head">
            <h2 id="layanan-title">Pusat layanan terpadu</h2>
            <Link to="/layanan" className="arrow-link">Semua layanan <Icon name="arrow" size={18} /></Link>
          </div>
          <CenterShowcase />
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="dokter-title">
        <div className="container">
          <div className="section-head">
            <h2 id="dokter-title">Temukan dokter yang tepat</h2>
            <Link to="/dokter" className="arrow-link">Semua dokter <Icon name="arrow" size={18} /></Link>
          </div>
          <DoctorSearchShortcut />
          <DoctorRoster doctors={featured} />
        </div>
      </section>

      <EmergencyBand />
    </>
  );
}

function DoctorSearchShortcut() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  return (
    <form
      className="search-field"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/dokter${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
      }}
    >
      <Icon name="search" size={20} />
      <label className="sr-only" htmlFor="home-doctor-search">Cari dokter</label>
      <input
        id="home-doctor-search"
        type="search"
        placeholder="Cari nama dokter atau spesialisasi"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit" className="btn btn--primary">Cari</button>
    </form>
  );
}
