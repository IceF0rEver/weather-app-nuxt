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
  labels: props.labels.map((day) => new Date(day * 1000).toLocaleTimeString(locale.value, { hour: '2-digit'})),
  datasets: [
    {
      label: 'Max',
      backgroundColor: '#808080',
      borderColor: '#808080',
      data: props.maxData.map((max) => max),
      tension: 0.3,
      pointRadius: 0,
    },
  ]
}));

const chartOptions = {
  responsive: true,
  intersect: false,
};
</script>
