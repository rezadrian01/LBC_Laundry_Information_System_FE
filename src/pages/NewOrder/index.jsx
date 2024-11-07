import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import ChooseOrderTypeBg from '@mods/NewOrder/orderTypeBg';
import Header from '@mods/Header/header';

import { branchAction } from '@/stores/branch';
import Button from '@/components/UI/Button';
import EachUtils from '@/utils/eachUtils';

import { ORDER_TYPE } from '@/constants/orderType';
import { orderAction } from '@/stores/order';
import Footer from '@/components/Modules/Footer';

const NewOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectBranch = (event) => {
        dispatch(branchAction.changeBranch(event.target.value));
    };

    const handleSelectOrderType = (orderTypeId) => {
        dispatch(orderAction.changeOrderType(orderTypeId));
        if (orderTypeId === 1) {
            navigate('item');
            return;
        }
        navigate('weight');
    };

    return (
        <DefaultLayout>
            <ChooseOrderTypeBg />
            <Header hasButton={false} onChange={handleSelectBranch} />
            <div className='flex flex-col gap-12 justify-center items-center mt-28'>
                <h3 className='text-2xl md:text-3xl font-semibold'>Pilih Tipe Pesanan</h3>
                <div className='grid grid-cols-2 gap-y-4 justify-center items-center w-full max-w-[50rem]'>
                    <EachUtils of={ORDER_TYPE} render={(item, index) => {
                        return <div>
                            <Button onClick={() => handleSelectOrderType(item.id)} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                                <h5 className='font-semibold text-lg md:text-xl'>{item.title}</h5>
                            </Button>
                        </div>;
                    }} />
                </div>
            </div>
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default NewOrder;