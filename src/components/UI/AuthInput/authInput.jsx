import React, { useState } from 'react';
import { PiEyeClosed, PiEye } from "react-icons/pi";


const AuthInput = ({ label, id, name, type = 'text' }) => {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    let inputType = type;
    if (type === 'password' && isPasswordOpen) {
        inputType = 'text';
    }

    return (
        <div className='relative flex justify-center w-3/4 mx-auto'>
            <input className='peer w-full border-b-[1px] border-stone-950 bg-transparent outline-none py-2 placeholder-transparent' name={name} id={id} type={inputType} placeholder='' />

            {type === 'password' &&
                <button type='button' className='absolute right-2 top-3' onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
                    {isPasswordOpen ? <PiEye size={20} /> : <PiEyeClosed size={20} />}
                </button>
            }

            <label className='absolute  text-primary-pink-300 font-semibold pointer-events-none peer-focus:-top-4 peer-focus:text-base transition-all peer-placeholder-shown:left-0 peer-placeholder-shown:top-1 peer-placeholder-shown:text-xl left-0 -top-4 text-base' htmlFor={id}>{label}</label>
        </div>
    );
};

export default AuthInput;