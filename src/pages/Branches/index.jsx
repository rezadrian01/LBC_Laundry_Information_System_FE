import DefaultLayout from '@/components/Layouts/Default';
import Crud from '@/components/Modules/Crud';
import Footer from '@/components/Modules/Footer';
import Sidebar from '@/components/Modules/Sidebar/sidebar';

import { TABLE_HEADER, BRANCH_LIST as TABLE_CONTENT } from '@/constants/branchList';

const Branches = () => {
    const keys = ["_", "title", "_"];
    const handleEditBranch = (branchId) => {
        console.log(branchId);
    };
    const handleDeleteBranch = (branchId) => {
        console.log(branchId);
    };

    return (
        <DefaultLayout>
            <Sidebar />
            <Crud isBranchList keys={keys} tableHeader={TABLE_HEADER} tableContent={TABLE_CONTENT} onEdit={handleEditBranch} onDelete={handleDeleteBranch} />
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Branches;