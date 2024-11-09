import { ORDER_COUNTER } from '@/constants/orderCounter';
import OrderCounterCard from './orderCounterCard';
import EachUtils from '@/utils/eachUtils';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';

const OrderCounter = () => {
    let { data: totalOrderPerStatus, isPending, isError, error } = useQuery({
        queryKey: ['total-order-per-status'],
        queryFn: async () => {
            const response = await apiInstance('laundryStatus/totalLaundryPerStatus');
            console.log(response.data.data);
            return response.data.data;
        }
    });
    if (isPending) return <FallbackText />;
    totalOrderPerStatus = totalOrderPerStatus.filter(status => status.name !== "Sudah Diambil");
    return (
        <div className='grid grid-cols-2 grid-rows-2 gap-2 md:gap-6 relative'>
            <EachUtils of={totalOrderPerStatus} render={(item, index) => {
                return <OrderCounterCard index={index} key={index} item={item} />;
            }} />
        </div>
    );
};

export default OrderCounter;