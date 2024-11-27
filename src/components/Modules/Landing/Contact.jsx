import { FOOTER_CONTENT_LIST } from '@/constants/landingConstant';
import useIsVisible from '@/hooks/useIsVisible';
import { landingPageAction } from '@/stores/landing';
import EachUtils from '@/utils/eachUtils';
import React, { useEffect, useRef } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYelp } from "react-icons/fa";
import { useDispatch } from 'react-redux';

const Contact = () => {
    const dispatch = useDispatch();
    const contactSectionRef = useRef(null);
    const isVisible = useIsVisible(contactSectionRef);
    useEffect(() => {
        if (isVisible) {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#contact' }));
        } else {
            dispatch(landingPageAction.changeActiveSection({ activeSection: '#works' }));
        }
    }, [isVisible]);

    return (
        <section id='contact' className="bg-white py-12">
            <div className="max-w-[80rem] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Bagian Logo dan Deskripsi */}
                <div className="col-span-1">
                    <h1 className="text-primary-pink-500 font-bold text-4xl">
                        {FOOTER_CONTENT_LIST[0].contents[0].title}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {FOOTER_CONTENT_LIST[0].contents[1].title}
                    </p>

                    {/* If social media is exist then show this */}
                    {/* <div className="flex space-x-4 mt-4 text-gray-600">
                            <FaFacebook size={20} />
                        <FaInstagram size={20} />
                        <FaTwitter size={20} />
                        <FaYelp size={20} />
                    </div> */}

                </div>

                {/* Contact Section */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {FOOTER_CONTENT_LIST[1].title}
                    </h3>
                    <p className="text-gray-600 mt-2">{FOOTER_CONTENT_LIST[1].contents[0].content}</p>
                    <p dangerouslySetInnerHTML={{ __html: FOOTER_CONTENT_LIST[1].contents[1].content }} className="text-gray-600" />
                </div>

                {/* Operational Time Section */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {FOOTER_CONTENT_LIST[2].title}
                    </h3>
                    <p className="text-gray-600 mt-2">{FOOTER_CONTENT_LIST[2].contents[0].content}</p>
                    <p className="text-gray-600">{FOOTER_CONTENT_LIST[2].contents[1].content}</p>
                </div>

                {/* Navigation Section */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {FOOTER_CONTENT_LIST[3].title}
                    </h3>
                    <ul className="text-gray-600 flex flex-col gap-2 mt-2">
                        <EachUtils of={FOOTER_CONTENT_LIST[3].contents} render={(item, index) => {
                            return <li key={item.id}>
                                <a className='hover:underline' href={item.link}>{item.content}</a>
                            </li>
                        }} />
                    </ul>
                    <div className="text-gray-600 text-sm mt-4">
                        <p>Terms and conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
            <div ref={contactSectionRef} />
        </section>
    )
}

export default Contact