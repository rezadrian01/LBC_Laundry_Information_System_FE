import InputGroup from "@/components/UI/InputGroup";
import { forwardRef, useRef } from "react";

const CustomerData = forwardRef(({ }, ref) => {
    const customerNameRef = useRef(null);
    const custommerAddressRef = useRef(null);
    const customerPhoneRef = useRef(null);
    const paidStatusRef = useRef(null);

    return (
        <div className="pt-4 pb-10 flex flex-col gap-2 text-sm md:text-base">
            <InputGroup ref={customerNameRef} isOrderSummary={true} label="Nama" id="customer-name" name="customerName" textCenter={false} />
            <InputGroup ref={custommerAddressRef} isOrderSummary={true} label="Alamat" id="customer-address" name="customerAddress" textCenter={false} />
            <InputGroup ref={customerPhoneRef} isOrderSummary={true} label="No. Telp" id="customer-contact" name="customerContact" textCenter={false} />
            <InputGroup isDropdown={true} ref={paidStatusRef} isOrderSummary={true} label="Pembayaran" id="is-paid-off" name="isPaidOff" textCenter={false} />
        </div>
    );
});

export default CustomerData;