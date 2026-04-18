<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "zh-CN",
  },
});

useSeoMeta({
  title: "记忆守护者 - 适老化认知训练",
  description: "专为老年人设计的认知训练小游戏",
});
</script>

<template>
  <div class="min-h-screen bg-stone-100">
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
