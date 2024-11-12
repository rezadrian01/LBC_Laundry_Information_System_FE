import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/itemList';

import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import { useEffect, useState } from 'react';

const Items = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const { data: itemList, isLoading: isLoadingItemList, isError: isErrorItemList, refetch: refetchItemList } = useQuery({
        queryKey: ['items', { searchInput: searchInput.length >= 3 ? searchInput : "" }],
        queryFn: async () => {
            let requestUrl = `item/group`;
            if (searchInput.length > 3) {
                requestUrl = `item/search/${searchInput}`;
            }
            const response = await apiInstance(requestUrl);
            return response.data.data;
        },
        enabled: !loadAuthData
    });

    useEffect(() => {
        console.log(searchInput.length);
        if (searchInput.length >= 3) {
            refetchItemList();
        }
    }, [searchInput])

    const keys = ["_", "name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const handleCreateItem = () => {
        navigate('new');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            {<Crud isPending={isLoadingItemList} searchInput={searchInput} setSearchInput={setSearchInput} onCreate={handleCreateItem} keys={keys} isItemList tableHeader={TABLE_HEADER} tableContent={itemList} />}
            <Footer backToDashboard hasNext={false} />
        </DefaultLayout>
    );
};

export default Items;