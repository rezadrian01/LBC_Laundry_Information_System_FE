import Swal from 'sweetalert2';

import Input from '@/components/UI/Input';
import EachUtils from '@/utils/eachUtils';
import { useNavigate } from 'react-router-dom';

const CreateLayout = ({ title, isNew = true, keys = [], isItemDetail = false, isOrderDetail = false, dropdownIndex = null, confirmAlert = true, numberTypeIndex = [], defaultValues = null, successCreateAlertTitle = "Data berhasil dibuat", successDeleteAlertTitle = "Data berhasil dihapus", fields = [] }) => {
    const navigate = useNavigate();

    const handleSaveClick = () => {
        Swal.fire({
            title: "Apakah data tersebut sudah benar?",
            icon: "question",
            showDenyButton: true,
            confirmButtonText: "Iya",
            confirmButtonColor: '#f87aac',
            denyButtonText: "Batal"
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: successCreateAlertTitle,
                    icon: "success",
                    confirmButtonColor: '#f87aac'
                }).then(result => {
                    navigate('..');
                });
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
                Swal.fire({
                    title: successDeleteAlertTitle,
                    icon: "success",
                    confirmButtonColor: '#f87aac'
                }).then(result => {
                    navigate('..');
                });
            }
        });
    };
    const successSaveFeedback = () => {
        Swal.fire({
            title: "Data berhasil disimpan",
            icon: "success",
            confirmButtonColor: '#f87aac'
        }).then(result => {
            navigate('..');
        });
    }

    return (
        <div className='px-1 font-semibold md:max-w-[50rem] mx-auto'>
            <h3 className='text-primary-pink-300 text-[1.7rem] lg:text-4xl font-bold md:mt-10'>{title}</h3>
            <div className='grid grid-cols-6 items-center gap-y-2 md:mt-4'>
                <EachUtils of={fields} render={(content, index) => {
                    const isNumber = numberTypeIndex.includes(index);
                    return <>
                        <div className={`${!isOrderDetail ? 'col-span-2' : 'col-span-3'}`}>
                            <h5>{content.label}</h5>
                        </div>
                        <div className={`${!isOrderDetail ? 'col-span-4' : 'col-span-3'}`}>
                            {isNew && !isOrderDetail && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {!isNew && !isOrderDetail && defaultValues[keys[index]] && <Input textSize="text-lg" type={isNumber ? 'number' : 'text'} step={isNumber ? '0.01' : null} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {/* Just for orderDetail */}
                            {isOrderDetail && index !== dropdownIndex && <>
                                <p>: {keys[index] === 'estimateDay' ? `Selesai dalam ${defaultValues[keys[index]]} hari.` : defaultValues[keys[index]]}</p>
                            </>}

                            {isOrderDetail && index === dropdownIndex && <>
                                : <select className='bg-primary-pink-300 text-white rounded' name='isPaidOff' defaultValue={defaultValues[keys[index]]}>
                                    <option value={true}>Lunas</option>
                                    <option value={false}>Belum Lunas</option>
                                </select>
                            </>}

                            {/* Just for items with services */}
                            {!isNew && !isOrderDetail && isItemDetail && !defaultValues[keys[index]] && <Input textSize="text-lg" type="number" step="0.01" defaultValue={defaultValues.services[index - 1]?.price || "-"} name={content.name} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />
                            }

                        </div>
                    </>;
                }} />
            </div>
            <div className='flex items-center justify-end gap-2 mt-14'>
                {!isNew && <button onClick={handleDeleteClick} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'>Hapus</button>}
                <button onClick={confirmAlert ? handleSaveClick : successSaveFeedback} className='bg-primary-pink-300 hover:bg-primary-pink-500 text-white px-4 py-2 rounded'>Simpan</button>
            </div>
        </div>
    );
};

export default CreateLayout;