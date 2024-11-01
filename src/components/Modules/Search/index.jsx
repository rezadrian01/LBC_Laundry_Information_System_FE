import Input from '@/components/UI/Input';
const Search = ({ placeholder = "No. Nota/Nama" }) => {
    return (
        <>
            <Input placeholder={placeholder} padding="p-1" textSize="text-lg" bgColor={null} textCenter={false} border hasSearchBtn />
        </>
    );
};

export default Search;