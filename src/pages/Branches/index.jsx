import { useNavigate } from 'react-router-dom';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';

import { TABLE_HEADER, BRANCH_LIST as TABLE_CONTENT } from '@/constants/branchList';

const Branches = () => {
    const navigate = useNavigate();
    const keys = ["_", "title"];
    const handleEditBranch = (branchId) => {
        console.log(branchId);
    };
    const handleDeleteBranch = (branchId) => {
        console.log(branchId);
    };

    return (
        <DefaultLayout>
            <Sidebar />
            <Crud title='Cabang' isBranchList keys={keys} tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onCreate={() => navigate('new')} onEdit={handleEditBranch} onDelete={handleDeleteBranch} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Branches;