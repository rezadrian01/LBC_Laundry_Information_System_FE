import { forwardRef } from "react";
import Input from "../Input";
import Select from "../Select";
import { PAID_STATUS_LIST } from "@/constants/paidStatusList";

const InputGroup = forwardRef(({ isWeightOrderInput = false, isDropdown = false, isOrderSummary = false, mainLabel, subLabel, id, name, unitLabel, label, textCenter }, ref) => {
    return (
        <>
            {isWeightOrderInput && <div>
                <h4 className='font-thin text-xl'><span className='font-semibold'>{mainLabel}</span> {subLabel}</h4>
                <Input ref={ref} borderBottom id={id} name={name} unitLabel={unitLabel} type="number" inputMode="numeric" step="0.01" bgColor={null} />
            </div>}

            {isOrderSummary && !isDropdown && <div className='grid grid-cols-4 md:grid-cols-12 items-center gap-4 w-full'>
                <label className='col-span-1 md:col-span-2 text-nowrap font-semibold' id={id}>{label}</label>
                <Input ref={ref} grid={true} padding="py-[.5px] px-2" id={id} name={name} textCenter={textCenter} />
            </div>}

            {isOrderSummary && isDropdown && <div className='grid grid-cols-4 md:grid-cols-12 items-center gap-4 w-full'>
                <label className='col-span-1 md:col-span-2 text-nowrap font-semibold' id={id}>{label}</label>
                <Select isPaidStatus grid items={PAID_STATUS_LIST} id={id} name={name} />
            </div>}

        </>
    );
});

export default InputGroup;