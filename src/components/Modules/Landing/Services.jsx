import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { MdLocalLaundryService } from "react-icons/md";
import { motion, useAnimation, useInView } from "framer-motion";

import { SERVICES_SECTION_CONTENT_LIST, SERVICES_SECTION_TITLE_LIST } from '@/constants/landingConstant';
import EachUtils from '@/utils/eachUtils';
import useIsVisible from "@/hooks/useIsVisible";
import { landingPageAction } from "@/stores/landing";

const Services = () => {
    const dispatch = useDispatch();
    const servicesSectionRef = useRef(null);
    const isVisible = useIsVisible(servicesSectionRef);

    const wrapperRef = useRef(null);
    const wrapperIsInView = useInView(wrapperRef, { once: true });
    const wrapperAnimation = useAnimation();

    useEffect(() => {
        if (isVisible) {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#services' }));
        }
    }, [isVisible]);

    useEffect(() => {
        if (wrapperIsInView) {
            wrapperAnimation.start('animate');
        }
    }, [wrapperIsInView]);

    return (
        <section id="services" className="min-h-[110vh] p-6 md:p-10 bg-white relative">
            {/* Icon at top left */}
            <div className="absolute top-12 left-12 text-pink-500">
                <MdLocalLaundryService size={30} />
            </div>

            {/* Section header */}
            <div ref={wrapperRef} className="text-center mb-16 mt-10">
                <div className="flex justify-center">
                    <motion.h2
                        variants={{
                            initial: { opacity: 0 },
                            animate: { opacity: 1, transition: { duration: .3, delay: .15 } }

                        }}
                        initial='initial'
                        animate={wrapperAnimation}
                        className="text-[18px] text-center underline underline-offset-8 decoration-primary-pink-250 decoration-2">
                        {SERVICES_SECTION_TITLE_LIST[0].title}
                    </motion.h2>
                </div>
                <motion.h2
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: .3, delay: .15 } }

                    }}
                    initial='initial'
                    animate={wrapperAnimation}
                    className="pt-10 text-5xl font-bold text-gray-900 mt-1">
                    {SERVICES_SECTION_TITLE_LIST[1].title}
                </motion.h2>
                <motion.p
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: .3, delay: .15 } }

                    }}
                    initial='initial'
                    animate={wrapperAnimation}
                    className="text-2xl text-black-600 mt-2">
                    {SERVICES_SECTION_TITLE_LIST[2].title}
                </motion.p>
            </div>

            {/* Service layout */}
            <motion.div
                variants={{
                    initial: { opacity: 0, y: -100 },
                    animate: { opacity: 1, y: 0, transition: { duration: .35, delay: .35, staggerChildren: .25, delayChildren: .5 } }
                }}
                initial='initial'
                animate={wrapperAnimation}
                ref={servicesSectionRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                <EachUtils of={SERVICES_SECTION_CONTENT_LIST} render={(item, index) => {
                    return <motion.div
                        variants={{
                            initial: { opacity: 0, y: -10 },
                            animate: { opacity: 1, y: 0 },
                        }}

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
                                    className="w-full h-[20rem] object-cover rounded-b-lg"
                                />
                            </div>
                        ) : (
                            // Image above title and description
                                <div className='flex flex-col justify-between h-full w-full'>
                                <img
                                    draggable={false}
                                    src={item.imageSrc}
                                    alt={item.title}
                                        className="w-full h-[20rem] object-cover rounded-t-lg mb-4"
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
                    </motion.div>
                }} />
            </motion.div>
            <div />
        </section>
    )
}

export default Services