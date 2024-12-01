import React, { useState } from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai";

import Navbar from '@mods/Landing/Navbar'
import Search from '@mods/Search';
import Button from '@/components/UI/Button';
import { CHECK_ORDER_CONTENT_LIST } from '@/constants/checkOrderList';
import { ORDER_STATUS_LIST } from '@/constants/orderStatusList';
import EachUtils from '@/utils/eachUtils';

const OrderCheck = () => {
    const [receiptNumberInput, setReceiptNumberInput] = useState("");

    const dummyData = {
        customerName: "John Doe",
        receiptNumber: 48,
        status: "Dicuci",
    }


    return (
        <>
            <div id="home" className='bg-primary-pink-250 w-full h-10' />
            <Navbar />
            <div className='flex flex-col gap-10 min-h-[78vh] px-2 md:px-10 pt-20'>
                <div className='flex justify-end '>
                    <div className='grid grid-cols-8 gap-1 md:gap-4 max-w-[30rem]'>
                        <div className='col-span-4 sm:col-span-5'>
                            <Search hasSearchBtn={false} type="number" defaultValue={receiptNumberInput} onChange={({ target }) => {
                                setReceiptNumberInput(target.value);
                            }
                            } />
                        </div>
                        <div className='col-span-4 sm:col-span-3'>
                            <Button style={{ width: '100%' }}>Cari Pesanan</Button>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col gap-4 max-w-[35rem]'>
                    <h2 className='text-2xl md:text-4xl font-semibold mb-4'>Status Pesanan</h2>
                    <EachUtils of={CHECK_ORDER_CONTENT_LIST} render={(item, index) => {
                        let content = "";
                        for (let key of item.keys) {
                            if (!content.trim()) {
                                content = dummyData[key]
                            }
                        }

                        let cssClass = "";
                        if (index === 2) {
                            switch (content) {
                                case ORDER_STATUS_LIST[0].title:
                                    cssClass += "text-blue-500";
                                    break;
                                case ORDER_STATUS_LIST[1].title:
                                    cssClass += "text-gradient-cyan";
                                    break;
                                case ORDER_STATUS_LIST[2].title:
                                    cssClass += "text-gradient-primary-pink-300";
                                    break;
                                case ORDER_STATUS_LIST[3].title:
                                    cssClass += "text-gradient-purple";
                                    break;
                                case ORDER_STATUS_LIST[4].title:
                                    cssClass += "text-indigo-500";
                                    break;
                                case ORDER_STATUS_LIST[5].title:
                                    cssClass += "text-gray-500";
                                    break;
                            }
                        }

                        return <div key={item.id} className='grid grid-cols-6 w-full md:text-lg'>
                            <h3 className='col-span-2'>{item.title}</h3>
                            <div className='col-span-4 font-semibold'>
                                {index !== 3 && <p>: <span className={cssClass}>{content}</span></p>}
                                {index === 3 && <p>: <span className='text-gray-500'>
                                    Fitur sedang dalam pengembangan.</span></p>}
                            </div>
                        </div>
                    }} />
                </div>
            </div>
        </>
    )
}

export default OrderCheck
