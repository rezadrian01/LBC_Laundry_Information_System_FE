import { FaChevronLeft } from "react-icons/fa";

const Button = ({ children, isDefault = true, next = false, back = false, ...props }) => {
    return (
        <>
            {/* Default Button */}
            {isDefault && <button {...props} className="flex items-center justify-center gap-2 md:gap-4 text-white bg-primary-pink-300 hover:bg-primary-pink-500 transition-all py-2 px-2 shadow-lg rounded">{children}</button>}

            {/* Back Button */}
            {!isDefault && back && <button {...props} className="absolute bottom-4 sm:bottom-10 flex items-center justify-center gap-2 text-black font-semibold transition-all pb-2 pl-2">
                <FaChevronLeft />
                Kembali
            </button>}

            {/* Next Button */}
            {!isDefault && next && <button {...props} className="absolute flex items-center gap-2 md:gap-4  bg-primary-pink-200 hover:bg-primary-pink-250 text-black font-semibold transition-all py-2 px-4 shadow-lg rounded">{children}</button>}
        </>
    );
};

export default Button;