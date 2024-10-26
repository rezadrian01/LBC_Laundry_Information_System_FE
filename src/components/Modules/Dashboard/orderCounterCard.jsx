
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PiWashingMachineLight } from "react-icons/pi";
import { TbIroning } from "react-icons/tb";


const OrderCounterCard = ({ item, index }) => {
    let icon;
    let wrapperClass = "col-span-1 aspect-square flex flex-col items-center justify-center p-1 ";
    let iconClass;
    switch (index) {
        case 0:
            icon = <LuShoppingCart color="white" size={16} />;
            iconClass = "bg-blue-500 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-gradient-blue/40 rounded-lg shadow-xl border-[1px]";
            break;
        case 1:
            icon = <HiOutlineShoppingBag color="white" size={16} />;
            iconClass = "bg-purple-500 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-gradient-purple/40 rounded-lg shadow-xl border-[1px]";
            break;
        case 2:
            icon = <PiWashingMachineLight color="white" size={16} />;
            iconClass = "bg-cyan-400 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-gradient-cyan/40 rounded-lg shadow-xl border-[1px]";
            break;
        case 3:
            icon = <TbIroning color="white" size={16} />;
            iconClass = "bg-pink-500 p-1 aspect-square rounded-full";
            wrapperClass += "bg-gradient-to-b from-white to-primary-pink-300/40 rounded-lg shadow-xl border-[1px]";
            break;
    }
    return (
        <div className={wrapperClass}>
            <header className="flex items-center gap-2">
                <div className={iconClass}>
                    {icon}
                </div>
                <h3 className="text-[.8rem] sm:text-lg font-semibold">
                    {item.title}
                </h3>
            </header>
            <h3 className="text-3xl sm:text-7xl font-bold">
                {item.total}
            </h3>
        </div>
    );
};

export default OrderCounterCard;