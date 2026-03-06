import { Maximize, Minimize } from 'lucide-react';
import { Component, useEffect, useRef, useState } from 'react';
import GameInterface from './components/GameInterface';
import LandingView from './components/LandingView';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('界面渲染错误', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="flex flex-col items-center justify-center w-full h-full min-h-[320px] p-8 text-center border-2 border-amber-400 rounded-lg"
          style={{ color: '#e7e5e4', minHeight: '320px', backgroundColor: '#292524' }}
        >
          <p className="font-serif text-lg mb-2" style={{ color: '#fcd34d' }}>界面加载异常</p>
          <p className="text-sm max-w-md font-mono" style={{ color: '#a8a29e' }}>{String(this.state.error.message)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden text-stone-100 selection:bg-amber-500/30 ${!entered ? 'memory-landing-root' : ''}`}
      style={{ minHeight: '280px', backgroundColor: '#0f0d0b' }}
    >
      <ErrorBoundary>
        {!entered ? (
          <LandingView onEnter={() => setEntered(true)} />
        ) : (
          <>
            <GameInterface onExit={() => setEntered(false)} />
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-6 right-6 z-50 p-3 rounded-full bg-black/30 hover:bg-black/60 text-stone-400 hover:text-amber-200 transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-amber-500/30 shadow-lg"
              title={isFullscreen ? '退出全屏' : '全屏'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
