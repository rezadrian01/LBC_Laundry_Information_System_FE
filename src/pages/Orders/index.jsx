import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_HEADER } from '@/constants/orderList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import { queryClient } from '@/utils/query';

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
    const { mutate: updateOrderStatusFn, isPending: isPendingUpdateOrderStatus } = useMutation({
        mutationFn: async ({ orderId, statusId }) => {
            return apiInstance(`laundryStatus/${orderId}`, {
                data: {
                    newStatusId: statusId
                },
                method: "PUT"
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (response) => {
            Swal.fire({
                title: "Data gagal diupdate",
                text: "Maaf saat ini terjadi error di server, anda bisa mencobanya lagi nanti.",
                icon: "error",
                confirmButtonColor: '#f87aac'
            }).then(result => {
                navigate('..');
            });
        }
    });

    const handleDropdownChange = (orderId, statusId) => {
        updateOrderStatusFn({ orderId, statusId });
    }

    if (isErrorOrderList || errorOrderStatusList) throw new Error("Failed to fetch orders");
    const keys = ["receiptNumber", "customerName", "status"];
    return (
        <DefaultLayout>
            <Sidebar />
            {isPendingOrderList || isPendingOrderStatusList && <FallbackText />}
            {!isPendingOrderList && !isPendingOrderStatusList && <Crud dataCompare={orderStatusList} keys={keys} isOrderList tableHeader={TABLE_HEADER} tableContent={orderList} onDropdownChange={handleDropdownChange} />}
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Orders;   