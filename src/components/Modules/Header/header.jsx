import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";

import { MdLocationOn } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

import Button from "@/components/UI/Button";
import { BRANCH_LIST } from "@/constants/branchList";
import EachUtils from "@/utils/eachUtils";
import { branchAction } from "@/stores/branch";
import apiInstance from "@/utils/apiInstance";

const Header = ({ hasButton = true, hasBranchBtn = false, branchList = null, isReports = false, onSelect, selectedBranch = null, ...props }) => {
    const dispatch = useDispatch();
    const { activeBranch } = useSelector(state => state.branch);
    const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
    const { data: fetchedBranchList, isLoading: isLoadingBranchList, isError: isErrorBranchList } = useQuery({
        queryKey: ['branches'],
        queryFn: async () => {
            const response = await apiInstance('branch');
            return response.data.data;
        },
        retry: false
    });
    const { mutate: changeBranchFn, isPending: isPendingChangeBranch, isError: isErrorChangeBranch, error: errorChangeBranch } = useMutation({
        mutationFn: async (data) => {
            return apiInstance(`admin/latestBranch/${data.branchId}`, {
                method: "PUT"
            });
        },
        onError: (response) => {
            console.log(response);
        }
    })

    const toggleBranchDropdown = () => {
        setIsBranchDropdownOpen(!isBranchDropdownOpen);
    };
    const selectBranch = async (branch) => {
        setIsBranchDropdownOpen(false);
        if (isReports) {
            onSelect(branch);
        } else {
            changeBranchFn({ branchId: branch._id });
            dispatch(branchAction.changeActiveBranch({
            id: branch._id,
            name: branch.name,
            address: branch.address
        }));
        }

    };
    return (
        <>
            <div className='grid grid-cols-2 w-full justify-between items-center pt-14 '>
                <div className="col-span-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl leading-6 font-bold text-left bg-gradient-to-br from-pink-100 to-primary-pink-400 bg-clip-text text-transparent p-1">
                        <Link to={'/dashboard'}>
                            LBC Laundry
                        </Link>
                    </h3>
                </div>
                <div className="col-span-1 flex justify-end">
                    <div>
                        {hasButton && <Button {...props}>
                        <FaPlus size={20} />
                        <h5 className="text-[0.75rem]">TAMBAH PESANAN</h5>
                        </Button>}
                        {hasBranchBtn && isReports && <BranchDropdown activeBranch={selectedBranch} toggleBranchDropdown={toggleBranchDropdown} isBranchDropdownOpen={isBranchDropdownOpen} isReports branchList={branchList} onSelect={selectBranch} />}
                    </div>
                </div>
                {hasBranchBtn && !isReports && <>
                    <BranchDropdown branchList={fetchedBranchList} activeBranch={activeBranch} toggleBranchDropdown={toggleBranchDropdown} isBranchDropdownOpen={isBranchDropdownOpen} onSelect={selectBranch} />
                </>}
            </div>
        </>
    );
};

const BranchDropdown = ({ toggleBranchDropdown, activeBranch, isBranchDropdownOpen, branchList, isReports = false, onSelect }) => {
    return <div className="col-span-2 relative flex justify-end mt-4">
        <button className="flex justify-between items-center  text-primary-pink-300 bg-white hover:bg-primary-pink-100 transition-colors border-2 border-primary-pink-300 w-[12rem] rounded py-2 shadow-md pr-1" onClick={toggleBranchDropdown}>
            <div className="flex items-center gap-1 px-2">
                <MdLocationOn size={20} />
                {activeBranch.name}
            </div>
            <IoChevronDown size={20} />
        </button>
        <AnimatePresence>

        {isBranchDropdownOpen && <>
                <div onClick={toggleBranchDropdown} className="fixed inset-0" />
                <motion.ul variants={{
                    initial: { opacity: 0, y: -5 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeInOut' } },
                    exit: { opacity: 0, y: -5, transition: { duration: 0.15 } }
                }}
                    initial='initial'
                    animate='animate'
                    exit='exit' className="absolute z-20 shadow-xl rounded-lg w-[12rem] top-10">
                    <EachUtils of={branchList || BRANCH_LIST} render={(branch, index) => {
                    return <li onClick={() => onSelect(branch)} className="cursor-pointer flex items-center text-white bg-primary-pink-300 hover:bg-primary-pink-400 py-2 px-3 last:rounded-b" key={index}>
                        <MdLocationOn size={20} />
                        {branch.name}
                    </li>;
                }} />
                </motion.ul>
        </>}
        </AnimatePresence>
    </div>;
}


export default Header;