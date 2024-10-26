import { ORDER_COUNTER } from '@/constants/orderCounter';
import OrderCounterCard from './orderCounterCard';
import EachUtils from '@/utils/eachUtils';

const OrderCounter = () => {
    return (
        <div className='grid grid-cols-2 grid-rows-2 gap-2 md:gap-6'>
            <EachUtils of={ORDER_COUNTER} render={(item, index) => {
                return <OrderCounterCard index={index} key={index} item={item} />;
            }} />
        </div>
    );
};

export default OrderCounter;