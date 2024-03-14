import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

interface SplineChartProps {
    data: number[];
    index: number; // Add index prop
}

const SplineChart: React.FC<SplineChartProps> = ({ data, index }) => {
    // Ensure data is not empty
    if (!data || data.length === 0) return null;

    // Prepare labels for x-axis (assuming data is equally spaced)
    const labels = Array.from({ length: data.length }, (_, i) => i + 1);

    // Create chart data
    const chartData = {
        labels: labels,
        datasets: [{
            // label: 'Pricing',
            data: data,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            tension: 0.5, // Adjust the tension to make the spline smoother or sharper
            pointRadius: 0, // Remove the points
            pointHoverRadius: 0,
        }]
    };

    // Create the chart after the component is mounted
    useEffect(() => {
        const ctx = document.getElementById(`spline-chart-${index}`) as HTMLCanvasElement; // Concatenate index to canvas ID
        const chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false, // Hide legend
                    },
                },
                scales: {
                    x: {
                        display: false, // Hide x-axis
                    },
                    y: {
                        display: false, // Hide y-axis
                    },
                },
            },
        });

        // Cleanup function to destroy the chart when component unmounts
        return () => chart.destroy();
    }, [data, index]); // Update the chart when data or index changes

    return <canvas id={`spline-chart-${index}`} />; // Concatenate index to canvas ID
};

export default SplineChart;
