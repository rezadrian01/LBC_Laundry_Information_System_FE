import React from 'react';

const StatisticCard = ({ title }) => {
    return (
        <div>
            <div className='p-4 w-full aspect-square bg-gradient-to-b from-pink-50 to bg-primary-pink-200 border-[1px] rounded-xl md:rounded-3xl shadow-lg'>
                <div className='flex flex-col items-center justify-center text-primary-pink-600 sm:text-2xl'>
                    <h3>{title}</h3>
                    {/* Statistic */}
                </div>
            </div>
        </div>
    );
};

export default StatisticCard;