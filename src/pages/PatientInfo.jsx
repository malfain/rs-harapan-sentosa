import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { FlowSteps, PageHero } from '../components/Shared';
import { FAQ, INPATIENT_FLOW, OUTPATIENT_FLOW, PATIENT_DUTIES, PATIENT_RIGHTS } from '../data/content';
import { CONTACT_HREF, SITE, telHref, waHref } from '../data/site';

const SECTIONS = [
  ['rawat-jalan', 'Alur rawat jalan'],
  ['rawat-inap', 'Alur rawat inap'],
  ['bpjs', 'BPJS & asuransi'],
  ['tarif', 'Tarif & paket'],
  ['hasil-lab', 'Hasil lab online'],
  ['hak', 'Hak & kewajiban'],
  ['faq', 'Tanya jawab'],
  ['pengaduan', 'Pengaduan'],
];

export default function PatientInfo() {
  return (
    <>
      <PageHero
        title="Info pasien"
        lead="Semua yang perlu Anda ketahui sebelum dan saat berobat: alur layanan, penjaminan, hasil pemeriksaan, dan hak Anda sebagai pasien."
        crumbs={[{ label: 'Info Pasien' }]}
      />
      <div className="container with-toc">
        <nav className="toc" aria-label="Isi halaman">
          <p className="toc__title">Di halaman ini</p>
          <ul>
            {SECTIONS.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
          </ul>
        </nav>

        <div className="doc">
          <section id="rawat-jalan" className="doc__section">
            <h2>Alur rawat jalan</h2>
            <FlowSteps steps={OUTPATIENT_FLOW} />
            <Link to="/janji" className="btn btn--primary">Daftar rawat jalan online</Link>
          </section>

          <section id="rawat-inap" className="doc__section">
            <h2>Alur rawat inap</h2>
            <FlowSteps steps={INPATIENT_FLOW} />
          </section>

          <section id="bpjs" className="doc__section">
            <h2>BPJS Kesehatan & asuransi rekanan</h2>
            <div className="two-col">
              <div className="panel">
                <h3>Pasien BPJS Kesehatan</h3>
                <ul className="ticks">
                  <li><Icon name="check" size={18} stroke={2.5} />Kartu BPJS/KIS aktif dan kartu identitas</li>
                  <li><Icon name="check" size={18} stroke={2.5} />Surat rujukan dari faskes tingkat pertama</li>
                  <li><Icon name="check" size={18} stroke={2.5} />Kondisi gawat darurat dilayani tanpa rujukan</li>
                </ul>
              </div>
              <div className="panel">
                <h3>Asuransi rekanan</h3>
                <p>[Daftar perusahaan asuransi rekanan.]</p>
                <p className="muted">Bawa kartu asuransi dan kartu identitas. Konfirmasi penjaminan di loket admisi.</p>
              </div>
            </div>
          </section>

          <section id="tarif" className="doc__section">
            <h2>Tarif & paket</h2>
            <p>[Informasi tarif kamar, konsultasi, dan paket pemeriksaan.] Untuk perkiraan biaya tindakan, hubungi call center <a href={telHref(SITE.phoneTel)}>{SITE.phone}</a>.</p>
          </section>

          <section id="hasil-lab" className="doc__section">
            <h2>Hasil lab online</h2>
            <p>Hasil pemeriksaan laboratorium dan radiologi dapat dilihat lewat Portal Pasien setelah dinyatakan selesai oleh petugas.</p>
            <div className="panel panel--sky portal">
              <div>
                <h3>Portal Pasien</h3>
                <p>Masuk dengan nomor rekam medis dan nomor HP terdaftar.</p>
              </div>
              <a href={SITE.portalUrl || CONTACT_HREF} className="btn btn--primary">Masuk Portal Pasien</a>
            </div>
          </section>

          <section id="hak" className="doc__section">
            <h2>Hak & kewajiban pasien</h2>
            <div className="two-col">
              <div>
                <h3>Hak pasien</h3>
                <ul className="plain-list">{PATIENT_RIGHTS.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
              <div>
                <h3>Kewajiban pasien</h3>
                <ul className="plain-list">{PATIENT_DUTIES.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            </div>
          </section>

          <section id="faq" className="doc__section">
            <h2>Tanya jawab</h2>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="pengaduan" className="doc__section">
            <h2>Pengaduan pasien</h2>
            <p>Kami ingin mendengar pengalaman Anda. Sampaikan keluhan atau saran melalui:</p>
            <ul className="contact-list">
              <li><Icon name="chat" size={20} /> WhatsApp <a href={waHref(SITE.whatsappTel)}>{SITE.whatsapp}</a></li>
              <li><Icon name="mail" size={20} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="user" size={20} /> Petugas layanan pelanggan di lobi utama</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
