import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';

import DefaultLayout from '@layouts/Default';
import OrderLayout from '@layouts/Order';
import CustomerData from '@mods/CustomerData';
import Footer from '@mods/Footer';
import InputGroup from '@/components/UI/InputGroup';
import Table from '@/components/UI/Table';
import { TABLE_CONTENT as TABLE_CONTENT_ITEM, TABLE_HEADER as TABLE_HEADER_ITEM } from '@/constants/orderItemSummary';
import { TABLE_CONTENT as TABLE_CONTENT_WEIGHT, TABLE_HEADER as TABLE_HEADER_WEIGHT } from '@/constants/orderWeightSummary';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import { queryClient } from '@/utils/query';

const OrderSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/")[2];
    const { isLoading: loadAuthData } = useAuth();
    const branchState = useSelector(state => state.branch);
    const orderState = useSelector(state => state.order);
    const [orderList, setOrderList] = useState([]);


    // Queries
    const { data: latestReceiptNumber, isLoading: isLoadingLatestReceiptNumber, isError: isErrorLatestReceiptNumber } = useQuery({
        queryKey: ['latestReceiptNumber'],
        queryFn: async () => {
            const response = await apiInstance('laundry/receiptNumber');
            return response.data.data;
        },
        enabled: !loadAuthData,
        retry: false
    });
    const { data: branchList } = useQuery({
        queryKey: ['branches'],
        queryFn: async () => {
            const response = await apiInstance('branch');
            return response.data.data;
        },
        retry: false
    });
    const { mutate: getWeightPrice, isPending: isPendingGetWeightPrice } = useMutation({
        mutationFn: async (data) => {
            return apiInstance('weightPrice/weight', {
                data,
                method: "POST"
            });
        },
        onSuccess: (response) => {
            setOrderList(previousState => {
                const updatedState = { ...previousState[0] };
                updatedState.price = response.data.data.price;
                return [updatedState];
            });
        },
        retry: false
    });
    const { data: serviceList, isLoading: isLoadingServiceList } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await apiInstance('service');
            return response.data.data;
        },
        enabled: !loadAuthData && orderState.orderTypeId === 2
    });

    // Mutation
    const { mutate: createOrderFn, isError: isErrorCreateOrder } = useMutation({
        mutationFn: async (formData) => {
            return apiInstance('laundry', {
                data: formData,
                method: "POST",
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['latestReceiptNumber'] })
            Swal.fire({
                title: "Pesanan Berhasil Dibuat",
                icon: "success",
                confirmButtonText: "Cetak Nota",
                confirmButtonColor: "#f87aac",
                backdrop: "#00000070"
            }).then(result => {
                if (result.isConfirmed || result.isDismissed) {
                    setOrderList([]);
                    handlePrintReceipt();
                }
            });
        },
        onError: (response) => {
            Swal.fire({
                title: "Gagal Membuat Pesanan",
                text: "Mohon maaf server saat ini sedang error. anda bisa mencobanya lagi nanti.",
                icon: 'error'
            });
        }
    });
    let totalPrice = orderState.orderTypeId === 1 ? orderState.items.reduce((prev, item) => prev + (item.quantity * item.price), 0) : orderList[0].price;
    let totalQuantity = orderState.orderTypeId === 1 ? orderState.items.reduce((prev, item) => prev + item.quantity, 0) : 0;
    useEffect(() => {
        switch (orderState.orderTypeId) {
            // Item type order
            case 1:
                setOrderList([...orderState.items]);
                break;
            // Weight type order
            case 2:
                const currentWeight = orderState.weight;
                const services = orderState.services.map(service => {
                    const existingService = serviceList.find(currentService => {
                        return currentService._id === service.serviceId;
                    });
                    return existingService;
                });

                getWeightPrice({ weight: currentWeight });
                setOrderList([
                    {
                        // id: Math.random(),
                        weight: currentWeight,
                        quantity: orderState.quantity,
                        services: services.map(service => service?.name).join(", dan ") || ""
                    }
                ]);
                break;
        }
    }, [orderState.orderTypeId, orderState.weight, orderState.quantity, orderState.services]);

    let receiptNumber = "";
    if (!isLoadingLatestReceiptNumber) {
        receiptNumber = latestReceiptNumber?.latestReceiptNumber;
    }

    const handlePrintReceipt = () => {
        navigate('/dashboard');
    }

    const handleSubmit = (event) => {
        const isWeightOrder = orderState.orderTypeId === 2;
        event.preventDefault();
        const fd = new FormData(event.target);
        fd.append("isWeight", isWeightOrder);
        if (isWeightOrder) {
            orderState.services.forEach((service, index) => fd.append(`services[${index}][id]`, service.serviceId));
            fd.append("weight", orderState.weight);
            fd.append("totalItems", orderState.quantity);
        } else {
            fd.append("totalItems", totalQuantity);
            orderState.items.forEach((item, index) => {
                fd.append(`items[${index}][itemServiceId]`, item.itemServiceId);
                fd.append(`items[${index}][quantity]`, item.quantity);
            })
        }
        Swal.fire({
            title: "Apakah data sudah sesuai?",
            text: "Anda tidak dapat mengubah data tersebut jika sudah membuat pesanan.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Batal",
            cancelButtonColor: "red",
            confirmButtonColor: "green",
        }).then(result => {
            if (result.isConfirmed) createOrderFn(fd);
        });
    };


    const currentDate = new Date().toISOString().split("T")[0];

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}>
            <OrderLayout gap='gap-6' titleSize='3xl' title="Nota Kiloan">
                {isLoadingLatestReceiptNumber && <FallbackText />}

                {!isLoadingLatestReceiptNumber && <>
                <section className='flex flex-col gap-2'>
                            <InputGroup defaultValue={receiptNumber} textCenter={false} isOrderSummary label="No. Nota" id="receiptNumber" name="receiptNumber" />

                            <InputGroup defaultValue={currentDate} type="date" textCenter={false} isOrderSummary label="Tanggal" id="date" name="date" />

                            <InputGroup titleKey="name" dropdownMenu={branchList} defaultValue={branchState.activeBranch.id} textCenter={false} isOrderSummary isDropdown label="Cabang" id="branch" name="branchId" />
                </section>
                        <Table headerCol={path === "weight" ? TABLE_HEADER_WEIGHT : TABLE_HEADER_ITEM} tableContent={orderList} isSummary={true} isItemOrderSummary={path === "item"} isWeightOrderSummary={path === "weight"} />
                <div>
                    <div className='grid grid-cols-6 items-center w-full bg-primary-pink-300 text-primary-pink-100 text-center p-2 md:p-4 font-semibold'>
                        <h3 className="col-span-4">Total Harga</h3>
                                <p className='col-span-2'>{new Intl.NumberFormat('id-ID').format(totalPrice)}</p>
                    </div>
                    <CustomerData />
                </div>
                </>}
                    <Footer />
            </OrderLayout>
            </form>
        </DefaultLayout>
    );
};


export default OrderSummary;