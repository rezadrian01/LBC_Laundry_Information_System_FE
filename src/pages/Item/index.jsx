import CreateLayout from '@/components/Layouts/Crud/create';
import DefaultLayout from '@/components/Layouts/Default';
import Footer from '@/components/Modules/Footer';
import Header from '@/components/Modules/Header/header';
import { CREATE_ITEM_INPUT_LIST } from '@/constants/createInputList';
import { TABLE_CONTENT } from '@/constants/itemList';
import { json, useParams } from 'react-router-dom';

const Item = () => {
    const { itemId } = useParams();

    const keys = ["name", "Original (Lipat)", "Gantung", "Dry Clean"];
    let existingItem = null;
    if (itemId) {
        existingItem = TABLE_CONTENT.find(item => item.id === +itemId.toLowerCase());
        if (!existingItem) throw new json({ message: "Item not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <CreateLayout isNew={itemId ? false : true} keys={keys} defaultValues={existingItem} contents={CREATE_ITEM_INPUT_LIST} title="Item" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Item;