import { Monitor, Type, Volume2 } from 'lucide-react';

export default function SystemMenu() {
  return (
    <div className="flex flex-col h-[70vh]">
      <div className="px-8 py-6 border-b border-white/5">
        <h2 className="text-2xl text-amber-200 tracking-widest font-serif">系统设置</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <SettingSection icon={<Volume2 />} title="声音设置">
          <Slider label="主音量" value={80} />
          <Slider label="背景音乐" value={60} />
          <Slider label="语音" value={100} />
          <Slider label="音效" value={70} />
        </SettingSection>

        <SettingSection icon={<Monitor />} title="显示设置">
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-200 text-sm tracking-widest">
              窗口模式
            </button>
            <button className="px-4 py-2 rounded-lg border border-white/10 bg-black/40 text-stone-400 hover:text-stone-200 text-sm tracking-widest transition-colors">
              全屏模式
            </button>
          </div>
        </SettingSection>

        <SettingSection icon={<Type />} title="文本设置">
          <Slider label="文字显示速度" value={50} />
          <Slider label="自动播放速度" value={40} />
        </SettingSection>
      </div>
    </div>
  );
}

function SettingSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm text-stone-400 tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
        <span className="text-amber-500/70">{icon}</span>
        {title}
      </h3>
      <div className="space-y-4 pl-2 pt-2">{children}</div>
    </div>
  );
}

function Slider({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-28 text-sm text-stone-300 tracking-widest">{label}</span>
      <div className="flex-1 h-1.5 bg-black/60 rounded-full overflow-hidden relative border border-white/5">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-700 to-amber-400"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs text-stone-500">{value}%</span>
    </div>
  );
}
