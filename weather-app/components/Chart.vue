<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
)
export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Max',
            backgroundColor: 'red',
            borderColor : "red" ,
            data: [14, 16, 15, 14, 19, 18],
            tension: 0.3,
            pointRadius: 0,

          },
          {
            label: 'Min',
            backgroundColor: 'blue',
            borderColor : "blue" ,
            data: [11, 9, 9, 10, 9, 6],
            tension: 0.3,
            pointRadius: 0,

          }
        ]
      },
      chartOptions: {
        responsive: true,
        intersect: false,
      }
    }
  }
}
</script>