<template>
    <div class="card flex justify-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[20rem]" />
    </div>
</template>

<script setup lang="ts">
import { useDashboard } from '@/stores/dashboard';
import Chart from 'primevue/chart';
import { ref, onMounted, computed } from "vue";

const dashboard = useDashboard()

const chartData = computed(() => setChartData());

onMounted(() => {
    chartOptions.value = setChartOptions();
});

// const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const count = dashboard.salesCategoryData.length

  return {
    labels: dashboard.salesCategoryData.map(item => item.category),
    datasets: [
      {
        data: dashboard.salesCategoryData.map(item => item.total_sales),
        backgroundColor: generateColors(count),
        hoverBackgroundColor: generateHoverColors(count)
      }
    ]
  }
}

const setChartOptions = () => {

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: 'gray'
                }
            }
        }
    };
};


const generateColors = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((360 / count) * i)
    return `hsl(${hue}, 55%, 60%)`
  })
}

const generateHoverColors = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((360 / count) * i)
    return `hsl(${hue}, 50%, 55%)`
  })
}
</script>
