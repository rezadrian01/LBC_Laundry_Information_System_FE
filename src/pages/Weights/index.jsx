import DefaultLayout from '@/components/Layouts/Default';
import Crud from '@/components/Modules/Crud';
import Footer from '@/components/Modules/Footer';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/weightPriceList';
import React from 'react';

const Weights = () => {
    const keys = ["_", "maxWeight", "price", "_"];
    const handleEditWeightPrice = (id) => {
        console.log(id);
    };
    const handleDeleteWeightPrice = (id) => {
        console.log(id);
    };
    return (
        <DefaultLayout>
            <Crud isWeightPriceList keys={keys} tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onEdit={handleEditWeightPrice} onDelete={handleDeleteWeightPrice} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Weights;