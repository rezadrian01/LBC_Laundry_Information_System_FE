import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const successAlert = () => {
    const navigate = useNavigate();
    Swal.fire({
        title: "Data berhasil disimpan",
        icon: "success",
        confirmButtonColor: '#f87aac'
    }).then(result => {
        navigate('..');
    });
};

export default successAlert;