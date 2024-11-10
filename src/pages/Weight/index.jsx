import { json, useParams } from "react-router-dom";

import CreateLayout from "@layouts/Crud/create";
import DefaultLayout from "@layouts/Default";
import Footer from "@mods/Footer";
import Header from "@mods/Header/header";
import Sidebar from "@mods/Sidebar/sidebar";
import { WEIGHT_DETAIL_FIELDS } from "@/constants/detailFieldList";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";
import { useState } from "react";

const Weight = () => {
    const { weightPriceId } = useParams();
    const { isLoading: loadAuthData } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    let { data: existingWeightPrice, isLoading: isLoadingExistingWeightPrice, isError: isErrorExistingWeightPrice, error: errorExistingWeightPrice } = useQuery({
        queryKey: ['weights', { weightPriceId }],
        queryFn: async () => {
            const response = await apiInstance(`weightPrice/withPrevious/${weightPriceId}`);
            return response.data.data;
        },
        enabled: !loadAuthData && !!weightPriceId && !isDelete,
        retry: false
    })

    const keys = ["maxWeight", "price"];
    const numberTypeIndex = [0, 1, 2];

    if (isErrorExistingWeightPrice) {
        if (errorExistingWeightPrice.status !== 500) {
            throw json({ message: "Weight price not found" }, { status: 404 });
        }
    }
    if (weightPriceId && !isLoadingExistingWeightPrice && existingWeightPrice) {
        const result = {
            _id: existingWeightPrice.currentWeightPrice._id,
            maxWeight: (existingWeightPrice.currentWeightPrice.maxWeight).toFixed(1),
            price: existingWeightPrice.currentWeightPrice.price
        };
        existingWeightPrice = { ...result };
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {!isLoadingExistingWeightPrice && <CreateLayout note="Sistem ini hanya menerima input untuk Kiloan (end) dan Harga. Kiloan (start) akan otomatis diatur oleh sistem berdasarkan nilai Kiloan (end) dari entri sebelumnya." isDelete={isDelete} setIsDelete={setIsDelete} queryKey={['weights', { weightPriceId }]} requestUrl="weightPrice" isPending={isLoadingExistingWeightPrice} isNew={weightPriceId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingWeightPrice} fields={WEIGHT_DETAIL_FIELDS} title="Harga Berat" />}
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Weight;