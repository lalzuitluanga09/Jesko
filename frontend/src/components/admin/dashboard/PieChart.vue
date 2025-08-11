<template>
    <div class="card flex justify-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[20rem]" />
    </div>
</template>

<script setup>
import Chart from 'primevue/chart';
import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
        datasets: [
            {
                data: [140, 625, 802, 290, 315],
                backgroundColor: ['#7EC8E3', '#98D98E', '#FFD580', '#FF8B8B', '#FF9A8B'],
                hoverBackgroundColor: ['#357ca5', '#4e7c3a', '#bfa13a', '#b23a3a', '#b25a3a']
            }
        ]
    };
};

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
</script>
