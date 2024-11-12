import { useState } from 'react';
import { json, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import Sidebar from '@mods/Sidebar/sidebar';
import { USER_PROFILE_FIELDS } from '@/constants/detailFieldList';
import { TABLE_CONTENT } from '@/constants/employeeList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';

const Employee = () => {
    const { employeeId } = useParams();
    const { isLoading: loadAuthData } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const { data: existingEmployee, isLoading: isLoadingExistingEmployee, isError: isErrorExistingEmployee, error: errorExistingEmployee } = useQuery({
        queryKey: ['employees', { employeeId }],
        queryFn: async () => {
            const response = await apiInstance(`admin/${employeeId}`);
            return response.data.data;
        },
        enabled: !loadAuthData && !!employeeId && !isDelete,
        retry: false
    })

    const keys = ["username", "contact", "role", "password"];
    const dropdownIndex = [2];
    if (isErrorExistingEmployee) {
        throw json({ message: "Employee not found" }, { status: 404 });
    }

    let fields = USER_PROFILE_FIELDS.slice(0, 3);
    if (!existingEmployee) {
        const startFields = USER_PROFILE_FIELDS.slice(0, 4);
        const endFields = USER_PROFILE_FIELDS[5];
        fields = [...startFields, endFields];
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {!isLoadingExistingEmployee && <CreateLayout isEmployeeDetail disableSave={!!employeeId} isDelete={isDelete} setIsDelete={setIsDelete} queryKey={['employees', { employeeId }]} requestUrl='admin' isPending={isLoadingExistingEmployee} isNew={employeeId ? false : true} keys={keys} dropdownIndex={dropdownIndex} defaultValues={existingEmployee} fields={fields} title="Karyawan" />}
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Employee;