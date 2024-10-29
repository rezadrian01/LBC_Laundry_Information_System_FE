import { forwardRef } from 'react';

const Input = forwardRef(({ id, name, label, floatLabel = false, unitLabel = null, borderBottom = false, color = 'primary-pink-300', backgroundColor = 'primary-pink-200', rounded = true, ...props }, ref) => {

    let inputClass = "w-full p-2 pr-8 outline-none font-semibold text-xl text-center ";
    let wrapperClass = "relative ";
    if (color && borderBottom) {
        wrapperClass += "border-b-2 border-primary-pink-300";
    }

    return (
        <div className={wrapperClass}>
            <input ref={ref} className={inputClass} id={id} name={name} {...props} />
            {floatLabel && <label className="absolute" htmlFor={id}>{label}</label>}
            {unitLabel && <label className="absolute right-1 bottom-2 font-semibold text-gray-500 text-lg" htmlFor={id}>{unitLabel}</label>}
        </div>
    );
});

export default Input;  