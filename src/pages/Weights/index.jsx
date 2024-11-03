import DefaultLayout from '@/components/Layouts/Default';
import Crud from '@/components/Modules/Crud';
import Footer from '@/components/Modules/Footer';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/weightPriceList';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Weights = () => {
    const navigate = useNavigate();
    const keys = ["_", "maxWeight", "price", "_"];
    const handleEditWeightPrice = (weightPriceId) => {
        console.log(weightPriceId);
    };
    const handleDeleteWeightPrice = (weightPriceId) => {
        console.log(weightPriceId);
    };
    return (
        <DefaultLayout>
            <Sidebar />
            <Crud isWeightPriceList keys={keys} tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onCreate={() => navigate('new')} onEdit={handleEditWeightPrice} onDelete={handleDeleteWeightPrice} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Weights;