import { FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";

import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/orderItemTable';
import EachUtils from '@/utils/eachUtils';
import { useDispatch } from "react-redux";


const OrderItemTable = () => {
    const dispatch = useDispatch();

    const handleSelectServiceChange = (value, itemId) => {
        console.log(value, itemId);
    }

    return (
        <div className="overflow-auto scrollbar-hide">
            <table className='text-center text-[.73rem] md:text-base font-semibold w-full table-fixed'>
                <thead className='bg-primary-pink-300 text-primary-pink-100 '>
                    <tr>
                        <EachUtils of={TABLE_HEADER} render={(item, index) => {
                            return <td className=' py-2 px-4' key={index}>{item.title}</td>;
                        }} />
                    </tr>
                </thead>
                <tbody>
                    <EachUtils of={TABLE_CONTENT} render={(item, index) => {
                        return <tr className="">
                            <td className='p-2 md:p-4'>{item.title}</td>
                            <td className='p-2 md:p-4'>
                                <select onChange={({ target }) => handleSelectServiceChange(target.value, item.id)} defaultValue={item.services[item.serviceIndex]} className='outline-none'>
                                    {item.services.map((service, index) => {
                                        return <option key={index} value={service}>{service}</option>;
                                    })}
                                </select>
                            </td>
                            <td className='p-2 md:p-4 w-full h-full'>
                                <div className="flex gap-4 justify-center items-center">
                                    <button>
                                        <HiMinusSmall />
                                    </button>
                                    {item.quantity}
                                    <button>
                                        <GoPlus />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <button className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-full'><FaRegTrashAlt /></button>
                            </td>
                        </tr>;
                    }} />
                </tbody>
            </table>
        </div>
    );
};

export default OrderItemTable;