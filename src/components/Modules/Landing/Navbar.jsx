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

import { NAVBAR_LIST } from '@/constants/landingConstant'
import EachUtils from '@/utils/eachUtils'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-8 justify-around items-center gap-4 p-10 font-semibold'>
            <div className='col-span-2'>
                <h3 className="text-2xl md:text-3xl lg:text-4xl leading-6 font-bold text-left bg-gradient-to-br from-pink-100 to-primary-pink-400 bg-clip-text text-transparent p-1">
                    <Link to={'/'}>
                        LBC Laundry
                    </Link>
                </h3>
            </div>
            <ul className='flex justify-center gap-10 col-span-4 pt-2 lg:text-xl'>
                <EachUtils of={NAVBAR_LIST} render={(item, index) => {
                    return <li className='group' key={item.id}>
                        <Link to={item.link}>{item.title}</Link>
                        <div className='border-b-[1px] duration-200 group-hover:border-b-slate-950 border-transparent ' />
                    </li>
                }} />
            </ul>
            <div className='col-span-2 flex justify-center w-full gap-4'>
                <Link to={"https://wa.me/"} className='text-primary-pink-100 bg-primary-pink-300 hover:bg-primary-pink-500 px-4 py-2 rounded-lg'>Hubungi Kami</Link>
                <button onClick={() => navigate('/login')} className='text-primary-pink-100 bg-primary-pink-300 hover:bg-primary-pink-500 px-4 py-2 rounded-lg'>Login</button>
            </div>
        </div>
    )
}

export default Navbar