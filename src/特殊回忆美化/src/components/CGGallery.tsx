import { Lock } from 'lucide-react';

export default function CGGallery() {
  // Mock data for CGs
  const cgs = [
    { id: 1, unlocked: true, url: 'https://picsum.photos/seed/cg1/800/600' },
    { id: 2, unlocked: true, url: 'https://picsum.photos/seed/cg2/800/600' },
    { id: 3, unlocked: false },
    { id: 4, unlocked: false },
    { id: 5, unlocked: false },
    { id: 6, unlocked: false },
  ];

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-2xl text-amber-200 tracking-widest font-serif">画廊回忆</h2>
        <span className="text-stone-400 text-sm tracking-widest">2 / 6</span>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {cgs.map(cg => (
            <div
              key={cg.id}
              className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-300 ${
                cg.unlocked
                  ? 'border-amber-900/50 hover:border-amber-400/80 cursor-pointer hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] group'
                  : 'border-white/5 bg-black/40'
              }`}
            >
              {cg.unlocked ? (
                <>
                  <img
                    src={cg.url}
                    alt={`CG ${cg.id}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-stone-600">
                  <Lock size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
