import CrudLayout from '@/components/Layouts/Crud';
import Search from '../Search';
import Button from '@/components/UI/Button';
import EachUtils from '@/utils/eachUtils';
import { ORDER_STATUS_LIST } from '@/constants/orderStatusList';

const Crud = ({ keys, tableHeader = [], tableContent = [], isOrderList = false, isItemList = false, isWeightPriceList = false, isBranchList = false, children }) => {
    return (
        <>
            <CrudLayout>
                <section className='mt-4 md:mt-10'>

                    {/* Searchbar */}
                    {(isOrderList || isItemList) && <div className='grid grid-cols-6'>
                        {isOrderList && <div className='col-span-6'>
                            <Search />
                        </div>}

                        {isItemList && <div className='col-span-5'>
                            <Search />
                        </div>}

                        {isItemList && <Button>Tambah Item</Button>}
                    </div>}

                    <table className='text-center text-[.73rem] md:text-base font-semibold w-full table-fixed mt-4 md:mt-10'>
                        <thead className='border-b-2 border-b-primary-pink-300 text-primary-pink-300'>
                            <tr>
                                <EachUtils of={tableHeader} render={(item, index) => {
                                    return <td className='py-4' key={index}>{item.title}</td>;
                                }} />
                            </tr>
                        </thead>
                        <tbody>
                            <EachUtils of={tableContent} render={(item, index) => {
                                return <tr key={item.id}>
                                    <EachUtils of={keys} render={(key, index) => {
                                        let content = item[key];

                                        if (isOrderList) {
                                            if (index === 2) {
                                                const currentStatus = item[key];
                                                const orderStatusIndex = ORDER_STATUS_LIST.findIndex(status => status.title.toLowerCase() === currentStatus.toLowerCase());
                                                content = <OrderStatusSelect defaultValue={currentStatus} orderStatusIndex={orderStatusIndex}>
                                                    <EachUtils of={ORDER_STATUS_LIST} render={(orderStatus, index) => {
                                                        return <option key={index} value={orderStatus.title}>{orderStatus.title}</option>;
                                                    }} />
                                                </OrderStatusSelect>;
                                            }
                                        }

                                        return <td className='py-4' key={index}>{content}</td>;
                                    }} />
                                </tr>;
                            }} />
                        </tbody>
                    </table>
                </section>
            </CrudLayout>
        </>
    );
};

const OrderStatusSelect = ({ orderStatusIndex, defaultValue, children }) => {
    let content;
    let cssClass = "outline-none text-primary-pink-100 p-1 rounded ";
    switch (orderStatusIndex) {
        case 0:
            cssClass += "bg-blue-500 ";
            break;
        case 1:
            cssClass += "bg-gradient-cyan ";
            break;
        case 2:
            cssClass += "bg-primary-pink-300 ";
            break;
        case 3:
            cssClass += "bg-gradient-purple ";
            break;
        case 4:
            cssClass += "bg-indigo-500 ";
            break;
    }
    return <select className={cssClass} defaultValue={defaultValue}>
        {children}
    </select>;
};

export default Crud;