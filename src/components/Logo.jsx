const VARIANTS = {
  default: { tile: '#0089FD', cross: '#FFFFFF', leaf: '#9BE3A4' },
  negative: { tile: '#FFFFFF', cross: '#0089FD', leaf: '#3A9742' },
};

export function LogoMark({ size = 40, variant = 'default' }) {
  const c = VARIANTS[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="12" fill={c.tile} />
      <path d="M20 10.5h8v9.5h9.5v8H28v9.5h-8V28h-9.5v-8H20z" fill={c.cross} />
      <path d="M29.5 18.5c0-5 3.2-8 8.5-8c0 5.2-3.2 8-8.5 8z" fill={c.leaf} />
    </svg>
  );
}

export default function Logo({ inverse = false }) {
  return (
    <span className={`logo${inverse ? ' logo--inverse' : ''}`}>
      <LogoMark />
      <span className="logo__words">
        <span className="logo__kind">Rumah Sakit</span>
        <span className="logo__name">Harapan Sentosa</span>
      </span>
    </span>
  );
}
