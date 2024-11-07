import DefaultLayout from '@/components/Layouts/Default';
import Crud from '@/components/Modules/Crud';
import Footer from '@/components/Modules/Footer';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { TABLE_CONTENT } from '@/constants/orderList';
import { TABLE_HEADER } from '@/constants/orderList';

const Orders = () => {
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