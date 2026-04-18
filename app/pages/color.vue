<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-6 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <button
          class="px-6 py-3 bg-stone-500 text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-stone-600 transition-all duration-300"
          @click="router.push('/')"
        >
          🏠 返回
        </button>
        <h1 class="text-4xl font-bold text-blue-800">颜色反应</h1>
        <div class="w-20"></div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-lg mb-6">
        <div class="flex justify-between text-2xl font-bold">
          <div class="text-stone-700">
            📝 题目: <span class="text-blue-600">{{ currentQuestion }}/10</span>
          </div>
          <div class="text-stone-700">
            ✅ 正确: <span class="text-blue-600">{{ correctCount }}</span>
          </div>
        </div>
      </div>

      <div v-if="gameStarted" class="w-full h-6 bg-stone-200 rounded-full mb-6 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-100"
          :style="{ width: `${(timeLeft / timeLimit) * 100}%` }"
        ></div>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-lg flex items-center justify-center h-72 mb-8">
        <div
          v-if="gameStarted"
          class="text-7xl font-bold"
          :style="{ color: currentChallenge.textColor }"
        >
          {{ currentChallenge.text }}
        </div>
        <div v-else class="text-3xl font-semibold text-stone-600 text-center">
          <div class="text-5xl mb-4">🎨</div>
          准备开始...
        </div>
      </div>

      <div v-if="gameStarted" class="grid grid-cols-4 gap-4 mb-8">
        <div
          v-for="(color, index) in currentChallenge.options"
          :key="index"
          class="aspect-square rounded-2xl cursor-pointer flex items-center justify-center text-3xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-4 border-white"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        >
          {{ colorNames[color] }}
        </div>
      </div>

      <div v-if="feedback" class="text-center mb-6 text-3xl font-bold" :class="feedbackType">
        {{ feedback }}
      </div>

      <button
        class="w-full py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
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
            <div class="text-7xl mb-4">🎊</div>
            <h2 class="text-4xl font-bold text-blue-800 mb-6">游戏完成！</h2>
            <div class="space-y-4 mb-8">
              <p class="text-2xl text-stone-700">
                ✅ 正确题目: <span class="font-bold text-blue-600">{{ correctCount }}/10</span>
              </p>
              <p class="text-2xl text-stone-700">
                ⭐ 得分: <span class="font-bold text-blue-600">{{ finalScore }}</span>
              </p>
            </div>
            <button
              class="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl text-2xl font-bold shadow-lg mb-3 transition-all duration-300"
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
import { COLORS } from "../../utils/constants";
import { generateColorChallenge } from "../../utils/game-logic";
import { useGameStats } from "../../composables/useGameStats";

const router = useRouter();
const { addRecord } = useGameStats();

const gameStarted = ref(false);
const currentQuestion = ref(1);
const correctCount = ref(0);
const timeLeft = ref(5000);
const timeLimit = ref(5000);
const feedback = ref("");
const feedbackType = ref("text-green-600");
const gameOverOpen = ref(false);
const finalScore = ref(0);
let timer: number | null = null;

const colorNames: Record<string, string> = {
  "#ef4444": "红",
  "#3b82f6": "蓝",
  "#10b981": "绿",
  "#f59e0b": "黄",
  "#8b5cf6": "紫",
  "#f97316": "橙",
};

const currentChallenge = ref(generateColorChallenge(COLORS));

function startQuestion() {
  timeLimit.value = currentQuestion.value <= 5 ? 5000 : 3000;
  timeLeft.value = timeLimit.value;
  currentChallenge.value = generateColorChallenge(COLORS);
  feedback.value = "";

  timer = window.setInterval(() => {
    timeLeft.value -= 100;
    if (timeLeft.value <= 0) {
      clearInterval(timer!);
      handleTimeUp();
    }
  }, 100);
}

function selectColor(color: string) {
  clearInterval(timer!);

  if (color === currentChallenge.value.correctColor) {
    correctCount.value++;
    feedback.value = "正确！🎉";
    feedbackType.value = "text-emerald-600";
  } else {
    feedback.value = "错误 😅";
    feedbackType.value = "text-red-600";
  }

  setTimeout(() => {
    if (currentQuestion.value < 10) {
      currentQuestion.value++;
      startQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function handleTimeUp() {
  feedback.value = "时间到！⏰";
  feedbackType.value = "text-red-600";

  setTimeout(() => {
    if (currentQuestion.value < 10) {
      currentQuestion.value++;
      startQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameStarted.value = false;
  finalScore.value = correctCount.value * 10;

  addRecord({
    type: "color",
    score: finalScore.value,
    correct: correctCount.value,
    total: 10,
  });

  gameOverOpen.value = true;
}

function resetGame() {
  if (timer) {
    clearInterval(timer);
  }

  gameStarted.value = false;
  currentQuestion.value = 1;
  correctCount.value = 0;
  timeLeft.value = 5000;
  timeLimit.value = 5000;
  feedback.value = "";
  gameOverOpen.value = false;
  finalScore.value = 0;
  currentChallenge.value = generateColorChallenge(COLORS);

  setTimeout(() => {
    gameStarted.value = true;
    startQuestion();
  }, 500);
}

onMounted(() => {
  setTimeout(() => {
    gameStarted.value = true;
    startQuestion();
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>
