import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { CenterShowcase, EmergencyBand, PageHero } from '../components/Shared';
import { SERVICES } from '../data/services';
import { SITE, telHref } from '../data/site';

export default function Services() {
  return (
    <>
      <PageHero
        title="Layanan & fasilitas"
        lead="Dari poliklinik spesialis hingga perawatan intensif. Pilih layanan untuk melihat detail dan cara mendapatkannya."
        crumbs={[{ label: 'Layanan & Fasilitas' }]}
      />

      <section className="section">
        <div className="container">
          <ul className="service-list">
            {SERVICES.map((s) => (
              <li key={s.slug} id={s.slug} className={`service-row${s.emergency ? ' service-row--emergency' : ''}`}>
                <span className="service-row__icon"><Icon name={s.icon} size={26} /></span>
                <div className="service-row__body">
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
                {s.emergency ? (
                  <a href={telHref(SITE.igdTel)} className="btn btn--emergency">Hubungi {SITE.igd}</a>
                ) : s.slug === 'poliklinik' ? (
                  <Link to="/janji" className="btn btn--outline">Buat janji</Link>
                ) : s.slug === 'laboratorium' ? (
                  <Link to="/pasien#hasil-lab" className="btn btn--outline">Hasil lab online</Link>
                ) : (
                  <Link to="/tentang#kontak" className="btn btn--outline">Tanya layanan</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="unggulan" aria-labelledby="unggulan-title">
        <div className="container">
          <div className="section-head">
            <h2 id="unggulan-title">Pusat layanan unggulan</h2>
          </div>
          <CenterShowcase />
        </div>
      </section>

      <EmergencyBand />
    </>
  );
}
