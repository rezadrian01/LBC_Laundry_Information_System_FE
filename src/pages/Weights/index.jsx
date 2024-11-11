import React from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/weightPriceList';

import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';

const Weights = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const { data: weightPriceList, isLoading: isLoadingWeightPriceList, isError: isErrorWeightPriceList } = useQuery({
        queryKey: ['weights'],
        queryFn: async () => {
            const response = await apiInstance('weightPrice');
            return response.data.data;
        },
        enabled: !loadAuthData
    })
    const keys = ["_", "maxWeight", "formatedPrice"];
    const handleEditWeightPrice = (weightPriceId) => {
        console.log(weightPriceId);
    };
    const handleDeleteWeightPrice = (weightPriceId) => {
        console.log(weightPriceId);
    };
    if (!isLoadingWeightPriceList && weightPriceList) {
        weightPriceList.forEach(weightPrice => {
            const formatedPrice = new Intl.NumberFormat('id-ID').format(weightPrice.price);
            weightPrice.formatedPrice = formatedPrice;
        });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            {!loadAuthData && <Crud title='Berat' isWeightPriceList keys={keys} tableHeader={TABLE_HEADER} tableContent={weightPriceList} onCreate={() => navigate('new')} onEdit={handleEditWeightPrice} onDelete={handleDeleteWeightPrice} />}
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Weights;