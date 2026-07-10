export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand" aria-label="Neko no Ma — café entre silêncios">
      <svg className="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M17 26 14 15l12 7c4-2 8-2 12 0l12-7-3 11c4 5 4 13-1 18-7 8-21 8-28 0-5-5-5-13-1-18Z" />
        <path className="brand__smile" d="M25 35c2 2 4 3 7 3s5-1 7-3" />
        <circle cx="25" cy="30" r="1.5" /><circle cx="39" cy="30" r="1.5" />
      </svg>
      {!compact && <span><strong>Neko no Ma</strong><small>café entre silêncios</small></span>}
    </span>
  );
}
