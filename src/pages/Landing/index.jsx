
import About from '@/components/Modules/Landing/About'
import Contact from '@/components/Modules/Landing/Contact'
import Home from '@/components/Modules/Landing/Home'
import Navbar from '@/components/Modules/Landing/Navbar'
import Services from '@/components/Modules/Landing/Services'
import Works from '@/components/Modules/Landing/Works'

const Landing = () => {
    return (
        <>
            <div id="home" className='bg-primary-pink-250 w-full h-10' />
            <Navbar />
            <Home />
            <About />
            <Services />
            <Works />
            <Contact />
        </>
    )
}

export default Landing