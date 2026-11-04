import type { SVGProps } from 'react'

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.9 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.4" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/** Burbujas decorativas como las del logo. */
export function Bubbles({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="bubble-g" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#d4ebf8" />
          <stop offset="100%" stopColor="#a9d4ee" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="34" r="18" fill="url(#bubble-g)" />
      <circle cx="78" cy="22" r="9" fill="url(#bubble-g)" />
      <circle cx="88" cy="74" r="14" fill="url(#bubble-g)" />
      <circle cx="44" cy="92" r="7" fill="url(#bubble-g)" />
    </svg>
  )
}

/** Ramita de hojas verde salvia. */
export function Leaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true">
      <path d="M30 118 C 30 80, 32 40, 30 4" stroke="#7fae95" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[18, 38, 58, 78, 98].map((y, i) => (
        <g key={y}>
          <ellipse cx={i % 2 ? 44 : 16} cy={y} rx="12" ry="7" transform={`rotate(${i % 2 ? -30 : 30} ${i % 2 ? 44 : 16} ${y})`} fill="#9cc5ae" />
        </g>
      ))}
    </svg>
  )
}
