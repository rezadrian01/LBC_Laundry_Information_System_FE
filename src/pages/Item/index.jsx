import { json, useParams } from 'react-router-dom';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT } from '@/constants/itemList';
import { ITEM_DETAIL_FIELDS } from '@/constants/detailFieldList';

import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import { useState } from 'react';

const Item = () => {
    const { itemId } = useParams();
    const { isLoading: loadAuthData } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const { data: existingItem, isLoading: isLoadingExistingItem, isError: isErrorExistingItem, error: errorExistingItem } = useQuery({
        queryKey: ['items', { itemId }],
        queryFn: async () => {
            const response = await apiInstance(`item/${itemId}`);
            // console.log(response.data.data);
            return response.data.data;
        },
        enabled: !loadAuthData && !!itemId
    });

    const keys = ["name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const numberTypeIndex = [1, 2, 3];

    if (isErrorExistingItem) {
        if (errorExistingItem.status === 404) {
            throw json({ message: "Item not found" }, { status: 404 });
        }
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {!isLoadingExistingItem && <CreateLayout isDelete={isDelete} setIsDelete={setIsDelete} queryKey={['items', { itemId }]} requestUrl='item' isPending={isLoadingExistingItem} isItemDetail isNew={itemId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={!!itemId && existingItem[0]} fields={ITEM_DETAIL_FIELDS} title="Item" />}
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Item;