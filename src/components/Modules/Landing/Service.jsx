import { SERVICE_LIST } from '@/constants/landingServiceList';
import React from 'react';
import { MdLocalLaundryService } from "react-icons/md";

const Service = () => {
    return (
        <section className="pt-20 pb-20 px-10 lg:px-32 bg-white relative">
            {/* Icon at top left */}
            <div className="absolute top-12 left-12 text-pink-500">
                <MdLocalLaundryService size={30} />
            </div>

            {/* Section header */}
            <div className="text-center mb-16">
                <div className="flex justify-center">
                    <h2 className="text-[18px] border-b-2 border-pink-300 w-[100px] text-center">
                        Pelayanan
                    </h2>
                </div>
                <h2 className="pt-10 text-5xl font-bold text-gray-900 mt-1">
                    Pelayanan yang Tersedia
                </h2>
                <p className="text-2xl text-black-600 mt-2">
                    Pilih jenis layanan yang Anda perlukan, dan kami siap
                    memberikan yang terbaik untuk Anda.
                </p>
            </div>

            {/* Service layout */}
            <div className="flex flex-wrap justify-between">
                {SERVICE_LIST.map((layanan, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/4 px-10 py-8 mb-10"
                    >
                        {/* Alternating layout */}
                        {index % 2 === 0 ? (
                            // Title and description above the image
                            <>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {layanan.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {layanan.description}
                                </p>
                                <img
                                    src={layanan.imageSrc}
                                    alt={layanan.title}
                                    className="w-80 h-80 object-cover rounded-lg"
                                />
                            </>
                        ) : (
                            // Image above title and description
                            <>
                                <img
                                    src={layanan.imageSrc}
                                    alt={layanan.title}
                                    className="w-80 h-80 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {layanan.title}
                                </h3>
                                <p className="text-gray-600">
                                    {layanan.description}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Service