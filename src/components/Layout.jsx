import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Icon from './Icon';
import { NAV, SITE, telHref, waHref } from '../data/site';

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span>{SITE.address} · Buka setiap hari</span>
        <span>
          Call center <a href={telHref(SITE.phoneTel)}>{SITE.phone}</a> · WhatsApp{' '}
          <a href={waHref(SITE.whatsappTel)}>{SITE.whatsapp}</a>
        </span>
      </div>
    </div>
  );
}

function SearchForm({ onDone }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  return (
    <form
      className="header-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        navigate(`/cari?q=${encodeURIComponent(q.trim())}`);
        setQ('');
        onDone?.();
      }}
    >
      <label className="sr-only" htmlFor="site-search">
        Cari di situs
      </label>
      <Icon name="search" size={18} />
      <input
        id="site-search"
        type="search"
        placeholder="Cari dokter, layanan…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
}

function Header() {
  // Menu terbuka hanya untuk halaman tempat ia dibuka, jadi otomatis tertutup saat pindah halaman.
  const { pathname } = useLocation();
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (v) => setOpenOn((typeof v === 'function' ? v(open) : v) ? pathname : null);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="RS Harapan Sentosa, ke beranda">
          <Logo />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
          <span>{open ? 'Tutup' : 'Menu'}</span>
        </button>
        <div id="main-nav" className={`site-header__panel${open ? ' is-open' : ''}`}>
          <nav aria-label="Menu utama" className="main-nav">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className="main-nav__link">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <SearchForm onDone={() => setOpen(false)} />
          <div className="site-header__actions">
            <a href={telHref(SITE.igdTel)} className="btn btn--emergency">
              <Icon name="plus" size={16} stroke={2.5} />
              IGD 24 Jam
            </a>
            <Link to="/janji" className="btn btn--primary">
              Buat Janji
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="kontak-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo inverse />
          <address>
            {SITE.addressFull}
            <br />
            {SITE.city}
          </address>
          <Link to="/tentang#kontak" className="site-footer__map">
            <Icon name="pin" size={16} /> Lihat peta & lokasi
          </Link>
        </div>
        <div>
          <h2 className="site-footer__title">Layanan</h2>
          <ul>
            <li><Link to="/layanan#poliklinik">Poliklinik</Link></li>
            <li><Link to="/layanan#igd">IGD 24 Jam</Link></li>
            <li><Link to="/layanan#rawat-inap">Rawat Inap</Link></li>
            <li><Link to="/layanan#laboratorium">Laboratorium & Radiologi</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="site-footer__title">Pasien</h2>
          <ul>
            <li><Link to="/janji">Pendaftaran Online</Link></li>
            <li><Link to="/dokter">Jadwal Dokter</Link></li>
            <li><Link to="/pasien#bpjs">BPJS & Asuransi</Link></li>
            <li><Link to="/pasien#hak">Hak & Kewajiban Pasien</Link></li>
            <li><Link to="/pasien#pengaduan">Pengaduan Pasien</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="site-footer__title">Kontak</h2>
          <ul>
            <li>Call center <a href={telHref(SITE.phoneTel)}>{SITE.phone}</a></li>
            <li>IGD <a href={telHref(SITE.igdTel)}>{SITE.igd}</a></li>
            <li>WhatsApp <a href={waHref(SITE.whatsappTel)}>{SITE.whatsapp}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="site-footer__base">
        <div className="container site-footer__base-inner">
          <span>© {new Date().getFullYear()} {SITE.name}. Seluruh hak cipta dilindungi.</span>
          <span className="site-footer__legal">
            <Link to="/tentang#privasi">Kebijakan Privasi</Link>
            <Link to="/tentang#syarat">Syarat & Ketentuan</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <>
      <a href="#konten" className="skip-link">
        Lewati ke konten
      </a>
      <ScrollManager />
      <TopBar />
      <Header />
      <main id="konten" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
