import { motion } from "framer-motion";

const TabButton = ({ isSelected, layoutId = "", onClick, children }) => {
    let btnClass = "px-5 py-1 rounded-full relative ";
    if (isSelected) {
        btnClass += "text-primary-pink-100 bg-gradient-to-r from-gradient-pink-0 to-primary-pink-400 ";
    } else {
        btnClass += "text-primary-pink-300 ";
    }

    return (
        <motion.div className="relative" layoutId={layoutId}>
            <button onClick={onClick} className={btnClass}>{children}</button>
        </motion.div>
    );
};

export default TabButton;