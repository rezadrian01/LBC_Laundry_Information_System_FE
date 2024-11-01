import { useState } from 'react';

import EachUtils from '@/utils/eachUtils';
import TabButton from './TabButton';

const TabMenu = ({ contents = [], layoutId = "", isOrderType = true, onClick }) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleClick = (index) => {
        console.log(index);
        setSelectedTabIndex(index);
    };

    return (
        <div className='bg-primary-pink-200/60 rounded-full p-1 flex gap-0 md:gap-6 justify-center'>
            <EachUtils of={contents} render={(content, index) => {
                return <TabButton onClick={() => handleClick(index)} layoutId={layoutId} isSelected={index === selectedTabIndex}>
                    {content.title}
                </TabButton>;
            }} />
        </div>
    );
};

export default TabMenu;