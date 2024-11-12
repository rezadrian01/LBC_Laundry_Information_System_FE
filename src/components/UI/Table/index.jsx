import { FaRegTrashAlt } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { HiMinusSmall } from 'react-icons/hi2';

import EachUtils from '@/utils/eachUtils';
import { ITEM_SERVICE_LIST } from '@/constants/itemServiceList';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import { useState } from 'react';
import { orderAction } from '@/stores/order';

const Table = ({ headerCol, tableContent, isSummary = false, isItemOrderSummary = false, isWeightOrderSummary = false }) => {
    const dispatch = useDispatch();
    const [selectedItemId, setSelectedItemId] = useState(null);
    const { mutate: getServiceIdFn } = useMutation({
        mutationFn: async (data) => {
            return apiInstance(`itemService/itemIdAndServiceName/${selectedItemId}`, {
                data,
                method: "POST"
            });
        },
        onSuccess: (response) => {
            const { itemId, name, price, _id: serviceId } = response.data.data;
            setSelectedItemId(null);
            dispatch(orderAction.changeService({ prevItemServiceId }));
        }
    });
    const handleChangeServiceChange = (value, itemId) => {
        setSelectedItemId(itemId);
        getServiceIdFn({ serviceName: value });
    };
    const handleChangeQuantity = (isIncrement, itemServiceId) => {
        if (isIncrement) {
            dispatch(orderAction.incrementItemQuantity({ itemServiceId }));
        } else {
            dispatch(orderAction.decrementItemQuantity({ itemServiceId }));
        }
    }
    const handleDelete = (itemServiceId) => {

    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID').format(price);
    }

    return (
        <div className="overflow-auto scrollbar-hide">
            <table className='text-center text-[.73rem] md:text-base font-semibold w-full table-fixed'>
                <thead className='bg-primary-pink-300 text-primary-pink-100 '>
                    <tr>
                        <EachUtils of={headerCol} render={(item, index) => {
                            return <td className=' py-2 px-4' key={index}>{item.title}</td>;
                        }} />
                    </tr>
                </thead>
                <tbody>
                    <EachUtils of={tableContent} render={(item, index) => {
                        return <tr className="">
                            <td className='p-2 md:p-4'>{isItemOrderSummary ? item.itemName : item.weight}</td>

                            <td className='p-2 md:p-4'>
                                {/* {!isSummary && <select onChange={({ target }) => handleChangeServiceChange(target.value, item.itemId)} defaultValue={item.serviceName} className='outline-none'>
                                    {ITEM_SERVICE_LIST.map((service, index) => {
                                        return <option key={index} value={service.name}>{service.name}</option>;
                                    })}
                                </select>} */}
                                {!isSummary && item.serviceName}

                                {isSummary && (isItemOrderSummary ? item.serviceName : item.quantity)}
                            </td>

                            {isItemOrderSummary && <td className='p-2 md:p-4 w-full h-full'>
                                <div className="flex gap-4 justify-center items-center">
                                    {!isSummary &&
                                        <>
                                        <button onClick={() => handleChangeQuantity(false, item.itemServiceId)}>
                                                <HiMinusSmall />
                                            </button>
                                            {item.quantity}
                                        <button onClick={() => handleChangeQuantity(true, item.itemServiceId)}>
                                                <GoPlus />
                                            </button>
                                        </>
                                    }
                                    {isSummary && (isItemOrderSummary ? item.quantity : item.service)}
                                </div>
                            </td>}
                            {!isSummary && <td>
                                <button className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-full'><FaRegTrashAlt /></button>
                            </td>}
                            {isSummary && <>
                                <td className='p-2 md:p-4'>{isItemOrderSummary ? formatPrice(+item.price) : item.services}</td>
                                <td className='p-2 md:p-4'>{isItemOrderSummary ? formatPrice(+item.price * +item.quantity) : formatPrice(item.price)}</td>
                            </>}
                        </tr>;
                    }} />
                </tbody>
            </table>
        </div>
    );
};

export default Table;