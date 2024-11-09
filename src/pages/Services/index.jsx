import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/serviceList';

import useAuth from '@/hooks/useAuth';

const Services = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
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
            {!loadAuthData && <>
            <Crud isServiceList keys={keys} title="Layanan" tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onCreate={() => navigate('new')} onEdit={handleEditService} onDelete={handleDeleteService} />
            <Footer backToDashboard hasNext={false} />
            </>}
        </DefaultLayout>
    );
};

export default Services;