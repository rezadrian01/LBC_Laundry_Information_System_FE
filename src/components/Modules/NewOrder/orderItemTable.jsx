import { TABLE_HEADER } from '@/constants/orderItemTable';
import EachUtils from '@/utils/eachUtils';
import React from 'react';

const OrderItemTable = () => {
    return (
        <>
            <table>
                <thead className='bg-primary-pink-300 text-primary-pink-100'>
                    <tr>
                        <EachUtils of={TABLE_HEADER} render={(item, index) => {
                            return <td className='text-center' key={index}>{item.title}</td>;
                        }} />
                    </tr>
                </thead>
            </table>
        </>
    );
};

export default OrderItemTable;