import { FaChevronLeft } from "react-icons/fa";

const Button = ({ children, isDefault = true, next = false, back = false }) => {
    return (
        <>
            {/* Default Button */}
            {isDefault && <button className="flex items-center gap-2 md:gap-4 text-white bg-primary-pink-300 hover:bg-primary-pink-500 transition-all py-2 px-2 shadow-lg rounded">{children}</button>}

            {/* Back Button */}
            {!isDefault && back && <button className="flex items-center gap-2 md:gap-4   text-black font-semibold transition-all py-2 px-4">
                <FaChevronLeft />
                {children}
            </button>}

            {/* Next Button */}
            {!isDefault && next && <button className="flex items-center gap-2 md:gap-4  bg-primary-pink-200 hover:bg-primary-pink-250 text-black font-semibold transition-all py-2 px-4 shadow-lg rounded">{children}</button>}
        </>
    );
};

export default Button;