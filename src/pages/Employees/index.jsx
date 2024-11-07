import DefaultLayout from '@/components/Layouts/Default';
import Crud from '@/components/Modules/Crud';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { TABLE_CONTENT, TABLE_HEADER } from '@/constants/employeeList';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        </DefaultLayout>
    );
};

export default Employees;