import CreateLayout from "@/components/Layouts/Crud/create";
import DefaultLayout from "@/components/Layouts/Default";
import Footer from "@/components/Modules/Footer";
import Header from "@/components/Modules/Header/header";
import Sidebar from "@/components/Modules/Sidebar/sidebar";
import { BRANCH_LIST } from "@/constants/branchList";
import { CREATE_BRANCH_INPUT_LIST } from "@/constants/createInputList";
import { useParams } from "react-router-dom";

const Branch = () => {
    const { branchId } = useParams();

    const keys = ["title", "address"];

    let existingBranch = null;
    if (branchId) {
        existingBranch = BRANCH_LIST.find(branch => branch.id === +branchId);
        if (!existingBranch) throw json({ message: "Branch not found" }, { status: 404 });
    }
    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            <CreateLayout isNew={branchId ? false : true} keys={keys} defaultValues={existingBranch} contents={CREATE_BRANCH_INPUT_LIST} title="Cabang" />
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Branch;