import React from 'react';

const DefaultLayout = ({ children }) => {
    return (
        <div className='relative px-6 sm:px-32 lg:max-w-[100rem] min-h-screen mx-auto pb-20'>
            {children}
        </div>
    );
};

export default DefaultLayout;