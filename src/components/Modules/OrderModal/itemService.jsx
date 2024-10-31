import Modal from '@/components/UI/Modal';
import EachUtils from '@/utils/eachUtils';
import React from 'react';

const ItemServiceModal = ({ item, onClose, onSelectService }) => {
    const customClass = 'bg-primary-pink-200 text-gray-700 min-h-[10rem] rounded-lg shadow-2xl';

    const handleSelectItemService = (service) => {
        console.log(service);
        onSelectService();
    };

    return (
        <>
            <Modal onClose={onClose} top=' -top-12 ' isItemSearch={false} elementId='select-item-service-modal' customClass={customClass}>
                <div className='font-semibold flex flex-col gap-4 pb-6' >
                    <ul className='flex flex-col gap-3 '>
                        <h2 className='text-2xl'>{item.title}</h2>
                        <p className='font-thin'>Pilih Layanan yang Tersedia</p>
                        <EachUtils of={item.services} render={(item, index) => {
                            return <li onClick={() => handleSelectItemService(item)} className='bg-white  transition-all p-2 rounded-lg cursor-pointer flex justify-between' key={item.id}>
                                <h3>{item.title}</h3>
                                <p>Rp. {item.price}</p>
                            </li>;
                        }} />
                    </ul>
                </div >
            </Modal>
        </>
    );
};

export default ItemServiceModal;