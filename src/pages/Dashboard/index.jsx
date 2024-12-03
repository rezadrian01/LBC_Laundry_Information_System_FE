import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import StatisticCard from '@mods/Dashboard/statisticCard';
import Sidebar from '@mods/Sidebar/sidebar';
import Header from '@mods/Header/header';
import OrderCounter from '@mods/Dashboard/orderCounter';
import DefaultLayout from '@layouts/Default';
import { orderAction } from '@/stores/order';
import useAuth from '@/hooks/useAuth';
import { REPORT_CONTENT_LIST } from '@/constants/reportList';
import apiInstance from '@/utils/apiInstance';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { isLoading: loadAuthData } = useAuth();
    const { activeBranch } = useSelector(state => state.branch);

    let { data: reportList, isLoading: isLoadingReportList, isError, error, isFetched: isFetchedReportList } = useQuery({
        queryKey: ['reports', { period: 'harian' }, { branchId: activeBranch.id }],
        queryFn: async () => {
            const response = await apiInstance(`report/reportByPeriod/harian/${activeBranch.id}`);
            return response.data.data;
        },
        enabled: !loadAuthData,
        gcTime: 0
    });

    if (isFetchedReportList) {
        reportList = reportList.map(report => {
            const day = new Date(report.endDate).toLocaleDateString('id-ID', { weekday: 'long' });
            console.log(day);
            return { ...report, day }
        });
        reportList.reverse();
    }


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
            {!loadAuthData && <Header hasBranchBtn onClick={handleAddNewOrderClick} />}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                {/* {!isLoadingReportList && isFetchedReportList && <> */}
                <StatisticCard datasetTitle="Penghasilan Selama Seminggu" datasets={reportList} title="Pendapatan Harian" />
                {/* </> */}
                {/* } */}
                {!loadAuthData && <OrderCounter />}
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;