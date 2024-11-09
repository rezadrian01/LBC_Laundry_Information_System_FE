import { useNavigate } from 'react-router-dom';

import StatisticCard from '@mods/Dashboard/statisticCard';
import Sidebar from '@mods/Sidebar/sidebar';
import Header from '@mods/Header/header';
import OrderCounter from '@mods/Dashboard/orderCounter';
import DefaultLayout from '@layouts/Default';
import { useDispatch, useSelector } from 'react-redux';
import { orderAction } from '@/stores/order';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { isLoading } = useAuth();

    // Reset Global State
    useEffect(() => {
        dispatch(orderAction.resetOrder());
    }, [])

    const handleAddNewOrderClick = () => {
        navigate('/new-order');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasBranchBtn onClick={handleAddNewOrderClick} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                {!isLoading && <>
                <StatisticCard title="Pendapatan Harian" />
                <OrderCounter />
                </>
                }
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;