import { MdLocalLaundryService } from "react-icons/md";
import { TbArrowUpToArc } from "react-icons/tb";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { RiTShirtAirFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

import EachUtils from '@/utils/eachUtils';
import clothesImg from '@/assets/clothes.png';
import { HOW_IT_WORKS_CONTENT_LIST, HOW_IT_WORKS_TITLE_LIST } from "@/constants/landingConstant";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import useIsVisible from "@/hooks/useIsVisible";
import { landingPageAction } from "@/stores/landing";

const Works = () => {
    const dispatch = useDispatch();
    const worksSectionRef = useRef(null);
    const isVisible = useIsVisible(worksSectionRef);
    useEffect(() => {
        if (isVisible) {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#works' }));
        }
    }, [isVisible]);

    return (
        <section id="works" className="min-h-screen p-6 md:p-10 bg-primary-pink-250 relative">
            <div className="absolute left-16 top-12 text-white ">
                <MdLocalLaundryService size={40} />
            </div>
            <div ref={worksSectionRef} className="text-center mb-20 mt-10">
                <div className="flex justify-center">
                    <h2 className="text-[18px] border-b-2 border-white w-[100px] text-center">
                        {HOW_IT_WORKS_TITLE_LIST[0].title}
                    </h2>
                </div>
                <h2 className="pt-10 text-5xl font-bold text-gray-800">
                    {HOW_IT_WORKS_TITLE_LIST[1].title}
                </h2>
                <p className="text-2xl text-black-600 mt-2">
                    {HOW_IT_WORKS_TITLE_LIST[2].title}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Here */}
                <EachUtils of={HOW_IT_WORKS_CONTENT_LIST} render={(item, index) => {
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
                                ref={worksSectionRef}
                                key={index}
                                className="flex flex-col items-center bg-white drop-shadow-md rounded-3xl px-2 py-8"
                            >
                                <div className="w-full h-40 flex items-center justify-center object-cover rounded-md mb-4">
                                    {icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-primary-pink-500">
                                    {item.title}
                                </h3>
                                <p className="text-black-600 text-center">
                                    {item.description}
                                </p>
                            </div>
                        </>
                    );
                }} />
            </div>
            <div className="pt-[3.5%]">
                <img
                    draggable={false}
                    src={clothesImg}
                    alt="Clothes"
                    className="w-full min-h-[12rem] object-cover"
                />
            </div>
        </section>
    )
}

export default Works
