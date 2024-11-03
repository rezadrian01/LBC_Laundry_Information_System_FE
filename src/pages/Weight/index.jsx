import CreateLayout from "@/components/Layouts/Crud/create";
import DefaultLayout from "@/components/Layouts/Default";
import Footer from "@/components/Modules/Footer";
import Header from "@/components/Modules/Header/header";
import { CREATE_WEIGHT_INPUT_LIST } from "@/constants/createInputList";
import { TABLE_CONTENT } from "@/constants/weightPriceList";
import { useParams } from "react-router-dom";

const Weight = () => {
    const { weightPriceId } = useParams();

    const keys = ["minWeight", "maxWeight", "price"];
    const numberTypeIndex = [0, 1, 2];

    let existingWeightPrice = null;
    if (weightPriceId) {
        const existingWeightPriceIndex = TABLE_CONTENT.findIndex(item => item.id === +weightPriceId);
        if (existingWeightPriceIndex === -1) throw json({ message: "Item not found" }, { status: 404 });

        const previousWeightPrice = TABLE_CONTENT[existingWeightPriceIndex - 1];
        const result = {
            ...TABLE_CONTENT[existingWeightPriceIndex],
            minWeight: (previousWeightPrice?.maxWeight || 0).toFixed(1),
            maxWeight: (TABLE_CONTENT[existingWeightPriceIndex].maxWeight - 0.1).toFixed(1),
        };
        existingWeightPrice = { ...result };
    }
    return (
        <DefaultLayout>
            <Header hasButton={false} />
            <CreateLayout isNew={weightPriceId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingWeightPrice} contents={CREATE_WEIGHT_INPUT_LIST} title="Harga Berat" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Weight;