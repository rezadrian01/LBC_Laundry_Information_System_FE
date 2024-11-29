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
import { REPORT_CONTENT_LIST } from '@/constants/reportList';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { isLoading } = useAuth();

    const fallbackData = [
        {
            id: 1,
            totalIncome: 0,
            day: "Senin"
        },
        {
            id: 2,
            totalIncome: 0,
            day: "Selasa"
        },
        {
            id: 3,
            totalIncome: 0,
            day: "Rabu"
        },
        {
            id: 4,
            totalIncome: 0,
            day: "Kamis"
        },
        {
            id: 5,
            totalIncome: 0,
            day: "Jumat"
        },
        {
            id: 6,
            totalIncome: 0,
            day: "Sabtu"
        },
        {
            id: 7,
            totalIncome: 0,
            day: "Minggu"
        },
    ]

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
            {!isLoading && <Header hasBranchBtn onClick={handleAddNewOrderClick} />}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                {!isLoading && <>
                    <StatisticCard datasetTitle="Penghasilan Selama Seminggu" datasets={REPORT_CONTENT_LIST} title="Pendapatan Harian" />
                <OrderCounter />
                </>
                }
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;