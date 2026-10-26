import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { PageHero } from '../components/Shared';
import { DOCTORS, findDoctor, upcomingDates } from '../data/doctors';
import { POLIES } from '../data/services';
import { SITE } from '../data/site';
import { cancelBooking, createBooking, findBooking } from '../lib/bookings';

const STEPS = ['Poli & dokter', 'Jadwal', 'Data pasien', 'Konfirmasi'];

const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fromKey = (k) => {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const fmtShort = new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtLong = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const EMPTY_PATIENT = { type: 'baru', mrn: '', name: '', birth: '', phone: '', payer: 'Umum', bpjs: '', note: '' };

function validatePatient(p) {
  const e = {};
  if (p.type === 'lama' && !p.mrn.trim()) e.mrn = 'Isi nomor rekam medis, atau pilih "Pasien baru".';
  if (p.name.trim().length < 3) e.name = 'Tulis nama lengkap sesuai kartu identitas.';
  if (!p.birth) e.birth = 'Pilih tanggal lahir.';
  if (p.phone.replace(/\D/g, '').length < 9) e.phone = 'Nomor HP minimal 9 digit, contoh 0812xxxxxxx.';
  if (p.payer === 'BPJS' && p.bpjs.replace(/\D/g, '').length !== 13) e.bpjs = 'Nomor kartu BPJS terdiri dari 13 digit.';
  return e;
}

function Stepper({ step }) {
  return (
    <ol className="stepper" aria-label="Langkah pendaftaran">
      {STEPS.map((label, i) => (
        <li key={label} className={i < step ? 'is-done' : i === step ? 'is-current' : undefined} aria-current={i === step ? 'step' : undefined}>
          <span className="stepper__dot">{i < step ? <Icon name="check" size={14} stroke={3} /> : i + 1}</span>
          <span className="stepper__label">{label}</span>
        </li>
      ))}
    </ol>
  );
}

function Field({ label, error, hint, children, id }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label className="field__label" htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <span className="field__hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="field__error" id={`${id}-err`} role="alert">{error}</span>}
    </div>
  );
}

function BookingWizard() {
  const [params] = useSearchParams();
  const initialDoctor = findDoctor(params.get('dokter') ?? '');
  const [poli, setPoli] = useState(initialDoctor?.poli ?? (POLIES.includes(params.get('poli')) ? params.get('poli') : ''));
  const [doctorId, setDoctorId] = useState(initialDoctor?.id ?? '');
  const doctor = findDoctor(doctorId);
  const dates = useMemo(() => (doctor ? upcomingDates(doctor) : []), [doctor]);
  const [dateKey, setDateKey] = useState(() => {
    const wanted = params.get('tanggal');
    return initialDoctor && wanted && upcomingDates(initialDoctor).some((d) => toKey(d) === wanted) ? wanted : '';
  });
  const [step, setStep] = useState(initialDoctor ? (dateKey ? 2 : 1) : 0);
  const [patient, setPatient] = useState(EMPTY_PATIENT);
  const [errors, setErrors] = useState({});
  const [stepError, setStepError] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const doctors = DOCTORS.filter((d) => !poli || d.poli === poli);
  const set = (k) => (e) => setPatient((p) => ({ ...p, [k]: e.target.value }));

  const next = () => {
    setStepError('');
    if (step === 0 && !doctor) return setStepError('Pilih dokter terlebih dahulu.');
    if (step === 1 && !dateKey) return setStepError('Pilih salah satu tanggal praktik.');
    if (step === 2) {
      const e = validatePatient(patient);
      setErrors(e);
      if (Object.keys(e).length) return setStepError('Periksa kembali isian yang ditandai.');
    }
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!agree) return setStepError('Centang persetujuan untuk melanjutkan.');
    setSubmitting(true);
    const booking = await createBooking({
      doctorId: doctor.id,
      doctorName: doctor.name,
      poli: doctor.poli,
      date: dateKey,
      hours: doctor.hours,
      ...patient,
    });
    setSubmitting(false);
    setDone(booking);
  };

  const reset = () => {
    setDone(null);
    setStep(0);
    setPoli('');
    setDoctorId('');
    setDateKey('');
    setPatient(EMPTY_PATIENT);
    setAgree(false);
  };

  if (done) {
    return (
      <div className="wizard wizard--done">
        <span className="done-mark"><Icon name="check" size={28} stroke={3} /></span>
        <h2 ref={headingRef} tabIndex={-1}>Janji temu tercatat</h2>
        <p>Simpan kode pendaftaran ini. Tunjukkan di loket pendaftaran saat datang.</p>
        <p className="booking-code" aria-label={`Kode pendaftaran ${done.code}`}>{done.code}</p>
        <dl className="summary">
          <div><dt>Dokter</dt><dd>{done.doctorName}</dd></div>
          <div><dt>Poliklinik</dt><dd>{done.poli}</dd></div>
          <div><dt>Tanggal</dt><dd>{fmtLong.format(fromKey(done.date))} · {done.hours}</dd></div>
          <div><dt>Pasien</dt><dd>{done.name}</dd></div>
        </dl>
        <p className="muted">Datang 30 menit sebelum jam praktik dengan membawa kartu identitas{done.payer === 'BPJS' ? ', kartu BPJS, dan surat rujukan' : ''}.</p>
        <div className="wizard__nav">
          <button type="button" className="btn btn--outline" onClick={reset}>Buat janji lain</button>
          <Link to="/" className="btn btn--primary">Kembali ke beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard">
      <Stepper step={step} />
      <div className="wizard__panel">
        <h2 ref={headingRef} tabIndex={-1}>
          <span className="sr-only">Langkah {step + 1} dari 4: </span>
          {['Pilih poliklinik dan dokter', 'Pilih jadwal kunjungan', 'Isi data pasien', 'Periksa dan konfirmasi'][step]}
        </h2>

        {step === 0 && (
          <>
            <Field label="Poliklinik" id="b-poli">
              <select id="b-poli" value={poli} onChange={(e) => { setPoli(e.target.value); setDoctorId(''); setDateKey(''); }}>
                <option value="">Semua poliklinik</option>
                {POLIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <fieldset className="choice-list">
              <legend className="field__label">Dokter</legend>
              {doctors.map((d) => (
                <label key={d.id} className="choice">
                  <input type="radio" name="doctor" value={d.id} checked={doctorId === d.id} onChange={() => { setDoctorId(d.id); setDateKey(''); }} />
                  <span className="choice__main">
                    <b>{d.name}</b>
                    <span>{d.specialty}</span>
                  </span>
                  <span className="choice__meta">{d.days.map((x) => x.slice(0, 3)).join(', ')}</span>
                </label>
              ))}
            </fieldset>
          </>
        )}

        {step === 1 && doctor && (
          <>
            <p className="wizard__context">{doctor.name} · praktik {doctor.days.join(', ')} · {doctor.hours}</p>
            <fieldset>
              <legend className="field__label">Tanggal praktik dalam 3 minggu ke depan</legend>
              <div className="date-grid">
                {dates.map((d) => {
                  const k = toKey(d);
                  return (
                    <label key={k} className="date-option">
                      <input type="radio" name="date" value={k} checked={dateKey === k} onChange={() => setDateKey(k)} />
                      <span>{fmtShort.format(d)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        {step === 2 && (
          <div className="form-grid">
            <fieldset className="segmented form-grid__full">
              <legend className="field__label">Status pasien</legend>
              {[['baru', 'Pasien baru'], ['lama', 'Pasien lama']].map(([v, l]) => (
                <label key={v}>
                  <input type="radio" name="ptype" value={v} checked={patient.type === v} onChange={set('type')} />
                  <span>{l}</span>
                </label>
              ))}
            </fieldset>
            {patient.type === 'lama' && (
              <Field label="Nomor rekam medis" id="b-mrn" error={errors.mrn} hint="Tertera di kartu berobat.">
                <input id="b-mrn" value={patient.mrn} onChange={set('mrn')} aria-invalid={!!errors.mrn} aria-describedby={errors.mrn ? 'b-mrn-err' : 'b-mrn-hint'} />
              </Field>
            )}
            <Field label="Nama lengkap" id="b-name" error={errors.name}>
              <input id="b-name" autoComplete="name" value={patient.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'b-name-err' : undefined} />
            </Field>
            <Field label="Tanggal lahir" id="b-birth" error={errors.birth}>
              <input id="b-birth" type="date" autoComplete="bday" max={toKey(new Date())} value={patient.birth} onChange={set('birth')} aria-invalid={!!errors.birth} aria-describedby={errors.birth ? 'b-birth-err' : undefined} />
            </Field>
            <Field label="Nomor HP / WhatsApp" id="b-phone" error={errors.phone} hint="Untuk konfirmasi dan pengingat janji.">
              <input id="b-phone" type="tel" inputMode="tel" autoComplete="tel" value={patient.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'b-phone-err' : 'b-phone-hint'} />
            </Field>
            <Field label="Cara bayar" id="b-payer">
              <select id="b-payer" value={patient.payer} onChange={set('payer')}>
                <option>Umum</option>
                <option>BPJS</option>
                <option>Asuransi</option>
              </select>
            </Field>
            {patient.payer === 'BPJS' && (
              <Field label="Nomor kartu BPJS" id="b-bpjs" error={errors.bpjs} hint="13 digit, tertera di kartu BPJS/KIS.">
                <input id="b-bpjs" inputMode="numeric" value={patient.bpjs} onChange={set('bpjs')} aria-invalid={!!errors.bpjs} aria-describedby={errors.bpjs ? 'b-bpjs-err' : 'b-bpjs-hint'} />
              </Field>
            )}
            <Field label="Keluhan (opsional)" id="b-note">
              <textarea id="b-note" rows={3} value={patient.note} onChange={set('note')} />
            </Field>
          </div>
        )}

        {step === 3 && doctor && (
          <>
            <dl className="summary">
              <div><dt>Dokter</dt><dd>{doctor.name}<br /><span className="muted">{doctor.specialty}</span></dd></div>
              <div><dt>Jadwal</dt><dd>{fmtLong.format(fromKey(dateKey))} · {doctor.hours}</dd></div>
              <div><dt>Pasien</dt><dd>{patient.name} ({patient.type === 'baru' ? 'pasien baru' : `RM ${patient.mrn}`})</dd></div>
              <div><dt>Nomor HP</dt><dd>{patient.phone}</dd></div>
              <div><dt>Cara bayar</dt><dd>{patient.payer}{patient.payer === 'BPJS' ? ` · ${patient.bpjs}` : ''}</dd></div>
            </dl>
            <label className="check">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>Data di atas benar, dan saya setuju data ini dipakai untuk keperluan pendaftaran.</span>
            </label>
          </>
        )}

        {stepError && <p className="form-error" role="alert">{stepError}</p>}

        <div className="wizard__nav">
          {step > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={() => { setStepError(''); setStep((s) => s - 1); }}>
              <Icon name="back" size={18} /> Kembali
            </button>
          ) : <span />}
          {step < 3 ? (
            <button type="button" className="btn btn--primary btn--lg" onClick={next}>Lanjut</button>
          ) : (
            <button type="button" className="btn btn--primary btn--lg" onClick={submit} disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Mengirim…' : 'Konfirmasi janji'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ManageBooking() {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(undefined);

  return (
    <section className="section section--muted" id="ubah" aria-labelledby="ubah-title">
      <div className="container manage">
        <div>
          <h2 id="ubah-title">Ubah atau batalkan janji</h2>
          <p className="muted">Masukkan kode pendaftaran dan nomor HP yang Anda pakai saat mendaftar. Untuk mengganti jadwal, batalkan lalu buat janji baru.</p>
        </div>
        <form
          className="manage__form"
          onSubmit={async (e) => {
            e.preventDefault();
            setResult(await findBooking(code, phone));
          }}
        >
          <label className="field">
            <span className="field__label">Kode pendaftaran</span>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="HS-XXXXXX" required autoCapitalize="characters" />
          </label>
          <label className="field">
            <span className="field__label">Nomor HP</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <button type="submit" className="btn btn--primary">Cari janji</button>
          <div aria-live="polite" className="manage__result">
            {result === null && <p className="form-error">Janji tidak ditemukan. Periksa kode dan nomor HP, atau hubungi call center {SITE.phone}.</p>}
            {result && (
              <div className="manage__card">
                <p><b>{result.doctorName}</b> · {fmtLong.format(fromKey(result.date))}</p>
                <p className="muted">Atas nama {result.name} · status: <b>{result.status}</b></p>
                {result.status === 'aktif' && (
                  <button type="button" className="btn btn--outline-danger" onClick={async () => setResult({ ...(await cancelBooking(result.code)) })}>
                    Batalkan janji ini
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Booking() {
  return (
    <>
      <PageHero
        title="Pendaftaran online"
        lead="Empat langkah singkat. Pilih dokter dan jadwal, isi data pasien, lalu simpan kode pendaftaran Anda."
        crumbs={[{ label: 'Pendaftaran Online' }]}
      >
        <p className="page-hero__note">
          <Icon name="plus" size={16} stroke={2.5} /> Kondisi gawat darurat tidak perlu mendaftar. Langsung ke IGD atau hubungi {SITE.igd}.
        </p>
      </PageHero>
      <section className="section section--tight">
        <div className="container">
          <BookingWizard />
        </div>
      </section>
      <ManageBooking />
    </>
  );
}
