<template>
  <div class="status-bar">
    <div class="flip-viewport">
      <div class="flip-inner" :class="{ flipped: currentPage === 2 }">
        <!-- 第 1 页：上半配图区留空，痕迹与回音在下半，痕迹展开向下；背景为渐变环+玻璃珠 -->
        <div class="flip-face flip-front">
          <div class="page-one-bg" aria-hidden="true">
            <span v-for="i in 5" :key="i" class="page-one-ring" :style="{ '--ring-i': i }"></span>
            <span v-for="j in 6" :key="'p-' + j" class="page-one-pearl" :style="{ '--pearl-j': j }"></span>
          </div>
          <div class="ciel-board">
            <div class="page-one-image-area" aria-label="第一页配图区">
              <img
                :src="data.希露的花珀?.阶段 === '嫩芽' ? 'https://i.postimg.cc/TPn4jtbF/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_1379012392_upscal.png' : data.希露的花珀?.阶段 === '伴花' ? 'https://i.postimg.cc/tTZHH3nX/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_326266859_upscale.png' : data.希露的花珀?.阶段 === '含苞' ? 'https://i.postimg.cc/Vvm4F1wd/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_597142170_upscale.png' : data.希露的花珀?.阶段 === '花开' ? 'https://i.postimg.cc/D0wLZzF0/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_1626345664_upscal.png' : 'https://files.catbox.moe/vvlk8g.png'"
                alt=""
              />
            </div>
            <div class="page-one-lower">
              <div class="env-header">
                <div class="location-tag">
                  <span class="icon icon-pin" aria-hidden="true"></span>
                  {{ data.地点 }}
                </div>
                <div class="time-tag">
                  {{ data.日期.纪元 }} · {{ data.日期.季节 }} 第 {{ data.日期.日 }} 日 · {{ data.时间 }}
                </div>
              </div>

              <div class="traces-section">
                <button
                  type="button"
                  class="traces-summary"
                  :aria-expanded="tracesOpen"
                  @click="tracesOpen = !tracesOpen"
                >
                  <span class="traces-summary-icon" :class="{ open: tracesOpen }" aria-hidden="true"></span>
                  希露的痕迹 ({{ traceCount }})
                </button>
                <div class="traces-collapse" :class="{ open: tracesOpen }">
                  <div class="traces-collapse-inner">
                    <ul class="traces-list">
                      <li
                        v-for="(entry, name) in data.希露的痕迹"
                        :key="name"
                        class="trace-box"
                        :data-type="entry.类型"
                        @click="openTrace(name)"
                      >
                        <span class="trace-box-name">{{ name }}</span>
                      </li>
                      <li v-if="traceCount === 0" class="trace-empty">暂无痕迹</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="echo-box">
              <div class="echo-title"><span class="echo-icon" aria-hidden="true"></span> 希露的回音</div>
              <div class="echo-content">{{ data.希露的回音 }}</div>
              </div>
            </div>
          </div>
          <p class="page-one-footer-quote">愿我化作你脚下的温度，伴你走过余生的道路​。</p>

          <div
            v-if="activeTraceEntry"
            class="trace-modal-backdrop"
            :class="{ closing: isTraceClosing }"
            @click.self="closeTrace"
          >
            <div class="trace-modal" :class="{ closing: isTraceClosing }">
              <header class="trace-modal-header">
                <div class="trace-modal-title">
                  <span class="trace-modal-type">{{ activeTraceEntry.类型 }}</span>
                </div>
                <button type="button" class="trace-modal-close" @click="closeTrace">
                  ×
                </button>
              </header>
              <div class="trace-modal-body">
                <p class="trace-desc">
                  <span class="trace-prefix">描述</span>
                  {{ activeTraceEntry.描述 }}
                </p>
                <p v-if="activeTraceEntry.希露的回忆" class="trace-memory">
                  <span class="trace-prefix">希露的心声</span>
                  {{ activeTraceEntry.希露的回忆 }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 第 2 页：上半配图区留空，琥珀与阶段信息在下半 -->
        <div class="flip-face flip-back">
          <div class="sky-bg" aria-hidden="true">
            <div class="cloud cloud-1"></div>
            <div class="cloud cloud-2"></div>
            <div class="cloud cloud-3"></div>
            <div class="cloud cloud-4"></div>
            <div class="cloud cloud-5"></div>
          </div>
          <div class="page-two-content">
            <div class="page-two-image-area" aria-label="第二页配图区">
            <img
              v-if="data.希露的花珀?.阶段 === '嫩芽'"
              src="https://i.postimg.cc/XN8sYSjY/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_3937272333_upscal.png"
              alt=""
            />
            <img
              v-else-if="data.希露的花珀?.阶段 === '伴花'"
              src="https://i.postimg.cc/L6qg0wsm/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_3057624629_upscal.png"
              alt=""
            />
            <img
              v-else-if="data.希露的花珀?.阶段 === '含苞'"
              src="https://i.postimg.cc/RhJCXrLg/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_596394247_upscale.png"
              alt=""
            />
            <img
              v-else-if="data.希露的花珀?.阶段 === '花开'"
              src="https://i.postimg.cc/Zqg53Kr6/2_0_artist_channel_(caststation)_1_5_artist_cogecha_1_3_artist_chocoan_s_663341542_upscale.png"
              alt=""
            />
            </div>
            <div class="page-two-lower">
            <div class="amber-showcase" :class="stageClass">
              <div class="amber-showcase-deco" aria-hidden="true">
                <span v-for="i in 8" :key="i" class="deco-orb" :style="{ '--deco-i': i }"></span>
                <span class="deco-blob deco-blob--l"></span>
                <span class="deco-blob deco-blob--r"></span>
                <span class="deco-blob deco-blob--t"></span>
              </div>
              <template v-if="data.希露的花珀?.阶段 === '花开'">
                <div class="bloom-daisy-wrap">
                  <div class="daisy-core">
                    <div
                      v-for="n in 12"
                      :key="n"
                      class="petal"
                      :style="{ '--angle': `${(n - 1) * 30}deg` }"
                    ></div>
                    <div class="stigma"></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="amber-glow"></div>
                <div class="amber-glass">
                  <div class="daisy-core">
                    <div
                      v-for="n in 12"
                      :key="n"
                      class="petal"
                      :style="{ '--angle': `${(n - 1) * 30}deg` }"
                    ></div>
                    <div class="stigma"></div>
                  </div>
                </div>
              </template>
              <div class="stage-info">
                <div class="stage-name"><span class="stage-icon" aria-hidden="true"></span> {{ data.希露的花珀.阶段 }}</div>
                <div class="petal-count">{{ petalsLabel }}：{{ data.追忆瓣 }} / 3</div>
              </div>
            </div>
            <section class="current-stage-section">
              <h2 class="page-two-title">希露的花珀</h2>
              <div class="stage-badge" :data-stage="data.希露的花珀.阶段">
                {{ data.希露的花珀.阶段 }}
              </div>
              <p class="amber-desc">{{ data.希露的花珀.描述 }}</p>
            </section>
            </div>
          </div>
          <p class="page-two-footer-quote">愿你每一次想起我时，思念有处可诉。</p>
        </div>
      </div>
      <button
        type="button"
        :class="['diary-turn-btn', currentPage === 1 ? 'is-forward' : 'is-back']"
        :aria-label="currentPage === 1 ? '翻至花珀与追忆瓣' : '翻回概况'"
        @click="togglePage"
      >
        <span class="diary-btn-book">
          <span class="diary-page diary-left"></span>
          <span class="diary-spine"></span>
          <span class="diary-page diary-right"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Schema } from './schema';
import { useDataStore } from './store';

const store = useDataStore();
const data = computed(() => store.data as Schema);

const currentPage = ref<1 | 2>(1);
const tracesOpen = ref(true);
const activeTraceName = ref<string | null>(null);
const isTraceClosing = ref(false);

const activeTraceEntry = computed(() => {
  if (!activeTraceName.value || isTraceClosing.value) return null;
  const entry = (store.data as Schema).希露的痕迹?.[activeTraceName.value];
  return entry ?? null;
});
const petalsLabel = computed(() =>
  (store.data as Schema).追忆瓣 >= 3 ? '恋花' : '追忆瓣',
);

const traceCount = computed(
  () => Object.keys((store.data as Schema).希露的痕迹 || {}).length,
);

const stageClass = computed(() => {
  const stage = (store.data as Schema).希露的花珀?.阶段 || '嫩芽';
  return {
    'stage-0': stage === '嫩芽',
    'stage-1': stage === '伴花',
    'stage-2': stage === '含苞',
    'stage-3': stage === '花开',
  };
});

function togglePage() {
  currentPage.value = currentPage.value === 1 ? 2 : 1;
}

function openTrace(name: string) {
  activeTraceName.value = name;
}

function closeTrace() {
  if (!activeTraceName.value || isTraceClosing.value) return;
  isTraceClosing.value = true;
  setTimeout(() => {
    activeTraceName.value = null;
    isTraceClosing.value = false;
  }, 180);
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

.status-bar {
  font-family: 'Outfit', 'NaikaiFont', 'Microsoft YaHei', sans-serif;
  font-weight: 500;
  font-size: 15px;
  width: 100%;
  min-height: 0;
  overflow: visible;
  position: relative;
  background: radial-gradient(
    ellipse 120% 100% at 50% 0%,
    hsla(218, 45%, 92%, 0.4) 0%,
    hsla(225, 38%, 88%, 0.15) 45%,
    transparent 70%
  );
  color: hsl(218, 28%, 28%);
  aspect-ratio: 4 / 5.5;
  min-height: 360px;
}

/* 图标：定位钉 */
.icon-pin {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 4px;
  vertical-align: -0.2em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='hsl(208,72%25,52%25)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E") no-repeat center / contain;
}

/* 回音标题图标：双引号/声波 */
.echo-icon {
  display: inline-block;
  width: 1.1em;
  height: 1em;
  margin-right: 6px;
  vertical-align: -0.15em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='hsl(208,72%25,48%25)' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='M7 10c0-2 1.5-4 4-4s4 2 4 4v6c0 2-1.5 4-4 4s-4-2-4-4v-6z'/%3E%3Cpath d='M17 10c0-2 1.5-4 4-4s4 2 4 4v6c0 2-1.5 4-4 4s-4-2-4-4v-6z'/%3E%3C/svg%3E") no-repeat center / contain;
}

/* 阶段名称图标：小花 */
.stage-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 4px;
  vertical-align: -0.15em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='hsl(38,92%25,58%25)'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='12' cy='6' r='2' fill='rgba(255,255,255,.9)'/%3E%3Ccircle cx='18' cy='10' r='2' fill='rgba(255,255,255,.9)'/%3E%3Ccircle cx='18' cy='14' r='2' fill='rgba(255,255,255,.9)'/%3E%3Ccircle cx='12' cy='18' r='2' fill='rgba(255,255,255,.9)'/%3E%3Ccircle cx='6' cy='14' r='2' fill='rgba(255,255,255,.9)'/%3E%3Ccircle cx='6' cy='10' r='2' fill='rgba(255,255,255,.9)'/%3E%3C/svg%3E") no-repeat center / contain;
}

/* 痕迹展开箭头：chevron */
.traces-summary-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='hsl(218,28%25,38%25)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'/%3E%3C/svg%3E") no-repeat center / contain;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.traces-summary-icon.open {
  transform: rotate(90deg);
}

/* 翻页容器：玻璃拟态外框 + 渐变光晕 */
.flip-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 28px;
  perspective: 1200px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.5),
    0 0 60px -12px hsla(218, 60%, 60%, 0.25),
    0 24px 56px -16px rgba(25, 40, 65, 0.35);
  transition: box-shadow 0.4s ease;
}

.flip-viewport:hover {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.6),
    0 0 80px -8px hsla(218, 55%, 55%, 0.3),
    0 28px 64px -14px rgba(25, 40, 65, 0.4);
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.flip-inner.flipped {
  transform: rotateY(-180deg);
}

.flip-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: linear-gradient(
    165deg,
    hsl(212, 48%, 94%) 0%,
    hsl(218, 42%, 90%) 28%,
    hsl(222, 38%, 88%) 55%,
    hsl(228, 35%, 90%) 78%,
    hsl(235, 32%, 92%) 100%
  );
  padding: 20px 20px 12px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 28px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 20px 48px -12px rgba(28, 45, 72, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.flip-face::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 90% 70% at 50% 15%,
    hsla(218, 50%, 96%, 0.45) 0%,
    hsla(232, 40%, 92%, 0.15) 50%,
    transparent 75%
  );
  pointer-events: none;
  animation: flip-face-glow 12s ease-in-out infinite;
}

@keyframes flip-face-glow {
  0%, 100% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.08) translateY(-2%); opacity: 0.85; }
}

.flip-face.flip-back {
  padding-bottom: 18px;
}

/* 第一页背景：渐变环 + 玻璃珠，与第二页云朵/花珀装饰区分 */
.page-one-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.page-one-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  background: none;
  box-sizing: border-box;
  animation: page-one-ring-spin 25s linear infinite;
  animation-delay: calc(var(--ring-i, 1) * -4s);
}

.page-one-ring:nth-child(1) {
  width: 140px;
  height: 140px;
  left: -8%;
  top: 5%;
  border-color: hsla(218, 45%, 78%, 0.35);
  box-shadow: 0 0 20px -4px hsla(218, 50%, 70%, 0.2);
}

.page-one-ring:nth-child(2) {
  width: 100px;
  height: 100px;
  right: -5%;
  top: 25%;
  border-color: hsla(252, 40%, 82%, 0.3);
  box-shadow: 0 0 16px -4px hsla(252, 45%, 75%, 0.18);
}

.page-one-ring:nth-child(3) {
  width: 80px;
  height: 80px;
  left: 15%;
  bottom: 30%;
  border-color: hsla(198, 50%, 80%, 0.28);
  box-shadow: 0 0 12px -2px hsla(198, 55%, 72%, 0.15);
}

.page-one-ring:nth-child(4) {
  width: 120px;
  height: 120px;
  right: 10%;
  bottom: 8%;
  border-color: hsla(228, 42%, 80%, 0.32);
  box-shadow: 0 0 18px -4px hsla(228, 48%, 72%, 0.18);
}

.page-one-ring:nth-child(5) {
  width: 60px;
  height: 60px;
  left: 50%;
  top: 15%;
  margin-left: -30px;
  border-color: hsla(265, 38%, 85%, 0.25);
  box-shadow: 0 0 10px -2px hsla(265, 42%, 78%, 0.12);
}

@keyframes page-one-ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.flip-front:hover .page-one-ring {
  border-color: hsla(218, 48%, 75%, 0.45);
  box-shadow: 0 0 24px -4px hsla(218, 50%, 68%, 0.28);
}

.page-one-pearl {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    hsla(0, 0%, 100%, 0.9),
    hsla(218, 35%, 88%, 0.4)
  );
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.6),
    0 4px 16px -4px rgba(28, 45, 72, 0.2);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: page-one-pearl-float 8s ease-in-out infinite;
  animation-delay: calc(var(--pearl-j, 1) * -1.2s);
}

.page-one-pearl:nth-child(6) { left: 8%; top: 18%; width: 20px; height: 20px; }
.page-one-pearl:nth-child(7) { right: 12%; top: 12%; width: 14px; height: 14px; }
.page-one-pearl:nth-child(8) { left: 22%; top: 55%; width: 16px; height: 16px; }
.page-one-pearl:nth-child(9) { right: 18%; top: 48%; width: 22px; height: 22px; }
.page-one-pearl:nth-child(10) { left: 12%; bottom: 22%; width: 12px; height: 12px; }
.page-one-pearl:nth-child(11) { right: 8%; bottom: 28%; width: 18px; height: 18px; }

@keyframes page-one-pearl-float {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
  50% { transform: translate(-5px, 4px) scale(1.05); opacity: 1; }
}

.flip-front:hover .page-one-pearl {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.75),
    0 6px 22px -4px rgba(28, 45, 72, 0.28);
}

/* 第二页：天空底色上的漂浮云朵层 */
.sky-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  filter: blur(2px);
  animation: cloud-float 28s ease-in-out infinite;
}

.cloud-1 {
  width: 70px;
  height: 32px;
  top: 8%;
  left: 10%;
  box-shadow: 28px 0 0 -8px rgba(255, 255, 255, 0.75), 14px -8px 0 -4px rgba(255, 255, 255, 0.7);
  animation-delay: 0s;
}

.cloud-2 {
  width: 55px;
  height: 26px;
  top: 25%;
  right: 15%;
  box-shadow: 22px 0 0 -6px rgba(255, 255, 255, 0.7), 11px -6px 0 -3px rgba(255, 255, 255, 0.65);
  animation-delay: -6s;
}

.cloud-3 {
  width: 60px;
  height: 28px;
  bottom: 35%;
  left: 25%;
  box-shadow: 24px 0 0 -7px rgba(255, 255, 255, 0.7), 12px -7px 0 -3px rgba(255, 255, 255, 0.65);
  animation-delay: -12s;
}

.cloud-4 {
  width: 48px;
  height: 22px;
  bottom: 20%;
  right: 25%;
  box-shadow: 20px 0 0 -5px rgba(255, 255, 255, 0.7);
  animation-delay: -18s;
}

.cloud-5 {
  width: 52px;
  height: 24px;
  top: 40%;
  left: 55%;
  box-shadow: 21px 0 0 -6px rgba(255, 255, 255, 0.65), 10px -5px 0 -2px rgba(255, 255, 255, 0.6);
  animation-delay: -3s;
}

@keyframes cloud-float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(6px, -4px); }
  50% { transform: translate(-4px, 3px); }
  75% { transform: translate(3px, 5px); }
}

.flip-front {
  z-index: 2;
}

.flip-back {
  transform: rotateY(180deg);
  z-index: 1;
}

.page-two-content {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  color: hsl(218, 28%, 28%);
  font-family: inherit;
  scrollbar-width: none;
  -ms-overflow-style: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
}

/* 第二页上半：19:13 配图区，底部白色渐变衔接下方内容，圆角 */
.page-two-image-area {
  position: relative;
  width: 100%;
  aspect-ratio: 19 / 13;
  flex: 0 0 auto;
  min-height: 0;
  overflow: hidden;
  background: transparent;
  display: block;
  border-radius: 20px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.35),
    0 20px 50px -16px rgba(30, 58, 95, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    vertical-align: middle;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover img {
    transform: scale(1.03);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 65%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      hsla(208, 58%, 92%, 0.2) 25%,
      hsla(212, 52%, 88%, 0.55) 55%,
      hsl(215, 48%, 94%) 100%
    );
    pointer-events: none;
  }
}

.page-two-lower {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 8px;
  margin: 0 -4px 0;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 8px 32px rgba(30, 58, 95, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.35s ease, transform 0.25s ease;
  box-sizing: border-box;
  max-width: 100%;
}

.page-two-lower:hover {
  box-shadow:
    0 12px 40px rgba(30, 58, 95, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.page-two-content .page-two-title {
  font-size: 20px;
  font-weight: 700;
  font-family: inherit;
  color: hsl(218, 28%, 28%);
  margin: 0 0 8px;
  padding-bottom: 6px;
  border-bottom: 2px solid hsla(38, 85%, 55%, 0.45);
  letter-spacing: 0.02em;
  transition: filter 0.25s ease;
}


.page-two-title {
  font-size: 20px;
  font-weight: 700;
  color: hsl(218, 28%, 28%);
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  letter-spacing: 0.02em;
}

/* 第 1 页：ciel-board 琥珀与痕迹统计，可滚动，底部留给 footer 小字 */
.ciel-board {
  position: relative;
  z-index: 1;
  max-width: 100%;
  padding: 0 4px;
  color: hsl(218, 28%, 28%);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 第一页上半：19:13 配图区，可放 19:13 图片；底部渐变衔接文字，悬停放大，圆角 */
.page-one-image-area {
  position: relative;
  width: 100%;
  aspect-ratio: 19 / 13;
  flex: 0 0 auto;
  min-height: 0;
  overflow: hidden;
  background: transparent;
  display: block;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    vertical-align: middle;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover img {
    transform: scale(1.03);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 65%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      hsla(208, 58%, 92%, 0.2) 25%,
      hsla(212, 52%, 88%, 0.55) 55%,
      hsl(215, 48%, 94%) 100%
    );
    pointer-events: none;
  }
}

.page-one-lower {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.env-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: hsl(218, 22%, 42%);
  margin-bottom: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.52);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 4px 16px rgba(30, 58, 95, 0.06);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.env-header:hover {
  box-shadow: 0 8px 24px rgba(30, 58, 95, 0.08);
}

.location-tag .icon {
  flex-shrink: 0;
}

.amber-showcase {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 22px;
  transition: transform 0.3s ease;
}

.amber-showcase:hover {
  transform: translateY(-2px);
}

/* 花珀周围装饰：浮动光点 + 玻璃拟态色块，填充空白 */
.amber-showcase-deco {
  position: absolute;
  inset: -20%;
  z-index: 0;
  pointer-events: none;
}

.deco-orb {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    hsla(38, 85%, 75%, 0.9),
    hsla(42, 75%, 58%, 0.5)
  );
  box-shadow: 0 0 12px hsla(38, 90%, 60%, 0.4);
  animation: deco-orb-float 6s ease-in-out infinite;
  animation-delay: calc(var(--deco-i, 1) * -0.7s);
}

.deco-orb:nth-child(1) { left: 12%; top: 25%; }
.deco-orb:nth-child(2) { left: 8%; top: 55%; }
.deco-orb:nth-child(3) { left: 22%; top: 12%; }
.deco-orb:nth-child(4) { right: 18%; top: 20%; }
.deco-orb:nth-child(5) { right: 10%; top: 50%; }
.deco-orb:nth-child(6) { right: 24%; top: 70%; }
.deco-orb:nth-child(7) { left: 15%; top: 78%; }
.deco-orb:nth-child(8) { right: 14%; top: 35%; }

@keyframes deco-orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
  33% { transform: translate(4px, -5px) scale(1.1); opacity: 1; }
  66% { transform: translate(-3px, 3px) scale(0.95); opacity: 0.9; }
}

.amber-showcase:hover .deco-orb {
  box-shadow: 0 0 18px hsla(38, 90%, 62%, 0.55);
}

.deco-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(28px);
  opacity: 0.5;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.deco-blob--l {
  left: -5%;
  top: 35%;
  width: 72px;
  height: 72px;
  background: radial-gradient(
    circle at 40% 40%,
    hsla(268, 55%, 88%, 0.6),
    hsla(252, 45%, 78%, 0.25)
  );
  animation: deco-blob-drift 10s ease-in-out infinite;
}

.deco-blob--r {
  right: -8%;
  top: 40%;
  width: 64px;
  height: 64px;
  background: radial-gradient(
    circle at 50% 50%,
    hsla(152, 50%, 85%, 0.5),
    hsla(168, 45%, 75%, 0.2)
  );
  animation: deco-blob-drift 12s ease-in-out infinite 1.5s;
}

.deco-blob--t {
  left: 50%;
  top: -15%;
  width: 56px;
  height: 56px;
  margin-left: -28px;
  background: radial-gradient(
    circle at 50% 50%,
    hsla(38, 75%, 90%, 0.45),
    hsla(45, 65%, 80%, 0.2)
  );
  animation: deco-blob-drift 9s ease-in-out infinite 0.8s;
}

@keyframes deco-blob-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(6px, -4px) scale(1.08); }
}

.amber-showcase:hover .deco-blob {
  opacity: 0.65;
}

.amber-glow {
  position: absolute;
  top: 5%;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle at 50% 50%,
    hsla(38, 95%, 65%, 0.45) 0%,
    hsla(42, 90%, 58%, 0.2) 40%,
    transparent 72%
  );
  z-index: 1;
  animation: amber-glow-pulse 4s ease-in-out infinite;
}

@keyframes amber-glow-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.08); }
}

.amber-glass {
  position: relative;
  width: 128px;
  height: 148px;
  background: linear-gradient(
      145deg,
      hsla(45, 75%, 92%, 0.9) 0%,
      hsla(38, 78%, 82%, 0.75) 35%,
      hsla(35, 72%, 68%, 0.6) 70%,
      hsla(32, 65%, 52%, 0.4) 100%
    ),
    radial-gradient(
      ellipse at 35% 25%,
      hsla(50, 100%, 95%, 0.95),
      transparent 55%
    );
  border-radius: 50% 50% 48% 52% / 58% 62% 38% 42%;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.6),
    0 0 40px -8px hsla(38, 90%, 55%, 0.4),
    0 12px 32px -8px rgba(30, 25, 15, 0.35),
    inset 0 2px 12px rgba(255, 255, 255, 0.5),
    inset -3px -6px 16px hsla(30, 60%, 35%, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid rgba(255, 248, 220, 0.65);
  z-index: 2;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.amber-glass:hover {
  transform: scale(1.04);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.7),
    0 0 56px -6px hsla(38, 92%, 58%, 0.5),
    0 16px 44px -8px rgba(30, 25, 15, 0.4),
    inset 0 2px 14px rgba(255, 255, 255, 0.55),
    inset -3px -6px 18px hsla(30, 60%, 35%, 0.22);
}

/* 花开阶段：琥珀消失，仅保留盛开花瓣 */
.bloom-daisy-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  filter: drop-shadow(0 10px 28px rgba(30, 25, 15, 0.22));
}

.amber-showcase.stage-3 .bloom-daisy-wrap .daisy-core {
  transform: scale(2);
}

.amber-showcase.stage-3 .bloom-daisy-wrap .petal {
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.08),
    0 0 14px -2px hsla(38, 90%, 70%, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.6);
}

.daisy-core {
  position: relative;
  width: 24px;
  height: 24px;
  animation: daisy-float 5s ease-in-out infinite;
}

@keyframes daisy-float {
  0%, 100% { transform: rotate(0deg) scale(1); }
  33% { transform: rotate(-2deg) scale(1.02); }
  66% { transform: rotate(2deg) scale(0.98); }
}

.stigma {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 35% 35%,
    hsl(48, 95%, 62%),
    hsl(42, 88%, 48%) 60%,
    hsl(38, 82%, 42%) 100%
  );
  border-radius: 50%;
  box-shadow:
    inset 0 1px 4px hsla(50, 100%, 90%, 0.6),
    inset 0 -2px 6px hsla(30, 70%, 25%, 0.4),
    0 2px 8px hsla(38, 80%, 40%, 0.35);
  z-index: 10;
  border: 1px solid hsla(48, 90%, 70%, 0.5);
}

.petal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 34px;
  height: 11px;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.98) 0%,
    hsla(45, 40%, 96%, 0.95) 50%,
    hsla(38, 35%, 92%, 0.9) 100%
  );
  border-radius: 12px 50% 50% 12px;
  transform-origin: 0% 50%;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 1.2s ease, box-shadow 1s ease;
}

.amber-glass:hover .petal {
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.08),
    0 0 12px -2px hsla(38, 90%, 70%, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.6);
}

.stage-0 .petal {
  opacity: 0.2;
  transform: rotate(var(--angle)) scale(0.3) translateX(4px);
}
.stage-1 .petal {
  opacity: 0.6;
  transform: rotate(var(--angle)) scale(0.6) translateX(6px);
}
.stage-2 .petal {
  opacity: 0.85;
  transform: rotate(var(--angle)) scale(0.8) translateX(8px);
}
.stage-3 .petal {
  opacity: 1;
  transform: rotate(var(--angle)) scale(1) translateX(10px);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.75);
}

.stage-info {
  text-align: center;
  margin-top: 14px;
  font-family: inherit;
}

.stage-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, hsl(36, 88%, 42%) 0%, hsl(38, 82%, 52%) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: filter 0.25s ease;
}

.amber-showcase:hover .stage-name {
  filter: brightness(1.1);
}

.petal-count {
  font-size: 13px;
  font-weight: 600;
  color: hsl(218, 24%, 38%);
  margin-top: 6px;
  letter-spacing: 0.02em;
}

.traces-section {
  padding: 6px 0;
  margin-bottom: 12px;
}

.traces-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  color: hsl(218, 28%, 28%);
  text-align: left;
  user-select: none;
  transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
}
.traces-summary:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 4px 16px rgba(30, 58, 95, 0.08);
}
.traces-summary:active {
  transform: scale(0.99);
}

.traces-collapse {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.traces-collapse.open {
  max-height: 320px;
}

.traces-collapse-inner {
  /* 仅作包裹，便于后续若改用 grid 展开 */
}

.traces-list {
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.trace-box {
  min-height: 40px;
  padding: 6px 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 12px rgba(30, 58, 95, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.2s ease;

  &[data-type='关键'] {
    border-color: rgba(59, 130, 246, 0.35);
    background: rgba(219, 234, 254, 0.55);
    box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
  }

  &[data-type='花语'] {
    border-color: rgba(192, 132, 252, 0.35);
    background: rgba(237, 233, 254, 0.5);
    box-shadow: 0 2px 12px rgba(192, 132, 252, 0.06);
  }
}

.trace-box:hover {
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 28px rgba(30, 58, 95, 0.12);
  border-color: rgba(255, 255, 255, 0.9);
}
.trace-box:active {
  transform: translateY(-1px) scale(0.98);
}

.trace-box-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  text-align: left;
  transition: background 0.2s ease;
}

.trace-box-header:hover {
  background: rgba(255, 255, 255, 0.4);
}

.trace-box-name {
  font-weight: 600;
  color: hsl(218, 28%, 28%);
  font-size: 13px;
  word-break: break-all;
}

.trace-modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  animation: trace-backdrop-in 0.22s ease-out forwards;
}

.trace-modal-backdrop.closing {
  animation: trace-backdrop-out 0.18s ease-in forwards;
}

.trace-modal {
  max-width: 520px;
  width: 95%;
  max-height: 86%;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 25px 50px -12px rgba(30, 58, 95, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: center;
  animation: trace-modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.trace-modal.closing {
  animation: trace-modal-out 0.18s ease-in forwards;
}

.trace-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: linear-gradient(135deg, rgba(219, 234, 254, 0.6) 0%, rgba(224, 242, 254, 0.5) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}

.trace-modal-title {
  display: flex;
  flex-direction: column;
}

.trace-modal-name {
  font-weight: 700;
  font-size: 15px;
  color: #3d3529;
}

.trace-modal-type {
  font-size: 13px;
  font-weight: 600;
  color: hsl(218, 22%, 42%);
}

.trace-modal-close {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  color: hsl(218, 22%, 42%);
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}
.trace-modal-close:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}
.trace-modal-close:active {
  transform: scale(0.95);
}

.trace-modal-body {
  padding: 14px 18px 18px;
  overflow-y: auto;
}

@keyframes trace-modal-in {
  from {
    transform: scale(0.92) translateY(16px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes trace-modal-out {
  from {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  to {
    transform: scale(0.9) translateY(10px);
    opacity: 0;
  }
}

@keyframes trace-backdrop-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes trace-backdrop-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.trace-prefix {
  font-weight: 600;
  color: hsl(208, 55%, 38%);
  margin-right: 4px;
}

.trace-desc,
.trace-memory {
  margin: 6px 0 0;
  font-size: 14px;
  color: hsl(218, 26%, 32%);
  line-height: 1.6;
}

.trace-memory {
  color: hsl(218, 24%, 40%);
}

.trace-empty {
  padding: 10px 12px;
  color: hsl(218, 20%, 48%);
  font-size: 14px;
}

.echo-box {
  margin-top: auto;
  margin-bottom: 60px;
  padding: 14px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 24px rgba(30, 58, 95, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-left: 4px solid hsl(208, 72%, 52%);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.echo-box:hover {
  box-shadow: 0 8px 32px rgba(30, 58, 95, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
.echo-title {
  font-size: 15px;
  font-weight: 700;
  color: hsl(208, 65%, 42%);
  margin-bottom: 6px;
  letter-spacing: 0.02em;
}
.echo-content {
  font-size: 15px;
  line-height: 1.6;
  color: hsl(218, 26%, 32%);
}

/* 第一页、第二页底部固定小字，贴到最底端 */
.page-one-footer-quote,
.page-two-footer-quote {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  color: hsl(218, 20%, 48%);
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1.5;
  margin: 0;
  pointer-events: none;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
  box-sizing: border-box;
}

/* 第 2 页：琥珀在上方 + 当前阶段信息，文字块贴底 */
.page-two-content .amber-showcase {
  flex: 0 0 auto;
  margin-top: 56px;
  margin-bottom: 12px;
}

.current-stage-section {
  margin-top: auto;
  padding: 4px 0 0;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.current-stage-section .stage-badge {
  display: inline-block;
  padding: 6px 16px;
  margin-bottom: 8px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 0.03em;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 4px 14px -4px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 0.25s ease, box-shadow 0.3s ease;

  &[data-stage='嫩芽'] {
    background: linear-gradient(135deg, hsla(152, 55%, 92%, 0.9) 0%, hsla(152, 48%, 82%, 0.85) 100%);
    color: hsl(152, 42%, 26%);
  }
  &[data-stage='伴花'] {
    background: linear-gradient(135deg, hsla(45, 88%, 94%, 0.95) 0%, hsla(42, 85%, 78%, 0.9) 100%);
    color: hsl(36, 68%, 30%);
  }
  &[data-stage='含苞'] {
    background: linear-gradient(135deg, hsla(270, 55%, 94%, 0.9) 0%, hsla(268, 50%, 85%, 0.88) 100%);
    color: hsl(268, 42%, 32%);
  }
  &[data-stage='花开'] {
    background: linear-gradient(135deg, hsla(330, 70%, 95%, 0.95) 0%, hsla(328, 65%, 88%, 0.9) 100%);
    color: hsl(328, 52%, 36%);
  }
}

.current-stage-section .stage-badge:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 8px 24px -6px rgba(0, 0, 0, 0.18);
}

.current-stage-section .stage-badge:active {
  transform: translateY(0) scale(0.98);
}

.page-two-content .amber-desc {
  margin: 0 0 0;
  font-size: 16px;
  font-family: inherit;
  color: hsl(218, 26%, 30%);
  line-height: 1.55;
  letter-spacing: 0.01em;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
  box-sizing: border-box;
}

.page-two-lower:hover .amber-desc {
  color: hsl(218, 28%, 26%);
}

.petals-current {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: hsl(218, 28%, 28%);

  .big-num {
    color: hsl(32, 88%, 42%);
  }
}

/* 右下角小日记本翻页按钮：高端玻璃拟态 + 方向态样式 */
.diary-turn-btn {
  position: absolute;
  right: 16px;
  bottom: 14px;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  background: radial-gradient(circle at 30% 20%, hsla(210, 90%, 78%, 0.98) 0, hsla(217, 92%, 62%, 0.96) 35%, hsla(255, 72%, 42%, 0.98) 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.24),
    0 12px 32px rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 14px rgba(15, 23, 42, 0.45));
  transform-origin: center;
  transition:
    transform 0.22s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease,
    background 0.3s ease,
    opacity 0.2s ease;
  font-family: 'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: inherit;
}

.diary-turn-btn::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: inherit;
  background: conic-gradient(
    from 180deg,
    hsla(210, 100%, 85%, 0.14),
    hsla(280, 100%, 75%, 0.36),
    hsla(190, 100%, 75%, 0.18),
    hsla(210, 100%, 85%, 0.14)
  );
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  pointer-events: none;
}

.diary-turn-btn::after {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: inherit;
  background: radial-gradient(circle at 30% 15%, hsla(0, 0%, 100%, 0.55), transparent 60%);
  mix-blend-mode: screen;
  opacity: 0.85;
  pointer-events: none;
}

.diary-turn-btn.is-forward {
  background: radial-gradient(circle at 28% 18%, hsla(205, 95%, 80%, 0.98) 0, hsla(215, 92%, 64%, 0.96) 36%, hsla(37, 90%, 55%, 0.98) 100%);
}

.diary-turn-btn.is-back {
  background: radial-gradient(circle at 72% 18%, hsla(190, 92%, 78%, 0.98) 0, hsla(218, 86%, 66%, 0.96) 35%, hsla(262, 78%, 62%, 0.98) 100%);
}

.diary-turn-btn:hover {
  transform: translateY(-2px) scale(1.06);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.3),
    0 16px 40px rgba(15, 23, 42, 0.7);
  filter: drop-shadow(0 8px 22px rgba(15, 23, 42, 0.65));
}

.diary-turn-btn:hover::before {
  opacity: 1;
  transform: scale(1);
}

.diary-turn-btn:active {
  transform: translateY(0) scale(0.96);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.26),
    0 8px 22px rgba(15, 23, 42, 0.6) inset;
}

.diary-turn-btn:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px hsla(210, 100%, 96%, 0.9),
    0 0 0 4px hsla(212, 95%, 68%, 0.85),
    0 18px 42px rgba(15, 23, 42, 0.8);
}

.diary-btn-book {
  position: relative;
  width: 28px;
  height: 36px;
  perspective: 120px;
  transform-style: preserve-3d;
  animation: diary-orbit 4.2s ease-in-out infinite;
}

.diary-page {
  position: absolute;
  top: 0;
  width: 13px;
  height: 36px;
  background: linear-gradient(180deg, #fcfaf6 0%, #f5efe2 38%, #ecdfcf 65%, #e5d4c0 100%);
  border: 1px solid rgba(160, 140, 120, 0.55);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  pointer-events: none;
  backface-visibility: hidden;
  box-shadow:
    0 2px 6px rgba(15, 23, 42, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.7);
}

.diary-left {
  left: 0;
  border-right: none;
  border-radius: 4px 0 0 4px;
  transform-origin: right center;
  box-shadow:
    inset 1px 0 0 rgba(255, 255, 255, 0.6),
    0 0 0 1px rgba(15, 23, 42, 0.1);
}

.diary-right {
  right: 0;
  left: auto;
  border-left: none;
  border-radius: 0 4px 4px 0;
  transform-origin: left center;
  box-shadow:
    inset -1px 0 0 rgba(255, 255, 255, 0.55),
    0 0 0 1px rgba(15, 23, 42, 0.08);
}

.diary-spine {
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 36px;
  margin-left: -1px;
  background: linear-gradient(
    180deg,
    #d7cabc 0%,
    #c0afa0 40%,
    #9b8b7e 60%,
    #d3c7b8 100%
  );
  border-radius: 1px;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.diary-turn-btn:hover .diary-left {
  transform: rotateY(-55deg);
}

.diary-turn-btn:hover .diary-right {
  transform: rotateY(55deg);
}

.diary-turn-btn:hover .diary-spine {
  opacity: 1;
}

@keyframes diary-orbit {
  0%,
  100% {
    transform: translateY(0) rotateZ(0deg);
  }
  40% {
    transform: translateY(-1px) rotateZ(-2deg);
  }
  70% {
    transform: translateY(1px) rotateZ(1.5deg);
  }
}

/* ========== 手机端 / 窄屏适配 ========== */
@media (max-width: 768px) {
  .status-bar {
    min-height: 300px;
    font-size: 14px;
  }

  .flip-face {
    padding: 14px 14px 10px;
  }

  .flip-face.flip-back {
    padding-bottom: 14px;
  }

  .traces-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .trace-box {
    min-height: 36px;
    padding: 5px 6px;
    font-size: 12px;
  }

  .env-header {
    padding: 10px 12px;
    font-size: 13px;
    gap: 4px 10px;
  }

  .echo-box {
    padding: 12px 14px;
    margin-bottom: 50px;
  }

  .echo-title {
    font-size: 14px;
  }

  .echo-content {
    font-size: 14px;
  }

  .traces-summary {
    padding: 8px 10px;
    font-size: 13px;
  }

  .trace-modal {
    width: 92%;
    max-width: none;
    max-height: 80%;
  }

  .trace-modal-header {
    padding: 12px 16px;
  }

  .trace-modal-body {
    padding: 12px 16px 16px;
  }

  .diary-turn-btn {
    right: 12px;
    bottom: 10px;
    width: 48px;
    height: 48px;
  }

  .diary-btn-book {
    width: 24px;
    height: 32px;
  }

  .diary-page {
    width: 11px;
    height: 32px;
  }

  .page-two-content .amber-showcase {
    margin-top: 40px;
  }

  .amber-glass {
    width: 108px;
    height: 126px;
  }

  .amber-glow {
    width: 160px;
    height: 160px;
  }

  .page-two-content .page-two-title {
    font-size: 18px;
  }

  .page-two-content .amber-desc {
    font-size: 14px;
  }

  .current-stage-section .stage-badge {
    font-size: 14px;
    padding: 5px 12px;
  }
}

@media (max-width: 480px) {
  .status-bar {
    min-height: 260px;
    font-size: 13px;
  }

  .flip-face {
    padding: 10px 10px 8px;
  }

  .flip-face.flip-back {
    padding-bottom: 12px;
  }

  .traces-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .trace-box {
    min-height: 38px;
    padding: 6px 6px;
    font-size: 12px;
  }

  .env-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 10px;
    font-size: 12px;
  }

  .echo-box {
    padding: 10px 12px;
    margin-bottom: 48px;
  }

  .traces-summary {
    padding: 8px 10px;
    font-size: 12px;
  }

  .trace-modal {
    width: 96%;
    max-height: 85%;
  }

  .diary-turn-btn {
    right: 10px;
    bottom: 8px;
    width: 44px;
    height: 44px;
  }

  .diary-btn-book {
    width: 22px;
    height: 28px;
  }

  .diary-page {
    width: 10px;
    height: 28px;
  }

  .page-two-lower {
    padding: 10px 10px 6px;
  }

  .amber-glass {
    width: 96px;
    height: 112px;
  }

  .amber-glow {
    width: 140px;
    height: 140px;
  }

  .page-one-ring:nth-child(1) { width: 100px; height: 100px; }
  .page-one-ring:nth-child(2) { width: 72px; height: 72px; }
  .page-one-ring:nth-child(3) { width: 56px; height: 56px; }
  .page-one-ring:nth-child(4) { width: 88px; height: 88px; }
  .page-one-ring:nth-child(5) { width: 44px; height: 44px; margin-left: -22px; }
}

/* 触控优化：扩大可点区域、去除点击高亮 */
.traces-summary,
.trace-box,
.diary-turn-btn,
.trace-modal-close {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

@media (hover: none) and (pointer: coarse) {
  .diary-turn-btn:hover {
    transform: none;
  }

  .diary-turn-btn:active {
    transform: scale(0.96);
  }
}
</style>
