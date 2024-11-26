import { TbArrowUpToArc } from "react-icons/tb";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { RiTShirtAirFill } from "react-icons/ri";


const HOW_IT_WORKS_LIST = [
    {
        title: "Drop Off Cucian",
        description:
            "Pakaian dicuci dengan air dan deterjen, namun tidak dikeringkan atau disetrika.",
        imageSrc: TbArrowUpToArc,
    },
    {
        title: "Proses Pencucian",
        description:
            "Pakaian dibersihkan tanpa air menggunakan bahan kimia khusus untuk bahan sensitif.",
        imageSrc: PiArrowsClockwiseBold,
    },
    {
        title: "Pengecekan",
        description:
            "Pakaian dicuci secara dry cleaning, kemudian disetrika hingga rapi.",
        imageSrc: IoIosSearch,
    },
    {
        title: "Pengambilan",
        description:
            "Layanan cepat yang membersihkan pakaian dalam waktu singkat, biasanya pada hari yang sama.",
        imageSrc: RiTShirtAirFill,
    },
];

export { HOW_IT_WORKS_LIST };
