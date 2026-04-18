<template>
  <canvas ref="canvasRef" class="w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps<{
  scores: number[];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

function drawChart() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 设置画布尺寸
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scores = props.scores;
  if (scores.length === 0) return;

  // 计算数据范围
  const maxScore = Math.max(...scores, 100);
  const minScore = 0;

  // 计算坐标
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  const stepX = chartWidth / (scores.length - 1);
  const stepY = chartHeight / (maxScore - minScore);

  // 绘制网格
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;

  // 水平线
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
    ctx.stroke();

    // 绘制刻度
    const value = maxScore - (maxScore / 5) * i;
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Noto Sans SC";
    ctx.textAlign = "right";
    ctx.fillText(value.toString(), padding - 10, y + 4);
  }

  // 垂直线
  for (let i = 0; i < scores.length; i++) {
    const x = padding + stepX * i;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, canvas.height - padding);
    ctx.stroke();

    // 绘制日期标签
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const day = date.getDate();
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Noto Sans SC";
    ctx.textAlign = "center";
    ctx.fillText(day.toString(), x, canvas.height - padding + 20);
  }

  // 绘制折线
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding - scores[0] * stepY);

  for (let i = 1; i < scores.length; i++) {
    const x = padding + stepX * i;
    const y = canvas.height - padding - scores[i] * stepY;
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  // 绘制数据点
  ctx.fillStyle = "#f59e0b";
  for (let i = 0; i < scores.length; i++) {
    const x = padding + stepX * i;
    const y = canvas.height - padding - scores[i] * stepY;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

onMounted(() => {
  drawChart();
  window.addEventListener("resize", drawChart);
});

watch(
  () => props.scores,
  () => {
    drawChart();
  },
  { deep: true },
);
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
