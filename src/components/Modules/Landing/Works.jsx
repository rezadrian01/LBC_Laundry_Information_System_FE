import React from 'react';
import { MdLocalLaundryService } from "react-icons/md";
import { TbArrowUpToArc } from "react-icons/tb";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { RiTShirtAirFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

import { HOW_IT_WORKS_LIST } from '@/constants/howItWorks';

const Works = () => {
    return (
        <section className="pt-16 px-60 bg-primary-pink-250 relative">
            <div className="absolute left-16 top-12 text-white ">
                <MdLocalLaundryService size={40} />
            </div>
            <div className="text-center mb-20">
                <div className="flex justify-center">
                    <h2 className="text-[18px] border-b-2 border-white w-[100px] text-center">
                        Cara Kerja
                    </h2>
                </div>
                <h2 className="pt-10 text-5xl font-bold text-gray-800">
                    Bagaimana Cara Kerjanya?
                </h2>
                <p className="text-2xl text-black-600 mt-2">
                    langkah-langkah cara kerja layanan laundry di LBC laundry
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {HOW_IT_WORKS_LIST.map((layanan, index) => {
                    let icon;
                    switch (index) {
                        case 0:
                            icon = <TbArrowUpToArc size={70} />;
                            break;
                        case 1:
                            icon = <PiArrowsClockwiseBold size={70} />;
                            break;
                        case 2:
                            icon = <IoIosSearch size={70} />;
                            break;
                        case 3:
                            icon = <RiTShirtAirFill size={70} />;
                            break;
                    }
                    return (
                        <>
                            <div
                                key={index}
                                className="flex flex-col items-center bg-white drop-shadow-md rounded-3xl px-2 py-8"
                            >
                                {/* <img
                                    src={layanan.imageSrc}
                                    alt={layanan.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                /> */}
                                <div className="w-full h-40 flex items-center justify-center object-cover rounded-md mb-4">
                                    {icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-primary-pink-500">
                                    {layanan.title}
                                </h3>
                                <p className="text-black-600 text-center">
                                    {layanan.description}
                                </p>
                            </div>
                        </>
                    );
                })}
            </div>
            <div className="pt-[3.5%]">
                <img
                    src="src\assets\baju.png"
                    alt="Laundry service"
                    className="max-w-fit "
                />
            </div>
        </section>
    )
}

export default Works