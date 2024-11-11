import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DefaultLayout from '@layouts/Default';
import Crud from '@mods/Crud';
import Footer from '@mods/Footer';
import Sidebar from '@mods/Sidebar/sidebar';

import { TABLE_HEADER, BRANCH_LIST as TABLE_CONTENT } from '@/constants/branchList';
import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';

const Branches = () => {
    const navigate = useNavigate();
    const { isLoading: loadAuthData } = useAuth();
    const { data: branchList, isLoading: isLoadingBranchList, isError: isErrorBranchList } = useQuery({
        queryKey: ['branches'],
        queryFn: async () => {
            const response = await apiInstance('branch');
            return response.data.data;
        },
        enabled: !loadAuthData
    })
    const keys = ["_", "name"];
    const handleEditBranch = (branchId) => {
        console.log(branchId);
    };
    const handleDeleteBranch = (branchId) => {
        console.log(branchId);
    };

    return (
        <DefaultLayout>
            <Sidebar />
            {!isLoadingBranchList && <Crud title='Cabang' isBranchList keys={keys} tableHeader={TABLE_HEADER} tableContent={branchList} onCreate={() => navigate('new')} onEdit={handleEditBranch} onDelete={handleDeleteBranch} />}
            <div className='mt-4 md:mt-10'>
                <Footer backToDashboard hasNext={false} />
            </div>
        </DefaultLayout>
    );
};

export default Branches;