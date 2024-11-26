import cuciBasah from "@/assets/cuci-basah.jpg";
import cuciKering from "@/assets/cuciKering.jpg";
import cuciKeringSetrika from "@/assets/cuci-kering-setrika.jpg";
import kilatExpress from "@/assets/kilat-express.jpg";

// Service data array
const SERVICE_LIST = [
    {
        title: "Cuci Basah",
        description:
            "Pakaian dicuci dengan air dan deterjen, namun tidak dikeringkan atau disetrika.",
        imageSrc: cuciBasah,
    },
    {
        title: "Cuci Kering",
        description:
            "Pakaian dibersihkan tanpa air menggunakan bahan kimia khusus untuk bahan sensitif.",
        imageSrc: cuciKering,
    },
    {
        title: "Cuci Kering Setrika",
        description:
            "Pakaian dicuci secara dry cleaning, kemudian disetrika hingga rapi.",
        imageSrc: cuciKeringSetrika,
    },
    {
        title: "Kilat/Express",
        description:
            "Layanan cepat yang membersihkan pakaian dalam waktu singkat, biasanya pada hari yang sama.",
        imageSrc: kilatExpress,
    },
];

export { SERVICE_LIST };
