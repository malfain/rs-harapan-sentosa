import { Link, useSearchParams } from 'react-router-dom';
import { DoctorRoster, PageHero } from '../components/Shared';
import { DOCTORS } from '../data/doctors';
import { CENTERS, SERVICES } from '../data/services';
import { ARTICLES } from '../data/content';

const has = (needle, ...fields) => fields.join(' ').toLowerCase().includes(needle);

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get('q') ?? '').trim();
  const needle = q.toLowerCase();

  const doctors = needle ? DOCTORS.filter((d) => has(needle, d.name, d.specialty, d.poli)) : [];
  const services = needle
    ? [
        ...SERVICES.filter((s) => has(needle, s.title, s.text)).map((s) => ({ ...s, to: `/layanan#${s.slug}` })),
        ...CENTERS.filter((s) => has(needle, s.title, s.text)).map((s) => ({ ...s, to: '/layanan#unggulan' })),
      ]
    : [];
  const articles = needle ? ARTICLES.filter((a) => has(needle, a.title, a.category)) : [];
  const total = doctors.length + services.length + articles.length;

  return (
    <>
      <PageHero
        title={q ? `Hasil pencarian “${q}”` : 'Pencarian'}
        lead={q ? `${total} hasil ditemukan.` : 'Ketik kata kunci di kolom pencarian pada bagian atas halaman.'}
        crumbs={[{ label: 'Pencarian' }]}
      />
      <section className="section section--tight">
        <div className="container search-results">
          {q && total === 0 && (
            <div className="empty">
              <h2>Tidak ada hasil</h2>
              <p>Coba kata kunci lain, misalnya nama spesialisasi seperti “anak” atau “jantung”.</p>
              <Link to="/dokter" className="btn btn--outline">Lihat semua dokter</Link>
            </div>
          )}
          {services.length > 0 && (
            <div>
              <h2>Layanan</h2>
              <ul className="result-list">
                {services.map((s) => (
                  <li key={s.slug}><Link to={s.to}><b>{s.title}</b><span>{s.text}</span></Link></li>
                ))}
              </ul>
            </div>
          )}
          {doctors.length > 0 && (
            <div>
              <h2>Dokter</h2>
              <DoctorRoster doctors={doctors} />
            </div>
          )}
          {articles.length > 0 && (
            <div>
              <h2>Artikel</h2>
              <ul className="result-list">
                {articles.map((a) => (
                  <li key={a.slug}><Link to={`/artikel/${a.slug}`}><b>{a.title}</b><span>{a.category}</span></Link></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
