import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { LuLayoutDashboard } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { RiServiceLine } from "react-icons/ri";
import { BiBlanket } from "react-icons/bi";
import { GiWeight } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { BsPersonVcard } from "react-icons/bs";
import { GoPerson } from "react-icons/go";

import EachUtils from '@/utils/eachUtils';
import { sidebarAction } from "@/stores/sidebar";
import { ADMIN_SIDEBAR_MENU } from '@/constants/sidebarList';
import apiInstance from "@/utils/apiInstance";
import { queryClient } from "@/utils/query";
import { authAction } from "@/stores/auth";
import { branchAction } from "@/stores/branch";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isOpen: sidebarIsOpen } = useSelector(state => state.sidebar);
    const { mutate: logoutFn } = useMutation({
        mutationFn: async () => {
            return apiInstance('auth/logout', {
                method: "POST",
            });
        },
        onSuccess: (response) => {
            navigate('/login');
            setTimeout(() => {
                dispatch(authAction.signout());
                dispatch(branchAction.resetActiveBranch());
                queryClient.invalidateQueries({ queryKey: ['auth-data'] });
                toggleSidebar();
            }, 500);
        },
        onError: (response) => {
            console.log(response);
        }
    })

    const toggleSidebar = () => {
        dispatch(sidebarAction.toggleSidebar());
    };

    const handleLogoutClick = () => {
        logoutFn();
    }
    const handleProfileClick = () => {
        navigate('/user');
        toggleSidebar();
    }

    return (
        <div className="fixed w-[15rem] transition-all z-50" style={{ left: sidebarIsOpen ? '0rem' : '-15rem' }}>
            <div onClick={toggleSidebar} className="bg-black/40 fixed inset-0" style={{ display: sidebarIsOpen ? 'block' : 'none' }} />
            <button onClick={toggleSidebar} className="absolute bg-primary-pink-500/80 shadow-xl rounded-r-md h-20 w-6 sm:w-8 -right-6 sm:-right-8 top-14">
                <div className="flex flex-col gap-4 px-[.4rem]">
                    <div className="border-b-[3px]" />
                    <div className="border-b-[3px]" />
                    <div className="border-b-[3px]" />
                </div>
            </button>
            <div className="text-primary-pink-300 font-semibold">
                <div className='absolute bg-primary-pink-100 h-screen w-full flex flex-col justify-between pt-12 pb-10 overflow-auto px-2'>
                    <div className="flex flex-col gap-2">
                            <EachUtils of={ADMIN_SIDEBAR_MENU} render={(item, index) => {
                            return <SidebarMenu location={location} onClick={toggleSidebar} item={item} index={index} key={index} />;
                        }} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <button onClick={handleProfileClick} className="flex items-center gap-3 px-4 py-2  hover:bg-pink-100  w-full mx-auto rounded">
                            <GoPerson size={20} />
                            <h3>Profile</h3>
                        </button>
                        <button onClick={handleLogoutClick} className="flex items-center gap-3 px-4 py-2 mb-6 hover:bg-pink-100  w-full mx-auto rounded text-red-500">
                            <LuLogOut size={20} />
                            <h3>Logout</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarMenu = ({ index, onClick, item, location }) => {
    let icon;
    switch (index) {
        case 0:
            icon = <LuLayoutDashboard size={20} />;
            break;
        case 1:
            icon = <IoSearchSharp size={20} />;
            break;
        case 2:
            icon = <TbReportAnalytics size={20} />;
            break;
        case 3:
            icon = <RiServiceLine size={20} />;
            break;
        case 4:
            icon = <BiBlanket size={20} />;
            break;
        case 5:
            icon = <GiWeight size={20} />;
            break;
        case 6:
            icon = <FaShop size={20} />;
            break;
        case 7:
            icon = <BsPersonVcard size={20} />;
            break;
    }

    return <Link onClick={onClick} to={item.path} className='hover:shadow-sm hover:bg-pink-100 rounded-lg  py-3 px-4 flex items-center gap-3 w-full' style={{ backgroundColor: location.pathname.startsWith(item.path) ? '#fce7f3' : '' }} >
        {icon}
        <h3>{item.title}</h3>
    </Link>;
};

export default Sidebar;