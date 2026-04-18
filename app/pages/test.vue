<template>
  <div class="min-h-screen bg-stone-100 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-stone-800 mb-4">测试页面</h1>
      <p class="text-xl text-stone-600">这是一个测试页面，用于检查页面是否能够正常加载。</p>
      <button class="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg" @click="router.push('/')">
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
