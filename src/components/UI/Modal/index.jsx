import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ onClose, elementId = "modal-root", customClass = "bg-white", top = " top-0 ", isBackdrop = true, isItemSearch = false, children }) => {
    let modalClass = "w-full absolute  p-4 " + top + customClass;
    let wrapperClass = "flex relative justify-center items-center w-full h-full px-6 sm:px-32 lg:max-w-[100rem] ";

    if (!isItemSearch) wrapperClass += "z-40";
    else wrapperClass += "z-30";


    return createPortal(
        <>
            {isBackdrop && <div onClick={onClose} className='fixed inset-0 bg-black/50 z-30' />}
            <div className={wrapperClass}>
                <div className={modalClass}> {children}</div >
            </div>
        </>
        , document.getElementById(elementId)
    );
};

export default Modal;