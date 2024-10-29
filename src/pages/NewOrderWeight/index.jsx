import DefaultLayout from '@/components/Layouts/Default';
import Footer from '@/components/Modules/Footer';
import Header from '@/components/Modules/Header/header';
import Input from '@/components/UI/Input';
import React, { forwardRef, useRef } from 'react';

const NewOrderWeight = () => {
    const weightInputRef = useRef(null);
    const unitInputRef = useRef(null);

    const handleNextClick = () => {
        console.log(weightInputRef.current.value);
        console.log(unitInputRef.current.value);
    }

    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <div className="flex flex-col gap-10 mt-14 w-full md:max-w-[50rem] mx-auto">
                <h3 className="text-4xl font-semibold text-center  ">Masukan Pesanan</h3>
                <div className='flex flex-col gap-10'>
                    <InputGroup ref={weightInputRef} mainLabel="Berat" subLabel="(maks 20kg)" id="weight" name="weight" unitLabel="Kg" />
                    <InputGroup ref={unitInputRef} mainLabel="Kuantitas" id="quantity" name="quantity" unitLabel="Pcs" />
                </div>
                <Footer onNextClick={handleNextClick} />
            </div>
        </DefaultLayout>
    );
};

const InputGroup = forwardRef(({ mainLabel, subLabel, id, name, unitLabel }, ref) => {
    return <div>
        <h4 className='font-thin text-xl'><span className='font-semibold'>{mainLabel}</span> {subLabel}</h4>
        <Input ref={ref} borderBottom id={id} name={name} unitLabel={unitLabel} type="number" inputMode="numeric" step="0.01" bgColor={null} />
    </div>;
})

export default NewOrderWeight;