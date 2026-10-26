import { Link, useParams, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { PageHero, PhotoSlot } from '../components/Shared';
import { ARTICLE_CATEGORIES, ARTICLES, findArticle } from '../data/content';
import NotFound from './NotFound';

function ArticleLead({ a }) {
  return (
    <article className="article-lead">
      <PhotoSlot label="Gambar artikel" />
      <p className="article-meta-line"><span className="article-cat">{a.category}</span> {a.date}</p>
      <h2><Link to={`/artikel/${a.slug}`} className="stretched">{a.title}</Link></h2>
      <p className="article-lead__excerpt">{a.excerpt}</p>
    </article>
  );
}

function ArticleList({ items }) {
  return (
    <ul className="article-list">
      {items.map((a) => (
        <li key={a.slug} className="article-item">
          <div className="article-item__body">
            <p className="article-meta-line"><span className="article-cat">{a.category}</span> {a.date}</p>
            <h3><Link to={`/artikel/${a.slug}`} className="stretched">{a.title}</Link></h3>
          </div>
          <PhotoSlot label="Gambar" tone={a.category === 'Promo & Paket' ? 'mint' : 'sky'} className="article-item__thumb" />
        </li>
      ))}
    </ul>
  );
}

export function Articles() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('kategori') ?? '';
  const list = ARTICLES.filter((a) => !cat || a.category === cat);
  const [first, ...rest] = list;

  return (
    <>
      <PageHero
        title="Artikel & berita"
        lead="Informasi kesehatan dari dokter kami, kabar kegiatan rumah sakit, promo paket pemeriksaan, dan jadwal seminar awam."
        crumbs={[{ label: 'Artikel & Berita' }]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="chips chips--tabs" role="group" aria-label="Kategori">
            <button type="button" className="chip" aria-pressed={!cat} onClick={() => setParams({}, { replace: true })}>Semua</button>
            {ARTICLE_CATEGORIES.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setParams({ kategori: c }, { replace: true })}>{c}</button>
            ))}
          </div>
          {first ? (
            <div className="article-layout">
              <ArticleLead a={first} />
              <ArticleList items={rest} />
            </div>
          ) : (
            <div className="empty">
              <h2>Belum ada tulisan di kategori ini</h2>
              <button type="button" className="btn btn--outline" onClick={() => setParams({}, { replace: true })}>Lihat semua</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ArticleDetail() {
  const { slug } = useParams();
  const a = findArticle(slug);
  if (!a) return <NotFound />;
  const related = ARTICLES.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 2);

  return (
    <>
      <PageHero title={a.title} crumbs={[{ label: 'Artikel & Berita', to: '/artikel' }, { label: a.category }]}>
        <p className="article-meta">{a.category} · {a.date} · Ditinjau oleh dr. [Nama]</p>
      </PageHero>
      <section className="section section--tight">
        <div className="container article">
          <PhotoSlot label="Gambar utama artikel" className="article__hero" />
          <div className="prose">
            <p className="prose__lead">{a.excerpt}</p>
            <p>[Isi artikel. Tulis dalam paragraf pendek, 3–4 kalimat, dengan subjudul untuk setiap bagian.]</p>
            <h2>[Subjudul]</h2>
            <p>[Isi bagian.]</p>
            <p className="prose__note">Artikel ini bersifat informasi umum dan tidak menggantikan pemeriksaan dokter.</p>
          </div>
          <Link to="/artikel" className="arrow-link arrow-link--back"><Icon name="back" size={18} /> Semua artikel</Link>
          {related.length > 0 && (
            <aside className="related" aria-labelledby="related-title">
              <h2 id="related-title">Baca juga</h2>
              <ArticleList items={related} />
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
