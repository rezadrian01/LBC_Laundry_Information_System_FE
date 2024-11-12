import EachUtils from '@/utils/eachUtils';

const Select = ({ items, titleKey = 'title', grid = false, isPaidStatus = false, ...props }) => {
    let selectClass = "flex items-center gap-2 md:gap-4 text-primary-pink-300 transition-all py-2 px-2 shadow-lg rounded outline-none w-full ";

    if (grid) {
        selectClass += "col-span-3 md:col-span-10 ";
    }
    if (isPaidStatus) {
        selectClass += "bg-primary-pink-300 text-white font-semibold";
    }
    return (
        <select className={selectClass} {...props}>
            <EachUtils of={items} render={(item, index) => {
                return <option className="flex items-center gap-4" value={item?._id} key={index}>
                    {item[titleKey]}
                </option>;
            }} />
        </select>
    );
};

export default Select;