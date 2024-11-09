import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import { ORDER_DETAIL_FIELDS } from '@/constants/detailFieldList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import Sidebar from '@/components/Modules/Sidebar/sidebar';

const Order = () => {
    const { orderId } = useParams();
    useAuth();
    const { data: existingOrder, isPending, isError, error } = useQuery({
        queryKey: ['orders', { orderId }],
        queryFn: async () => {
            const response = await apiInstance(`laundry/id/${orderId}`);
            return response.data.data;
        }
    });
    if (isError) throw new Error("Failed to fetch order detail");

    const keys = ['receiptNumber', 'formatedDate', 'branch', 'customerName', 'customerAddress', 'customerContact', 'totalPrice', 'status', 'isPaidOff'];
    if (!isPending) {

        const formatedDate = new Date(existingOrder.createdAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        existingOrder.formatedDate = formatedDate;
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {isPending && <FallbackText />}
            {!isPending && <CreateLayout isOrderDetail keys={keys} defaultValues={existingOrder} fields={ORDER_DETAIL_FIELDS} dropdownIndex={8} title="Detail Pesanan" confirmAlert={false} />}
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Order;