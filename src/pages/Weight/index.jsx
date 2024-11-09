import { useParams } from "react-router-dom";

import CreateLayout from "@layouts/Crud/create";
import DefaultLayout from "@layouts/Default";
import Footer from "@mods/Footer";
import Header from "@mods/Header/header";
import Sidebar from "@mods/Sidebar/sidebar";
import { BRANCH_DETAIL_FIELDS } from "@/constants/detailFieldList";
import { TABLE_CONTENT } from "@/constants/weightPriceList";
import useAuth from "@/hooks/useAuth";

const Weight = () => {
    const { weightPriceId } = useParams();
    useAuth();

    const keys = ["minWeight", "maxWeight", "price"];
    const numberTypeIndex = [0, 1, 2];

    let existingWeightPrice = null;
    if (weightPriceId) {
        const existingWeightPriceIndex = TABLE_CONTENT.findIndex(weight => weight.id === +weightPriceId);
        if (existingWeightPriceIndex === -1) throw json({ message: "Weight price not found" }, { status: 404 });

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
            <Sidebar />
            <Header hasButton={false} />
            <CreateLayout isNew={weightPriceId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingWeightPrice} fields={BRANCH_DETAIL_FIELDS} title="Harga Berat" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Weight;