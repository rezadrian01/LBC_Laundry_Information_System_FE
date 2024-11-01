import { useState } from 'react';
import { motion } from 'framer-motion';

import EachUtils from '@/utils/eachUtils';
import TabButton from './TabButton';

const TabMenu = ({ contents = [], layoutId = "", isOrderType = true, onClick }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleClick = (index) => {
        console.log(index);
        setSelectedTabIndex(index);
    };

    return (
        <div className='bg-primary-pink-200/60 rounded-full p-1 flex justify-center'>
            <EachUtils of={contents} render={(content, index) => {
                // let btnClass = "px-5 py-1 rounded-full ";
                // if (index === selectedTabIndex) {
                //     btnClass += "text-primary-pink-100 bg-gradient-to-r from-gradient-pink-0 to-primary-pink-400 ";
                // } else {
                //     btnClass += "text-primary-pink-300 ";
                // }

                // return <div className='relative'>
                //     <button className={btnClass} key={index} onClick={() => handleClick(index)} >{content.title}</button>
                // </div>;
                return <TabButton onClick={() => handleClick(index)} layoutId={layoutId} isSelected={index === selectedTabIndex}>
                    {content.title}
                </TabButton>;
            }} />
        </div>
    );
};

export default TabMenu;