import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from 'react-icons/fa';


import CrudLayout from '@layouts/Crud';
import Search from '../Search';
import Button from '@/components/UI/Button';
import EachUtils from '@/utils/eachUtils';
import OrderTabs from "@mods/OrderTypeTab/Tabs";
import { ORDER_STATUS_LIST } from '@/constants/orderStatusList';

const Crud = ({
    keys,
    title = '',
    tableHeader = [],
    tableContent = [],
    isOrderList = false,
    isItemList = false,
    dataCompare = [],
    isWeightPriceList = false,
    isBranchList = false,
    isEmployeeList = false,
    isServiceList = false,
    isPending = false,
    searchInput = "",
    hasTab = false,
    tabMenu = [],
    setSelectedTab = () => { },
    selectedTabIndex = 0,
    setSearchInput = () => { },
    onCreate = () => { },
    onEdit = () => { },
    onDelete = () => { },
    onDropdownChange = () => { }
}) => {
    const navigate = useNavigate();
    const handleRowClick = (event, id) => {
        if (event.target.tagName === 'select' || event.target.closest('select')) {
            return;
        }
        navigate(`${id}`);
    }

    let weightCounter = 0;

    return (
        <>
            <CrudLayout>
                <section className='mt-4 md:mt-10'>
                    {/* Searchbar */}
                    {(isOrderList || isItemList) && <div className='grid grid-cols-12 gap-x-2'>
                        {isOrderList && <div className='col-span-12'>
                            <Search />
                        </div>}

                        {isItemList && <div className='col-span-7 lg:col-span-10'>
                            <Search defaultValue={searchInput} onChange={({ target }) => setSearchInput(target.value)} placeholder="Nama Item" />
                        </div>}

                        {isItemList && <div className='col-span-5 lg:col-span-2'>
                            <Button style={{ width: '100%' }} onClick={onCreate}>Tambah Item</Button>
                        </div>
                        }
                    </div>}
                    {hasTab && <>
                        {/* <ul className="flex justify-around items-center gap-4 overflow-x-auto mt-14 scrollbar-hide" ref={parentScrollRef} {...events}>
                            <EachUtils of={tabMenu} render={(menu, index) => {
                                return <li className="h-[3rem] " key={index}>
                                    <OrderTabBtn onSelect={setSelectedTab} activeIndex={selectedTabIndex} index={index}>
                                        {menu.name}
                                    </OrderTabBtn>
                                </li>;
                            }} />
                        </ul> */}
                        <OrderTabs tabMenu={tabMenu} setSelectedTab={setSelectedTab} selectedTabIndex={selectedTabIndex} />
                    </>}
                    {(isWeightPriceList || isBranchList || isEmployeeList || isServiceList) && <div className="w-full flex justify-between" >
                        <h3 className="text-primary-pink-300 font-bold text-3xl">{title}</h3>
                        <div className="md:w-[10rem]">
                            <Button onClick={onCreate} style={{ width: '100%' }}>
                                {isWeightPriceList && "Tambah Harga Berat"}
                                {isBranchList && "Tambah Cabang"}
                                {isEmployeeList && "Tambah Karyawan"}
                                {isServiceList && "Tambah Layanan"}
                            </Button>
                        </div>
                    </div>}

                    <table className=' text-center text-[.73rem] md:text-base font-semibold w-full table-fixed mt-4 md:mt-10'>
                        <thead className='border-b-2 border-b-primary-pink-300 text-primary-pink-300'>
                            <tr>
                                <EachUtils of={tableHeader} render={(item, index) => {
                                    return <td className='py-4' key={index}>{item.title}</td>;
                                }} />
                            </tr>
                        </thead>
                        <tbody>
                            {isPending && <tr>
                                <td className="pt-10 animate-pulse text-lg" colSpan={keys.length}>Loading...</td>
                            </tr>}
                            {!isPending && tableContent.length === 0 && <tr>
                                <td className="pt-10 text-lg" colSpan={keys.length}>Tidak ada data.</td>
                            </tr>}
                            <EachUtils of={tableContent} render={(item, indexRow) => {
                                return <tr className="cursor-pointer hover:bg-gray-100" onClick={e => handleRowClick(e, item._id)} key={item._id}>
                                    <EachUtils of={keys} render={(key, indexKey) => {
                                        let content = item[key];

                                        // OrderList
                                        if (isOrderList) {
                                            if (indexKey === 2) {
                                                const currentStatus = item[key].name;
                                                const orderStatusIndex = dataCompare.findIndex(status => status.name.toLowerCase() === currentStatus.toLowerCase());
                                                content = <OrderStatusSelect onChange={onDropdownChange} defaultValue={currentStatus} orderStatusIndex={orderStatusIndex} orderId={item._id}>
                                                    <EachUtils of={dataCompare} render={(orderStatus, orderStatusIndex) => {
                                                        return <option id={orderStatus._id} key={orderStatusIndex} value={orderStatus.name}>{orderStatus.name}</option>;
                                                    }} />
                                                </OrderStatusSelect>;
                                            }
                                        }

                                        // Item List
                                        if (isItemList) {
                                            if (indexKey === 0) {
                                                content = `${indexRow + 1}.`;
                                            }
                                            if (indexKey >= 2) {
                                                const itemServiceIndex = item.services.findIndex(service => service.serviceName.toLowerCase() === key.toLowerCase());
                                                if (itemServiceIndex !== -1) {
                                                    content = new Intl.NumberFormat('id-ID').format(item.services[itemServiceIndex].servicePrice);
                                                } else {
                                                    content = "-"
                                                }
                                            }
                                        }

                                        // Weight Price List
                                        if (isWeightPriceList) {
                                            if (indexKey === 0) {
                                                content = `${indexRow + 1}.`;
                                            }
                                            if (indexKey === 1) {
                                                content = `${weightCounter} - ${(item[key] - 0.1).toFixed(1)}`;
                                                weightCounter = item[key];
                                            }
                                            if (indexKey === 3) {
                                                content = <div className="flex justify-center gap-3 ">
                                                    <button onClick={() => onEdit(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white p-[.4rem] rounded-full">
                                                        <FiEdit2 />
                                                    </button>
                                                    <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white p-[.4rem] rounded-full">
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>;
                                            }
                                        }

                                        // Branch List
                                        if (isBranchList) {
                                            if (indexKey === 0) {
                                                content = `${indexRow + 1}.`;
                                            }
                                            if (indexKey === 2) {
                                                content = <div className="flex justify-center gap-3 ">
                                                    <button onClick={() => onEdit(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white p-[.4rem] rounded-full">
                                                        <FiEdit2 />
                                                    </button>
                                                    <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white p-[.4rem] rounded-full">
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>;
                                            }
                                        }

                                        // Employee List and Service List
                                        if (isEmployeeList || isServiceList) {
                                            if (indexKey === 0) {
                                                content = `${indexRow + 1}.`;
                                            }
                                            if (isEmployeeList && indexKey === 2) {
                                                let cssClass = "w-1/2 mx-auto rounded-full text-white max-w-[5rem] ";
                                                switch (content.toLowerCase()) {
                                                    case 'employee':
                                                        cssClass += "bg-indigo-400";
                                                        break;
                                                    case 'admin':
                                                        cssClass += "bg-blue-400";
                                                        break;
                                                    case 'owner':
                                                        cssClass += "bg-green-400";
                                                        break;
                                                }
                                                return <td className="py-4">
                                                    <p className={cssClass}>
                                                        {content}
                                                    </p>
                                                </td>;
                                            }
                                        }


                                        return <td className='py-4' key={indexKey}>{content}</td>;
                                    }} />
                                </tr>;
                            }} />
                        </tbody>
                    </table>
                </section>
            </CrudLayout>
        </>
    );
};

const OrderStatusSelect = ({ orderStatusIndex, defaultValue, children, orderId, onChange }) => {
    let cssClass = "outline-none text-primary-pink-100 p-1 rounded ";
    const handleSelectChange = (event) => {
        const statusId = event.target.options[event.target.selectedIndex].id;
        onChange(orderId, statusId);
    }
    switch (orderStatusIndex) {
        case 0:
            cssClass += "bg-blue-500 ";
            break;
        case 1:
            cssClass += "bg-gradient-cyan ";
            break;
        case 2:
            cssClass += "bg-primary-pink-300 ";
            break;
        case 3:
            cssClass += "bg-gradient-purple ";
            break;
        case 4:
            cssClass += "bg-indigo-500 ";
            break;
        case 5:
            cssClass += "bg-gray-500";
    }
    return <select onChange={handleSelectChange} className={cssClass} defaultValue={defaultValue}>
        {children}
    </select>;
};



export default Crud;