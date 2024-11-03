import CreateLayout from '@/components/Layouts/Crud/create';
import DefaultLayout from '@/components/Layouts/Default';
import Footer from '@/components/Modules/Footer';
import Header from '@/components/Modules/Header/header';
import { CREATE_ITEM_INPUT_LIST } from '@/constants/createInputList';
import { TABLE_CONTENT } from '@/constants/itemList';
import { useParams } from 'react-router-dom';

const Item = () => {
    const { itemId } = useParams();

    const keys = ["name", "Original (Lipat)", "Gantung", "Dry Clean"];
    let existingItem = null;
    if (itemId) {
        existingItem = TABLE_CONTENT.find(item => item.id === +itemId.toLowerCase());
        if (!existingItem) throw new Error("Item not found");
    }
    // console.log(existingItem);
    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <CreateLayout keys={keys} defaultValues={existingItem} hasDeleteBtn contents={CREATE_ITEM_INPUT_LIST} title="Item" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Item;