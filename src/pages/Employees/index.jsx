import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/employeeList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';

const Employees = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const { data: employeeList, isLoading: isLoadingEmployeeList, isError: isErrorEmployeeList } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await apiInstance('admin');
            return response.data.data;
        },
        enabled: !loadAuthData,
        retry: false
    });

    const keys = ['_', 'username', 'role'];

    const handleEditEmployee = (employeeId) => {
        console.log(employeeId);
    };
    const handleDeleteEmployee = (employeeId) => {
        console.log(employeeId);
    };

    return (
        <DefaultLayout>
            <Sidebar />
            {!isLoadingEmployeeList && <Crud isEmployeeList keys={keys} title="Karyawan" tableHeader={TABLE_HEADER} tableContent={employeeList} onCreate={() => navigate('new')} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />}
            <Footer backToDashboard hasNext={false} />
        </DefaultLayout>
    );
};

export default Employees;