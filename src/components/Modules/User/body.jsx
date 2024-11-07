import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { USER_PROFILE_FIELDS } from '@/constants/detailFieldList';
import EachUtils from '@/utils/eachUtils';
import React from 'react';
import Swal from 'sweetalert2';

const BodyUserProfile = ({ user, keys }) => {

    const handleSaveClick = () => {
        Swal.fire({
            title: "Data berhasil disimpan",
            icon: 'success'
        });
    };

    return (
        <div className='relative px-6 sm:px-32 lg:max-w-[55rem] mx-auto pb-20'>
            <div className='px-6 grid grid-cols-6 md:grid-cols-8 items-center gap-y-4 my-10'>
                <EachUtils of={USER_PROFILE_FIELDS} render={(content, index) => {
                    return <>
                        <div className="col-span-2 md:col-span-2">
                            <h4 className='text-xl'>{content.label}</h4>
                        </div>
                        <div className="col-span-6 md:col-span-6">
                            <Input textSize="text-lg" defaultValue={user[keys[index]]} name={keys[index]} id={user.id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} />
                        </div>
                    </>;
                }}
                />
                <div className="flex justify-end col-span-8 mt-4">
                    <Button onClick={handleSaveClick} style={{ width: "6rem" }}>Simpan</Button>
                </div>
            </div>
        </div>
    );
};

export default BodyUserProfile;