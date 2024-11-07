import DefaultLayout from '@/components/Layouts/Default';
import Crud from '@/components/Modules/Crud';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/serviceList';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();
    const keys = ['_', 'name', 'price'];

    const handleEditService = (serviceId) => {
        console.log(serviceId);
    };
    const handleDeleteService = (serviceId) => {
        console.log(serviceId);
    };

    return (
        <DefaultLayout>
            <Sidebar />
            <Crud isServiceList keys={keys} title="Layanan" tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onCreate={() => navigate('new')} onEdit={handleEditService} onDelete={handleDeleteService} />
        </DefaultLayout>
    );
};

export default Services;