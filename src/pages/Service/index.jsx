import { json, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import Sidebar from '@mods/Sidebar/sidebar';
import { SERVICE_DETAIL_LIST } from '@/constants/detailFieldList';
import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import { queryClient } from '@/utils/query';
import successAlert from '@/utils/saveAlert/success';
import errorAlert from '@/utils/saveAlert/error';
import useSaveAlert from '@/hooks/useSaveAlert';
import { useState } from 'react';

const Service = () => {
    const { serviceId } = useParams();
    const { isLoading: loadAuthData } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const { data: existingService, isLoading: isLoadingExistingService, isError: isErrorExistingService, error: errorExistingService } = useQuery({
        queryKey: ['services', { serviceId }],
        queryFn: async () => {
            const response = await apiInstance(`service/${serviceId}`);
            return response.data.data;
        },
        retry: false,
        enabled: !loadAuthData && !!serviceId && !isDelete
    });

    const keys = ["name", "price"];
    const numberTypeIndex = [];

    if (isErrorExistingService) {
        if (errorExistingService.status === 404) {
            throw json({ message: "Service not found" }, { status: 404 });
        }
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            <CreateLayout isDelete={isDelete} setIsDelete={setIsDelete} queryKey={['services', { serviceId }]} requestUrl='service' isPending={isLoadingExistingService} isNew={serviceId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingService} fields={SERVICE_DETAIL_LIST} title="Layanan" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Service;