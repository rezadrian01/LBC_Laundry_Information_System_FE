import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/employeeList';

const Employees = () => {
    const navigate = useNavigate();
    const keys = ['_', 'name', 'role'];

    const handleEditEmployee = (employeeId) => {
        console.log(employeeId);
    };
    const handleDeleteEmployee = (employeeId) => {
        console.log(employeeId);
    };

    return (
        <DefaultLayout>
            <Sidebar />
            <Crud isEmployeeList keys={keys} title="Karyawan" tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onCreate={() => navigate('new')} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
            <Footer backToDashboard hasNext={false} />
        </DefaultLayout>
    );
};

export default Employees;