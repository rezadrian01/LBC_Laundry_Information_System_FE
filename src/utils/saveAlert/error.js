import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const errorAlert = () => {
    const navigate = useNavigate();
    Swal.fire({
        title: "Data gagal disimpan",
        text: "Maaf saat ini terjadi error di server, anda bisa mencobanya lagi nanti.",
        icon: "error",
        confirmButtonColor: '#f87aac'
    }).then(result => {
        navigate('..');
    });
};

export default errorAlert;