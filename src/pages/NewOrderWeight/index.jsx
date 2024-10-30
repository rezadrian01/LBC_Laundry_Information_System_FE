import { forwardRef, useRef } from 'react';

import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import Input from '@/components/UI/Input';
import OrderLayout from '@/components/Layouts/Order';
import InputGroup from '@/components/UI/InputGroup';
import { useNavigate } from 'react-router-dom';

const NewOrderWeight = () => {
    const weightInputRef = useRef(null);
    const unitInputRef = useRef(null);
    const navigate = useNavigate();

    const handleNextClick = () => {
        // console.log(weightInputRef.current.value);
        // console.log(unitInputRef.current.value);
        navigate('summary');
    }

    return (
        <DefaultLayout>
            <OrderLayout title="Masukan Pesanan">
                <div className='flex flex-col gap-10'>
                    <InputGroup isWeightOrderInput={true} ref={weightInputRef} mainLabel="Berat" subLabel="(maks 20kg)" id="weight" name="weight" unitLabel="Kg" />
                    <InputGroup isWeightOrderInput={true} ref={unitInputRef} mainLabel="Kuantitas" id="quantity" name="quantity" unitLabel="Pcs" />
                </div>
                <Footer onNextClick={handleNextClick} />
            </OrderLayout>
        </DefaultLayout>
    );
};

export default NewOrderWeight;