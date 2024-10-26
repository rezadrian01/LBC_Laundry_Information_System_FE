import StatisticCard from '@/components/Modules/Dashboard/statisticCard';
import Sidebar from '@mods/Sidebar/sidebar';
import DashboardHeader from '@mods/Dashboard/header';
import React from 'react';
import OrderCounter from '@/components/Modules/Dashboard/orderCounter';

const Dashboard = () => {
    return (
        <div className='px-10 md:px-32 lg:max-w-[100rem] mx-auto pb-20'>
            <Sidebar />
            <DashboardHeader />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <StatisticCard title="Pendapatan Harian" />
                <OrderCounter />
            </div>
        </div>
    );
};

export default Dashboard;