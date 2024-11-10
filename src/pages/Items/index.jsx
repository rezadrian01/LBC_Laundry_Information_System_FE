import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/itemList';

import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';

const Items = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const { data: itemList, isLoading: isLoadingItemList, isError: isErrorItemList } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const response = await apiInstance(`item/group`);
            return response.data.data;
        },
        enabled: !loadAuthData
    });
    const keys = ["_", "name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const handleCreateItem = () => {
        navigate('new');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            {!loadAuthData && !isLoadingItemList && <Crud onCreate={handleCreateItem} keys={keys} isItemList tableHeader={TABLE_HEADER} tableContent={itemList} />}
            <Footer backToDashboard hasNext={false} />
        </DefaultLayout>
    );
};

export default Items;