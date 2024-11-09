import { json, useParams } from 'react-router-dom';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import Sidebar from '@mods/Sidebar/sidebar';
import { USER_PROFILE_FIELDS } from '@/constants/detailFieldList';
import { TABLE_CONTENT } from '@/constants/employeeList';

import useAuth from '@/hooks/useAuth';

const Employee = () => {
    const { employeeId } = useParams();
    const { isLoading: loadAuthData } = useAuth()

    const keys = ["name", "phone", "role", "password"];
    const numberTypeIndex = [];

    let existingEmployee = null;
    if (employeeId) {
        existingEmployee = TABLE_CONTENT.find(employee => employee.id === +employeeId);
        if (!existingEmployee) throw json({ message: "Employee not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {!loadAuthData && <CreateLayout isNew={employeeId ? false : true} keys={keys} numberTypeIndex={numberTypeIndex} defaultValues={existingEmployee} fields={USER_PROFILE_FIELDS} title="Karyawan" />}
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Employee;