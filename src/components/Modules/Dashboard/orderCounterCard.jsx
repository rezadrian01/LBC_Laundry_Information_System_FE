
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PiWashingMachineLight } from "react-icons/pi";
import { TbIroning } from "react-icons/tb";


const OrderCounterCard = ({ item, index }) => {
    let icon;
    let wrapperClass = "relative col-span-1 aspect-square flex flex-col items-center cursor-pointer ";
    let iconClass;
    switch (index) {
        case 0:
            icon = <LuShoppingCart color="white" size={16} />;
            iconClass = "bg-blue-500 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-gradient-blue/40 rounded-xl md:rounded-3xl shadow-xl border-[1px]";
            break;
        case 1:
            icon = <HiOutlineShoppingBag color="white" size={16} />;
            iconClass = "bg-purple-500 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-gradient-purple/40 rounded-xl md:rounded-3xl shadow-xl border-[1px]";
            break;
        case 2:
            icon = <PiWashingMachineLight color="white" size={16} />;
            iconClass = "bg-cyan-400 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-gradient-cyan/40 rounded-xl md:rounded-3xl shadow-xl border-[1px]";
            break;
        case 3:
            icon = <TbIroning color="white" size={16} />;
            iconClass = "bg-pink-500 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-primary-pink-300/40 rounded-xl md:rounded-3xl shadow-xl border-[1px]";
            break;
    }
    return (
        <div className={wrapperClass}>
            <header className="flex items-center gap-2 mt-4">
                <div className={iconClass}>
                    {icon}
                </div>
                <h3 className="text-[.8rem] sm:text-lg font-semibold">
                    {item.name}
                </h3>
            </header>
            <div className="absolute w-full h-full">
                <div className="flex h-full items-center justify-center">
                    <h3 className=" text-5xl sm:text-7xl font-bold  ">
                {item.total}
                    </h3>
                </div>
            </div>
        </div >
    );
};

export default OrderCounterCard;