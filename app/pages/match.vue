<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-6 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <button
          class="px-6 py-3 bg-stone-500 text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-stone-600 transition-all duration-300"
          @click="router.push('/')"
        >
          🏠 返回
        </button>
        <h1 class="text-4xl font-bold text-amber-800">翻牌配对</h1>
        <div class="w-20"></div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-lg mb-6">
        <div class="flex justify-between text-2xl font-bold">
          <div class="text-stone-700">
            🎯 翻牌次数: <span class="text-amber-600">{{ moves }}</span>
          </div>
          <div class="text-stone-700">
            ⏱️ 用时: <span class="text-amber-600">{{ Math.floor(timeElapsed / 1000) }}秒</span>
          </div>
        </div>
      </div>

      <div class="grid gap-4 mb-8" :class="difficulty === 'easy' ? 'grid-cols-3' : 'grid-cols-4'">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="aspect-square"
          @click="flipCard(index)"
        >
          <div class="w-full h-full cursor-pointer perspective-1000">
            <div
              class="relative w-full h-full transition-transform duration-500 transform-style-3d"
              :class="{ 'rotate-y-180': card.flipped || card.matched }"
            >
              <div
                class="absolute w-full h-full flex items-center justify-center text-6xl border-4 border-stone-200 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 backface-hidden shadow-md"
              >
                ❓
              </div>
              <div
                class="absolute w-full h-full flex items-center justify-center text-6xl border-4 border-stone-200 rounded-3xl bg-white backface-hidden rotate-y-180 shadow-md"
                :class="{
                  'bg-gradient-to-br from-green-100 to-emerald-200 border-green-300': card.matched,
                }"
              >
                {{ card.icon }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-4 mb-6">
        <button
          :class="
            difficulty === 'easy' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-stone-400'
          "
          class="px-8 py-4 text-white rounded-2xl text-2xl font-bold shadow-lg transition-all duration-300"
          @click="setDifficulty('easy')"
        >
          简单 (4×3)
        </button>
        <button
          :class="
            difficulty === 'medium'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500'
              : 'bg-stone-400'
          "
          class="px-8 py-4 text-white rounded-2xl text-2xl font-bold shadow-lg transition-all duration-300"
          @click="setDifficulty('medium')"
        >
          中等 (4×4)
        </button>
      </div>

      <button
        class="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
        @click="resetGame"
      >
        🔄 重新开始
      </button>

      <div
        v-if="gameOverOpen"
        class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      >
        <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div class="text-center">
            <div class="text-7xl mb-4">🎉</div>
            <h2 class="text-4xl font-bold text-amber-800 mb-6">游戏完成！</h2>
            <div class="space-y-4 mb-8">
              <p class="text-2xl text-stone-700">
                🎯 翻牌次数: <span class="font-bold text-amber-600">{{ moves }}</span>
              </p>
              <p class="text-2xl text-stone-700">
                ⏱️ 用时:
                <span class="font-bold text-amber-600">{{ Math.floor(timeElapsed / 1000) }}秒</span>
              </p>
              <div class="flex justify-center text-5xl gap-2">
                <span v-for="i in stars" :key="i">⭐</span>
              </div>
            </div>
            <button
              class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl text-2xl font-bold shadow-lg mb-3 transition-all duration-300"
              @click="router.push('/')"
            >
              🏠 返回首页
            </button>
            <button
              class="w-full py-4 bg-stone-500 text-white rounded-2xl text-2xl font-bold shadow-lg transition-all duration-300"
              @click="
                resetGame();
                gameOverOpen = false;
              "
            >
              🔄 再玩一次
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { CARD_ICONS } from "../../utils/constants";
import { generateCardPairs, calculateStars } from "../../utils/game-logic";
import { useGameStats } from "../../composables/useGameStats";

const router = useRouter();
const { addRecord } = useGameStats();

const difficulty = ref("easy");
const cards = ref<Array<{ icon: string; flipped: boolean; matched: boolean }>>([]);
const flippedCards = ref<number[]>([]);
const moves = ref(0);
const timeElapsed = ref(0);
const gameOverOpen = ref(false);
const stars = ref(0);
let timer: number | null = null;

function initCards() {
  const pairCount = difficulty.value === "easy" ? 6 : 8;
  const cardIcons = generateCardPairs(CARD_ICONS, pairCount);
  cards.value = cardIcons.map((icon) => ({ icon, flipped: false, matched: false }));
}

function setDifficulty(level: "easy" | "medium") {
  difficulty.value = level;
  resetGame();
}

function flipCard(index: number) {
  const card = cards.value[index];
  if (card.flipped || card.matched || flippedCards.value.length >= 2) return;

  card.flipped = true;
  flippedCards.value.push(index);
  moves.value++;

  if (flippedCards.value.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards.value;
  const firstCard = cards.value[first];
  const secondCard = cards.value[second];

  if (firstCard.icon === secondCard.icon) {
    firstCard.matched = true;
    secondCard.matched = true;
    flippedCards.value = [];

    if (cards.value.every((card) => card.matched)) {
      endGame();
    }
  } else {
    setTimeout(() => {
      firstCard.flipped = false;
      secondCard.flipped = false;
      flippedCards.value = [];
    }, 1500);
  }
}

function endGame() {
  clearInterval(timer!);
  const pairCount = difficulty.value === "easy" ? 6 : 8;
  stars.value = calculateStars(moves.value, pairCount);
  const score = Math.max(100 - (moves.value - pairCount) * 5, 50) + stars.value * 10;

  addRecord({
    type: "match",
    score,
    time: Math.floor(timeElapsed.value / 1000),
    stars: stars.value,
  });

  gameOverOpen.value = true;
}

function resetGame() {
  initCards();
  flippedCards.value = [];
  moves.value = 0;
  timeElapsed.value = 0;
  stars.value = 0;
  gameOverOpen.value = false;

  if (timer) {
    clearInterval(timer);
  }

  timer = window.setInterval(() => {
    timeElapsed.value += 100;
  }, 100);
}

onMounted(() => {
  initCards();
  timer = window.setInterval(() => {
    timeElapsed.value += 100;
  }, 100);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
