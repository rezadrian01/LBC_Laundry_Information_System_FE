import DefaultLayout from '@/components/Layouts/Default';
import OrderLayout from '@/components/Layouts/Order';
import CustomerData from '@/components/Modules/CustomerData';
import Footer from '@/components/Modules/Footer';
import Input from '@/components/UI/Input';
import InputGroup from '@/components/UI/InputGroup';
import Table from '@/components/UI/Table';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/orderItemSummary';

const OrderSummary = () => {
    return (
        <DefaultLayout>
            <OrderLayout gap='gap-6' titleSize='3xl' title="Nota Satuan">
                <section className='flex flex-col gap-2'>
                    <InputGroup textCenter={false} isOrderSummary={true} label="No. Nota" id="receiptNumber" name="receiptNumber" />
                    <InputGroup textCenter={false} isOrderSummary={true} label="Tanggal" id="date" name="date" />
                    <InputGroup textCenter={false} isOrderSummary={true} label="Cabang" id="branch" name="branch" />
                </section>
                <Table headerCol={TABLE_HEADER} tableContent={TABLE_CONTENT} isSummary={true} />
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

// const InputGroup = ({ label, id, name, textCenter = false }) => {
//     return <div className='grid grid-cols-4 md:grid-cols-12 items-center gap-4 w-full'>
//         <label className='col-span-1 md:col-span-2 text-nowrap font-semibold' id={id}>{label}</label>
//         <Input grid={true} padding="py-[.5px] px-2" id={id} name={name} textCenter={textCenter} />
//     </div>;
// };

export default OrderSummary;