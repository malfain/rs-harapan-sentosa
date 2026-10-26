import { Link } from 'react-router-dom';
import { LogoMark } from '../components/Logo';
import { NAV, SITE, telHref } from '../data/site';

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container not-found__inner">
        <LogoMark size={56} />
        <h1>Halaman tidak ditemukan</h1>
        <p>Alamat yang Anda buka mungkin sudah dipindahkan atau salah ketik. Coba salah satu halaman berikut.</p>
        <ul className="not-found__links">
          <li><Link to="/">Beranda</Link></li>
          {NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
          <li><Link to="/janji">Pendaftaran Online</Link></li>
        </ul>
        <p className="muted">Butuh pertolongan segera? Hubungi IGD <a href={telHref(SITE.igdTel)}>{SITE.igd}</a>.</p>
      </div>
    </section>
  );
}
