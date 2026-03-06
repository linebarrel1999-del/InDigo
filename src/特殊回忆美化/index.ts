import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import './src/index.css';

$(() => {
  const container = document.getElementById('app');
  if (!container) {
    console.error('未找到 #app 容器');
    return;
  }
  (container as HTMLElement).style.minHeight = '280px';
  (container as HTMLElement).style.backgroundColor = '#0f0d0b';

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fontsapi.zeoseven.com/88/main/result.css';
  link.onerror = () => {};
  document.head.appendChild(link);

  try {
    const root = createRoot(container);
    root.render(React.createElement(StrictMode, null, React.createElement(App)));
    $(window).on('pagehide', () => {
      root.unmount();
    });
  } catch (err) {
    console.error('特殊回忆美化加载失败', err);
    container.innerHTML = `<div style="padding:1rem;color:#fbbf24;font-family:sans-serif;font-size:14px;">界面加载异常：${String((err as Error).message)}</div>`;
  }
});

