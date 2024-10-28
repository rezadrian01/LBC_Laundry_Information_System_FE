import React from 'react';
import LoginBackground from '@layouts/Login/background';
import LoginTitle from '@mods/Login/loginTitle';
import AuthInput from '@/components/UI/AuthInput/authInput';

const Login = () => {

    const submitHandler = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
    }

    return (
        <div className=''>
            <div className='relative max-w-[40rem] mx-auto max-h-screen pt-14 md:pt-32'>
                <LoginTitle />
                <form onSubmit={submitHandler}>
                    <div className='flex flex-col items-center gap-6 md:gap-16
            '>
                        <h2 className='text-primary-pink-300 font-bold text-3xl text-center'>Login</h2>
                        <div className='w-full flex flex-col gap-12 pt-10'>
                            <AuthInput id='username' name='username' label='Username' />
                            <AuthInput id='password' name='password' label='Password' type='password' />
                        </div>
                        <button className='w-3/4 mt-2 px-4 py-3 rounded-lg mx-auto text-white font-semibold bg-primary-pink-300 hover:bg-primary-pink-400'>Login</button>
                    </div>
                    <LoginBackground />
                </form>
            </div>
        </div>
    );
};

export default Login;