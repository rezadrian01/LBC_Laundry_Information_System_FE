import React from 'react';

const FallbackText = () => {
    return (<div className='relative h-full w-full'>
        <h3 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>Loading...</h3>
    </div>
    );
};

export default FallbackText;