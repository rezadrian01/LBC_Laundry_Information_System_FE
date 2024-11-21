import EachUtils from '@/utils/eachUtils';
import React, { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll';

const OrderTabs = ({ tabMenu, setSelectedTab, selectedTabIndex }) => {
    const parentScrollRef = useRef(null);
    const { events } = useDraggable(parentScrollRef);
    return (
        <ul className="flex justify-around items-center gap-4 overflow-x-auto mt-14 scrollbar-hide" ref={parentScrollRef} {...events}>
            <EachUtils of={tabMenu} render={(menu, index) => {
                return <li className="h-[3rem] " key={index}>
                    <OrderTabBtn onSelect={setSelectedTab} activeIndex={selectedTabIndex} index={index}>
                        {menu.name}
                    </OrderTabBtn>
                </li>;
            }} />
        </ul>
    )
}

const OrderTabBtn = ({ index, activeIndex, onSelect, children }) => {
    let cssClass = "h-full px-4 py-1 rounded-lg transition-colors ";
    switch (index) {
        case 0:
            if (index === activeIndex) {
                cssClass += "bg-blue-500 border-2 border-transparent text-white ";
            } else {
                cssClass += "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white ";
            }
            break;
        case 1:
            if (index === activeIndex) {
                cssClass += "bg-gradient-cyan border-2 border-transparent text-white ";
            } else {
                cssClass += "border-2 border-gradient-cyan text-gradient-cyan hover:bg-gradient-cyan hover:text-white ";
            }
            break;
        case 2:
            if (index === activeIndex) {
                cssClass += "bg-primary-pink-300  border-2 border-transparent text-white ";
            } else {
                cssClass += "border-2 border-primary-pink-300 text-primary-pink-300 hover:bg-primary-pink-300 hover:text-white ";
            }
            break;
        case 3:
            if (index === activeIndex) {
                cssClass += "bg-gradient-purple  border-2 border-transparent text-white ";
            } else {
                cssClass += "border-2 border-gradient-purple text-gradient-purple hover:bg-gradient-purple hover:text-white ";
            }
            break;
        case 4:
            if (index === activeIndex) {
                cssClass += "bg-indigo-500  border-2 border-transparent text-white ";
            } else {
                cssClass += "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white ";
            }
            break;
        case 5:
            if (index === activeIndex) {

                cssClass += "bg-gray-500  border-2 border-transparent text-white ";
            } else {
                cssClass += "border-2 bordeer-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white ";
            }
            break;

    }
    return <div className=" flex text-nowrap">
        <button onClick={() => onSelect(index)} className={cssClass}>{children}</button>
    </div>;
}

export default OrderTabs