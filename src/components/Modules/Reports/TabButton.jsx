import { motion } from "framer-motion";

const TabButton = ({ isSelected, layoutId = "", onClick, children }) => {
    let btnClass = "px-5 py-1 rounded-full relative transition-colors font-semibold ";
    if (isSelected) {
        btnClass += "text-primary-pink-100  ";
    } else {
        btnClass += "text-primary-pink-300 ";
    }

    return (
        <div className="relative">
            <button onClick={onClick} className={btnClass}>
                {isSelected && <motion.div layoutId={layoutId} className="absolute inset-0 bg-gradient-to-r from-gradient-pink-0 to-primary-pink-400 rounded-full " />}
                <div className="relative z-10">
                    {children}
                </div>
            </button>
        </div>
    );
};

export default TabButton;