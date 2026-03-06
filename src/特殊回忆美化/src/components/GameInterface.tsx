import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import TextBox from './TextBox';
import StatusPanel from './StatusPanel';
import SystemMenu from './SystemMenu';
import { ModalType, GameState } from '../types';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

const DEFAULT_STATE: GameState = {
  time: '10:30',
  date: { era: '繁星纪元', season: '春季', day: 1 },
  location: '森林深处的木屋',
  amberState: '嫩芽',
  memoryPetals: 0,
  echo: '呼啊——早上好啊。今天天气很好呢，快起床啦，我的小懒虫~'
};

interface GameInterfaceProps {
  onExit?: () => void;
}

export default function GameInterface({ onExit }: GameInterfaceProps) {
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [showUI, setShowUI] = useState(true);
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  /** 从 <memories> 解析出的段落，每段含说话人与正文；无内容时保留一条默认 */
  const [paragraphs, setParagraphs] = useState<Array<{ speaker: string; text: string }>>([
    { speaker: '希露', text: DEFAULT_STATE.echo }
  ]);
  const [paragraphIndex, setParagraphIndex] = useState(0);

  /** 各阶段文字界面背景图：嫩芽、伴花、含苞、花开等使用指定图，其余用默认占位。用 <img src> 不经过 CSS url()，带括号的 URL 不会导致黑框 */
  const STAGE_BG: Record<string, string> = {
    嫩芽: 'https://i.postimg.cc/zG0Ly7LS/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_3204647272_upscal.png',
    伴花: 'https://i.postimg.cc/BvFGrQfd/399a7798_3c2d_46c3_975e_bdc9a33d5b3e.png',
    含苞: 'https://i.postimg.cc/jqLBmS6p/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_2387487853_upscal.png',
    花开: 'https://i.postimg.cc/hvZDSyZG/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_3201155372_upscal.png',
  };
  const defaultBg = 'https://picsum.photos/seed/fantasy-forest/1920/1080';
  const stageKey = typeof state?.amberState === 'string' ? state.amberState : '';
  const bgImage = (stageKey && STAGE_BG[stageKey]) ? STAGE_BG[stageKey] : defaultBg;

  useEffect(() => {
    try {
      const variables = getVariables({ type: 'message', message_id: 'latest' as const });
      const stat = _.get(variables, 'stat_data', {});
      setState((prev) => ({
        time: _.get(stat, 'time', prev.time),
        date: {
          era: _.get(stat, 'date.era', prev.date.era),
          season: _.get(stat, 'date.season', prev.date.season),
          day: _.get(stat, 'date.day', prev.date.day),
        },
        location: _.get(stat, 'location', prev.location),
        amberState: _.get(stat, 'amber_state', prev.amberState),
        memoryPetals: Number(_.get(stat, 'memory_petals', prev.memoryPetals)),
        echo: _.get(stat, 'echo', prev.echo),
      }));
    } catch (err) {
      console.error('读取状态变量失败', err);
    }

    try {
      const messages = getChatMessages('0-{{lastMessageId}}');
      const memoriesRaw = extractMemoriesFromMessages(messages as any[]);
      if (memoriesRaw) {
        const parsed = parseMemoriesParagraphs(memoriesRaw);
        if (parsed.length > 0) {
          setParagraphs(parsed);
          setParagraphIndex(0);
        }
      }
    } catch (err) {
      console.error('读取聊天记录失败', err);
    }
  }, []);

  /** 对话日志只显示当前楼层 <memories> 里已显示过的段落 */
  const logLines = useMemo(() => {
    if (!Array.isArray(paragraphs)) return [];
    const end = Math.max(0, Math.min(paragraphIndex + 1, paragraphs.length));
    return paragraphs.slice(0, end).map((p) => (p && typeof p.text === 'string' ? p.text : ''));
  }, [paragraphs, paragraphIndex]);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '280px', backgroundColor: '#0f0d0b' }}>
      {/* 用 <img> 做背景，避免 url() 在部分环境下解析失败导致黑框；兜底色 #0f0d0b */}
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#0f0d0b' }}>
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1500 ease-out"
          decoding="async"
          loading="eager"
        />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* Main UI */}
      {showUI && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
            {/* Top Right Menu */}
            <div className="flex justify-end gap-3 pointer-events-auto">
              {typeof onExit === 'function' && (
                <MenuButton icon={<ArrowLeft size={18} />} label="退出" onClick={() => onExit()} />
              )}
              <MenuButton icon={<Clock size={18} />} label="状态" onClick={() => setActiveModal('status')} />
              <MenuButton icon={<BookOpen size={18} />} label="日志" onClick={() => setActiveModal('log')} />
            </div>

            {/* Bottom Text Box */}
            <div className="pointer-events-auto w-full max-w-5xl mx-auto mb-8">
              <TextBox 
                text={paragraphs[paragraphIndex]?.text ?? ''}
                onHideUI={() => setShowUI(false)}
                onNext={
                  paragraphIndex < paragraphs.length - 1
                    ? () => setParagraphIndex((i) => Math.min(i + 1, paragraphs.length - 1))
                    : undefined
                }
              />
            </div>
        </div>
      )}

      {/* Hidden UI Click Area */}
      {!showUI && (
        <div 
          className="absolute inset-0 z-40 cursor-pointer" 
          onClick={() => setShowUI(true)}
        />
      )}

      {/* Modals */}
      {activeModal !== 'none' && (
        <ModalOverlay onClose={() => setActiveModal('none')}>
          {activeModal === 'status' && <StatusPanel state={state} />}
          {activeModal === 'log' && <LogPanel logs={logLines} />}
          {activeModal === 'system' && <SystemMenu />}
        </ModalOverlay>
      )}
    </div>
  );
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full glass-panel hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-amber-400/50"
    >
      <span className="text-white/70 group-hover:text-amber-300 transition-colors">
        {icon}
      </span>
      <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[11px] tracking-widest text-amber-200/80 transition-opacity whitespace-nowrap bg-black/60 px-2 py-1 rounded border border-white/5">
        {label}
      </span>
    </button>
  );
}

function ModalOverlay({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-full glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-amber-900/30 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function PlaceholderModal({ title }: { title: string }) {
  return (
    <div className="p-8 h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-serif text-amber-200 mb-4 tracking-widest">{title}</h2>
      <div className="w-16 h-[1px] bg-amber-500/30 mb-8" />
      <p className="text-stone-400 text-sm tracking-wider">界面已设计，内容待填充</p>
    </div>
  );
}

function LogPanel({ logs }: { logs: string[] }) {
  return (
    <div className="p-8 h-[60vh] flex flex-col">
      <h2 className="text-2xl font-serif text-amber-200 mb-4 tracking-widest">对话日志</h2>
      <div className="w-16 h-[1px] bg-amber-500/30 mb-6" />
      <div className="flex-1 overflow-y-auto space-y-3 text-sm text-stone-200">
        {logs.length === 0 && (
          <p className="text-stone-500">暂无可显示的对话。</p>
        )}
        {logs.map((line, idx) => (
          <div
            key={idx}
            className="glass-panel-text rounded-lg px-4 py-3 border border-white/5"
          >
            <div className="whitespace-pre-wrap leading-relaxed">{typeof line === 'string' ? line : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function extractMemoriesFromMessages(messages: any[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const mes: string = (messages[i]?.message as string) ?? '';
    if (!mes) continue;
    const match = mes.match(/<memories>([\s\S]*?)<\/memories>/i);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
}

/** 将 memories 原文按段落拆分，并解析每段开头的「说话人：」；无则默认为希露。 */
function parseMemoriesParagraphs(raw: string): Array<{ speaker: string; text: string }> {
  const cleaned = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!cleaned) return [];

  const blocks = cleaned.split(/\n\n+/);
  const defaultSpeaker = '希露';
  const result: Array<{ speaker: string; text: string }> = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^(.+?)[:：]\s*([\s\S]*)$/);
    if (match) {
      const speaker = match[1].trim().replace(/\{\{user\}\}/gi, '你');
      const text = match[2].trim();
      if (text) result.push({ speaker, text });
    } else {
      result.push({ speaker: defaultSpeaker, text: trimmed });
    }
  }

  return result;
}
