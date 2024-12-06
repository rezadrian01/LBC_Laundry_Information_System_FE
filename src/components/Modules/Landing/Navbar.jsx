import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { ADMIN_CONTACT, NAVBAR_LIST } from '@/constants/landingConstant'
import EachUtils from '@/utils/eachUtils'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hash, setHash] = useState(window.location.hash);
    const [navbarIsOpen, setNavbarIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { activeSection } = useSelector(state => state.landingPage);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (windowWidth >= 1024) {
            setNavbarIsOpen(false);
        }
    }, [windowWidth]);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        }

        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        }
    }, []);

    const isLandingPage = location.pathname === '/';

    return (
        <>

            <div className='sticky z-20 backdrop-blur-sm top-0 grid grid-cols-8 justify-around items-center gap-4 px-2 md:px-10 py-4 font-semibold'>
                <div className='col-span-4 lg:col-span-2 flex'>

                    <button onClick={() => setNavbarIsOpen(prev => !prev)} className='block relative lg:hidden w-8 z-50'>
                        <HamburgerMenu navbarIsOpen={navbarIsOpen} />
                    </button>


                    {/* Navbar */}
                    <AnimatePresence>
                    {navbarIsOpen && <>
                            <motion.div variants={{
                                initial: { y: -100, opacity: 0 },
                                animate: { y: 0, opacity: 1, transition: { bounce: false, duration: .2, ease: 'easeInOut' } },
                                exit: { y: -300, opacity: 0, transition: { bounce: false, ease: 'easeInOut' } }
                            }}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                className='fixed -top-10 inset-x-0 z-30 h-[30rem] bg-primary-pink-300/90 flex flex-col justify-center text-white pb-10'>
                                <motion.ul variants={{
                                    initial: { opacity: 0 },
                                    animate: { opacity: 1, transition: { staggerChildren: .1 } },
                                    exit: { opacity: 0 }
                                }}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'
                                    className='relative z-30 flex flex-col gap-6 justify-center items-center text-xl'>
                                <EachUtils of={NAVBAR_LIST} render={(item, index) => {
                                        return <motion.li
                                            variants={{
                                                initial: { opacity: 0, y: -10 },
                                                animate: { opacity: 1, y: 0, transition: { bounce: false } },
                                                exit: { opacity: 0, y: -10 }
                                            }}
                                            className='group' key={item.id}>
                                            <a onClick={() => setNavbarIsOpen(false)} href={`${isLandingPage ? item.link : `/${item.link}`}`}>{item.title}</a>
                                            <div className='border-b-[1px] duration-200 group-hover:border-b-white border-transparent' style={{ borderBottomColor: activeSection === item.link ? '#ffffff' : '' }} />
                                        </motion.li>
                                }} />
                                </motion.ul>
                            </motion.div>

                    </>
                    }
                    </AnimatePresence>

                    <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-6 font-bold text-center md:text-left bg-gradient-to-br from-pink-100 to-primary-pink-400 bg-clip-text text-transparent p-1 ">
                        <Link onClick={() => window.scrollTo(0, 0)} to={'/'}>
                        LBC Laundry
                    </Link>
                </h3>
            </div>
                <ul className='hidden lg:flex justify-center gap-4 col-span-4 pt-2 lg:text-base xl:text-xl'>
                <EachUtils of={NAVBAR_LIST} render={(item, index) => {
                        let isActive = activeSection === item.link;

                    return <li className='group' key={item.id}>
                        <a href={`${isLandingPage ? item.link : `/${item.link}`}`}>{item.title}</a>
                        <div className='border-b-[1px] duration-200 group-hover:border-b-slate-950 border-transparent' style={{
                            borderBottomColor:
                                isActive ? '#020617' : ''
                        }} />
                    </li>
                }} />
            </ul>
                <div className='col-span-4 lg:col-span-2 flex justify-end lg:justify-center w-full gap-4'>
                    <Link to={`https://wa.me/${ADMIN_CONTACT}`} className='text-primary-pink-100 text-[.7rem] sm:text-base bg-primary-pink-300 hover:bg-primary-pink-500 px-2 md:px-4 py-2 rounded-lg'>Hubungi Kami</Link>
                    <button onClick={() => navigate('login')} className='text-primary-pink-100 text-[.7rem] sm:text-base bg-primary-pink-300 hover:bg-primary-pink-500 px-2 md:px-4 py-2 rounded-lg'>Login</button>
                </div>
        </div>

            {navbarIsOpen && <div onClick={() => setNavbarIsOpen(false)} className='bg-black/20 fixed inset-0 z-10' />}

        </>
    )
};

const HamburgerMenu = ({ navbarIsOpen }) => {
    return <div className='relative w-full pb-6 '>
        <div className='absolute left-0 border-b-[3px] rounded-full w-7 transition-all' style={{ rotate: navbarIsOpen ? '45deg' : '0deg', top: navbarIsOpen ? '12px' : '0px', borderColor: navbarIsOpen ? 'white' : '#f875aa' }} />
        <div className='absolute left-0 top-3 border-b-[3px] rounded-full w-7 transition-all' style={{ rotate: navbarIsOpen ? '45deg' : '0deg', borderColor: navbarIsOpen ? 'white' : '#f875aa' }} />
        <div className='absolute left-0 top-6 border-b-[3px] rounded-full w-7 transition-all' style={{ rotate: navbarIsOpen ? '-45deg' : '0deg', top: navbarIsOpen ? '12px' : '24px', borderColor: navbarIsOpen ? 'white' : '#f875aa' }} />
    </div>
}

export default Navbar