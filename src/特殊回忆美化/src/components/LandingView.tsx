/** 四角星图标：与界面琥珀高光一致，用于文字两侧 */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M7 1 L8.4 5.6 L13 7 L8.4 8.4 L7 13 L5.6 8.4 L1 7 L5.6 5.6 L7 1 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LANDING_BG =
  'https://i.postimg.cc/0y4FDZg4/2-0-artist-channel-(caststation)-1-5-artist-cogecha-1-3-artist-chocoan-s-922060740-upscale.png';

interface LandingViewProps {
  onEnter: () => void;
}

export default function LandingView({ onEnter }: LandingViewProps) {
  return (
    <div className="absolute inset-0 flex min-h-[280px] flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${LANDING_BG}")`,
          backgroundColor: '#0f0d0b',
        }}
        aria-hidden
      />
      <button
        type="button"
        onClick={onEnter}
        className="memory-landing-card memory-entry-btn group relative z-10 inline-flex items-center justify-center gap-3 font-serif text-[1.05rem] tracking-[0.25em] outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a09]"
        style={{
          padding: '0.8rem 2.25rem',
          borderRadius: '9999px',
          minHeight: '48px',
          background:
            'linear-gradient(145deg, rgba(28, 25, 23, 0.98) 0%, rgba(18, 15, 13, 0.98) 100%)',
          border: '1px solid rgba(251, 191, 36, 0.22)',
          boxShadow:
            '0 8px 32px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'scale(1.02) translateY(-1px)';
          el.style.borderColor = 'rgba(251, 191, 36, 0.4)';
          el.style.boxShadow =
            '0 12px 40px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px -4px rgba(251, 191, 36, 0.15)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'scale(1) translateY(0)';
          el.style.borderColor = 'rgba(251, 191, 36, 0.22)';
          el.style.boxShadow =
            '0 8px 32px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.2)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.98) translateY(0)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)';
        }}
      >
        <span className="flex h-[1.1em] w-[1.1em] items-center justify-center text-amber-200/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-amber-200">
          <StarIcon />
        </span>
        <span className="text-amber-100/95 tracking-widest">进入回忆</span>
        <span className="flex h-[1.1em] w-[1.1em] items-center justify-center text-amber-200/90 transition-transform duration-300 group-hover:scale-110 group-hover:text-amber-200">
          <StarIcon />
        </span>
      </button>
    </div>
  );
}
