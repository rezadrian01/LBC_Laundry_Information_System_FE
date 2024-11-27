// import React from 'react';
// import { MdLocalLaundryService } from "react-icons/md";
// import { GrFingerPrint } from "react-icons/gr";

// const About = () => {
//     return (
//         <section className="bg-primary-pink-250 text-center h-screen relative">
//             <div className="absolute right-16 top-12 text-white">
//                 <MdLocalLaundryService size={40} />
//             </div>
//             <div className="absolute left-64 top-40 text-white ">
//                 <GrFingerPrint size={200} />
//             </div>
//             <div className="pt-10 px-56 grid grid-cols-2 items-center min-h-full relative z-10">
//                 <div className="flex justify-center">
//                     <img
//                         src="src/assets/laundry.jpg"
//                         alt="tentangKamiImg"
//                         className="w-[30rem] aspect-square rounded-lg border-4 border-white"
//                     />
//                 </div>
//                 <div className="max-w-[800px] mx-auto text-black-900 flex flex-col h-full pt-40 text-left gap-6">
//                     <h2 className="mt-4 text-white underline font-light text-[1.5rem]">
//                         Tentang Kami
//                     </h2>
//                     <h3 className="font-bold mt-4 text-4xl font-9xl">
//                         Apa Itu LBC Laundry?
//                     </h3>
//                     <section className="flex flex-col gap-12">
//                         <p className="text-white font-normal tracking-wide text-2xl">
//                             <b>LBC Laundry</b> adalah usaha jasa yang telah
//                             beroperasi selama <b>7 tahun</b>, menawarkan
//                             pembersihan pakaian dan barang-barang tekstil
//                             lainnya kepada pelanggan.
//                         </p>
//                         <p className="text-white font-normal tracking-wide text-2xl">
//                             Kami menyediakan layanan laundry berkualitas bagi{" "}
//                             <b>mahasiswa</b> dan <b>masyarakat</b> <b>Malang</b>{" "}
//                             dengan harga yang <b>terjangkau</b>, layanan{" "}
//                             <b>cepat</b>, serta pelacakan cucian yang{" "}
//                             <b>mudah</b>.
//                         </p>
//                         <p className="text-white font-normal tracking-wide text-2xl">
//                             Pelanggan dapat memilih antara layanan{" "}
//                             <b>kiloan atau satuan</b> dengan berbagai opsi mulai
//                             dari <b>reguler hingga express</b>, memastikan
//                             kepuasan dan pemantauan setiap pesanan.
//                         </p>
//                     </section>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default About

import laundryImg from "@/assets/laundry.jpg";
import { ABOUT_SECTION_CONTENT_LIST } from "@/constants/landingConstant";

const About = () => {
    return (
        <section id="about" className='relative bg-primary-pink-250 min-h-screen overflow-hidden pt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

                <div className='    p-4 flex flex-col justify-center items-center md:justify-start md:items-start'>
                    <div className="relative flex justify-center items-center w-full">
                        <div className=" md:mt-36 md:ml-[4.5rem] relative z-10">
                            <img draggable={false} className="aspect-square lg:w-[30rem]" src={laundryImg} alt="Person bringing laundry" />
                        </div>
                        <div className='absolute -left-16 sm:left-0 lg:left-10 xl:left-32 -top-10 sm:-top-8 md:top-[9.5rem]'>
                            <BgLines />
                        </div>
                    </div>
                </div>

                <div className="px-6 md:px-10 pt-0 pb-14 md:py-20 text-white">
                    <h4 className="mb-10 underline underline-offset-8 text-xl">{ABOUT_SECTION_CONTENT_LIST[0].content}</h4>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-800">{ABOUT_SECTION_CONTENT_LIST[1].content}</h2>
                        <div className="flex flex-col gap-6 md:max-w-[30rem] lg:max-w-[40rem]">
                            <p dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_CONTENT_LIST[2].content }} className="text-xl lg:text-2xl"></p>
                            <p dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_CONTENT_LIST[3].content }} className="text-xl lg:text-2xl"></p>
                            <p dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_CONTENT_LIST[4].content }} className="text-xl lg:text-2xl"></p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

const BgLines = () => {
    return <>
        <div className='bg-white rounded-full w-[12rem] h-6 rotate-45 absolute top-0 left-0' />
        <div className='bg-white rounded-full w-[12rem] h-6 rotate-45 absolute top-0 left-20' />
        <div className='bg-white rounded-full w-[12rem] h-6 rotate-45 absolute top-0 left-40' />
        <div className='bg-white rounded-full w-[12rem] h-6 rotate-45 absolute top-20 left-0' />
        <div className='bg-white rounded-full w-[12rem] h-6 rotate-45 absolute top-40 left-0' />
    </>
}

export default About