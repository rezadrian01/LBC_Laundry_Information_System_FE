import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/itemList';

import useAuth from '@/hooks/useAuth';

const Items = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth()
    const keys = ["_", "name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const handleCreateItem = () => {
        navigate('new');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            {!loadAuthData && <Crud onCreate={handleCreateItem} keys={keys} isItemList tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} />}
            <Footer backToDashboard hasNext={false} />
        </DefaultLayout>
    );
};

export default Items;