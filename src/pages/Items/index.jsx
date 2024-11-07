import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/itemList';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';

const Items = () => {
    const navigate = useNavigate();
    const keys = ["_", "name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const handleCreateItem = () => {
        navigate('new');
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Crud onCreate={handleCreateItem} keys={keys} isItemList tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} />
            <div className='mt-4 md:mt-10 tracking-wider'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Items;