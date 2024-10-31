import Modal from '@/components/UI/Modal';
import { ITEM_SEARCH_LIST } from '@/constants/itemSearchList';
import EachUtils from '@/utils/eachUtils';
import React, { useState } from 'react';
import ItemServiceModal from './itemService';

const ItemSearchModal = ({ onClose }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const customClass = 'bg-primary-pink-200 text-gray-700 min-h-[10rem] rounded-b-lg';
    const handleSelectedItem = (item) => {
        if (item.services.length > 1) {
            setSelectedItem(item);
        } else {
            handleCloseCurrentModal();
        }
    };
    const handleCloseCurrentModal = () => {
        onClose();
    };

    return (
        <div>
            {selectedItem && <ItemServiceModal onSelectService={handleCloseCurrentModal} onClose={() => setSelectedItem(null)} item={selectedItem} />}
            <Modal onClose={onClose} isItemSearch elementId='search-input-modal' customClass={customClass}>
                <div className='font-semibold'>
                    <ul className='flex flex-col gap-4'>
                        <EachUtils of={ITEM_SEARCH_LIST} render={(item, index) => {
                            return <li onClick={() => handleSelectedItem(item)} className='hover:bg-primary-pink-250/50 transition-all p-2 rounded cursor-pointer' key={item.id}>{item.title}</li>;
                        }} />
                    </ul>
                </div>
            </Modal>
        </div>
    );
};

export default ItemSearchModal;