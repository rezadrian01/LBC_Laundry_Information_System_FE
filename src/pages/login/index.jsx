import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import LoginBackground from '@layouts/Login/background';
import LoginTitle from '@mods/Login/loginTitle';
import AuthInput from '@/components/UI/AuthInput/authInput';
import apiInstance from '@/utils/apiInstance';
import { authAction } from '@/stores/auth';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mutate: loginFn, isPending, isError, error } = useMutation({
        mutationFn: async (data) => {
            return await apiInstance('auth/login', {
                data,
                method: 'POST',
            });
        },
        onSuccess: (response) => {
            const { adminData } = response.data;
            dispatch(authAction.signin({ userId: adminData.id, role: adminData.role }));
            navigate('/dashboard');
        }
    });
    const statusCode = error?.status;
    let errorMessage = "";
    switch (statusCode) {
        case 401:
            errorMessage = "Password Salah.";
            break;
        case 404:
            errorMessage = "Pengguna Tidak Ditemukan.";
            break;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        if (!data.username.trim() || !data.password.trim()) {
            Swal.fire({
                title: "Input tidak boleh kosong",
                icon: 'error',
                confirmButtonColor: '#f87aac'
            });
            return;
        }
        // data.isRemember = true;
        loginFn(data);
    };

    return (
        <div className=''>
            <div className='relative max-w-[40rem] mx-auto max-h-screen pt-14 md:pt-32'>
                <LoginTitle />
                <form onSubmit={submitHandler}>
                    <div className='flex flex-col items-center gap-6 md:gap-16'>
                        <h2 className='text-primary-pink-300 font-bold text-3xl text-center'>Login</h2>
                        <div className='w-full flex flex-col gap-12 pt-10'>
                            <AuthInput id='username' name='username' label='Username' />
                            <AuthInput id='password' name='password' label='Password' type='password' />
                        </div>
                        <button className='w-3/4 mt-2 px-4 py-3 rounded-lg mx-auto text-white font-semibold bg-primary-pink-300 hover:bg-primary-pink-400 disabled:bg-primary-pink-250 disabled:cursor-not-allowed' disabled={isPending}>{isPending ? 'Loading...' : 'Login'}</button>
                        {isError && <div>
                            <p className='text-red-500 text-lg'>{errorMessage}</p>
                        </div>}
                    </div>
                    <LoginBackground />
                </form>
            </div>
        </div>
    );
};

export default Login;