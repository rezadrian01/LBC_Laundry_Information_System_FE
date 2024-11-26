import React from 'react';
import { MdLocalLaundryService } from "react-icons/md";
import { GrFingerPrint } from "react-icons/gr";

const About = () => {
    return (
        <section className="bg-primary-pink-250 text-center h-screen relative">
            <div className="absolute right-16 top-12 text-white">
                <MdLocalLaundryService size={40} />
            </div>
            <div className="absolute left-64 top-40 text-white ">
                <GrFingerPrint size={200} />
            </div>
            <div className="pt-10 px-56 grid grid-cols-2 items-center min-h-full relative z-10">
                <div className="flex justify-center">
                    <img
                        src="src/assets/laundry.jpg"
                        alt="tentangKamiImg"
                        className="w-[30rem] aspect-square rounded-lg border-4 border-white"
                    />
                </div>
                <div className="max-w-[800px] mx-auto text-black-900 flex flex-col h-full pt-40 text-left gap-6">
                    <h2 className="mt-4 text-white underline font-light text-[1.5rem]">
                        Tentang Kami
                    </h2>
                    <h3 className="font-bold mt-4 text-4xl font-9xl">
                        Apa Itu LBC Laundry?
                    </h3>
                    <section className="flex flex-col gap-12">
                        <p className="text-white font-normal tracking-wide text-2xl">
                            <b>LBC Laundry</b> adalah usaha jasa yang telah
                            beroperasi selama <b>7 tahun</b>, menawarkan
                            pembersihan pakaian dan barang-barang tekstil
                            lainnya kepada pelanggan.
                        </p>
                        <p className="text-white font-normal tracking-wide text-2xl">
                            Kami menyediakan layanan laundry berkualitas bagi{" "}
                            <b>mahasiswa</b> dan <b>masyarakat</b> <b>Malang</b>{" "}
                            dengan harga yang <b>terjangkau</b>, layanan{" "}
                            <b>cepat</b>, serta pelacakan cucian yang{" "}
                            <b>mudah</b>.
                        </p>
                        <p className="text-white font-normal tracking-wide text-2xl">
                            Pelanggan dapat memilih antara layanan{" "}
                            <b>kiloan atau satuan</b> dengan berbagai opsi mulai
                            dari <b>reguler hingga express</b>, memastikan
                            kepuasan dan pemantauan setiap pesanan.
                        </p>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default About