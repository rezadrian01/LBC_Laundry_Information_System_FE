import { json, useParams } from 'react-router-dom';
import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import Sidebar from '@mods/Sidebar/sidebar';
import { SERVICE_DETAIL_LIST } from '@/constants/detailFieldList';
import { TABLE_CONTENT } from '@/constants/serviceList';
import useAuth from '@/hooks/useAuth';

const Service = () => {
    const { serviceId } = useParams();
    const { isLoading: loadAuthData } = useAuth();

    const keys = ["name", "price"];
    const numberTypeIndex = [];

    let existingService = null;
    if (serviceId) {
        existingService = TABLE_CONTENT.find(service => service.id === +serviceId);
        if (!existingService) throw json({ message: "Service not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            {!loadAuthData && <>
            <Header hasButton={false} />
            <CreateLayout isNew={serviceId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingService} fields={SERVICE_DETAIL_LIST} title="Layanan" />
            <Footer hasNext={false} />
            </>}
        </DefaultLayout>
    );
};

export default Service;