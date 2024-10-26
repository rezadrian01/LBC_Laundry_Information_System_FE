
import Button from "@/components/UI/Button";
import { FaPlus } from "react-icons/fa6";

const DashboardHeader = () => {
    return (
        <>
            <div className='grid grid-cols-2 w-full justify-between items-center pt-20 md:pt-10 '>
                <div className="col-span-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl leading-6 font-bold text-left bg-gradient-to-br from-pink-100 to-primary-pink-400 bg-clip-text text-transparent p-1">LBC Laundry</h3>
                </div>
                <div className="col-span-1 flex justify-end">
                    <Button className="flex items-center gap-2 md:gap-4 text-white bg-primary-pink-300 hover:bg-primary-pink-500 transition-all py-2 px-2 shadow-lg rounded">
                        <FaPlus size={20} />
                        <h5 className="text-[0.75rem]">TAMBAH PESANAN</h5>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;