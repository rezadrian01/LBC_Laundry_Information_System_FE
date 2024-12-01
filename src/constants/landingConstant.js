import cuciBasah from "@/assets/cuci-basah.jpg";
import cuciKering from "@/assets/cuciKering.jpg";
import cuciKeringSetrika from "@/assets/cuci-kering-setrika.jpg";
import kilatExpress from "@/assets/kilat-express.jpg";

const NAVBAR_LIST = [
    {
        id: 1,
        title: "Beranda",
        link: "#home"
    },
    {
        id: 2,
        title: "Tentang Kami",
        link: "#about"
    },
    {
        id: 3,
        title: "Pelayanan",
        link: "#services"
    },
    {
        id: 4,
        title: "Cara Kerja",
        link: "#works"
    },
    {
        id: 5,
        title: "Kontak",
        link: "#contact"
    },
];

const HOME_SECTION_CONTENT_LIST = [
    {
        id: 1,
        content: "Pelayanan Laundry"
    },
    {
        id: 2,
        content: "Pakaian Anda, Keahlian Kami, Cepat dan Bersih!"
    },
    {
        id: 3,
        content: "LAUNDRY BE CLEAN"
    },
];

const ABOUT_SECTION_CONTENT_LIST = [
    {
        id: 1,
        content: "Tentang Kami"
    },
    {
        id: 2,
        content: "APA ITU LBC LAUNDRY?"
    },
    {
        id: 3,
        content: "<strong>LBC Laundry</strong> adalah usaha jasa yang telah beroperasi selama <strong>7 tahun,</strong> menawarkan pembersihan pakaian dan barang-barang tekstil lainnya kepada pelanggan."
    },
    {
        id: 4,
        content: "Kami menyediakan layanan laundry berkualitas bagi <strong>mahasiswa</strong> dan <strong>masyarakat Malang</strong> dengan harga yang <strong>terjangkau,</strong> layanan <strong>cepat,</strong> serta pelacakan cucian yang <strong>mudah.</strong>"
    },
    {
        id: 5,
        content: "Pelanggan dapat memilih antara layanan <strong>kiloan atau satuan</strong> dengan berbagai opsi mulai dari <strong>reguler hingga express,</strong> memastikan kepuasan dan pemantauan setiap pesanan."
    },
];

const SERVICES_SECTION_TITLE_LIST = [
    {
        id: 1,
        title: "Pelayanan"
    },
    {
        id: 2,
        title: "Pelayanan yang Tersedia"
    },
    {
        id: 3,
        title: "Pilih jenis layanan yang Anda perlukan, dan kami siap memberikan yang terbaik untuk Anda."
    },
];

const SERVICES_SECTION_CONTENT_LIST = [
    {
        id: 1,
        title: "Cuci Basah",
        description:
            "Pakaian dicuci dengan air dan deterjen, namun tidak dikeringkan atau disetrika.",
        imageSrc: cuciBasah,
    },
    {
        id: 2,
        title: "Cuci Kering",
        description:
            "Pakaian dibersihkan tanpa air menggunakan bahan kimia khusus untuk bahan sensitif.",
        imageSrc: cuciKering,
    },
    {
        id: 3,
        title: "Cuci Kering Setrika",
        description:
            "Pakaian dicuci secara dry cleaning, kemudian disetrika hingga rapi.",
        imageSrc: cuciKeringSetrika,
    },
    {
        id: 4,
        title: "Kilat/Express",
        description:
            "Layanan cepat yang membersihkan pakaian dalam waktu singkat, biasanya selesai pada hari yang sama.",
        imageSrc: kilatExpress,
    },
]

const HOW_IT_WORKS_TITLE_LIST = [
    {
        id: 1,
        title: "Cara Kerja"
    },
    {
        id: 2,
        title: "Bagaimana Cara Kerjanya?"
    },
    {
        id: 3,
        title: "langkah-langkah cara kerja layanan laundry di LBC Laundry"
    },
]

const HOW_IT_WORKS_CONTENT_LIST = [
    {
        title: "Drop Off Cucian",
        description:
            "Pakaian dicuci dengan air dan deterjen, namun tidak dikeringkan atau disetrika.",
    },
    {
        title: "Proses Pencucian",
        description:
            "Pakaian dibersihkan tanpa air menggunakan bahan kimia khusus untuk bahan sensitif.",
    },
    {
        title: "Pengecekan",
        description:
            "Pakaian dicuci secara dry cleaning, kemudian disetrika hingga rapi.",
    },
    {
        title: "Pengambilan",
        description:
            "Layanan cepat yang membersihkan pakaian dalam waktu singkat, biasanya selesai pada hari yang sama.",
    },
];

const FOOTER_CONTENT_LIST = [
    {
        id: 1,
        title: "Header",
        contents: [
            {
                id: 1,
                title: "LBC Laundry"
            },
            {
                id: 2,
                title: "Pakaian Anda, Keahlian Kami, Cepat dan Bersih!"
            },
        ]
    },
    {
        id: 2,
        title: "Hubungi Kami",
        contents: [
            {
                id: 1,
                content: "08XX-XXXX-XXXX"
            },
            {
                id: 2,
                content: "Ruko Bajang Ratu Indah Jl. Candi Waringin No.5 <br/> Mojolangu Lowokwaru, Kota Malang, Jawa Timur 65142"
            },
        ]
    },
    {
        id: 3,
        title: "Jam Operasional",
        contents: [
            {
                id: 1,
                content: "Senin - Sabtu: 8 am - 8 pm"
            },
            {
                id: 2,
                content: "Minggu: 8 am - 6 pm"
            },
        ]
    },
    {
        id: 4,
        title: "Navigasi",
        contents: [
            {
                id: 1,
                content: "Beranda",
                link: "#home"
            },
            {
                id: 2,
                content: "Tentang Kami",
                link: "#about"
            },
            {
                id: 3,
                content: "Pelayanan",
                link: "#services"
            },
            {
                id: 4,
                content: "Kontak",
                link: "#contact"
            },
        ]
    }
];

const ADMIN_CONTACT = "";

export {
    NAVBAR_LIST,
    HOME_SECTION_CONTENT_LIST,
    ABOUT_SECTION_CONTENT_LIST,
    SERVICES_SECTION_TITLE_LIST,
    SERVICES_SECTION_CONTENT_LIST,
    HOW_IT_WORKS_TITLE_LIST,
    HOW_IT_WORKS_CONTENT_LIST,
    FOOTER_CONTENT_LIST,
    ADMIN_CONTACT
};