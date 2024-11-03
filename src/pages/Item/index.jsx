import { json, useParams } from 'react-router-dom';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import { CREATE_ITEM_INPUT_LIST } from '@/constants/createInputList';
import { TABLE_CONTENT } from '@/constants/itemList';

const Item = () => {
    const { itemId } = useParams();

    const keys = ["name", "Original (Lipat)", "Gantung", "Dry Clean"];
    const numberTypeIndex = [1, 2, 3];

    let existingItem = null;
    if (itemId) {
        existingItem = TABLE_CONTENT.find(item => item.id === +itemId);
        if (!existingItem) throw json({ message: "Item not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <CreateLayout isItemList isNew={itemId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingItem} contents={CREATE_ITEM_INPUT_LIST} title="Item" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Item;