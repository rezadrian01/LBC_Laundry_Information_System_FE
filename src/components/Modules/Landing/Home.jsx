// import React from 'react';
// import { FaChevronDown } from "react-icons/fa";
// import { GrApps } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";

// import bgImage from "@/assets/bg.png";

// const Home = () => {
//     const navigate = useNavigate();
//     return (
//         <section
//             className="min-h-[90vh] flex justify-center items-center bg-no-repeat bg-bottom w-full"
//             style={{
//                 backgroundImage: `url(${bgImage})`,
//                 backgroundSize: "100% 50vh",
//             }}
//         >
//             <div className="absolute top-80 right-1/3 text-primary-pink-250">
//                 <GrApps size={160} />
//             </div>
//             <div className="absolute bottom-40 right-20 text-primary-pink-250">
//                 <GrApps size={160} />
//             </div>
//             <div className="flex-1 px-[10%]">
//                 <p className="text-[18px] border-b-2 border-pink-300 w-[150px] mb-4">
//                     Pelayanan Laundry
//                 </p>
//                 <h2 className="text-black-900 text-[45px] font-bold">
//                     Pakaian Anda, Keahlian Kami, Cepat dan Bersih!
//                 </h2>
//                 <p className="text-[20px] font-semibold mt-2">
//                     LAUNDRY BE CLEAN
//                 </p>
//                 <button
//                     className="bg-primary-pink-250 text-white px-5 py-2 mt-12 rounded-md text-[16px] font-medium"
//                     onClick={() => navigate("/cek-pesanan")}
//                 >
//                     CEK PESANAN
//                 </button>
//             </div>
//             <div className="px-[10%]">
//                 <img
//                     src="src\assets\OM-removebg-preview.jpg"
//                     alt="Laundry service"
//                     className="max-w-full w-[400px] rounded-lg border-4 border-white"
//                 />
//             </div>
//             <div className="absolute bottom-12 text-black">
//                 <FaChevronDown size={40} />
//             </div>
//         </section>
//     )
// }

// export default Home

import { BsChevronCompactDown } from "react-icons/bs";

import { HOME_SECTION_CONTENT_LIST } from '@/constants/landingConstant';
import peopleSmellLaundry from '@/assets/smellLaundry.jpg';
import bgImg from '@/assets/bg.png';

const Home = () => {
    return (
        <div className='relative min-h-[78vh]'>
            <section className='relative pb-10 max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 grid-flow-dense gap-8 md:gap-y-16 overflow-hidden'>

                <div className='col-span-1 flex flex-col gap-4 p-4 md:p-10'>
                    <h4 className='text-2xl lg:text-3xl underline underline-offset-8 decoration-primary-pink-250'>{HOME_SECTION_CONTENT_LIST[0].content}</h4>
                    <h2 className='font-bold text-5xl xl:text-7xl text-slate-800'>{HOME_SECTION_CONTENT_LIST[1].content}</h2>
                    <div className='my-6'>
                        <h4 className='tracking-wider text-base lg:text-xl'>{HOME_SECTION_CONTENT_LIST[2].content}</h4>
                    </div>
                    <div className='justify-start'>
                        <button className='bg-primary-pink-250 hover:scale-[1.02] hover:bg-primary-pink-300 transition-all px-8 py-2 rounded text-white font-bold shadow-lg'>Cek Pesanan</button>
                    </div>
                </div>

                {/* Bigger screen will shown */}
                <div className='hidden sm:flex col-span-1 justify-center pt-20'>
                    <div className='relative'>
                        <div className='bg-white p-1 rounded-xl'>
                            <img className='rounded-xl object-cover max-w-[18rem] md:max-w-[20rem] lg:max-w-[25rem] xl:max-w-[33rem]' draggable={false} loading='lazy' src={peopleSmellLaundry} />
                        </div>
                        <div className='absolute lg:-top-10 -top-14 -left-8 -z-10'>
                            <PinkSquares />
                        </div>
                        <div className='absolute top-28 md:top-36 lg:top-56 xl:top-72 -right-6 -z-10'>
                            <PinkSquares />
                        </div>
                    </div>
                </div>

            </section >
            <div className='absolute bottom-0 lg:bottom-0 inset-x-0 -z-20'>
                <img className='w-full min-h-[15rem] object-cover' src={bgImg} />
            </div>
            <div className="absolute -translate-x-1/2 left-1/2 bottom-6">
                <a href="#about">
                    <BsChevronCompactDown size={50} />
                </a>
            </div>
        </div>
    )
}

const PinkSquares = () => {
    return <div className='flex flex-col gap-4'>
        {Array.from({ length: 4 }, (_, index) => {
            return <div key={index} className='flex gap-4'>
                {Array.from({ length: 4 }, (_, index) => {
                    return <div key={index} className='w-6 aspect-square bg-primary-pink-250' />
                })}
            </div>
        })}
    </div>
}

export default Home;