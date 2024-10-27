
import { MdLocationOn } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/UI/Button";
import EachUtils from "@/utils/eachUtils";
import { BRANCH_LIST } from "@/constants/branchList";
import Select from "@/components/UI/Select";

const Header = ({ hasButton = true, hasDropdown = false, ...props }) => {

    return (
        <>
            <div className='grid grid-cols-2 w-full justify-between items-center pt-20 md:pt-10 '>
                <div className="col-span-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl leading-6 font-bold text-left bg-gradient-to-br from-pink-100 to-primary-pink-400 bg-clip-text text-transparent p-1">LBC Laundry</h3>
                </div>
                <div className="col-span-1 flex justify-end">
                    {hasButton && !hasDropdown && <Button {...props}>
                        <FaPlus size={20} />
                        <h5 className="text-[0.75rem]">TAMBAH PESANAN</h5>
                    </Button>}

                    {hasDropdown &&
                        <Select items={BRANCH_LIST} {...props} />
                    }
                </div>
            </div>
        </>
    );
};

export default Header;