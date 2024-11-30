import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { motion, useInView, useAnimation } from "framer-motion";

import laundryImg from "@/assets/laundry.jpg";
import { ABOUT_SECTION_CONTENT_LIST } from "@/constants/landingConstant";
import useIsVisible from "@/hooks/useIsVisible";
import { landingPageAction } from "@/stores/landing";

const About = () => {
    const dispatch = useDispatch();
    const aboutSectionRef = useRef(null);
    const isVisible = useIsVisible(aboutSectionRef);

    const wrapperRef = useRef(null);
    const wrapperIsInView = useInView(wrapperRef, { once: true });
    const wrapperAnimation = useAnimation();

    useEffect(() => {
        if (isVisible) {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#about' }));
        }
    }, [isVisible]);

    useEffect(() => {
        if (wrapperIsInView) {
            wrapperAnimation.start('animate')
        }
    }, [wrapperIsInView])


    return (
        <section id="about" className='relative bg-primary-pink-250 min-h-screen overflow-hidden pt-10'>
            <div
                className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='p-4 flex flex-col justify-center items-center md:justify-start md:items-start'>
                    <motion.div
                        variants={{
                            initial: { opacity: 0, },
                            animate: { opacity: 1, transition: { duration: 0.35, } }
                        }}
                        initial='initial'
                        animate={wrapperAnimation}

                        className="relative flex justify-center items-center w-full">
                        <div className=" md:mt-36 md:ml-[4.5rem] relative z-10">
                            <img draggable={false} className="aspect-square lg:w-[30rem]" src={laundryImg} alt="Person bringing laundry" />
                        </div>
                        <div className='absolute -left-16 sm:left-0 lg:left-10 xl:left-32 -top-10 sm:-top-8 md:top-[9.5rem]'>
                            <BgLines />
                        </div>
                    </motion.div>
                </div>

                <div

                    className="px-6 md:px-10 pt-0 pb-14 md:py-20 text-white">
                    <motion.h4
                        variants={{
                            initial: { opacity: 0, },
                            animate: { opacity: 1, transition: { duration: 0.3 } }
                        }}
                        initial='initial'
                        animate={wrapperAnimation}

                        className="mb-10 underline underline-offset-8 text-xl">{ABOUT_SECTION_CONTENT_LIST[0].content}</motion.h4>
                    <div className="flex flex-col gap-6">
                        <motion.h2
                            variants={{
                                initial: { opacity: 0, },
                                animate: { opacity: 1, transition: { duration: 0.3 } }
                            }}
                            initial='initial'
                            animate={wrapperAnimation}

                            ref={wrapperRef} className="text-3xl md:text-5xl font-bold text-slate-800">{ABOUT_SECTION_CONTENT_LIST[1].content}</motion.h2>

                        <motion.div
                            variants={{
                                initial: { opacity: 0, y: -100 },
                                animate: { opacity: 1, y: 0, transition: { duration: .35, delay: .35, staggerChildren: .25, delayChildren: .35 } }
                            }}
                            initial='initial'
                            animate={wrapperAnimation}

                            className="flex flex-col gap-6 md:max-w-[30rem] lg:max-w-[40rem]">
                            <motion.p
                                variants={{
                                    initial: { opacity: 0, y: -10 },
                                    animate: { opacity: 1, y: 0 },
                                }}
                                dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_CONTENT_LIST[2].content }} className="text-xl lg:text-2xl"></motion.p>
                            <motion.p
                                variants={{
                                    initial: { opacity: 0, y: -10 },
                                    animate: { opacity: 1, y: 0 },
                                }}
                                ref={aboutSectionRef} dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_CONTENT_LIST[3].content }} className="text-xl lg:text-2xl"></motion.p>
                            <motion.p
                                variants={{
                                    initial: { opacity: 0, y: -10 },
                                    animate: { opacity: 1, y: 0 },
                                }}
                                dangerouslySetInnerHTML={{ __html: ABOUT_SECTION_CONTENT_LIST[4].content }} className="text-xl lg:text-2xl"></motion.p>
                        </motion.div>

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