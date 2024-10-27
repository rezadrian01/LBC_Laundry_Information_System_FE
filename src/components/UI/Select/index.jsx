import EachUtils from '@/utils/eachUtils';

const Select = ({ children, items, titleKey = 'title', ...props }) => {
    return (
        <select className="flex items-center gap-2 md:gap-4 text-primary-pink-300 transition-all py-2 px-2 shadow-lg rounded outline-none" {...props}>
            <EachUtils of={items} render={(item, index) => {
                return <option className="flex items-center gap-4" value={item.id} key={index}>
                    {item[titleKey]}
                </option>;
            }} />
        </select>
    );
};

export default Select;