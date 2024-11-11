import { useState } from "react";
import { json, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CreateLayout from "@layouts/Crud/create";
import DefaultLayout from "@layouts/Default";
import Footer from "@mods/Footer";
import Header from "@mods/Header/header";
import Sidebar from "@mods/Sidebar/sidebar";
import { BRANCH_LIST } from "@/constants/branchList";
import { BRANCH_DETAIL_FIELDS } from "@/constants/detailFieldList";

import useAuth from "@/hooks/useAuth";
import apiInstance from "@/utils/apiInstance";

const Branch = () => {
    const { branchId } = useParams();
    const { isLoading: loadAuthData } = useAuth();
    const [isDelete, setIsDelete] = useState(false);
    const { data: existingBranch, isLoading: isLoadingExistingBranch, isError: isErrorExistingBranch, error: errorExistingBranch } = useQuery({
        queryKey: ['branches', { branchId }],
        queryFn: async () => {
            const response = await apiInstance(`branch/${branchId}`);
            return response.data.data;
        },
        enabled: !loadAuthData && !!branchId && !isDelete
    })

    const keys = ["name", "address"];
    const textareaIndex = [1];

    if (isErrorExistingBranch) {
        if (errorExistingBranch.status === 404) {
            throw json({ message: "Branch not found" }, { status: 404 });
        }
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {!isLoadingExistingBranch && <CreateLayout isBranchDetail textareaIndex={textareaIndex} isDelete={isDelete} setIsDelete={setIsDelete} queryKey={['branches', { branchId }]} requestUrl="branch" isPending={isLoadingExistingBranch} isNew={branchId ? false : true} keys={keys} defaultValues={existingBranch} fields={BRANCH_DETAIL_FIELDS} title="Cabang" />}
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Branch;