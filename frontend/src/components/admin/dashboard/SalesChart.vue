
<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[22rem]" />
    </div>
</template>

<script setup lang="ts">
import { useDashboard } from '@/stores/dashboard';
import Chart from 'primevue/chart';
import { ref, onMounted, computed } from "vue";

// const chartData = ref();
const chartOptions = ref();

const dashboard = useDashboard()

const chartData = computed(() => setChartData(dashboard.filter));

onMounted(() => {
    chartOptions.value = setChartOptions();
});

const labelMap: Record<string, string> = {
        today: 'Last 7 Days Sales',
        last_7_days: 'Last 7 Days Sales',
        this_month: 'This Month\'s Sales',
        this_year: 'This Year\'s Sales',
    };

        
const setChartData = (type: string = 'last_7_days') => {
    return {
        labels: dashboard.salesData.map(item => item.label),
        datasets: [
            {
                label: labelMap[type],
                data: dashboard.salesData.map(item => item.total_sales),
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
                    color: 'rgba(0, 0, 0, 0.0)',
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
