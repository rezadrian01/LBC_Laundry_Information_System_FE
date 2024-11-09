import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT } from '@/constants/orderList';
import { TABLE_HEADER } from '@/constants/orderList';

import useAuth from '@/hooks/useAuth';

const Orders = () => {
    useAuth();
    const keys = ["receiptNumber", "customerName", "status"];
    return (
        <DefaultLayout>
            <Sidebar />
            <Crud keys={keys} isOrderList tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Orders;   