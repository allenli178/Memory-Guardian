<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-6">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12">
        <div class="text-6xl mb-4">🧠</div>
        <h1 class="text-5xl font-bold text-amber-800 mb-4">记忆守护者</h1>
        <p class="text-2xl text-stone-700 leading-relaxed">每天10分钟，守护您的记忆</p>
      </div>

      <div class="space-y-6">
        <button
          class="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
          @click="navigateTo('/match')"
        >
          <div class="flex items-center justify-center gap-4">
            <span class="text-4xl">🃏</span>
            <span>翻牌配对</span>
          </div>
        </button>
        <button
          class="w-full py-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
          @click="navigateTo('/number')"
        >
          <div class="flex items-center justify-center gap-4">
            <span class="text-4xl">🔢</span>
            <span>数字记忆</span>
          </div>
        </button>
        <button
          class="w-full py-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
          @click="navigateTo('/color')"
        >
          <div class="flex items-center justify-center gap-4">
            <span class="text-4xl">🎨</span>
            <span>颜色反应</span>
          </div>
        </button>
        <button
          class="w-full py-6 bg-gradient-to-r from-stone-500 to-slate-600 text-white rounded-3xl text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98"
          @click="navigateTo('/report-page')"
        >
          <div class="flex items-center justify-center gap-4">
            <span class="text-4xl">📊</span>
            <span>查看训练报告</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function navigateTo(path: string) {
  router.push(path);
}
</script>
