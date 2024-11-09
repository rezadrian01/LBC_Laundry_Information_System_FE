import React from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/weightPriceList';

import useAuth from '@/hooks/useAuth';

const Weights = () => {
    const navigate = useNavigate();
    useAuth();
    const keys = ["_", "maxWeight", "price"];
    const handleEditWeightPrice = (weightPriceId) => {
        console.log(weightPriceId);
    };
    const handleDeleteWeightPrice = (weightPriceId) => {
        console.log(weightPriceId);
    };
    return (
        <DefaultLayout>
            <Sidebar />
            <Crud title='Berat' isWeightPriceList keys={keys} tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onCreate={() => navigate('new')} onEdit={handleEditWeightPrice} onDelete={handleDeleteWeightPrice} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Weights;