import Header from '@/components/Modules/Header/header';
import React from 'react';

const CrudLayout = ({ children }) => {
    return (
        <div>
            <Header hasButton={false} />
            <div className='px-1 flex flex-col mt-4'>
                {children}
            </div>
        </div>
    );
};

export default CrudLayout;