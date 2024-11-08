import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import OrderLayout from '@layouts/Order';
import InputGroup from '@/components/UI/InputGroup';
import EachUtils from '@/utils/eachUtils';
import { TABLE_CONTENT } from '@/constants/serviceList';
import { orderAction } from '@/stores/order';

const NewOrderWeight = () => {
    const weightInputRef = useRef(null);
    const unitInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderState = useSelector(state => state.order);

    const handleNextClick = () => {
        // console.log(weightInputRef.current.value);
        // console.log(unitInputRef.current.value);
        navigate('summary');
    }

    const handleSelectService = (event) => {
        const isChecked = event.target.checked;
        const serviceId = event.target.value;
        const existingService = TABLE_CONTENT.find(service => service.id === +serviceId);
        if (!existingService) throw json({ message: "Service not found" }, { status: 404 });
        if (!isChecked) {
            dispatch(orderAction.removeService({ serviceId: existingService.id }));
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
                dispatch(orderAction.addService({ service: existingService }));
            }
        }
    };


    return (
        <DefaultLayout>
            <OrderLayout title="Masukan Pesanan">
                <div className='flex flex-col gap-10'>
                    <InputGroup isWeightOrderInput={true} ref={weightInputRef} mainLabel="Berat" subLabel="(maks 20kg)" id="weight" name="weight" unitLabel="Kg" />
                    <InputGroup isWeightOrderInput={true} ref={unitInputRef} mainLabel="Kuantitas" id="quantity" name="quantity" unitLabel="Pcs" />
                </div>
                <div className='flex flex-col gap-2 mb-6 text-lg bg-primary-pink-200 rounded-xl shadow-xl p-4'>
                    <h3 className='mb-4 text-3xl font-semibold'>Layanan</h3>
                    <EachUtils of={TABLE_CONTENT} render={(service, index) => {
                        return <div className='flex gap-2 items-center '>
                            <input className='bg-primary-pink-300 cursor-pointer' onChange={handleSelectService} type='checkbox' id={service.name} name='service' value={service.id} />
                            <label className='cursor-pointer' htmlFor={service.name}>{service.name}</label>
                        </div>;
                    }} />
                </div>
                <Footer onNextClick={handleNextClick} />
            </OrderLayout>
        </DefaultLayout>
    );
};

export default NewOrderWeight;