import React from 'react';

const LoginBackground = () => {
    return (
        <div className='h-screen w-full absolute overflow-hidden -z-20'>
            <div className='fixed -top-64 -left-64 md:-top-32 md:-left-44 -z-10 bg-primary-pink-200 w-96 h-96 rounded-full blur-3xl' />
            <div className='fixed -bottom-40 -right-40 md:-bottom-32 md:-right-32 -z-10 bg-primary-pink-200 w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full blur-3xl' />
        </div>
    );
};

export default LoginBackground;