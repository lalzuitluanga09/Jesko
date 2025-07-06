
<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[22rem]" />
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
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            // {
            //     label: 'First Dataset',
            //     data: [65, 59, 80, 81, 56, 55, 40],
            //     fill: false,
            //     tension: 0.4,
            //     borderColor: documentStyle.getPropertyValue('--p-cyan-500')
            // },
            // {
            //     label: 'Second Dataset',
            //     data: [28, 48, 40, 19, 86, 27, 90],
            //     fill: false,
            //     borderDash: [5, 5],
            //     tension: 0.4,
            //     borderColor: documentStyle.getPropertyValue('--p-orange-500')
            // },
            {
                label: 'Sales',
                data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000),
                fill: true,
                borderColor: 'rgba(0, 149, 255, 0.8)',
                tension: 0.4,
                backgroundColor: 'rgba(0, 149, 255, 0.2)',
            }
        ]
    };
};
const setChartOptions = () => {

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(0, 149, 255, 1)'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'gray'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0)',
                }
            },
            y: {
                ticks: {
                    color: 'gray'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0)',
                }
            }
        }
    };
}
</script>
