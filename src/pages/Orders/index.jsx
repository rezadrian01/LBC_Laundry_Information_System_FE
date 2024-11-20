import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useInView } from 'react-intersection-observer';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_HEADER } from '@/constants/orderList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import { queryClient } from '@/utils/query';
import { useEffect, useState } from 'react';

const Orders = () => {
    const { isLoading: loadAuthData } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const { inView, ref } = useInView();
    const [selectedOrderTabIndex, setSelectedOrderTabIndex] = useState(0);

    // Pending first before loadAuthData = false


    const { data: orderStatusList, isLoading: isLoadingOrderStatusList, isError: errorOrderStatusList } = useQuery({
        queryKey: ['order-status-list'],
        queryFn: async () => {
            const response = await apiInstance('status');
            return response.data.data;
        },
        enabled: !loadAuthData
    });

    const { data, isPending: isPendingOrderList, isError: isErrorOrderList, refetch: refetchOrderList } = useQuery({
        queryKey: ['orders', { currentPage }, { orderStatus: orderStatusList?.[selectedOrderTabIndex]?._id } || ""],
        queryFn: async () => {
            const response = await apiInstance(`laundryStatus/status/${orderStatusList[selectedOrderTabIndex]?._id}?page=${currentPage}`);
            const { data } = response;
            setHasNextPage(data.data.hasNextPage);
            setOrderList(prev => {
                return [...prev, ...data.data.laundryList];
            });
            return data.data.laundryList;
        },
        retry: false,
        enabled: !loadAuthData && !isLoadingOrderStatusList
    });

    useEffect(() => {
        if (hasNextPage && !isPendingOrderList && inView) {
            // refetchOrderList();
            setCurrentPage(prev => prev + 1);
            // queryClient.invalidateQueries({ queryKey: ['orders', { currentPage }] });
        }
    }, [inView])

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

    const handleSelectTab = (index) => {
        setCurrentPage(1);
        setSelectedOrderTabIndex(index);
        setOrderList([]);
    }

    if (isErrorOrderList || errorOrderStatusList) throw new Error("Failed to fetch orders");
    const keys = ["receiptNumber", "customerName", "status"];
    return (
        <DefaultLayout>
            <Sidebar />
            {isPendingOrderList || isLoadingOrderStatusList && !loadAuthData && <FallbackText />}
            {!isLoadingOrderStatusList && !loadAuthData && <Crud selectedTabIndex={selectedOrderTabIndex} setSelectedTab={handleSelectTab} hasTab tabMenu={orderStatusList} dataCompare={orderStatusList} keys={keys} isOrderList tableHeader={TABLE_HEADER} tableContent={orderList} onDropdownChange={handleDropdownChange} />}
            <div ref={ref} className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Orders;   