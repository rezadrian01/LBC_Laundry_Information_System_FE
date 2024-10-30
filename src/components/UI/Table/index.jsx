import { FaRegTrashAlt } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { HiMinusSmall } from 'react-icons/hi2';

import EachUtils from '@/utils/eachUtils';

const Table = ({ headerCol, tableContent, isSummary = false, isItemOrderSummary = false, isWeightOrderSummary = false }) => {
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
                            <td className='p-2 md:p-4'>{isItemOrderSummary ? item.title : item.weight}</td>
                            <td className='p-2 md:p-4'>
                                {!isSummary && <select onChange={({ target }) => handleSelectServiceChange(target.value, item.id)} defaultValue={item.services[item.serviceIndex]} className='outline-none'>
                                    {item.services.map((service, index) => {
                                        return <option key={index} value={service}>{service}</option>;
                                    })}
                                </select>}
                                {isSummary && (isItemOrderSummary ? item.service : item.quantity)}
                            </td>
                            <td className='p-2 md:p-4 w-full h-full'>
                                <div className="flex gap-4 justify-center items-center">
                                    {!isSummary &&
                                        <>
                                            <button>
                                                <HiMinusSmall />
                                            </button>
                                            {item.quantity}
                                            <button>
                                                <GoPlus />
                                            </button>
                                        </>
                                    }
                                    {isSummary && (isItemOrderSummary ? item.quantity : item.service)}
                                </div>
                            </td>
                            {!isSummary && <td>
                                <button className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-full'><FaRegTrashAlt /></button>
                            </td>}
                            {isSummary && <>
                                <td className='p-2 md:p-4'>{isItemOrderSummary ? item.price : item.serviceTime}</td>
                                <td className='p-2 md:p-4'>{isItemOrderSummary ? item.total : item.price}</td>
                            </>}
                        </tr>;
                    }} />
                </tbody>
            </table>
        </div>
    );
};

export default Table;