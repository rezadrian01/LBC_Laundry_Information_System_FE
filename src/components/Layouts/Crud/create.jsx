import Swal from 'sweetalert2';

import Input from '@/components/UI/Input';
import EachUtils from '@/utils/eachUtils';
import { useNavigate } from 'react-router-dom';
import FallbackText from '@/components/UI/Loading/FallbackText';
import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import { useState } from 'react';
import { queryClient } from '@/utils/query';

const CreateLayout = ({
    title,
    isNew = true,
    keys = [],
    isItemDetail = false,
    isOrderDetail = false,
    dropdownIndex = null,
    numberTypeIndex = [],
    defaultValues = null,
    isPending = false,
    successCreateAlertTitle = "Data berhasil disimpan",
    successDeleteAlertTitle = "Data berhasil dihapus",
    fields = [],
    disableSaveBtn = false,
    disableDeleteBtn = false,
    requestUrl = "",
    queryKey = [],
    isDelete = false,
    setIsDelete = () => { },
    onDelete = () => { }
}) => {
    const navigate = useNavigate();
    const { mutate, isPending: isPendingMutation, isError } = useMutation({
        mutationFn: async (data) => {
            console.log(data);
            return apiInstance(`${requestUrl}/${isNew ? '' : defaultValues._id}`, {
                data: { ...data },
                method: isNew ? "POST" : (isDelete ? "DELETE" : "PUT"),
            });
        },
        onSuccess: (response) => {
            navigate('..');
            Swal.fire({
                title: isDelete ? successDeleteAlertTitle : successCreateAlertTitle,
                icon: "success",
                confirmButtonColor: '#f87aac'
            });
            queryClient.invalidateQueries({ queryKey });
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
        onSettled: (response) => {
            setIsDelete(false);
        }

    });

    const handleSaveClick = (data) => {
        Swal.fire({
            title: "Apakah data tersebut sudah benar?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Iya",
            confirmButtonColor: '#f87aac',
            denyButtonText: "Batal"
        }).then(result => {
            if (result.isConfirmed) {
                mutate(data)
            }
        });
    };
    const handleDeleteClick = () => {
        Swal.fire({
            title: "Apakah anda yakin ingin menghapus data ini?",
            text: "Data tidak bisa dikembalikan apabila sudah dihapus",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Iya",
            confirmButtonColor: '#f87aac',
            denyButtonText: "Batal"
        }).then(result => {
            if (result.isConfirmed) {
                setIsDelete(true);
                mutate();
            }
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
        handleSaveClick(data);
    }
    return (
        <form onSubmit={handleSubmit}>
        <div className='px-1 font-semibold md:max-w-[50rem] mx-auto'>
            <h3 className='text-primary-pink-300 text-[1.7rem] lg:text-4xl font-bold md:mt-10'>{title}</h3>
            <div className='grid grid-cols-6 items-center gap-y-2 md:mt-4'>
                    {isPending && <div className='col-span-6'>
                        <FallbackText />
                    </div>}
                    {!isPending && <EachUtils of={fields} render={(content, index) => {
                    const isNumber = numberTypeIndex.includes(index);
                    return <>
                        <div className={`${!isOrderDetail ? 'col-span-2' : 'col-span-3'}`}>
                            <h5>{content.label}</h5>
                        </div>
                        <div className={`${!isOrderDetail ? 'col-span-4' : 'col-span-3'}`}>

                            {isNew && !isOrderDetail && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name[0]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {!isNew && !isOrderDetail && defaultValues[keys[index]] && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name[1]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}


                            {/* Just for orderDetail */}
                            {isOrderDetail && index !== dropdownIndex && <>
                                {keys[index] === 'status' && <p>: {defaultValues[keys[index]].name}</p>}
                                {keys[index] === 'branch' && <p>: {defaultValues[keys[index]].name}</p>}
                                {keys[index] !== 'status' && keys[index] !== 'branch' && <p>: {keys[index] === 'estimateDay' ? `Selesai dalam ${defaultValues[keys[index]]} hari.` : defaultValues[keys[index]]}</p>}
                            </>}

                            {isOrderDetail && index === dropdownIndex && <>
                                : <select className='bg-primary-pink-300 text-white rounded outline-none' name='isPaidOff' defaultValue={defaultValues[keys[index]]}>
                                    <option value={true}>Lunas</option>
                                    <option value={false}>Belum Lunas</option>
                                </select>
                            </>}

                            {/* Just for items with services */}
                            {!isNew && !isOrderDetail && isItemDetail && !defaultValues[keys[index]] && <Input textSize="text-lg" type="number" step="0.01" defaultValue={defaultValues.services[index - 1]?.price || "-"} name={content.name[1]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />
                            }

                        </div>
                    </>;
                    }} />}
            </div>
            <div className='flex items-center justify-end gap-2 mt-14'>
                    {!isNew && <button type='button' disabled={disableDeleteBtn} onClick={handleDeleteClick} className='bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-4 py-2 rounded'>{disableDeleteBtn ? 'Loading...' : 'Hapus'}</button>}
                <button
                    disabled={disableSaveBtn}
                    className='bg-primary-pink-300 hover:bg-primary-pink-500 disabled:bg-primary-pink-250 text-white px-4 py-2 rounded'>{disableSaveBtn ? 'Loading...' : 'Simpan'}</button>
            </div>
        </div>
        </form>
    );
};

//onClick={confirmAlert ? handleSaveClick : successSaveFeedback} 

export default CreateLayout;