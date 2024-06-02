<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'
const { locale } = useI18n();

const props = defineProps<Props>()
interface Props {
  labels: Array<number>;
  minData: Array<number>;
  maxData: Array<number>;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

const chartData = computed(() => ({
  labels: props.labels.map((day) => new Date(day * 1000).toLocaleDateString(locale.value, { weekday: 'short', day: 'numeric' })),
  datasets: [
    {
      label: 'Max',
      backgroundColor: '#FF4500',
      borderColor: '#FF4500',
      data: props.maxData.map((max) => max),
      tension: 0.3,
      pointRadius: 0,
    },
    {
      label: 'Min',
      backgroundColor: '#00BFFF',
      borderColor: '#00BFFF',
      data:  props.minData.map((min) => min),
      tension: 0.3,
      pointRadius: 0,
    }
  ]
}));

const chartOptions = {
  responsive: true,
  intersect: false,
};
</script>
