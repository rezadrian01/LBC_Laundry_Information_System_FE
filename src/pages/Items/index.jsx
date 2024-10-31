import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/itemList';

const Items = () => {
    const keys = ["_", "name", "Lipat", "Gantung", "Dry Clean"];
    return (
        <DefaultLayout>
            <Crud keys={keys} isItemList tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Items;