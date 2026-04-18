<template>
  <div class="min-h-screen bg-stone-100 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- 页面标题和返回按钮 -->
      <div class="flex items-center justify-between mb-6">
        <button class="px-4 py-2 bg-gray-500 text-white rounded-lg" @click="goBack">返回</button>
        <h1 class="text-2xl font-bold text-stone-800">训练报告</h1>
        <div class="w-12"></div>
        <!-- 占位 -->
      </div>

      <!-- 鼓励语 -->
      <div class="bg-white p-6 rounded-xl mb-8 text-center">
        <p class="text-xl font-semibold text-stone-700">您今天表现很好，继续加油！</p>
      </div>

      <!-- 今日概览 -->
      <div class="bg-white p-6 rounded-xl mb-8">
        <h2 class="text-2xl font-semibold text-stone-700 mb-4">今日概览</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <p class="text-stone-500 mb-1">已完成</p>
            <p class="text-3xl font-bold text-amber-600">0</p>
            <p class="text-stone-500">游戏</p>
          </div>
          <div class="text-center">
            <p class="text-stone-500 mb-1">总得分</p>
            <p class="text-3xl font-bold text-amber-600">0</p>
            <p class="text-stone-500">分</p>
          </div>
          <div class="text-center">
            <p class="text-stone-500 mb-1">训练时长</p>
            <p class="text-3xl font-bold text-amber-600">0</p>
            <p class="text-stone-500">分钟</p>
          </div>
        </div>
      </div>

      <!-- 历史趋势 -->
      <div class="bg-white p-6 rounded-xl mb-8">
        <h2 class="text-2xl font-semibold text-stone-700 mb-4">最近7天得分趋势</h2>
        <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p class="text-stone-500">最近7天得分: 0, 0, 0, 0, 0, 0, 0</p>
        </div>
      </div>

      <!-- 游戏详情 -->
      <div class="bg-white p-6 rounded-xl mb-8">
        <h2 class="text-2xl font-semibold text-stone-700 mb-4">今日游戏详情</h2>
        <p class="text-center text-stone-500">暂无游戏记录</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  router.push("/");
}
</script>
