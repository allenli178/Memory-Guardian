<template>
  <div class="min-h-screen bg-gradient-to-b from-stone-50 to-slate-100 py-8 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <button
          class="px-6 py-3 bg-stone-500 text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-stone-600 transition-all duration-300"
          @click="goBack"
        >
          🏠 返回
        </button>
        <h1 class="text-4xl font-bold text-stone-800">训练报告</h1>
        <div class="w-20"></div>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-lg mb-8 text-center">
        <div class="text-6xl mb-4">🌟</div>
        <p class="text-2xl font-semibold text-stone-700">{{ encouragement }}</p>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-lg mb-8">
        <h2 class="text-3xl font-bold text-stone-700 mb-6 text-center">📊 今日概览</h2>
        <div class="grid grid-cols-3 gap-6">
          <div class="text-center p-6 bg-stone-50 rounded-2xl">
            <div class="text-5xl mb-3">🎮</div>
            <p class="text-xl text-stone-500 mb-2">已完成</p>
            <p class="text-4xl font-bold text-amber-600">
              {{ todayRecord?.games.length || 0 }}
            </p>
            <p class="text-xl text-stone-500">游戏</p>
          </div>
          <div class="text-center p-6 bg-stone-50 rounded-2xl">
            <div class="text-5xl mb-3">⭐</div>
            <p class="text-xl text-stone-500 mb-2">总得分</p>
            <p class="text-4xl font-bold text-amber-600">
              {{ todayRecord?.totalScore || 0 }}
            </p>
            <p class="text-xl text-stone-500">分</p>
          </div>
          <div class="text-center p-6 bg-stone-50 rounded-2xl">
            <div class="text-5xl mb-3">⏱️</div>
            <p class="text-xl text-stone-500 mb-2">训练时长</p>
            <p class="text-4xl font-bold text-amber-600">
              {{ todayRecord?.duration || 0 }}
            </p>
            <p class="text-xl text-stone-500">分钟</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-lg mb-8">
        <h2 class="text-3xl font-bold text-stone-700 mb-6 text-center">📈 最近7天得分趋势</h2>
        <div class="h-80 bg-stone-50 rounded-2xl p-4">
          <ScoreChart :scores="weeklyScores" />
        </div>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-lg mb-8">
        <h2 class="text-3xl font-bold text-stone-700 mb-6 text-center">📋 今日游戏详情</h2>
        <div v-if="todayRecord?.games.length" class="space-y-6">
          <div
            v-for="(game, index) in todayRecord.games"
            :key="index"
            class="border-2 border-stone-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
          >
            <div class="flex justify-between items-center mb-4">
              <div class="text-2xl font-bold text-stone-700">
                {{ getGameName(game.type) }}
              </div>
              <div class="text-3xl font-bold text-amber-600">{{ game.score }}分</div>
            </div>
            <div class="flex justify-between items-center text-xl text-stone-600">
              <div v-if="game.time" class="flex items-center gap-2">
                <span>⏱️</span>
                <span>用时: {{ game.time }}秒</span>
              </div>
              <div v-if="game.stars" class="flex items-center gap-2">
                <span>⭐</span>
                <span>星级: {{ "⭐".repeat(game.stars) }}</span>
              </div>
              <div v-if="game.correct && game.total" class="flex items-center gap-2">
                <span>✅</span>
                <span>正确率: {{ Math.round((game.correct / game.total) * 100) }}%</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">🎮</div>
          <p class="text-2xl text-stone-500">暂无游戏记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useGameStats } from "../../composables/useGameStats";
import ScoreChart from "../components/ScoreChart.vue";

const router = useRouter();
const { getTodayRecords, getWeeklyScores, getEncouragement } = useGameStats();

const todayRecord = computed(() => getTodayRecords());
const weeklyScores = computed(() => getWeeklyScores());
const encouragement = computed(() => {
  const totalScore = todayRecord.value?.totalScore || 0;
  return getEncouragement(totalScore);
});

function goBack() {
  router.push("/");
}

function getGameName(type: string): string {
  const gameNames = {
    match: "🃏 翻牌配对",
    number: "🔢 数字记忆",
    color: "🎨 颜色反应",
  };
  return gameNames[type as keyof typeof gameNames] || type;
}
</script>
