import { useState, useEffect, useRef } from 'react';
import { EyeOff, Play } from 'lucide-react';

// Custom Daisy Icon
const DaisyIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="20"
    height="20"
  >
    {/* Petals */}
    <path d="M12 2C10.5 2 9.5 4 9.5 6C9.5 8 12 10 12 10C12 10 14.5 8 14.5 6C14.5 4 13.5 2 12 2Z" fill="currentColor" />
    <path d="M12 22C13.5 22 14.5 20 14.5 18C14.5 16 12 14 12 14C12 14 9.5 16 9.5 18C9.5 20 10.5 22 12 22Z" fill="currentColor" />
    <path d="M22 12C22 10.5 20 9.5 18 9.5C16 9.5 14 12 14 12C14 12 16 14.5 18 14.5C20 14.5 22 13.5 22 12Z" fill="currentColor" />
    <path d="M2 12C2 13.5 4 14.5 6 14.5C8 14.5 10 12 10 12C10 12 8 9.5 6 9.5C4 9.5 2 10.5 2 12Z" fill="currentColor" />
    <path d="M19.071 4.92896C18.0104 3.8683 16.0104 4.8683 15.0104 6.28251C14.0104 7.69673 14.0104 10.5251 14.0104 10.5251C14.0104 10.5251 16.8388 10.5251 18.253 9.52513C19.6673 8.52513 20.1317 6.52513 19.071 4.92896Z" fill="currentColor" />
    <path d="M4.92896 19.071C5.98962 20.1317 7.98962 19.1317 8.98962 17.7175C9.98962 16.3033 9.98962 13.4749 9.98962 13.4749C9.98962 13.4749 7.16117 13.4749 5.74695 14.4749C4.33274 15.4749 3.8683 17.4749 4.92896 19.071Z" fill="currentColor" />
    <path d="M19.071 19.071C20.1317 18.0104 19.1317 16.0104 17.7175 15.0104C16.3033 14.0104 13.4749 14.0104 13.4749 14.0104C13.4749 14.0104 13.4749 16.8388 14.4749 18.253C15.4749 19.6673 17.4749 20.1317 19.071 19.071Z" fill="currentColor" />
    <path d="M4.92896 4.92896C3.8683 5.98962 4.8683 7.98962 6.28251 8.98962C7.69673 9.98962 10.5251 9.98962 10.5251 9.98962C10.5251 9.98962 10.5251 7.16117 9.52513 5.74695C8.52513 4.33274 6.52513 3.8683 4.92896 4.92896Z" fill="currentColor" />
    {/* Center */}
    <circle cx="12" cy="12" r="3" fill="#FBBF24" />
  </svg>
);

interface TextBoxProps {
  text: string;
  onHideUI: () => void;
  /** 当前段播完后点击进入下一段时调用；不传则点击无效果 */
  onNext?: () => void;
}

export default function TextBox({ text, onHideUI, onNext }: TextBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasAutoAdvancedRef = useRef(false);
  const onNextRef = useRef(onNext);
  onNextRef.current = onNext;

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    hasAutoAdvancedRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    let i = 0;
    intervalRef.current = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);
      }
    }, 40);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]);

  useEffect(() => {
    if (!isTyping && autoAdvance && onNextRef.current && !hasAutoAdvancedRef.current) {
      hasAutoAdvancedRef.current = true;
      const t = setTimeout(() => onNextRef.current?.(), 800);
      return () => clearTimeout(t);
    }
  }, [isTyping, autoAdvance]);

  const handleSkip = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayedText(text);
    setIsTyping(false);
  };

  return (
    <div className="relative w-full glass-panel-text rounded-xl p-6 md:p-8 border-t border-l border-white/10 border-r border-b border-black/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500/50 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500/50 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500/50 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500/50 rounded-br-xl" />

      {/* Quick Actions */}
      <div className="absolute -top-4 right-8 flex gap-2">
        <ActionButton icon={<EyeOff size={14} />} label="隐藏" onClick={onHideUI} />
        <ActionButton
          icon={<Play size={14} />}
          label="自动"
          onClick={() => setAutoAdvance((v) => !v)}
          active={autoAdvance}
        />
      </div>

      {/* Text Content：默认流式逐字显示；点击=立即整段显示或进入下一段 */}
      <div 
        className="mt-4 min-h-[100px] text-lg md:text-xl leading-relaxed text-stone-100 text-shadow-sm cursor-pointer"
        onClick={isTyping ? handleSkip : onNext}
      >
        {displayedText}
        {!isTyping && (
          <span className="inline-block ml-2 text-white align-middle daisy-indicator">
            <DaisyIcon />
          </span>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all duration-200 backdrop-blur-md border ${
        active
          ? 'bg-amber-500/30 border-amber-400/50 text-amber-200'
          : 'bg-black/40 hover:bg-amber-900/40 border-white/5 hover:border-amber-500/30 text-stone-300 hover:text-amber-200'
      }`}
    >
      {icon}
      <span className="tracking-widest">{label}</span>
    </button>
  );
}
