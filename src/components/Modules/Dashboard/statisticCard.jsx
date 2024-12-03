import React, { useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { REPORT_CONTENT_LIST } from '@/constants/reportList';
import BarChart from '@mods/BarChart';

Chart.register(CategoryScale);

const StatisticCard = ({ title, datasetTitle = "", datasets = [], labelKey = 'day' }) => {
    const LABEL_KEY = labelKey;
    const VALUE_KEY = 'totalIncome';
    const DATE_KEY = 'endDate';

    const chartData = {
        labels: datasets.map((data) => data[LABEL_KEY]),
        datasets: [
            {
                label: "Penghasilan ",
                data: datasets.map((data) => data[VALUE_KEY]),
                backgroundColor: 'rgba(255, 193, 204, 0.5)',
                borderColor: "#f03285",
                borderWidth: 2,
            },
        ],
    }

    return (
        <div>
            <div className='p-2 sm:p-4 w-full aspect-square bg-gradient-to-b from-pink-50 to bg-primary-pink-200 border-[1px] rounded-xl md:rounded-3xl shadow-lg'>
                <div className='flex flex-col items-center justify-center text-primary-pink-600 sm:text-2xl h-full'>
                    <h3>{title}</h3>
                    {/* Statistic */}
                    <BarChart chartData={chartData} title={datasetTitle} />
                </div>
            </div>
        </div>
    );
};

export default StatisticCard;