import { forwardRef } from 'react';

import { IoSearchSharp } from "react-icons/io5";

const Input = forwardRef(({ id, name, label, floatLabel = false, unitLabel = null, borderBottom = false, color = 'primary-pink-300', bgColor = 'bg-primary-pink-300', rounded = true, textCenter = true, placeholder = "", hasSearchBtn = false, onBtnClick, ...props }, ref) => {

    let inputClass = "w-full p-2 pr-8 outline-none font-semibold text-xl ";
    let wrapperClass = "relative ";
    if (color && borderBottom) {
        wrapperClass += "border-b-2 border-primary-pink-300";
    }
    if (bgColor) {
        inputClass += `${bgColor} text-pink-100 placeholder-inherit rounded `;
    }
    if (textCenter) {
        inputClass += "text-center";
    }

    return (
        <div className={wrapperClass}>
            <input ref={ref} className={inputClass} id={id} name={name} placeholder={placeholder} {...props} />
            {floatLabel && <label className="absolute" htmlFor={id}>{label}</label>}
            {unitLabel && <label className="absolute right-1 bottom-2 font-semibold text-gray-500 text-lg" htmlFor={id}>{unitLabel}</label>}
            {hasSearchBtn && <button onClick={onBtnClick} className='absolute right-1 bottom-1 bg-primary-pink-100 hover:bg-primary-pink-200 p-2 rounded' type='button'>
                <IoSearchSharp size={20} />
            </button>}
        </div>
    );
});

export default Input;  