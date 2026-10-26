import Icon from '../components/Icon';
import { LogoMark } from '../components/Logo';
import { PageHero, PhotoSlot } from '../components/Shared';
import { SITE, telHref, waHref } from '../data/site';

const VALUES = [
  ['Peduli', 'Merawat setiap pasien seperti keluarga sendiri.'],
  ['Terpercaya', 'Menjaga keselamatan pasien dan kerahasiaan data.'],
  ['Profesional', 'Bekerja sesuai standar dan ilmu kedokteran terkini.'],
  ['Menumbuhkan harapan', 'Mendampingi pasien hingga pulih.'],
];

export default function About() {
  return (
    <>
      <PageHero title="Tentang kami" lead={SITE.tagline} crumbs={[{ label: 'Tentang Kami' }]} />

      <section className="section" id="profil" aria-labelledby="profil-title">
        <div className="container split">
          <div>
            <h2 id="profil-title">Profil & sejarah</h2>
            <p className="prose-p">[Sejarah singkat rumah sakit: tahun berdiri, pendiri, dan perkembangan layanan hingga kini.]</p>
            <p className="prose-p">[Kapasitas tempat tidur, jumlah dokter spesialis, dan fasilitas utama.]</p>
          </div>
          <PhotoSlot label="Foto gedung rumah sakit" className="split__media" />
        </div>
      </section>

      <section className="section section--brand" id="visi-misi" aria-labelledby="visi-title">
        <div className="container vision">
          <LogoMark size={64} variant="negative" />
          <div>
            <h2 id="visi-title">Visi</h2>
            <p className="vision__statement">[Pernyataan visi resmi rumah sakit.]</p>
            <h2>Misi</h2>
            <ol className="vision__missions">
              <li>[Misi pertama]</li>
              <li>[Misi kedua]</li>
              <li>[Misi ketiga]</li>
            </ol>
          </div>
        </div>
        <div className="container values">
          {VALUES.map(([title, text]) => (
            <div key={title} className="value">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="manajemen" aria-labelledby="manajemen-title">
        <div className="container">
          <h2 id="manajemen-title" className="section-title">Manajemen</h2>
          <div className="people">
            {['Direktur Utama', 'Direktur Medis', 'Direktur Keuangan & Umum'].map((role) => (
              <div key={role} className="person">
                <span className="avatar avatar--lg" aria-hidden="true">FOTO</span>
                <b>[Nama]</b>
                <span className="muted">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" id="akreditasi" aria-labelledby="akreditasi-title">
        <div className="container split split--even">
          <div>
            <h2 id="akreditasi-title">Akreditasi & penghargaan</h2>
            <p className="prose-p">Terakreditasi {SITE.accreditation}. [Nomor sertifikat dan masa berlaku.]</p>
            <p className="prose-p">[Daftar penghargaan beserta tahun dan lembaga pemberi.]</p>
          </div>
          <div id="karier">
            <h2>Karier</h2>
            <p className="prose-p">Bergabunglah bersama tim yang merawat dengan sepenuh hati. [Daftar lowongan terbuka dan cara melamar.]</p>
            <a href={`mailto:${SITE.email}?subject=Lamaran%20kerja`} className="btn btn--outline">Kirim lamaran</a>
          </div>
        </div>
      </section>

      <section className="section" id="kontak" aria-labelledby="kontak-title">
        <div className="container split">
          <div>
            <h2 id="kontak-title">Kontak & lokasi</h2>
            <ul className="contact-list contact-list--lg">
              <li><Icon name="pin" size={22} /><span>{SITE.addressFull}<br />{SITE.city}</span></li>
              <li><Icon name="phone" size={22} /><span>Call center <a href={telHref(SITE.phoneTel)}>{SITE.phone}</a></span></li>
              <li className="contact-list__igd"><Icon name="plus" size={22} stroke={2.5} /><span>IGD 24 jam <a href={telHref(SITE.igdTel)}>{SITE.igd}</a></span></li>
              <li><Icon name="chat" size={22} /><span>WhatsApp <a href={waHref(SITE.whatsappTel)}>{SITE.whatsapp}</a></span></li>
              <li><Icon name="mail" size={22} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="clock" size={22} /><span>Poliklinik: [jam operasional] · IGD: 24 jam</span></li>
            </ul>
            {SITE.mapsUrl && <a href={SITE.mapsUrl} className="btn btn--primary" target="_blank" rel="noreferrer">Buka di Google Maps</a>}
          </div>
          <PhotoSlot label="Peta lokasi" className="split__media split__media--map" />
        </div>
      </section>

      <section className="section section--muted section--tight" aria-label="Ketentuan">
        <div className="container split split--even legal">
          <div id="privasi">
            <h2>Kebijakan privasi</h2>
            <p className="prose-p">[Ringkasan bagaimana rumah sakit mengumpulkan, menyimpan, dan melindungi data pasien.]</p>
          </div>
          <div id="syarat">
            <h2>Syarat & ketentuan</h2>
            <p className="prose-p">[Ketentuan penggunaan situs dan pendaftaran online.]</p>
          </div>
        </div>
      </section>
    </>
  );
}
