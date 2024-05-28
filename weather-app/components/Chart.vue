<template>
    <div class="chart-container">
      <Line :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
  
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 39, 10, 40, 39, 80, 40]
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    margin: auto;
    height: 40vh;
    width: 80vw;
  }
  </style>
  