import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/serviceList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';

const Services = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const keys = ['_', 'name', 'formatedPrice'];

    const { data: serviceList, isPending: isPendingServiceList, isError: isErrorServiceList } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await apiInstance('service');
            return response.data.data;
        },
        enabled: !loadAuthData
    })

    const handleEditService = (serviceId) => {
        console.log(serviceId);
    };
    const handleDeleteService = (serviceId) => {
        console.log(serviceId);
    };

    if (!isPendingServiceList) {
        serviceList.forEach(service => {
            const formatedPrice = new Intl.NumberFormat('id-ID').format(service.price);
            service.formatedPrice = formatedPrice;
        });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            {/* {!loadAuthData && <> */}
            <Crud isPending={isPendingServiceList} isServiceList keys={keys} title="Layanan" tableHeader={TABLE_HEADER} tableContent={serviceList} onCreate={() => navigate('new')} onEdit={handleEditService} onDelete={handleDeleteService} />
            <Footer backToDashboard hasNext={false} />
            {/* </>} */}
        </DefaultLayout>
    );
};

export default Services;