import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from 'react-icons/fa';


import CrudLayout from '@/components/Layouts/Crud';
import Search from '../Search';
import Button from '@/components/UI/Button';
import EachUtils from '@/utils/eachUtils';
import { ORDER_STATUS_LIST } from '@/constants/orderStatusList';

const Crud = ({ keys, title = '', tableHeader = [], tableContent = [], isOrderList = false, isItemList = false, isWeightPriceList = false, isBranchList = false, isEmployeeList = false, onCreate = () => { }, onEdit = () => { }, onDelete = () => { } }) => {
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
                            <Search placeholder="Nama Item" />
                        </div>}

                        {isItemList && <div className='col-span-5 lg:col-span-2'>
                            <Button style={{ width: '100%' }} onClick={onCreate}>Tambah Item</Button>
                        </div>
                        }
                    </div>}
                    {(isWeightPriceList || isBranchList || isEmployeeList) && <div className="w-full flex justify-between" >
                        <h3 className="text-primary-pink-300 font-bold text-3xl">{title}</h3>
                        <div className="md:w-[10rem]">
                            <Button onClick={onCreate} style={{ width: '100%' }}>
                                {isWeightPriceList && "Tambah Harga Berat"}
                                {isBranchList && "Tambah Cabang"}
                                {isEmployeeList && "Tambah Karyawan"}
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
                            <EachUtils of={tableContent} render={(item, indexRow) => {
                                return <tr className="cursor-pointer hover:bg-gray-100" onClick={e => handleRowClick(e, item.id)} key={item.id}>
                                    <EachUtils of={keys} render={(key, indexKey) => {
                                        let content = item[key];

                                        // OrderList
                                        if (isOrderList) {
                                            if (indexKey === 2) {
                                                const currentStatus = item[key];
                                                const orderStatusIndex = ORDER_STATUS_LIST.findIndex(status => status.title.toLowerCase() === currentStatus.toLowerCase());
                                                content = <OrderStatusSelect defaultValue={currentStatus} orderStatusIndex={orderStatusIndex}>
                                                    <EachUtils of={ORDER_STATUS_LIST} render={(orderStatus, orderStatusIndex) => {
                                                        return <option key={orderStatusIndex} value={orderStatus.title}>{orderStatus.title}</option>;
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
                                                const itemServiceIndex = item.services.findIndex(service => service.title.toLowerCase() === key.toLowerCase());
                                                if (itemServiceIndex !== -1) {
                                                    content = item.services[itemServiceIndex].price;
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

                                        // Employee List
                                        if (isEmployeeList) {
                                            if (indexKey === 0) {
                                                content = `${indexRow + 1}.`;
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

const OrderStatusSelect = ({ orderStatusIndex, defaultValue, children }) => {
    let content;
    let cssClass = "outline-none text-primary-pink-100 p-1 rounded ";
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
    }
    return <select className={cssClass} defaultValue={defaultValue}>
        {children}
    </select>;
};

export default Crud;