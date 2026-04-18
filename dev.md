# 🧠 记忆守护者 —— 适老化认知训练小游戏

## 一、项目概述

| 维度             | 说明                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- |
| **项目名称**     | 记忆守护者（Memory Guardian）                                                          |
| **参赛赛道**     | Hello AI 科技致善（公益赛道）                                                          |
| **目标用户**     | 60岁以上老年人，及其子女/照护者                                                        |
| **核心价值**     | 通过趣味小游戏帮助老年人进行日常认知训练，延缓记忆力衰退；同时为子女提供"陪玩"互动场景 |
| **技术方案**     | Nuxt 4 + Nuxt UI v3 + TailwindCSS v4 + Motion Vue，纯前端 SPA（`ssr: false`）          |
| **开发工具**     | TRAE SOLO（Builder 模式）                                                              |
| **预计开发时间** | 1.5 ~ 2 小时                                                                           |

---

## 二、功能清单（MVP）

### 2.1 首页

- **欢迎语**：温暖的问候语 + 简短说明（"每天10分钟，守护您的记忆"）
- **开始按钮**：大号、高对比度的「开始训练」按钮（使用 `UButton` 组件，`size="xl"`）
- **训练记录**：显示今日已完成的小游戏数量和得分（`useLocalStorage` composable 持久化）
- **设置入口**：字体大小调节（大/超大）、音效开关（`UModal` 弹窗设置）

### 2.2 小游戏一：翻牌配对（记忆训练）

| 要素         | 说明                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| **玩法**     | 4×3 网格（6对卡牌），点击翻开，找到所有配对即过关                        |
| **卡牌内容** | 使用常见生活物品图标（🍎苹果、🌻向日葵、🏠房子、🐱小猫等），避免抽象符号 |
| **难度**     | 默认 4×3（简单），可选 4×4（中等）                                       |
| **反馈**     | 配对成功 → 绿色闪烁 + 柔和音效；配对失败 → 轻轻摇头动画 + 卡牌翻回       |
| **计分**     | 记录翻牌次数和用时，给予星级评价（⭐⭐⭐）                               |
| **适老化**   | 卡牌尺寸 ≥ 80px，图标清晰，翻牌动画缓慢（0.5s）                          |
| **技术实现** | `Motion Vue` 的 `v-presence` 实现翻牌 3D 动画，`UCard` 组件作为卡牌容器  |

### 2.3 小游戏二：数字记忆（短时记忆训练）

| 要素         | 说明                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| **玩法**     | 屏幕依次闪现 3~5 个数字（每个显示 1.5 秒），之后要求用户按顺序点击正确的数字 |
| **数字范围** | 1~9（大号显示，字号 ≥ 48px）                                                 |
| **难度递进** | 第1关 3 个数字，每过一关 +1，最多 7 个                                       |
| **反馈**     | 正确 → 鼓励语（"太棒了！"）；错误 → 温和提示（"没关系，再试一次"）           |
| **计分**     | 记录连续正确次数和最高通关数                                                 |
| **技术实现** | `Motion Vue` 的 `v-animate` 控制数字闪现/消失动画，`UButton` 作为数字按钮    |

### 2.4 小游戏三：颜色反应（注意力训练）

| 要素         | 说明                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| **玩法**     | 屏幕显示一个颜色词（如"红色"），但文字颜色可能不同（如用蓝色写"红色"），用户需点击文字的**实际颜色**而非文字内容 |
| **选项**     | 底部显示 4 个颜色按钮，用户点击正确颜色                                                                          |
| **时间限制** | 每题 5 秒倒计时（大号显示）                                                                                      |
| **难度递进** | 前5题速度慢（5秒），后5题加快（3秒）                                                                             |
| **反馈**     | 正确 → 颜色块放大 + 音效；超时/错误 → 显示正确答案                                                               |
| **计分**     | 10 题一组，记录正确数                                                                                            |
| **技术实现** | `Motion Vue` 的 `v-pop` 实现颜色块放大效果，`UProgress` 作为倒计时进度条                                         |

### 2.5 训练报告页

- **今日概览**：已完成游戏数、总得分、训练时长（`UStat` / `UCard` 展示）
- **历史趋势**：最近 7 天的得分折线图（Canvas 绘制，封装为 Vue 组件）
- **鼓励语**：根据表现动态生成（"您今天表现很好，继续保持！"）
- **分享按钮**：生成训练成绩卡片（可选，时间允许时实现）

---

## 三、适老化设计规范（核心亮点）

### 3.1 视觉设计

| 规范项       | 要求                                         | TailwindCSS 实现                                           |
| ------------ | -------------------------------------------- | ---------------------------------------------------------- |
| **字体大小** | 正文 ≥ 20px，标题 ≥ 28px，按钮文字 ≥ 24px    | `text-xl` / `text-3xl` / `text-2xl`，通过 CSS 变量动态切换 |
| **字体选择** | 思源黑体 / 微软雅黑，避免衬线体              | `font-family: 'Noto Sans SC', sans-serif`                  |
| **行间距**   | ≥ 1.8 倍                                     | `leading-loose`                                            |
| **对比度**   | 文字与背景对比度 ≥ 4.5:1（WCAG AA 标准）     | 暖色调主题变量控制                                         |
| **配色方案** | 暖色调为主（米白背景 + 深棕文字 + 橙色强调） | Nuxt UI 自定义主题 `app.config.ts`                         |
| **按钮尺寸** | 最小点击区域 60×60px，推荐 80×80px           | `min-h-[60px] min-w-[60px]` / `size="xl"`                  |
| **圆角**     | 按钮圆角 ≥ 12px，卡片圆角 ≥ 16px             | `rounded-xl` / `rounded-2xl`，Nuxt UI 全局配置             |

### 3.2 交互设计

| 规范项         | 要求                                    | 技术实现                        |
| -------------- | --------------------------------------- | ------------------------------- |
| **操作反馈**   | 每次点击都有明确的视觉/听觉反馈         | Motion Vue 动画 + Web Audio API |
| **动画速度**   | 所有过渡动画 ≥ 0.3s，避免快速闪烁       | Motion Vue `duration: 300+`     |
| **误操作保护** | 关键操作（如退出游戏）需二次确认        | `UAlertDialog` 组件             |
| **语音提示**   | 使用 Web Speech API 提供语音引导        | 封装 `useSpeech()` composable   |
| **无弹窗**     | 不使用 alert/prompt，所有提示用内联消息 | `UToast` / `UNotification` 组件 |

### 3.3 内容规范

| 规范项       | 要求                                   |
| ------------ | -------------------------------------- |
| **语言风格** | 温暖、鼓励、简洁，避免专业术语         |
| **图标**     | 使用常见生活物品，不使用抽象符号       |
| **说明文字** | 每个游戏开始前有语音+文字的操作说明    |
| **鼓励机制** | 完成游戏后给予积极反馈，不显示负面评价 |

---

## 四、技术方案

### 4.1 技术栈

```
Nuxt 4（SPA 模式）
├── UI 组件库：Nuxt UI v3（UButton / UCard / UModal / UAlertDialog / UToast / UProgress 等）
├── 样式方案：TailwindCSS v4（工具类 + 自定义适老化主题变量）
├── 动画方案：Motion Vue（v-presence / v-animate / v-pop / v-slide 等）
├── 状态管理：Nuxt 内置 useState + useLocalStorage（composable 封装）
├── 语音能力：Web Speech API（SpeechSynthesis）→ 封装为 useSpeech() composable
├── 图表：Canvas 2D（封装为 Vue 组件 <ScoreChart />）
├── 字体：Noto Sans SC（Google Fonts，通过 Nuxt Fonts 模块加载）
└── 部署：npx nuxi generate → 静态文件 → GitHub Pages / Vercel
```

### 4.2 项目结构

```
memory-guardian/
├── nuxt.config.ts              # Nuxt 配置（ssr: false, modules）
├── app.config.ts               # Nuxt UI 自定义主题（适老化配色/圆角/字号）
├── app.vue                     # 根组件（Nuxt UI 主题 Provider）
├── pages/
│   ├── index.vue               # 首页（欢迎语 + 游戏入口 + 今日记录）
│   ├── match.vue               # 翻牌配对游戏
│   ├── number.vue              # 数字记忆游戏
│   ├── color.vue               # 颜色反应游戏
│   └── report.vue              # 训练报告页
├── components/
│   ├── GameHeader.vue          # 通用游戏顶栏（返回按钮 + 计时器 + 得分）
│   ├── GameCard.vue            # 翻牌配对卡牌（Motion Vue 3D 翻转）
│   ├── NumberPad.vue           # 数字记忆 - 数字按钮网格
│   ├── ColorButton.vue         # 颜色反应 - 颜色选择按钮
│   ├── StarRating.vue          # 星级评价组件
│   ├── ScoreChart.vue          # 7天得分折线图（Canvas）
│   ├── EmotionFeedback.vue     # 鼓励/安慰反馈气泡
│   └── SettingsModal.vue       # 设置弹窗（字号/音效）
├── composables/
│   ├── useGameStats.ts         # 游戏统计逻辑（得分/星级/历史记录）
│   ├── useLocalStorage.ts      # localStorage 封装（类型安全）
│   ├── useSpeech.ts            # 语音提示（Web Speech API）
│   └── useSound.ts             # 音效合成（Web Audio API）
├── utils/
│   ├── game-logic.ts           # 游戏核心算法（洗牌/配对/评分）
│   └── constants.ts            # 常量定义（卡牌图标/颜色/鼓励语）
└── assets/
    └── css/
        └── main.css            # TailwindCSS 入口 + 适老化自定义样式
```

### 4.3 Nuxt 配置要点

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui", // Nuxt UI v3（自动集成 TailwindCSS v4）
    "@vueuse/nuxt", // VueUse（useLocalStorage 等）
    "motion-v/nuxt", // Motion Vue 动画
  ],

  ssr: false, // 纯 SPA 模式，方便静态部署

  app: {
    head: {
      title: "记忆守护者 - 适老化认知训练",
      meta: [{ name: "description", content: "专为老年人设计的认知训练小游戏" }],
    },
  },
});
```

### 4.4 Nuxt UI 适老化主题配置

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: "amber", // 暖橙色主色
      neutral: "stone", // 石灰色中性色
    },
    button: {
      rounded: "xl", // 大圆角
      size: "xl", // 大号按钮
      padding: "xl", // 大内边距
    },
    card: {
      rounded: "2xl", // 卡片大圆角
    },
  },
});
```

### 4.5 数据结构（localStorage）

```typescript
// types/index.ts
interface GameRecord {
  type: "match" | "number" | "color";
  score: number;
  time?: number; // 用时（秒）
  stars?: number; // 星级（1-3）
  level?: number; // 通关数
  correct?: number; // 正确数
  total?: number; // 总题数
}

interface DailyRecord {
  date: string; // '2026-04-18'
  games: GameRecord[];
  totalScore: number;
  duration: number; // 训练时长（分钟）
}

interface AppSettings {
  fontSize: "normal" | "large" | "xlarge";
  soundEnabled: boolean;
  speechEnabled: boolean;
}
```

### 4.6 核心 Composable 设计

```typescript
// composables/useGameStats.ts
export function useGameStats() {
  const records = useLocalStorage<DailyRecord[]>("memory-guardian-records", []);

  function addRecord(record: GameRecord) {
    /* ... */
  }
  function getTodayRecords(): DailyRecord | null {
    /* ... */
  }
  function getWeeklyScores(): number[] {
    /* ... */
  }
  function getEncouragement(score: number): string {
    /* ... */
  }

  return { records, addRecord, getTodayRecords, getWeeklyScores, getEncouragement };
}

// composables/useSpeech.ts
export function useSpeech() {
  function speak(text: string) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8; // 语速放慢，适合老年人
    window.speechSynthesis.speak(utterance);
  }

  return { speak };
}
```

### 4.7 Motion Vue 动画使用示例

```vue
<!-- 翻牌卡牌组件 -->
<template>
  <div
    v-presence="{ initial: { rotateY: 180 }, present: { rotateY: 0 } }"
    :duration="500"
    class="w-20 h-20 cursor-pointer"
    @click="flip"
  >
    <UCard v-if="isFlipped" class="text-4xl text-center">
      {{ icon }}
    </UCard>
    <UCard v-else class="bg-amber-100 text-center"> ❓ </UCard>
  </div>
</template>
```

---

## 五、2小时开发排期

| 阶段        | 时间        | 内容                             | SOLO 提示词建议                                                                                                                                                                                                                 |
| ----------- | ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 0** | 0:00 - 0:10 | 项目初始化 + 依赖安装 + 主题配置 | "用 Nuxt 4 创建项目，安装 @nuxt/ui、@vueuse/nuxt、motion-v/nuxt。配置 ssr:false，app.config.ts 设置适老化主题（amber主色、stone中性色、xl按钮、2xl圆角）。安装 Noto Sans SC 字体"                                               |
| **Phase 1** | 0:10 - 0:30 | 首页 + 适老化布局 + 设置弹窗     | "创建首页 pages/index.vue：暖色调大字体欢迎页，包含问候语'每天10分钟，守护您的记忆'、三个游戏入口卡片（翻牌配对/数字记忆/颜色反应）、今日训练记录、设置弹窗（字号切换/音效开关）。使用 Nuxt UI 组件，TailwindCSS 适老化样式"    |
| **Phase 2** | 0:30 - 0:55 | 翻牌配对游戏（核心玩法）         | "实现翻牌配对游戏 pages/match.vue：4×3网格，使用生活物品emoji（🍎🌻🏠🐱🎵🌸），Motion Vue 实现3D翻牌动画（duration:500ms），配对成功绿色闪烁+音效，失败卡牌翻回，记录翻牌次数和用时，3星评价。卡牌尺寸≥80px"                    |
| **Phase 3** | 0:55 - 1:15 | 数字记忆 + 颜色反应游戏          | "实现两个游戏：(1) pages/number.vue - 数字依次闪现（1.5s/个），用户按顺序点击，3个起步每关+1，Motion Vue淡入淡出动画；(2) pages/color.vue - 斯特鲁普颜色反应，显示颜色词但文字颜色不同，4个颜色按钮选择，UProgress倒计时进度条" |
| **Phase 4** | 1:15 - 1:40 | 训练报告页 + 数据持久化 + 图表   | "实现训练报告页 pages/report.vue：UCard展示今日概览（游戏数/总分/时长），Canvas绘制最近7天得分折线图（封装为ScoreChart组件），动态鼓励语。封装useGameStats composable管理localStorage数据"                                      |
| **Phase 5** | 1:40 - 2:00 | 语音提示 + 音效 + 整体打磨       | "封装useSpeech composable（Web Speech API，中文语速0.8），在游戏关键节点添加语音引导。封装useSound composable（Web Audio API合成简单音效）。检查所有按钮≥60px、对比度达标、动画≥300ms。测试完整流程"                            |

---

## 六、参赛发帖要点

### 标题建议

> 【Hello AI 科技致善】记忆守护者 —— 用 SOLO 2小时打造适老化认知训练小游戏，让科技温暖银发族

### 文章结构建议

1. **痛点引入**：中国 2.8 亿老年人，认知衰退是隐形健康威胁，但市面上的训练工具对老年人不友好
2. **解决方案**：记忆守护者 —— 专为老年人设计的认知训练工具
3. **技术亮点**：Nuxt 4 + Nuxt UI + Motion Vue 现代化技术栈，快速实现适老化体验
4. **适老化设计亮点**：大字体、高对比度、语音引导、温暖鼓励、Nuxt UI 无障碍组件（附截图）
5. **SOLO 开发过程**：展示从需求到上线的全过程，强调 SOLO 如何理解"适老化"需求并调用 Nuxt UI 组件
6. **公益价值**：让每个家庭都能轻松进行认知训练，子女也能远程关心父母
7. **未来展望**：增加更多游戏类型、多人在线对战、家属端查看报告等

---

## 七、加分项（时间允许时）

- [ ] 添加 PWA 支持（`@vite-pwa/nuxt`），可添加到手机桌面像 App 一样使用
- [ ] 添加「每日提醒」功能（Notification API）
- [ ] 添加深色模式切换（Nuxt UI 内置 `color-mode`）
- [ ] 生成训练成绩分享图片（html2canvas 截图）
- [ ] 添加简单的入场引导动画（Motion Vue `v-stagger`）
- [ ] 多语言支持（i18n，方便不同地区老年人使用）

---

## 八、部署方案

```bash
# 构建静态文件
npx nuxi generate

# 部署到 GitHub Pages
# 或直接部署到 Vercel / Netlify（零配置）
```

部署后即可通过链接分享给老年人使用，手机浏览器打开体验最佳。
