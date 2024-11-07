import CreateLayout from '@/components/Layouts/Crud/create';
import DefaultLayout from '@/components/Layouts/Default';
import Footer from '@/components/Modules/Footer';
import Header from '@/components/Modules/Header/header';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { USER_PROFILE_FIELDS } from '@/constants/detailFieldList';
import { TABLE_CONTENT } from '@/constants/employeeList';
import React from 'react';
import { useParams } from 'react-router-dom';

const Employee = () => {
    const { employeeId } = useParams();

    const keys = ["name", "phone", "role", "password"];
    const numberTypeIndex = [];

    let existingItem = null;
    if (employeeId) {
        existingItem = TABLE_CONTENT.find(employee => employee.id === +employeeId);
        if (!existingItem) throw json({ message: "Item not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            <CreateLayout isEmployeeDetail isNew={employeeId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingItem} fields={USER_PROFILE_FIELDS} title="Karyawan" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Employee;