import { useDispatch, useSelector } from "react-redux";

import { IoSearchSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiServiceLine } from "react-icons/ri";
import { BiBlanket } from "react-icons/bi";
import { GiWeight } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

import { ADMIN_SIDEBAR_MENU } from '@/constants/sidebarList';
import EachUtils from '@/utils/eachUtils';
import { sidebarAction } from "@/stores/sidebar";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { isOpen: sidebarIsOpen } = useSelector(state => state.sidebar);
    const toggleSidebar = () => {
        dispatch(sidebarAction.toggleSidebar());
    };

    const handleMenuClick = (index) => {
        console.log(index);
    };

    return (
        <div className="fixed w-[15rem] transition-all z-10" style={{ left: sidebarIsOpen ? '0rem' : '-15rem' }}>
            <div onClick={toggleSidebar} className="bg-black/40 fixed inset-0" style={{ display: sidebarIsOpen ? 'block' : 'none' }} />
            <button onClick={toggleSidebar} className="absolute bg-primary-pink-300 rounded-r-md h-20 w-8 -right-8 top-36">
                <div className="flex flex-col gap-4 px-2">
                    <div className="border-b-[3px]" />
                    <div className="border-b-[3px]" />
                    <div className="border-b-[3px]" />
                </div>
            </button>
            <div className="text-primary-pink-300 font-semibold">
                <div className='absolute bg-primary-pink-100 h-screen w-full flex flex-col justify-between pt-32 pb-10 overflow-auto px-2'>
                    <div className="flex flex-col gap-2">
                            <EachUtils of={ADMIN_SIDEBAR_MENU} render={(item, index) => {
                                return <SidebarMenu handleClick={handleMenuClick} title={item.title} index={index} key={index} />;
                        }} />
                    </div>
                    <button className="flex items-center gap-3 px-4 py-2 mb-6 hover:bg-pink-100 transition-colors w-full mx-auto rounded">
                        <LuLogOut size={20} />
                        <h3>Logout</h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

const SidebarMenu = ({ title, index, handleClick }) => {
    let icon;
    switch (index) {
        case 0:
            icon = <IoSearchSharp size={20} />;
            break;
        case 1:
            icon = <TbReportAnalytics size={20} />;
            break;
        case 2:
            icon = <RiServiceLine size={20} />;
            break;
        case 3:
            icon = <BiBlanket size={20} />;
            break;
        case 4:
            icon = <GiWeight size={20} />;
            break;
        case 5:
            icon = <FaShop size={20} />;
            break;
    }

    return <button onClick={() => handleClick(index)} className='hover:shadow-sm hover:bg-pink-100 rounded-lg transition-all py-3 px-4 flex items-center gap-3 w-full'>
        {icon}
        <h3>{title}</h3>
    </button>;
};

export default Sidebar;