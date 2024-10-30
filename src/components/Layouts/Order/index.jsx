import Header from '@/components/Modules/Header/header';
import React from 'react';

const OrderLayout = ({ children, hasButton = false, title, titleSize = '3xl', gap = "gap-10" }) => {
    let titleClass = "font-semibold text-center text-" + titleSize;
    let wrapperClass = `flex flex-col ${gap} mt-4 md:mt-10 w-full md:max-w-[50rem] mx-auto`;
    return (
        <>
            <Header hasButton={hasButton} />
            <div className={wrapperClass}>
                <h3 className={titleClass}>{title}</h3>
                {children}
            </div>
        </>
    );
};

export default OrderLayout;