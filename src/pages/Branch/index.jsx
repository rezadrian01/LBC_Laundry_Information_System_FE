import { useParams } from "react-router-dom";

import CreateLayout from "@layouts/Crud/create";
import DefaultLayout from "@layouts/Default";
import Footer from "@mods/Footer";
import Header from "@mods/Header/header";
import Sidebar from "@mods/Sidebar/sidebar";
import { BRANCH_LIST } from "@/constants/branchList";
import { BRANCH_DETAIL_FIELDS } from "@/constants/detailFieldList";

import useAuth from "@/hooks/useAuth";

const Branch = () => {
    const { branchId } = useParams();
    useAuth()

    const keys = ["name", "address"];

    let existingBranch = null;
    if (branchId) {
        existingBranch = BRANCH_LIST.find(branch => branch.id === +branchId);
        if (!existingBranch) throw json({ message: "Branch not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            <CreateLayout isNew={branchId ? false : true} keys={keys} defaultValues={existingBranch} fields={BRANCH_DETAIL_FIELDS} title="Cabang" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Branch;