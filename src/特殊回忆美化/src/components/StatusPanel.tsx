import { Calendar, Clock, Heart, MapPin, Sparkles } from 'lucide-react';
import { GameState } from '../types';

export default function StatusPanel({ state }: { state: GameState }) {
  return (
    <div className="flex flex-col h-[70vh]">
      <div className="px-8 py-6 border-b border-white/5">
        <h2 className="text-2xl text-amber-200 tracking-widest font-serif">当前状态</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 flex flex-col md:flex-row gap-8">
        {/* Left Column: World Info */}
        <div className="flex-1 space-y-6">
          <StatusItem icon={<Clock />} label="时间" value={state.time} />
          <StatusItem
            icon={<Calendar />}
            label="日期"
            value={`${state.date.era} · ${state.date.season} · ${state.date.day}日`}
          />
          <StatusItem icon={<MapPin />} label="地点" value={state.location} />

          <div className="pt-4 border-t border-white/5">
            <h3 className="text-sm text-stone-400 tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              希露的花珀
            </h3>
            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-200 font-medium tracking-widest animate-breathe">{state.amberState}</span>
                <span className="text-xs text-stone-500">追忆瓣: {state.memoryPetals}/3</span>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                一块温暖的、水滴状的透明琥珀，里面封存着一片没有枯萎的雏菊花芯。
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Echoes */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm text-stone-400 tracking-widest mb-4 flex items-center gap-2">
            <Heart size={14} className="text-rose-400" />
            希露的回音
          </h3>
          <div className="flex-1 bg-black/30 rounded-xl p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
            <p className="text-stone-200 leading-loose tracking-wide relative z-10 italic">「 {state.echo} 」</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-black/40 border border-white/5 flex items-center justify-center text-amber-500/70 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
        {icon}
      </div>
      <div>
        <div className="text-xs text-stone-500 tracking-widest mb-1">{label}</div>
        <div className="text-stone-200 tracking-wide">{value}</div>
      </div>
    </div>
  );
}
