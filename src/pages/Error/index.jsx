import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    let title = "404 Not Found";
    let message = "Halaman yang dicari tidak ditemukan.";

    if (error.status !== 404) {
        title = "Internal Server Error";
        message = "Kami sedang mengalami server error, kami akan segera memperbaiki nya secepat mungkin, anda dapat mencobanya lagi nanti.";
    }

    return (
        <div className='w-full h-screen flex flex-col gap-6 items-center pt-44 px-2 md:px-10 text-center'>
            <h3 className='font-bold text-3xl md:text-6xl'>{title}</h3>
            <p className='font-semibold text-lg md:text-2xl'>{message}</p>
        </div>
    );
};

export default Error;