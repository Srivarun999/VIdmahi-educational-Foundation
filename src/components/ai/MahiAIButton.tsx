interface MahiAIButtonProps {
  onClick: () => void;
  open: boolean;
}

export default function MahiAIButton({
  onClick,
  open,
}: MahiAIButtonProps) {
  return (
    <div className="group relative flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        aria-label={open ? "Close Mahi_AI chat" : "Open Mahi_AI chat"}
        aria-expanded={open}
        className="relative transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        {/* Single Ring */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#7ED957] bg-white shadow-xl shadow-[#0A2E6D]/20">
          <svg viewBox="0 0 120 120" className="h-16 w-16">
            {/* Hair */}
            <path
              d="M33 49c0-18 12-30 27-30s27 12 27 30v10H33V49Z"
              fill="#5B4636"
            />

            {/* Face */}
            <circle cx="60" cy="60" r="22" fill="#F8D7C7" />

            {/* Eyes */}
            <circle cx="52" cy="59" r="2.5" fill="#3E2723" />
            <circle cx="68" cy="59" r="2.5" fill="#3E2723" />

            {/* Smile */}
            <path
              d="M54 67c3 3 9 3 12 0"
              fill="none"
              stroke="#B76B6B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Dress */}
            <path
              d="M39 92c4-14 14-24 21-24s17 10 21 24"
              fill="#0A2E6D"
            />

            {/* Accent */}
            <path
              d="M45 90c5-6 10-9 15-9s10 3 15 9"
              fill="none"
              stroke="#7ED957"
              strokeWidth="2.2"
            />

            {/* Decorative dots */}
            <circle cx="42" cy="35" r="5" fill="#F2B233" />
            <circle cx="92" cy="36" r="4" fill="#F8AFC2" />
          </svg>
        </div>
      </button>

      {/* Name */}
      <div className="mt-1 rounded-full bg-white/95 px-3 py-1 shadow-md">
        <span className="text-xs font-bold tracking-wide text-[#0A2E6D]">
          Mahi_AI
        </span>
      </div>

      {/* Hover Tooltip */}
      <span className="pointer-events-none absolute right-full top-6 mr-3 hidden rounded-full bg-[#0A2E6D] px-3 py-1.5 text-xs font-semibold text-white shadow-lg opacity-0 transition group-hover:opacity-100 md:block">
        Ask Mahi_AI
      </span>
    </div>
  );
}