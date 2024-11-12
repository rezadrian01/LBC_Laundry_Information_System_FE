import { useQuery } from '@tanstack/react-query';

import Modal from '@/components/UI/Modal';
import { ITEM_SEARCH_LIST } from '@/constants/itemSearchList';
import EachUtils from '@/utils/eachUtils';
import React, { useEffect, useState } from 'react';
import ItemServiceModal from './itemService';
import apiInstance from '@/utils/apiInstance';
import { useDispatch } from 'react-redux';
import { orderAction } from '@/stores/order';

const ItemSearchModal = ({ onClose, searchInput }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();
    const { data: itemList, isLoading: isLoadingItemList, isError: isErrorItemList } = useQuery({
        queryKey: ['items', { searchInput }],
        queryFn: async () => {
            const response = await apiInstance(`item/search/${searchInput}`);
            // return response.data.data;
            return response?.data?.data || [];
        },
        enabled: searchInput.length >= 3
    });


    const customClass = 'bg-primary-pink-200 text-gray-700 min-h-[10rem] rounded-b-lg ';
    const handleSelectedItem = (item) => {
        if (item.services.length > 1) {
            setSelectedItem(item);
        } else {
            handleCloseCurrentModal();
        }
    };

    const handleSelectItemService = (service) => {
        // console.log(service);
        dispatch(orderAction.addItem({
            ...service,
            itemServiceId: service._id
        }));
        handleCloseCurrentModal();
    }

    const handleCloseCurrentModal = () => {
        onClose();
    };

    return (
        <div>
            {selectedItem && !isLoadingItemList && <ItemServiceModal onSelectService={handleSelectItemService} onClose={() => setSelectedItem(null)} item={selectedItem} />}
            <Modal onClose={onClose} isItemSearch elementId='search-input-modal' customClass={customClass}>
                <div className='font-semibold'>
                    <ul className='flex flex-col gap-4'>
                        {!isLoadingItemList && searchInput.length > 3 ? <EachUtils of={itemList} render={(item, index) => {
                            return <li onClick={() => handleSelectedItem(item)} className='hover:bg-primary-pink-250/50 transition-all p-2 rounded cursor-pointer' key={item._id}>{item.name}</li>;
                        }} /> : <p className='text-center mt-12 font-normal'>Harap masukan setidaknya 3 huruf untuk memulai pencarian...</p>}
                    </ul>
                </div>
            </Modal>
        </div>
    );
};

export default ItemSearchModal;