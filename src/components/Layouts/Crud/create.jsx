import Swal from 'sweetalert2';

import Input from '@/components/UI/Input';
import EachUtils from '@/utils/eachUtils';
import { useNavigate } from 'react-router-dom';
import FallbackText from '@/components/UI/Loading/FallbackText';
import { useMutation } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import { queryClient } from '@/utils/query';
import { ROLE_LIST } from '@/constants/roleList';

const CreateLayout = ({
    title,
    isNew = true,
    keys = [],
    isItemDetail = false,
    isOrderDetail = false,
    isBranchDetail = false,
    isEmployeeDetail = false,
    textareaIndex = [],
    dropdownIndex = [],
    numberTypeIndex = [],
    defaultValues = null,
    isPending = false,
    successCreateAlertTitle = "Data berhasil disimpan",
    successDeleteAlertTitle = "Data berhasil dihapus",
    fields = [],
    disableSave = false,
    requestUrl = "",
    queryKey = [],
    isDelete = false,
    itemKey = null,
    note = "",
    setIsDelete = () => { },
    onDelete = () => { }
}) => {
    const navigate = useNavigate();
    const { mutate, isPending: isPendingMutation, isError } = useMutation({
        mutationFn: async (data) => {
            return apiInstance(`${requestUrl}/${isNew ? '' : (itemKey ?? defaultValues._id)}`, {
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
                        let currentItemService;
                        if (!isNew && isItemDetail) {
                            currentItemService = defaultValues.services.find(service => service.name === keys[index]);
                        }
                    const isNumber = numberTypeIndex.includes(index);
                    return <>
                        <div className={`${!isOrderDetail ? 'col-span-2' : 'col-span-3'}`}>
                            <h5>{content.label}</h5>
                        </div>
                        <div className={`${!isOrderDetail ? 'col-span-4' : 'col-span-3'}`}>

                            {/* Default for create new */}
                            {isNew && !isOrderDetail && !isBranchDetail && !dropdownIndex?.includes(index) && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name[0]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {/* Default for update */}
                            {!isNew && !isOrderDetail && !isBranchDetail && !dropdownIndex.includes(index) && defaultValues[keys[index]] && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name[1]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}


                            {/* Just for orderDetail */}
                            {(isOrderDetail) && index !== dropdownIndex[0] && <>
                                {keys[index] === 'status' && <p>: {defaultValues[keys[index]].name}</p>}
                                {keys[index] === 'branch' && <p>: {defaultValues[keys[index]].name}</p>}
                                {keys[index] !== 'status' && keys[index] !== 'branch' && <p>: {keys[index] === 'estimateDay' ? `Selesai dalam ${defaultValues[keys[index]]} hari.` : defaultValues[keys[index]]}</p>}
                            </>}

                            {(isOrderDetail) && index === dropdownIndex[0] && <>
                                : <select className='bg-primary-pink-300 text-white rounded outline-none' name='isPaidOff' defaultValue={defaultValues[keys[index]]}>
                                    <option value={true}>Lunas</option>
                                    <option value={false}>Belum Lunas</option>
                                </select>
                            </>}

                            {/* Just for items with services */}
                            {!isNew && !isOrderDetail && !isBranchDetail && isItemDetail && !defaultValues[keys[index]] && <Input textSize="text-lg" type="number" step="0.01" defaultValue={currentItemService?.price || "-"} name={content.name[1]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />
                            }

                            {/* Just for branch detail */}
                            {isBranchDetail && textareaIndex.includes(index) && <textarea className="w-full outline-none font-semibold placeholder:font-normal p-2 text-lg shadow-xl" defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name[isNew ? 0 : 1]} id={content.id} style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {isBranchDetail && !textareaIndex.includes(index) && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name[isNew ? 0 : 1]} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {/* Just for employee detail */}
                            {!isOrderDetail && dropdownIndex.includes(index) && <select name={content.name[isNew ? 0 : 1]} disabled={!isNew} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} className="w-full outline-none font-semibold placeholder:font-normal p-2 text-lg shadow-xl disabled:text-gray-600 disabled:cursor-not-allowed" >
                                <EachUtils of={ROLE_LIST} render={(role, index) => {
                                    return <option value={role.en.toLowerCase()}>{role.id}</option>;
                                }} />
                            </select>}
                        </div>
                    </>;
                    }} />}
            </div>
                {note && <div className='mt-8 text-justify'>
                    <p><span className='font-bold'>Catatan:</span> {note}</p>
                </div>}
                <div className='flex items-center justify-end gap-2 mt-8'>
                    {!isNew && <button type='button' disabled={isPendingMutation} onClick={handleDeleteClick} className='bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-4 py-2 rounded'>{isPendingMutation ? 'Loading...' : 'Hapus'}</button>}
                    {!disableSave && <button
                        disabled={isPendingMutation}
                        className='bg-primary-pink-300 hover:bg-primary-pink-500 disabled:bg-primary-pink-250 text-white px-4 py-2 rounded'>{isPendingMutation ? 'Loading...' : 'Simpan'}</button>}
            </div>
        </div>
        </form>
    );
};


export default CreateLayout;