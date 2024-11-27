import { SERVICES_SECTION_CONTENT_LIST, SERVICES_SECTION_TITLE_LIST } from '@/constants/landingConstant';
import EachUtils from '@/utils/eachUtils';
import React from 'react';
import { MdLocalLaundryService } from "react-icons/md";

const Services = () => {
    return (
        <section id="services" className="min-h-screen p-10 bg-white relative">
            {/* Icon at top left */}
            <div className="absolute top-12 left-12 text-pink-500">
                <MdLocalLaundryService size={30} />
            </div>

            {/* Section header */}
            <div className="text-center mb-16 mt-10">
                <div className="flex justify-center">
                    <h2 className="text-[18px] text-center underline underline-offset-8 decoration-primary-pink-250 decoration-2">
                        {SERVICES_SECTION_TITLE_LIST[0].title}
                    </h2>
                </div>
                <h2 className="pt-10 text-5xl font-bold text-gray-900 mt-1">
                    {SERVICES_SECTION_TITLE_LIST[1].title}
                </h2>
                <p className="text-2xl text-black-600 mt-2">
                    {SERVICES_SECTION_TITLE_LIST[2].title}
                </p>
            </div>

            {/* Service layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                <EachUtils of={SERVICES_SECTION_CONTENT_LIST} render={(item, index) => {
                    return <div
                        key={index}
                        className="col-span-1 flex flex-col items-center text-center w-full border rounded-lg shadow-xl"
                    >
                        {/* Alternating layout */}
                        {index % 2 === 0 ? (
                            // Title and description above the image
                            <div className='flex flex-col justify-between h-full w-full'>
                                <div className=''>
                                    <h3 className="mt-4 text-2xl font-semibold text-gray-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mx-4 mb-4">
                                        {item.description}
                                    </p>
                                </div>
                                <img
                                    draggable={false}
                                    src={item.imageSrc}
                                    alt={item.title}
                                    className="w-full h-[20rem] object-cover rounded-lg"
                                />
                            </div>
                        ) : (
                            // Image above title and description
                            <div className='flex flex-col justify-between h-full w-full'>
                                <img
                                    draggable={false}
                                    src={item.imageSrc}
                                    alt={item.title}
                                    className="w-full h-[20rem] object-cover rounded-lg mb-4"
                                />
                                <div className=''>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mx-4 mb-4">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                }} />
            </div>
        </section>
    )
}

export default Services