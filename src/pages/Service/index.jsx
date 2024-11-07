import CreateLayout from '@/components/Layouts/Crud/create';
import DefaultLayout from '@/components/Layouts/Default';
import Footer from '@/components/Modules/Footer';
import Header from '@/components/Modules/Header/header';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { SERVICE_DETAIL_LIST, USER_PROFILE_FIELDS } from '@/constants/detailFieldList';
import { TABLE_CONTENT } from '@/constants/serviceList';
import { json, useParams } from 'react-router-dom';

const Service = () => {
    const { serviceId } = useParams();

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
            <Header hasButton={false} />
            <CreateLayout isNew={serviceId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingService} fields={SERVICE_DETAIL_LIST} title="Layanan" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Service;