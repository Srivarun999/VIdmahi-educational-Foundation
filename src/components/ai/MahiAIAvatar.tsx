interface MahiAIAvatarProps {
  size?: number;
  showStatus?: boolean;
}

export default function MahiAIAvatar({ size = 48, showStatus = false }: MahiAIAvatarProps) {
  const badgeSize = Math.max(10, Math.round(size * 0.22));

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-full shadow-md"
      style={{ width: size, height: size, background: "linear-gradient(135deg, #F8AFC2 0%, #7ED957 100%)" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <linearGradient id="mahiHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D4C41" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>
          <linearGradient id="mahiDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2E6D" />
            <stop offset="100%" stopColor="#5A8F2D" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="#FFF7F9" />
        <path d="M34 49c0-18 12-30 26-30s26 12 26 30v10H34V49Z" fill="url(#mahiHair)" />
        <circle cx="60" cy="60" r="22" fill="#F8D7C7" />
        <path d="M43 43c5-10 15-15 17-15s12 5 17 15" fill="none" stroke="#3E2723" strokeWidth="7" strokeLinecap="round" />
        <circle cx="52" cy="59" r="2.5" fill="#3E2723" />
        <circle cx="68" cy="59" r="2.5" fill="#3E2723" />
        <path d="M54 67c3 3 9 3 12 0" fill="none" stroke="#B76B6B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M39 92c4-14 14-24 21-24s17 10 21 24" fill="url(#mahiDress)" />
        <path d="M47 91c4-7 9-11 13-11s9 4 13 11" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
        <circle cx="29" cy="35" r="5" fill="#F2B233" opacity="0.95" />
        <circle cx="93" cy="34" r="4" fill="#7ED957" opacity="0.9" />
      </svg>

      {showStatus && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-emerald-500"
          style={{ width: badgeSize, height: badgeSize }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
