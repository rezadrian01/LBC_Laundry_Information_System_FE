import { useQuery } from '@tanstack/react-query';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT } from '@/constants/orderList';
import { TABLE_HEADER } from '@/constants/orderList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';

const Orders = () => {
    useAuth();
    const { data: orderList, isPending: isPendingOrderList, isError: isErrorOrderList } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await apiInstance('laundry/unarchived');
            return response.data.data;
        },
        retry: false
    });
    const { data: orderStatusList, isPending: isPendingOrderStatusList, isError: errorOrderStatusList } = useQuery({
        queryKey: ['order-status-list'],
        queryFn: async () => {
            const response = await apiInstance('status');
            return response.data.data;
        }
    });

    if (isErrorOrderList || errorOrderStatusList) throw new Error("Failed to fetch orders");
    const keys = ["receiptNumber", "customerName", "status"];
    return (
        <DefaultLayout>
            <Sidebar />
            {isPendingOrderList || isPendingOrderStatusList && <FallbackText />}
            {!isPendingOrderList && !isPendingOrderStatusList && <Crud dataCompare={orderStatusList} keys={keys} isOrderList tableHeader={TABLE_HEADER} tableContent={orderList} />}
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Orders;   