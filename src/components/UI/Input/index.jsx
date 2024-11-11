import { forwardRef } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Input = forwardRef(({
    id,
    name,
    label,
    floatLabel = false,
    unitLabel = null,
    border = false,
    borderBottom = false,
    padding = "p-2",
    textSize = "text-xl",
    color = 'primary-pink-300',
    bgColor = 'bg-primary-pink-200',
    rounded = true,
    textCenter = true,
    placeholder = "",
    hasSearchBtn = false,
    bgSearchBtn = null,
    onBtnClick,
    grid = false,
    hasShadow = false,
    ...props }, ref) => {

    let inputClass = "w-full outline-none font-semibold placeholder:font-normal " + padding + " " + textSize + " ";
    let wrapperClass = "relative w-full ";
    let btnClass = 'absolute right-1 bottom-1 bg-primary-pink-100 p-2 rounded ';

    if (color && borderBottom) {
        wrapperClass += "border-b-2 border-primary-pink-300 ";
    }
    if (border) {
        inputClass += "border-2 border-primary-pink-300 rounded-lg placeholder:text-primary-pink-300 placeholder:text-base";
        btnClass = btnClass.replace("bg-primary-pink-100", " ");
        btnClass = btnClass.replace("bottom-1", "bottom-[.1rem] ");
        btnClass += "text-primary-pink-300"
    }
    if (bgColor) {
        inputClass += bgColor + " text-gray-600 placeholder-inherit rounded font-normal border-[1px] border-primary-pink-300 ";
    }
    if (grid) {
        wrapperClass += "col-span-3 md:col-span-10 "
    }
    if (textCenter) {
        inputClass += "text-center ";
    }
    if (hasShadow) {
        inputClass += "shadow-xl ";
    }

    return (
        <div className={wrapperClass}>
            <input ref={ref} className={inputClass} id={id} name={name} placeholder={placeholder}  {...props} />

            {floatLabel && <label className="absolute" htmlFor={id}>{label}</label>}

            {unitLabel && <label className="absolute right-1 bottom-2 font-semibold text-gray-500 text-lg" htmlFor={id}>{unitLabel}</label>}

            {hasSearchBtn && <button onClick={onBtnClick} className={btnClass} type='button'>
                <IoSearchSharp size={20} />
            </button>}
        </div>
    );
});

export default Input;  