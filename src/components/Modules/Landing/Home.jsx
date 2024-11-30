import { useEffect, useRef } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { motion, useInView, useAnimation } from 'framer-motion';

import { HOME_SECTION_CONTENT_LIST } from '@/constants/landingConstant';
import peopleSmellLaundry from '@/assets/smellLaundry.jpg';
import bgImg from '@/assets/bg.png';
import useIsVisible from "@/hooks/useIsVisible";
import { useDispatch } from "react-redux";
import { landingPageAction } from "@/stores/landing";
import { duration } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const homeSectionRef = useRef(null);
    const isVisible = useIsVisible(homeSectionRef);

    const titleRef = useRef(null);
    const mainImgRef = useRef(null);
    const secondaryImgRef = useRef(null);

    const titleIsInView = useInView(titleRef, { once: true });
    const mainImgIsInView = useInView(mainImgRef, { once: true });
    const secondaryImgIsInView = useInView(secondaryImgRef, { once: true });

    const titleAnimation = useAnimation();
    const mainImgAnimation = useAnimation();
    const secondaryImgAnimation = useAnimation();

    useEffect(() => {
        if (isVisible) {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#home' }));
        }
    }, [isVisible]);

    // Animation Trigger
    useEffect(() => {
        if (titleIsInView) {
            titleAnimation.start('animate');
        }
        if (mainImgIsInView) {
            mainImgAnimation.start('animate');
        }
        if (secondaryImgIsInView) {
            secondaryImgAnimation.start('animate');
        }
    }, [titleIsInView, mainImgIsInView, secondaryImgIsInView])


    return (
        <div className='relative min-h-[78vh] flex flex-col items-center lg:justify-center'>
            <section ref={homeSectionRef} className='relative pb-10 max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 grid-flow-dense gap-8 md:gap-y-16 overflow-hidden'>

                {/* Small screen will shown */}
                <motion.div
                    ref={secondaryImgRef}
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } }
                    }}
                    initial='initial'
                    animate={secondaryImgAnimation}

                    className='flex sm:hidden col-span-1 justify-center pt-14'>
                    <div className='relative'>
                        <div className='bg-white p-1 rounded-xl'>
                            <img className='rounded-xl object-cover max-w-[18rem] md:max-w-[20rem] lg:max-w-[25rem] xl:max-w-[33rem]' draggable={false} loading='lazy' src={peopleSmellLaundry} />
                        </div>
                        <div className='absolute -top-6 -left-8 -z-10'>
                            <PinkSquares />
                        </div>
                        <div className='absolute top-20 -right-6 -z-10'>
                            <PinkSquares />
                        </div>
                    </div>
                </motion.div>

                <div
                    ref={titleRef}

                    className='col-span-1 flex flex-col gap-2 sm:gap-4 p-4 md:p-10'>
                    <motion.h4
                        variants={{
                            initial: { opacity: 0, },
                            animate: { opacity: 1, transition: { duration: 0.4, delay: 0.45 } }
                        }}
                        initial='initial'
                        animate={titleAnimation}
                        className='text-2xl lg:text-3xl underline underline-offset-8 decoration-primary-pink-250'>{HOME_SECTION_CONTENT_LIST[0].content}</motion.h4>
                    <motion.h2
                        variants={{
                            initial: { opacity: 0, y: -100 },
                            animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.25 } }
                        }}
                        initial='initial'
                        animate={titleAnimation}
                        className='font-bold text-5xl xl:text-7xl text-slate-800'>{HOME_SECTION_CONTENT_LIST[1].content}</motion.h2>
                    <motion.div
                        variants={{
                            initial: { opacity: 0, y: 20 },
                            animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.25 } }
                        }}
                        initial='initial'
                        animate={titleAnimation}
                        className='my-2 sm:my-6'>
                        <h4 className='tracking-wider text-base lg:text-xl'>{HOME_SECTION_CONTENT_LIST[2].content}</h4>
                    </motion.div>
                    <motion.div
                        variants={{
                            initial: { opacity: 0, },
                            animate: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } }
                        }}
                        initial='initial'
                        animate={titleAnimation}
                        className='justify-start'>
                        <button className='bg-primary-pink-250 hover:scale-[1.02] hover:bg-primary-pink-300 transition-all px-8 py-2 rounded text-white font-bold shadow-lg'>Cek Pesanan</button>
                    </motion.div>
                </div>

                {/* Bigger screen will shown */}
                <motion.div
                    ref={mainImgRef}
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: 0.4, delay: 0.25 } }
                    }}
                    initial='initial'
                    animate={mainImgAnimation}

                    className='hidden sm:flex col-span-1 justify-center pt-20'>
                    <div className='relative'>
                        <div className='bg-white p-1 rounded-xl'>
                            <img

                                className='rounded-xl object-cover max-w-[18rem] md:max-w-[20rem] lg:max-w-[25rem] xl:max-w-[33rem]' draggable={false} loading='lazy' src={peopleSmellLaundry} />
                        </div>
                        <div className='absolute lg:-top-10 -top-14 -left-8 -z-10'>
                            <PinkSquares />
                        </div>
                        <div className='absolute top-28 md:top-36 lg:top-56 xl:top-72 -right-6 -z-10'>
                            <PinkSquares />
                        </div>
                    </div>
                </motion.div>

            </section >
            <div className='absolute bottom-0 lg:bottom-0 inset-x-0 -z-20'>
                <img className='w-full min-h-[30rem] md:min-h-[15rem] object-cover' src={bgImg} />
            </div>
            <div className="absolute -translate-x-1/2 left-1/2 bottom-2 md:bottom-6">
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