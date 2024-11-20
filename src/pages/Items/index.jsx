import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_HEADER } from '@/constants/itemList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';

const Items = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const [itemList, setItemList] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { ref, inView } = useInView();

    const { data, isLoading: isLoadingItemList, isError: isErrorItemList, refetch: refetchItemList } = useQuery({
        queryKey: ['items', { searchInput: searchInput.length >= 2 ? searchInput : "" }, { currentPage }],
        queryFn: async () => {
            let requestUrl = `item/group?page=${currentPage}`;
            if (searchInput.length >= 2) {
                requestUrl = `item/search/${searchInput}`;
            }
            const response = await apiInstance(requestUrl);
            const { data } = response;
            setItemList(prev => {
                if (searchInput.length >= 2) {
                    setCurrentPage(1);
                    return [...data.data];
                } else {
                    setHasNextPage(data.data.hasNextPage);
                    // if this first page then reset item list
                    if (currentPage === 1) {
                        return [...data.data.itemList];
                    }
                    // else push to array
                    return [...prev, ...data.data.itemList];
                }
            })

            return response.data.data;
        },
        enabled: !loadAuthData
    });

    useEffect(() => {
        if (searchInput.length >= 2) {
            refetchItemList();
        }
    }, [searchInput]);

    useEffect(() => {
        if (hasNextPage && !isLoadingItemList && inView) {
            setCurrentPage(prev => prev + 1);
        }
    }, [inView])

    const keys = ["_", "name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const handleCreateItem = () => {
        navigate('new');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            {<Crud isPending={itemList?.length === 0} searchInput={searchInput} setSearchInput={setSearchInput} onCreate={handleCreateItem} keys={keys} isItemList tableHeader={TABLE_HEADER} tableContent={itemList} />}
            <div ref={ref} />
            <Footer backToDashboard hasNext={false} />
        </DefaultLayout>
    );
};

export default Items;