// import About from "@/components/Modules/Landing/About";
// import Contact from "@/components/Modules/Landing/Contact";
// import Home from "@/components/Modules/Landing/Home";
// import Navbar from "@/components/Modules/Landing/Navbar";
// import Service from "@/components/Modules/Landing/Service";
// import Works from "@/components/Modules/Landing/Works";

// const Landing = () => {
//     return <>
//         <Navbar />
//         <Home />
//         <div id="tentang-kami">
//             <About />
//         </div>
//         <div id="pelayanan">
//             <Service />
//         </div>
//         <div id="cara-kerja">
//             <Works />
//         </div>
//         <div id="kontak">
//             <Contact />
//         </div>
//     </>;
// };

// export default Landing;

import About from '@/components/Modules/Landing/About'
import Home from '@/components/Modules/Landing/Home'
import Navbar from '@/components/Modules/Landing/Navbar'

const Landing = () => {
    return (
        <>
            <div id="home" className='bg-primary-pink-250 w-full h-10' />
            <Navbar />
            <Home />
            <About />
        </>
    )
}

export default Landing