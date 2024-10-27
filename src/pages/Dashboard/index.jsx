import StatisticCard from '@/components/Modules/Dashboard/statisticCard';
import Sidebar from '@mods/Sidebar/sidebar';
import Header from '@/components/Modules/Header/header';
import React from 'react';
import OrderCounter from '@/components/Modules/Dashboard/orderCounter';
import DefaultLayout from '@/components/Layouts/Default';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();


    const handleAddNewOrderClick = () => {
        navigate('/new-order');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header onClick={handleAddNewOrderClick} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <StatisticCard title="Pendapatan Harian" />
                <OrderCounter />
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;