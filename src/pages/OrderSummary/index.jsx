import DefaultLayout from '@/components/Layouts/Default';
import OrderLayout from '@/components/Layouts/Order';
import CustomerData from '@/components/Modules/CustomerData';
import Footer from '@/components/Modules/Footer';
import InputGroup from '@/components/UI/InputGroup';
import Table from '@/components/UI/Table';
import { TABLE_CONTENT as TABLE_CONTENT_ITEM, TABLE_HEADER as TABLE_HEADER_ITEM } from '@/constants/orderItemSummary';
import { TABLE_CONTENT as TABLE_CONTENT_WEIGHT, TABLE_HEADER as TABLE_HEADER_WEIGHT } from '@/constants/orderWeightSummary';
import { useLocation } from 'react-router-dom';

const OrderSummary = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    return (
        <DefaultLayout>
            <OrderLayout gap='gap-6' titleSize='3xl' title="Nota Satuan">
                <section className='flex flex-col gap-2'>
                    <InputGroup textCenter={false} isOrderSummary={true} label="No. Nota" id="receiptNumber" name="receiptNumber" />
                    <InputGroup textCenter={false} isOrderSummary={true} label="Tanggal" id="date" name="date" />
                    <InputGroup textCenter={false} isOrderSummary={true} label="Cabang" id="branch" name="branch" />
                </section>
                <Table headerCol={path === "weight" ? TABLE_HEADER_WEIGHT : TABLE_HEADER_ITEM} tableContent={path === "weight" ? TABLE_CONTENT_WEIGHT : TABLE_CONTENT_ITEM} isSummary={true} isItemOrderSummary={path === "item"} isWeightOrderSummary={path === "weight"} />
                <div>
                    <div className='grid grid-cols-6 items-center w-full bg-primary-pink-300 text-primary-pink-100 text-center p-2 md:p-4 font-semibold'>
                        <h3 className="col-span-4">Total Harga</h3>
                        <p className='col-span-2'>40000</p>
                    </div>
                    <CustomerData />
                </div>
                <Footer />
            </OrderLayout>
        </DefaultLayout>
    );
};


export default OrderSummary;