import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import CreateLayout from '@layouts/Crud/create';
import DefaultLayout from '@layouts/Default';
import Footer from '@mods/Footer';
import Header from '@mods/Header/header';
import { ORDER_DETAIL_FIELDS } from '@/constants/detailFieldList';

import useAuth from '@/hooks/useAuth';
import apiInstance from '@/utils/apiInstance';
import FallbackText from '@/components/UI/Loading/FallbackText';
import Sidebar from '@/components/Modules/Sidebar/sidebar';
import { queryClient } from '@/utils/query';

const Order = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    useAuth();
    const { data: existingOrder, isPending: isPendingOrderDetail, isError: isErrorOrderDetail } = useQuery({
        queryKey: ['orders', { orderId }],
        queryFn: async () => {
            const response = await apiInstance(`laundry/id/${orderId}`);
            return response.data.data;
        }
    });

    const { mutate: updateIsPaidOffStatusFn, isPending: isPendingUpdateIsPaidOffStatus } = useMutation({
        mutationFn: async (data) => {
            return apiInstance(`laundry/isPaidOff/${existingOrder.receiptNumber}`, {
                data,
                method: "PUT"
            });
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['orders', { orderId }] });
            Swal.fire({
                title: "Data berhasil disimpan",
                icon: "success",
                confirmButtonColor: '#f87aac'
            }).then(result => {
                navigate('..');
            });
        },
        onError: (response) => {
            Swal.fire({
                title: "Data gagal disimpan",
                text: "Maaf saat ini terjadi error di server, anda bisa mencobanya lagi nanti.",
                icon: "error",
                confirmButtonColor: '#f87aac'
            }).then(result => {
                navigate('..');
            });
        },
    });

    if (isErrorOrderDetail) throw new Error("Failed to fetch order detail");

    const keys = ['receiptNumber', 'formatedDate', 'branch', 'customerName', 'customerAddress', 'customerContact', 'formatedPrice', 'status', 'isPaidOff'];
    if (!isPendingOrderDetail) {
        const formatedDate = new Date(existingOrder.createdAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        const formatedPrice = new Intl.NumberFormat('id-ID').format(existingOrder.totalPrice);
        existingOrder.formatedPrice = formatedPrice
        existingOrder.formatedDate = formatedDate;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        // console.log(data);
        updateIsPaidOffStatusFn(data);
    }

    return (
        <DefaultLayout>
            <Sidebar />
            <Header hasButton={false} />
            {isPendingOrderDetail && <FallbackText />}
            {!isPendingOrderDetail && <form onSubmit={handleSubmit}>
                <CreateLayout disableSaveBtn={isPendingUpdateIsPaidOffStatus} isOrderDetail keys={keys} defaultValues={existingOrder} fields={ORDER_DETAIL_FIELDS} dropdownIndex={8} title="Detail Pesanan" confirmAlert={false} />
            </form>
            }
            <Footer hasNext={false} />
        </DefaultLayout>
    );
};

export default Order;