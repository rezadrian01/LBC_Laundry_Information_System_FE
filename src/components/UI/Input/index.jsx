import { forwardRef } from 'react';

import { IoSearchSharp } from "react-icons/io5";

const Input = forwardRef(({ id, name, label, floatLabel = false, unitLabel = null, borderBottom = false, padding = "p-2", color = 'primary-pink-300', bgColor = 'bg-primary-pink-200', rounded = true, textCenter = true, placeholder = "", hasSearchBtn = false, onBtnClick, grid = false, ...props }, ref) => {

    let inputClass = `w-full outline-none font-semibold text-xl placeholder:font-normal ${padding} `;
    let wrapperClass = "relative w-full ";

    if (color && borderBottom) {
        wrapperClass += "border-b-2 border-primary-pink-300";
    }
    if (bgColor) {
        inputClass += `${bgColor} text-gray-600 placeholder-inherit rounded font-normal border-[1px] border-primary-pink-300 `;
    }
    if (grid) {
        wrapperClass += "col-span-3 md:col-span-10"
    }
    if (textCenter) {
        inputClass += "text-center";
    }

    return (
        <div className={wrapperClass}>
            <input ref={ref} className={inputClass} id={id} name={name} placeholder={placeholder} {...props} />

            {floatLabel && <label className="absolute" htmlFor={id}>{label}</label>}

            {unitLabel && <label className="absolute right-1 bottom-2 font-semibold text-gray-500 text-lg" htmlFor={id}>{unitLabel}</label>}

            {hasSearchBtn && <button onClick={onBtnClick} className='absolute right-1 bottom-1 bg-primary-pink-100 p-2 rounded' type='button'>
                <IoSearchSharp size={20} />
            </button>}
        </div>
    );
});

export default Input;  