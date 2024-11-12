import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Footer from '@mods/Footer';
import DefaultLayout from '@layouts/Default';
import OrderLayout from '@layouts/Order';
import Input from '@/components/UI/Input';
import Table from '@/components/UI/Table';
import ItemSearchModal from '@mods/OrderModal/itemSearch';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/orderItemTable';

import useAuth from '@/hooks/useAuth';

const NewOrderItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderState = useSelector(state => state.order);
    const { isLoading: loadAuthData } = useAuth();
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");


    const handleSearchClick = () => {
        console.log(searchInput);
    }
    const handleNextClick = () => {
        navigate('summary');
    }
    const handleFocusSearchInput = (event) => {
        setSearchModalIsOpen(true);
    };
    const handleBlurSearchInput = (event) => {
        setSearchModalIsOpen(false);
    }

    return (
        <>
            {searchModalIsOpen && <ItemSearchModal onClose={handleBlurSearchInput} />}
        <DefaultLayout>
            <OrderLayout title="Masukan Pesanan">
                    {!loadAuthData && <>
                    <div className='relative'>
                        <div className='relative'>
                            <div className='relative z-40'>
                                    <Input onFocus={handleFocusSearchInput} defaultValue={searchInput} onChange={({ target }) => setSearchInput(target.value)} id="item-name" name="item-name" placeholder="Pilih Item..." textCenter={false} hasSearchBtn={true} onBtnClick={handleSearchClick} />
                            </div>
                            <div id='search-input-modal' />
                        </div>
                        <div id='select-item-service-modal' />
                    </div>
                        <Table isItemOrderSummary headerCol={TABLE_HEADER} tableContent={orderState.items} />
                    </>
                    }
                <Footer onNextClick={handleNextClick} />
            </OrderLayout>
        </DefaultLayout>
        </>
    );
};

export default NewOrderItem;