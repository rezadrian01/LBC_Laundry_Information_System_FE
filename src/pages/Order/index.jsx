import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import { ORDER_DETAIL_FIELDS } from '@/constants/detailFieldList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { queryClient } from '@/utils/query';
import { useState } from 'react';

const Order = () => {
    const { orderId } = useParams();
    const { isLoading: loadAuthData } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const { data: existingOrder, isPending: isPendingOrderDetail, isError: isErrorOrderDetail } = useQuery({
        queryKey: ['orders', { orderId }],
        queryFn: async () => {
            const response = await apiInstance(`laundry/id/${orderId}`);
            return response.data.data;
        }
    });

    if (isErrorOrderDetail) throw new Error("Failed to fetch order detail");

    const keys = ['receiptNumber', 'formatedDate', 'branch', 'customerName', 'customerAddress', 'customerContact', 'formatedPrice', 'status', 'isPaidOff'];
    if (!isPendingOrderDetail) {
        const formatedDate = new Date(existingOrder.createdAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        const formatedPrice = new Intl.NumberFormat('id-ID').format(existingOrder.totalPrice);
        existingOrder.formatedPrice = formatedPrice
        existingOrder.formatedDate = formatedDate;
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {isPendingOrderDetail && !loadAuthData && <FallbackText />}
            {!isPendingOrderDetail && !loadAuthData &&
                <CreateLayout isNew={false} itemKey={existingOrder.receiptNumber} isDelete={isDelete} setIsDelete={setIsDelete} queryKey={['orders', { orderId }]} requestUrl='laundry/isPaidOff' isOrderDetail keys={keys} defaultValues={existingOrder} fields={ORDER_DETAIL_FIELDS} dropdownIndex={8} title="Detail Pesanan" />
            }
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Order;