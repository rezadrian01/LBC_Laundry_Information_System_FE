import { useRef, useState } from 'react';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.order);
    const { isLoading: loadAuthData } = useAuth();
    const [weightInput, setWeightInput] = useState(orderState.weight || "");
    const [quantityInput, setQuantityInput] = useState(orderState.quantity || "");

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
        // Validation
        if (!quantityInput || !weightInput) {
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
            quantity: +quantityInput,
            weight: +weightInput
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
    const handleInputChange = (value, inputIndex) => {
        if (inputIndex === 0) {
            setWeightInput(value);
        } else {
            setQuantityInput(value);
        }
    }


    return (
        <DefaultLayout>
            <OrderLayout title="Masukan Pesanan">
                {!loadAuthData && <>
                <div className='flex flex-col gap-10'>
                        <InputGroup defaultValue={weightInput} onChange={({ target }) => handleInputChange(target.value, 0)} isWeightOrderInput mainLabel="Berat" subLabel="(maks 20kg)" id="weight" name="weight" unitLabel="Kg" />
                        <InputGroup defaultValue={quantityInput} onChange={({ target }) => handleInputChange(target.value, 1)} isWeightOrderInput mainLabel="Kuantitas" id="quantity" name="quantity" unitLabel="Pcs" />
                </div>
                <div className='flex flex-col gap-2 mb-6 text-lg bg-primary-pink-200 rounded-xl shadow-xl p-4'>
                    <h3 className='mb-4 text-3xl font-semibold'>Layanan</h3>
                        {isLoadingServiceList && <FallbackText />}
                        {!isLoadingServiceList && <EachUtils of={serviceList} render={(service, index) => {
                            const isActive = orderState.services.map(currentService => currentService.serviceId).includes(service._id);
                        return <div className='flex gap-2 items-center '>
                            <input className='bg-primary-pink-300 cursor-pointer' onChange={handleSelectService} type='checkbox' checked={isActive} id={service.name} name='service' value={service._id} />
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