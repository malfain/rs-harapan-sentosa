import { Link } from 'react-router-dom';
import Icon from './Icon';
import { SITE, telHref, todayName } from '../data/site';
import { nextPracticeDay, practicesOn } from '../data/doctors';
import { CENTERS } from '../data/services';

export function PageHero({ title, lead, crumbs = [], children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <nav aria-label="Jejak halaman" className="crumbs">
          <ol>
            <li><Link to="/">Beranda</Link></li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function EmergencyBand() {
  return (
    <section className="container emergency-wrap" aria-labelledby="igd-title">
      <div className="emergency">
        <div>
          <h2 id="igd-title">Gawat darurat? IGD siaga 24 jam.</h2>
          <p>Ambulans dan tim medis siap kapan pun Anda membutuhkan.</p>
        </div>
        <a href={telHref(SITE.igdTel)} className="emergency__call">
          <Icon name="phone" size={20} />
          Hubungi {SITE.igd}
        </a>
      </div>
    </section>
  );
}

const WEEK = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export function DoctorRow({ doctor }) {
  const today = todayName();
  const practicing = practicesOn(doctor, today);
  return (
    <li className="roster__row">
      <span className="avatar" aria-hidden="true">DR</span>
      <span className="roster__who">
        <Link to={`/dokter/${doctor.id}`} className="roster__name stretched">{doctor.name}</Link>
        <span className="roster__spec">{doctor.specialty}</span>
      </span>
      <span className="week" aria-label={`Praktik hari ${doctor.days.join(', ')}`}>
        {WEEK.map((d) => (
          <span
            key={d}
            className={`week__day${doctor.days.includes(d) ? ' is-on' : ''}${d === today ? ' is-today' : ''}`}
            aria-hidden="true"
            title={d}
          >
            {d.slice(0, 3)}
          </span>
        ))}
      </span>
      <span className={`status${practicing ? ' status--ok' : ''}`}>
        {practicing ? `Hari ini · ${doctor.hours}` : `Berikutnya · ${nextPracticeDay(doctor)}`}
      </span>
      <Link to={`/janji?poli=${encodeURIComponent(doctor.poli)}&dokter=${doctor.id}`} className="roster__book">
        Buat janji
      </Link>
    </li>
  );
}

export function DoctorRoster({ doctors }) {
  return (
    <ul className="roster">
      {doctors.map((d) => <DoctorRow key={d.id} doctor={d} />)}
    </ul>
  );
}

export function FlowSteps({ steps }) {
  return (
    <ol className="flow">
      {steps.map((s) => (
        <li key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function PhotoSlot({ label = 'Foto', tone = 'sky', className = '' }) {
  return (
    <div className={`photo-slot photo-slot--${tone} ${className}`} role="img" aria-label={`Tempat ${label.toLowerCase()}`}>
      <span>[{label}]</span>
    </div>
  );
}

export function CenterShowcase() {
  const [lead, ...rest] = CENTERS;
  const item = (c, variant) => (
    <article key={c.slug} className={`center center--${variant}`}>
      <div className="center__photo" role="img" aria-label={`Tempat foto: ${c.photo}`}>
        <span className="center__photo-hint">
          <Icon name="scan" size={16} /> Foto: {c.photo}
        </span>
      </div>
      <div className="center__body">
        <h3>{c.title}</h3>
        <p>{c.text}</p>
        <p className="center__covers">{c.covers.join(' · ')}</p>
        <Link to={c.link.to} className="arrow-link">
          {c.link.label} <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
  return (
    <div className="centers">
      {item(lead, 'lead')}
      <div className="centers__rest">{rest.map((c) => item(c, 'row'))}</div>
    </div>
  );
}
