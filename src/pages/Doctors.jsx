import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { DoctorRoster, PageHero } from '../components/Shared';
import { DOCTORS, findDoctor } from '../data/doctors';
import { POLIES } from '../data/services';
import { DAYS, todayName } from '../data/site';
import NotFound from './NotFound';

const WEEK = [...DAYS.slice(1), DAYS[0]];

export function Doctors() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const poli = params.get('poli') ?? '';
  const day = params.get('hari') ?? '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return DOCTORS.filter(
      (d) =>
        (!poli || d.poli === poli) &&
        (!day || d.days.includes(day)) &&
        (!needle || `${d.name} ${d.specialty} ${d.poli}`.toLowerCase().includes(needle)),
    );
  }, [q, poli, day]);

  return (
    <>
      <PageHero
        title="Cari dokter"
        lead="Saring berdasarkan spesialisasi, hari praktik, atau nama. Pilih dokter untuk melihat jadwal lengkap dan membuat janji."
        crumbs={[{ label: 'Cari Dokter' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="filters">
            <label className="field field--grow">
              <span className="field__label">Nama atau spesialisasi</span>
              <span className="input-icon">
                <Icon name="search" size={18} />
                <input type="search" value={q} placeholder="Contoh: anak, jantung" onChange={(e) => update('q', e.target.value)} />
              </span>
            </label>
            <label className="field">
              <span className="field__label">Spesialisasi</span>
              <select value={poli} onChange={(e) => update('poli', e.target.value)}>
                <option value="">Semua</option>
                {POLIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
            <fieldset className="day-filter">
              <legend className="field__label">Hari praktik</legend>
              <div className="chips">
                <button type="button" className="chip" aria-pressed={!day} onClick={() => update('hari', '')}>Semua</button>
                <button type="button" className="chip" aria-pressed={day === todayName()} onClick={() => update('hari', todayName())}>Hari ini</button>
                {WEEK.map((d) => (
                  <button key={d} type="button" className="chip" aria-pressed={day === d && day !== todayName()} onClick={() => update('hari', d)}>
                    {d.slice(0, 3)}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <p className="result-count" aria-live="polite">{results.length} dokter ditemukan</p>
          {results.length ? (
            <DoctorRoster doctors={results} />
          ) : (
            <div className="empty">
              <h2>Tidak ada dokter yang cocok</h2>
              <p>Coba hapus salah satu filter, atau hubungi call center untuk bantuan mencari jadwal.</p>
              <button type="button" className="btn btn--outline" onClick={() => setParams({}, { replace: true })}>Hapus semua filter</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function DoctorProfile() {
  const { id } = useParams();
  const doctor = findDoctor(id);
  if (!doctor) return <NotFound />;
  const today = todayName();

  return (
    <>
      <PageHero title={doctor.name} lead={doctor.specialty} crumbs={[{ label: 'Cari Dokter', to: '/dokter' }, { label: 'Profil Dokter' }]} />
      <section className="section">
        <div className="container profile">
          <div className="profile__photo" role="img" aria-label="Tempat foto dokter"><span>[Foto dokter]</span></div>
          <div className="profile__body">
            <h2>Jadwal praktik mingguan</h2>
            <table className="schedule">
              <caption className="sr-only">Jadwal praktik {doctor.name}</caption>
              <thead><tr><th scope="col">Hari</th><th scope="col">Jam</th></tr></thead>
              <tbody>
                {WEEK.map((d) => (
                  <tr key={d} className={d === today ? 'is-today' : undefined}>
                    <th scope="row">{d}{d === today && <span className="today-tag">Hari ini</span>}</th>
                    <td>{doctor.days.includes(d) ? doctor.hours : <span className="muted">Tidak praktik</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="profile__actions">
              <Link to={`/janji?poli=${encodeURIComponent(doctor.poli)}&dokter=${doctor.id}`} className="btn btn--primary btn--lg">Buat janji dengan dokter ini</Link>
              <Link to="/dokter" className="btn btn--outline btn--lg">Lihat dokter lain</Link>
            </div>
            <h2>Profil</h2>
            <p className="prose-p">[Pendidikan, pengalaman, dan minat klinis dokter.]</p>
          </div>
        </div>
      </section>
    </>
  );
}
