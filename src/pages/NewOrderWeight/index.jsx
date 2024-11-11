import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

import DefaultLayout from '@layouts/Default';
import OrderLayout from '@layouts/Order';
import Footer from '@mods/Footer';
import InputGroup from '@/components/UI/InputGroup';
import EachUtils from '@/utils/eachUtils';
import { orderAction } from '@/stores/order';
import { TABLE_CONTENT } from '@/constants/serviceList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';

const NewOrderWeight = () => {
    const weightInputRef = useRef(null);
    const quantityInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.order);
    const { isLoading: loadAuthData } = useAuth();
    const { data: serviceList, isLoading: isLoadingServiceList, isError: isErrorServiceList } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await apiInstance('service');
            // console.log(response.data.data);
            return response.data.data;
        },
        enabled: !loadAuthData
    })

    const handleNextClick = () => {
        const quantity = +quantityInputRef.current.value;
        const weight = +weightInputRef.current.value;
        // Validation
        if (!quantity || !weight) {
            Swal.fire({
                title: "Input tidak boleh kosong",
                text: "Harap masukan berat dan kuantitas",
                icon: 'error'
            });
            return;
        }
        if (orderState.services.length !== 2) {
            Swal.fire({
                title: "Layanan kurang",
                text: "Harap pilih 2 layanan",
                icon: 'error'
            });
            return;
        }
        dispatch(orderAction.addWeightAndQuantity({
            totalItems: +quantity,
            weight
        }))
        navigate('summary');
    }

    const handleSelectService = (event) => {
        const isChecked = event.target.checked;
        const serviceId = event.target.value;
        if (!isChecked) {
            dispatch(orderAction.removeService({ serviceId }));
        } else {
            if (orderState.services.length >= 2) {
                Swal.fire({
                    title: "Maksimal 2 layanan.",
                    text: 'Anda hanya dapat memilih 2 layanan saja per laundry.',
                    icon: 'error',
                    confirmButtonColor: '#f87aac'
                });
                event.target.checked = false;
                return;
            } else {
                dispatch(orderAction.addService({ serviceId }));
            }
        }
    };


    return (
        <DefaultLayout>
            <OrderLayout title="Masukan Pesanan">
                {!loadAuthData && <>
                <div className='flex flex-col gap-10'>
                    <InputGroup isWeightOrderInput={true} ref={weightInputRef} mainLabel="Berat" subLabel="(maks 20kg)" id="weight" name="weight" unitLabel="Kg" />
                        <InputGroup isWeightOrderInput={true} ref={quantityInputRef} mainLabel="Kuantitas" id="quantity" name="quantity" unitLabel="Pcs" />
                </div>
                <div className='flex flex-col gap-2 mb-6 text-lg bg-primary-pink-200 rounded-xl shadow-xl p-4'>
                    <h3 className='mb-4 text-3xl font-semibold'>Layanan</h3>
                        {isLoadingServiceList && <FallbackText />}
                        {!isLoadingServiceList && <EachUtils of={serviceList} render={(service, index) => {
                        return <div className='flex gap-2 items-center '>
                            <input className='bg-primary-pink-300 cursor-pointer' onChange={handleSelectService} type='checkbox' id={service.name} name='service' value={service._id} />
                            <label className='cursor-pointer' htmlFor={service.name}>{service.name}</label>
                        </div>;
                        }} />}
                </div>
                </>}
                <Footer onNextClick={handleNextClick} />
            </OrderLayout>
        </DefaultLayout>
    );
};

export default NewOrderWeight;