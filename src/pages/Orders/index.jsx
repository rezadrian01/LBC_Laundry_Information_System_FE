import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_HEADER } from '@/constants/orderList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import { queryClient } from '@/utils/query';
import { orderStatusAction } from '@/stores/orderStatus';

const Orders = () => {
    const { inView, ref } = useInView();
    const { activeOrderStatusId } = useSelector(state => state.orderStatus);
    const dispatch = useDispatch();

    const { isLoading: loadAuthData } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [selectedOrderTabIndex, setSelectedOrderTabIndex] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [showTab, setShowTab] = useState(true);


    // Pending first before loadAuthData = false
    const { data: orderStatusList, isLoading: isloadingOrderStatusList, isError: errorOrderStatusList } = useQuery({
        queryKey: ['order-status-list'],
        queryFn: async () => {
            const response = await apiInstance('status');
            return response.data.data;
        },
        enabled: !loadAuthData,
        refetchOnWindowFocus: false,
        retry: false
    });


    const { data, isLoading: isLoadingOrderList, isError: isErrorOrderList, refetch: refetchOrderList } = useQuery({
        queryKey: ['orders', { currentPage }, { orderStatus: activeOrderStatusId || orderStatusList?.[selectedOrderTabIndex]?._id } || ""],
        queryFn: async () => {
            const response = await apiInstance(`laundryStatus/status/${activeOrderStatusId || orderStatusList[selectedOrderTabIndex]?._id}?page=${currentPage}`);
            const { data } = response;

            setHasNextPage(data.data.hasNextPage);
            setOrderList(prev => {
                return [...prev, ...data.data.laundryList];
            });

            if (activeOrderStatusId) {
                setSelectedOrderTabIndex(prev => {
                    const index = orderStatusList.findIndex(status => status._id === activeOrderStatusId);
                    return index;
                })
            }

            return data.data.laundryList;
        },
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !loadAuthData && !isloadingOrderStatusList
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
            setOrderList([]);

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

    const { data: searchedOrder, isLoading: isLoadingSearchedOrder, isError } = useQuery({
        queryKey: ['orders', { searchInput }],
        queryFn: async () => {
            const response = await apiInstance(`laundry/receiptNumber/${searchInput}`);
            setTriggerSearch(false);
            setShowTab(false);
            setOrderList([response.data.data]);
            return response.data.data;
        },
        enabled: triggerSearch,

    });

    // Trigger refetch if user on bottom
    useEffect(() => {
        if (hasNextPage && !isLoadingOrderList && inView) {
            setCurrentPage(prev => prev + 1);
        }
    }, [inView]);


    const handleDropdownChange = (orderId, statusId) => {
        updateOrderStatusFn({ orderId, statusId });
    }

    const handleSelectTab = (index) => {
        // dispatch(orderStatusAction.resetActiveOrderStatusId());
        dispatch(orderStatusAction.setActiveOrderStatusId(orderStatusList[index]._id));
        setCurrentPage(1);
        setSelectedOrderTabIndex(index);
        setOrderList([]);
    }

    const handleSearchClick = () => {
        if (searchInput.trim() === "") {
            setShowTab(true);
            setOrderList([]);
            refetchOrderList();
            return;
        }
        setTriggerSearch(true);
    }

    const handleChangeSearchInput = (value) => {
        if (value.trim() === "") {
            setShowTab(true);
            setOrderList([]);
            refetchOrderList();
        }
        setSearchInput(value);
    }


    if (isErrorOrderList || errorOrderStatusList) throw new Error("Failed to fetch orders");
    const keys = ["receiptNumber", "customerName", "status"];

    return (
        <DefaultLayout>
            <Sidebar />
            {isLoadingOrderList || isloadingOrderStatusList && !loadAuthData && <FallbackText />}
            {!isloadingOrderStatusList && !loadAuthData &&
                <Crud onSearchClick={handleSearchClick}
                    searchInput={searchInput}
                    setSearchInput={handleChangeSearchInput}
                    selectedTabIndex={selectedOrderTabIndex}
                    setSelectedTab={handleSelectTab}
                    hasTab={showTab}
                    tabMenu={orderStatusList}
                    dataCompare={orderStatusList}
                    keys={keys}
                    isOrderList
                    tableHeader={TABLE_HEADER}
                    isPending={isLoadingOrderList}
                    tableContent={orderList}
                    onDropdownChange={handleDropdownChange} />}

            <div ref={ref} className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Orders;   