import { useParams } from 'react-router-dom';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import { ORDER_DETAIL_FIELDS } from '@/constants/detailFieldList';
import { TABLE_CONTENT } from '@/constants/orderList';

import useAuth from '@/hooks/useAuth';

const Order = () => {
    const { orderId } = useParams();
    useAuth();
    const keys = ['receiptNumber', 'createdAt', 'branch', 'customerName', 'customerAddress', 'customerPhone', 'service', 'price', 'status', 'estimateDay', 'isPaidOff'];

    const existingOrder = TABLE_CONTENT.find(order => order.id === +orderId);
    const formatedDate = new Date(existingOrder.createdAt).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    existingOrder.createdAt = formatedDate;
    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <CreateLayout isOrderDetail keys={keys} defaultValues={existingOrder} fields={ORDER_DETAIL_FIELDS} dropdownIndex={10} title="Detail Pesanan" confirmAlert={false} />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Order;