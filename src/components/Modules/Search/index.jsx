import Input from '@/components/UI/Input';
import { forwardRef } from 'react';
const Search = forwardRef(({ placeholder = "No. Nota", ...props }, ref) => {


    return (
        <>
            <Input ref={ref} placeholder={placeholder} padding="p-1" textSize="text-lg" bgColor={null} textCenter={false} border hasSearchBtn {...props} />
        </>
    );
});

export default Search;