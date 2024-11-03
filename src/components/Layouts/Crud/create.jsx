import Swal from 'sweetalert2';

import Input from '@/components/UI/Input';
import EachUtils from '@/utils/eachUtils';
import { useNavigate } from 'react-router-dom';

const CreateLayout = ({ title, isNew = true, keys, defaultValues = null, successCreateAlertTitle = "Data berhasil dibuat", successDeleteAlertTitle = "Data berhasil dihapus", contents = [] }) => {
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

    return (
        <div className='px-1 font-semibold md:max-w-[50rem] mx-auto'>
            <h3 className='text-primary-pink-300 text-[1.7rem] lg:text-4xl font-bold md:mt-10'>{title}</h3>
            <div className='grid grid-cols-6 items-center gap-y-2 md:mt-4'>
                <EachUtils of={contents} render={(content, index) => {
                    return <>
                        <div className='col-span-2 '>
                            <h5>{content.label}</h5>
                        </div>
                        <div className='col-span-4 '>
                            {isNew && <Input textSize="text-lg" type={index === 0 ? 'text' : 'number'} defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {!isNew && defaultValues[keys[index]] && <Input textSize="text-lg" defaultValue={defaultValues ? defaultValues[keys[index]] : ""} name={content.name} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />}

                            {/* Just for items with services */}
                            {!isNew && !defaultValues[keys[index]] && <Input textSize="text-lg" type="number" defaultValue={defaultValues.services[index - 1]?.price || "-"} name={content.name} id={content.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />
                            }

                        </div>
                    </>;
                }} />
            </div>
            <div className='flex items-center justify-end gap-2 mt-14'>
                {!isNew && <button onClick={handleDeleteClick} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'>Hapus</button>}
                <button onClick={handleSaveClick} className='bg-primary-pink-300 hover:bg-primary-pink-500 text-white px-4 py-2 rounded'>Simpan</button>
            </div>
        </div>
    );
};

export default CreateLayout;