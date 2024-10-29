import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/Modules/Footer';
import Input from '@/components/UI/Input';
import DefaultLayout from '@layouts/Default';
import Header from '@mods/Header/header';
import OrderItemTable from '@/components/Modules/NewOrder/orderItemTable';

const NewOrderItem = () => {
    const searchInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSearchClick = () => {
        console.log(searchInputRef.current.value);
    }

    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <div className='flex flex-col gap-10 mt-14 w-full md:max-w-[50rem] mx-auto'>
                <h3 className="text-4xl font-semibold text-center  ">Masukan Pesanan</h3>
                <Input ref={searchInputRef} id="item-name" name="item-name" placeholder="Pilih Item..." textCenter={false} hasSearchBtn={true} onBtnClick={handleSearchClick} />

                <OrderItemTable />

                <Footer />
            </div>
        </DefaultLayout>
    );
};

export default NewOrderItem;