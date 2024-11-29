import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChart = ({ chartData, title }) => {
    return (
        <div className='h-full w-full flex flex-col justify-end items-center'>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            // give 10% height on top
                            suggestedMax: Math.max(...chartData.datasets[0].data) * 1.1,
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    },
                }}
                height={300}
                width={300}
            />
        </div>
    )
}

export default BarChart