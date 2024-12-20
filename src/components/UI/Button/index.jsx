
import { orderAction } from "@/stores/order";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Button = ({ children, isDefault = true, next = false, backToDashboard = false, back = false, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleBackClick = () => {
        if (location.pathname === '/new-order/weight' || location.pathname === '/new-order/item') {
            dispatch(orderAction.resetOrder());
        }
        if (location.pathname === '/new-order' || backToDashboard) {
            navigate('/dashboard');
            return;
        }

        navigate('..');
    };

    return (
        <>
            {/* Default Button */}
            {isDefault && <button {...props} className="flex items-center justify-center gap-2 md:gap-4 text-white bg-primary-pink-300 hover:bg-primary-pink-500 transition-all py-2 px-2 shadow-lg rounded">{children}</button>}

            {/* Back Button */}
            {!isDefault && back && <button type="button" onClick={handleBackClick} {...props} className="flex items-center justify-center gap-2 text-black font-semibold transition-all py-2">
                <FaChevronLeft />
                Kembali
            </button>}

            {/* Next Button */}
            {!isDefault && next && <button {...props} className="flex items-center justify-center gap-2 bg-primary-pink-200 hover:bg-primary-pink-250 text-black font-semibold transition-all shadow-lg rounded px-14 py-2">Lanjut</button>}
        </>
    );
};

export default Button;