import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { motion, useAnimation, useInView } from "framer-motion";
import { MdLocalLaundryService } from "react-icons/md";
import { TbArrowUpToArc } from "react-icons/tb";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { RiTShirtAirFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

import EachUtils from '@/utils/eachUtils';
import clothesImg from '@/assets/clothes.png';
import { HOW_IT_WORKS_CONTENT_LIST, HOW_IT_WORKS_TITLE_LIST } from "@/constants/landingConstant";
import useIsVisible from "@/hooks/useIsVisible";
import { landingPageAction } from "@/stores/landing";

const Works = () => {
    const dispatch = useDispatch();
    const worksSectionRef = useRef(null);
    const isVisible = useIsVisible(worksSectionRef);

    const wrapperRef = useRef(null);
    const wrapperIsInView = useInView(wrapperRef, { once: true });
    const wrapperAnimation = useAnimation();

    useEffect(() => {
        if (isVisible) {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#works' }));
        }
    }, [isVisible]);

    useEffect(() => {
        if (wrapperIsInView) {
            wrapperAnimation.start('animate');
        }
    }, [wrapperIsInView]);

    return (
        <section id="works" className="min-h-screen p-6 md:p-10 bg-primary-pink-250 relative">
            <div className="absolute left-16 top-12 text-white ">
                <MdLocalLaundryService size={40} />
            </div>
            <div ref={worksSectionRef} className="text-center mb-20 mt-10">
                <motion.h2
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: .3, delay: .15 } }

                    }}
                    initial='initial'
                    animate={wrapperAnimation}
                    className="text-lg underline underline-offset-8 decoration-white">
                        {HOW_IT_WORKS_TITLE_LIST[0].title}
                </motion.h2>
                <motion.h2
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: .3, delay: .15 } }

                    }}
                    initial='initial'
                    animate={wrapperAnimation}
                    className="pt-10 text-5xl font-bold text-gray-800">
                    {HOW_IT_WORKS_TITLE_LIST[1].title}
                </motion.h2>
                <motion.p
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: .3, delay: .15 } }

                    }}
                    initial='initial'
                    animate={wrapperAnimation}
                    className="text-2xl text-black-600 mt-2">
                    {HOW_IT_WORKS_TITLE_LIST[2].title}
                </motion.p>
            </div>
            <motion.div
                variants={{
                    initial: { opacity: 0, y: -100 },
                    animate: { opacity: 1, y: 0, transition: { duration: .35, delay: .35, staggerChildren: .25, delayChildren: .5 } }
                }}
                initial='initial'
                animate={wrapperAnimation}
                ref={wrapperRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            <motion.div
                                variants={{
                                    initial: { opacity: 0, },
                                    animate: { opacity: 1, },
                                }}

                                ref={worksSectionRef}
                                key={index}
                                className="flex flex-col items-center bg-white drop-shadow-md rounded-3xl px-2 py-8"
                            >
                                <div className="w-full h-40 flex items-center justify-center object-cover rounded-md mb-4">
                                    {icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-primary-pink-500">
                                    {item.title}
                                </h3>
                                <p className="text-black-600 text-center">
                                    {item.description}
                                </p>
                            </motion.div>
                        </>
                    );
                }} />
            </motion.div>
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
