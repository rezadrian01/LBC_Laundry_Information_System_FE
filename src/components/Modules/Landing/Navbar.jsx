// import React from 'react'
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return (
//         <header className="flex justify-around items-center pt-8 w-full border-t-[3rem] border-primary-pink-250">
//             <Link to={"/"} className="text-primary-pink-500 font-bold text-4xl">
//                 LBC Laundry
//             </Link>
//             <nav>
//                 <ul className="flex gap-10 m-0 p-0 list-none text-xl font-medium text-black-500">
//                     <li className="cursor-pointer">
//                         <a href="#beranda">Beranda</a>
//                     </li>
//                     <li className="cursor-pointer">
//                         <a href="#tentang-kami">Tentang Kami</a>
//                     </li>
//                     <li className="cursor-pointer">
//                         <a href="#pelayanan">Pelayanan</a>
//                     </li>
//                     <li className="cursor-pointer">
//                         <a href="#cara-kerja">Cara Kerja</a>
//                     </li>
//                     <li className="cursor-pointer">
//                         <a href="#kontak">Kontak</a>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="buttons">
//                 <button className="bg-primary-pink-500 text-white px-4 py-2 m-10 rounded-md font-medium text-2xl">
//                     Hubungi Kami
//                 </button>
//                 <button className="bg-primary-pink-400 text-white px-6 py-3 rounded-md font-medium text-xl">
//                     Login
//                 </button>
//             </div>
//         </header>
//     );
// }

// export default Navbar

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAVBAR_LIST } from '@/constants/landingConstant'
import EachUtils from '@/utils/eachUtils'

const Navbar = () => {
    const navigate = useNavigate();
    const [hash, setHash] = useState(window.location.hash);
    const [navbarIsOpen, setNavbarIsOpen] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        }

        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        }
    }, []);


    return (
        <>

            <div className='sticky z-20 backdrop-blur-sm top-0 grid grid-cols-8 justify-around items-center gap-4 px-2 md:px-10 py-4 font-semibold'>
                <div className='col-span-4 lg:col-span-2 flex'>

                    <button onClick={() => setNavbarIsOpen(prev => !prev)} className='block relative lg:hidden w-8 z-50'>
                        <HamburgerMenu navbarIsOpen={navbarIsOpen} />
                    </button>


                    {/* Navbar */}
                    {navbarIsOpen && <>
                        <div className='fixed -top-10 inset-x-0 z-30 h-[30rem] bg-primary-pink-300/90 flex flex-col justify-center text-white pb-10'>
                            <ul className='relative z-30 flex flex-col gap-6 justify-center items-center text-xl'>
                                <EachUtils of={NAVBAR_LIST} render={(item, index) => {
                                    return <li className='group' key={item.id}>
                                        <a href={item.link}>{item.title}</a>
                                        <div className='border-b-[1px] duration-200 group-hover:border-b-white border-transparent' style={{ borderBottomColor: hash === item.link ? '#ffffff' : (hash === '' && item.link === '#home') ? '#ffffff' : '' }} />
                                    </li>
                                }} />
                            </ul>
                        </div>

                    </>
                    }

                    <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-6 font-bold text-center md:text-left bg-gradient-to-br from-pink-100 to-primary-pink-400 bg-clip-text text-transparent p-1 ">
                    <Link to={'/'}>
                        LBC Laundry
                    </Link>
                </h3>
            </div>
                <ul className='hidden lg:flex justify-center gap-10 col-span-4 pt-2 lg:text-xl'>
                <EachUtils of={NAVBAR_LIST} render={(item, index) => {
                    return <li className='group' key={item.id}>
                        <a href={item.link}>{item.title}</a>
                        <div className='border-b-[1px] duration-200 group-hover:border-b-slate-950 border-transparent' style={{ borderBottomColor: hash === item.link ? '#020617' : (hash === '' && item.link === '#home') ? '#020617' : '' }} />
                    </li>
                }} />
            </ul>
                <div className='col-span-4 lg:col-span-2 flex justify-end lg:justify-center w-full gap-4'>
                    <Link to={"https://wa.me/"} className='text-primary-pink-100 text-sm md:text-base bg-primary-pink-300 hover:bg-primary-pink-500 px-2 md:px-4 py-2 rounded-lg'>Hubungi Kami</Link>
                    <button onClick={() => navigate('/login')} className='text-primary-pink-100 text-sm md:text-base bg-primary-pink-300 hover:bg-primary-pink-500 px-2 md:px-4 py-2 rounded-lg'>Login</button>
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