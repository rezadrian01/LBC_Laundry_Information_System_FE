import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useSaveAlert = (isSuccess = true) => {
    const navigate = useNavigate();
    isSuccess ? Swal.fire({
        title: "Data berhasil disimpan",
        icon: "success",
        confirmButtonColor: '#f87aac'
    }).then(result => {
        navigate('..');
    }) : Swal.fire({
        title: "Data gagal disimpan",
        text: "Maaf saat ini terjadi error di server, anda bisa mencobanya lagi nanti.",
        icon: "error",
        confirmButtonColor: '#f87aac'
    }).then(result => {
        navigate('..');
    });
};


export default useSaveAlert;