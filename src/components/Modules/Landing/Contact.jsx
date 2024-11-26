import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from "react-icons/fa";

const Contact = () => {
    return (
        <section className="bg-white py-12 px-60">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Bagian Logo dan Deskripsi */}
                <div className="col-span-1">
                    <h1 className="text-primary-pink-500 font-bold text-4xl">
                        LBC Laundry
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Pakaian Anda, Keahlian Kami, Cepat dan Bersih!
                    </p>
                    <div className="flex space-x-4 mt-4 text-gray-600">
                        <FaFacebook size={20} />
                        <FaInstagram size={20} />
                        <FaTwitter size={20} />
                        <FaYelp size={20} />
                    </div>
                </div>

                {/* Bagian Informasi Kontak */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Contact Us
                    </h3>
                    <p className="text-gray-600 mt-2">085 6423 8880</p>
                    <p className="text-gray-600">
                        Ruko Bajang Ratu Indah Jl. Candi Waringin No.5
                        <br />
                        MojolanguLowokwaru, Kota Malang, Jawa Timur 65142
                    </p>
                </div>

                {/* Bagian Jam Operasional */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Business Hours
                    </h3>
                    <p className="text-gray-600 mt-2">Mon - Sat: 8 am - 8 pm</p>
                    <p className="text-gray-600">Sunday: 8 am - 6 pm</p>
                </div>

                {/* Bagian Navigasi */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Navigation
                    </h3>
                    <ul className="text-gray-600 space-y-2 mt-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div className="text-gray-600 text-sm mt-4">
                        <p>Terms and conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact