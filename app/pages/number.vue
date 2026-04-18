<template>
  <div class="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 py-6 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <button
          class="px-6 py-3 bg-stone-500 text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-stone-600 transition-all duration-300"
          @click="router.push('/')"
        >
          🏠 返回
        </button>
        <h1 class="text-4xl font-bold text-emerald-800">数字记忆</h1>
        <div class="w-20"></div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-lg mb-6">
        <div class="flex justify-between text-2xl font-bold">
          <div class="text-stone-700">
            🏆 关卡: <span class="text-emerald-600">{{ level }}</span>
          </div>
          <div class="text-stone-700">
            🔥 连续正确: <span class="text-emerald-600">{{ streak }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-lg flex items-center justify-center h-72 mb-8">
        <div v-if="showingNumbers" class="text-8xl font-bold text-emerald-700">
          {{ currentNumber }}
        </div>
        <div v-else-if="inputPhase" class="text-3xl font-semibold text-stone-600 text-center">
          <div class="text-5xl mb-4">🧠</div>
          请按顺序点击数字
        </div>
        <div v-else class="text-3xl font-semibold text-stone-600 text-center">
          <div class="text-5xl mb-4">⏰</div>
          准备开始...
        </div>
      </div>

      <div v-if="inputPhase" class="grid grid-cols-3 gap-5 mb-8">
        <button
          v-for="num in 9"
          :key="num"
          class="text-5xl h-24 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          @click="selectNumber(num)"
        >
          {{ num }}
        </button>
      </div>

      <div v-if="feedback" class="text-center mb-6 text-3xl font-bold" :class="feedbackType">
        {{ feedback }}
      </div>

      <button
        class="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
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
            <div class="text-7xl mb-4">🎮</div>
            <h2 class="text-4xl font-bold text-emerald-800 mb-6">游戏结束</h2>
            <div class="space-y-4 mb-8">
              <p class="text-2xl text-stone-700">
                🏆 最高关卡: <span class="font-bold text-emerald-600">{{ maxLevel }}</span>
              </p>
              <p class="text-2xl text-stone-700">
                🔥 连续正确: <span class="font-bold text-emerald-600">{{ maxStreak }}</span>
              </p>
              <p class="text-2xl text-stone-700">
                ⭐ 得分: <span class="font-bold text-emerald-600">{{ finalScore }}</span>
              </p>
            </div>
            <button
              class="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl text-2xl font-bold shadow-lg mb-3 transition-all duration-300"
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
import { generateRandomNumbers } from "../../utils/game-logic";
import { useGameStats } from "../../composables/useGameStats";

const router = useRouter();
const { addRecord } = useGameStats();

const level = ref(1);
const streak = ref(0);
const maxLevel = ref(1);
const maxStreak = ref(0);
const showingNumbers = ref(false);
const inputPhase = ref(false);
const currentNumber = ref(0);
const numberSequence = ref<number[]>([]);
const userInput = ref<number[]>([]);
const feedback = ref("");
const feedbackType = ref("text-green-600");
const gameOverOpen = ref(false);
const finalScore = ref(0);
let numberIndex = 0;
let timers: number[] = [];

function startLevel() {
  const numberCount = 3 + level.value - 1;
  numberSequence.value = generateRandomNumbers(numberCount);
  userInput.value = [];
  numberIndex = 0;
  feedback.value = "";
  showingNumbers.value = true;
  inputPhase.value = false;

  numberSequence.value.forEach((num, index) => {
    const timer = window.setTimeout(() => {
      currentNumber.value = num;
    }, index * 1500);
    timers.push(timer);
  });

  const inputTimer = window.setTimeout(() => {
    showingNumbers.value = false;
    inputPhase.value = true;
  }, numberSequence.value.length * 1500);
  timers.push(inputTimer);
}

function selectNumber(num: number) {
  if (!inputPhase.value) return;

  userInput.value.push(num);

  if (num === numberSequence.value[userInput.value.length - 1]) {
    if (userInput.value.length === numberSequence.value.length) {
      streak.value++;
      maxStreak.value = Math.max(maxStreak.value, streak.value);
      level.value++;
      maxLevel.value = Math.max(maxLevel.value, level.value);

      feedback.value = "太棒了！🎉";
      feedbackType.value = "text-emerald-600";

      setTimeout(() => {
        startLevel();
      }, 1500);
    }
  } else {
    endGame();
  }
}

function endGame() {
  timers.forEach((timer) => clearTimeout(timer));
  timers = [];

  feedback.value = "游戏结束 😊";
  feedbackType.value = "text-red-600";

  finalScore.value = (maxLevel.value - 1) * 10 + maxStreak.value * 5;

  addRecord({
    type: "number",
    score: finalScore.value,
    level: maxLevel.value - 1,
    correct: maxStreak.value,
  });

  gameOverOpen.value = true;
}

function resetGame() {
  timers.forEach((timer) => clearTimeout(timer));
  timers = [];

  level.value = 1;
  streak.value = 0;
  maxLevel.value = 1;
  maxStreak.value = 0;
  showingNumbers.value = false;
  inputPhase.value = false;
  currentNumber.value = 0;
  numberSequence.value = [];
  userInput.value = [];
  feedback.value = "";
  gameOverOpen.value = false;
  finalScore.value = 0;

  setTimeout(() => {
    startLevel();
  }, 500);
}

onMounted(() => {
  setTimeout(() => {
    startLevel();
  }, 1000);
});

onUnmounted(() => {
  timers.forEach((timer) => clearTimeout(timer));
});
</script>
