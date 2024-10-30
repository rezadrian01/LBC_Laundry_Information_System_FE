import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from '@mods/Footer';
import DefaultLayout from '@layouts/Default';
import OrderLayout from '@layouts/Order';
import Input from '@/components/UI/Input';
import Table from '@/components/UI/Table';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/orderItemTable';

const NewOrderItem = () => {
    const searchInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSearchClick = () => {
        console.log(searchInputRef.current.value);
    }
    const handleNextClick = () => {
        navigate('summary');
    }

    return (
        <DefaultLayout>
            <OrderLayout title="Masukan Pesanan">
                <Input ref={searchInputRef} id="item-name" name="item-name" placeholder="Pilih Item..." textCenter={false} hasSearchBtn={true} onBtnClick={handleSearchClick} />
                <Table isItemOrderSummary headerCol={TABLE_HEADER} tableContent={TABLE_CONTENT} />
                <Footer onNextClick={handleNextClick} />
            </OrderLayout>
        </DefaultLayout>
    );
};

export default NewOrderItem;