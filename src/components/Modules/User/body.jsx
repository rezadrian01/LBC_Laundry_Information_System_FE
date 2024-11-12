import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';

import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { USER_PROFILE_FIELDS } from '@/constants/detailFieldList';
import EachUtils from '@/utils/eachUtils';
import apiInstance from '@/utils/apiInstance';
import { queryClient } from '@/utils/query';

const BodyUserProfile = ({ user, keys }) => {
    const [usernameInput, setUsernameInput] = useState("");
    const [contactInput, setContactInput] = useState("");
    const [roleInput, setRoleInput] = useState("");
    const [oldPasswordInput, setOldPasswordInput] = useState("");
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState("");

    useEffect(() => {
        keys.forEach((key, index) => {
            switch (key.toLowerCase()) {
                case 'username':
                    setUsernameInput(user ? user[key] : "");
                    break;
                case 'contact':
                    setContactInput(user ? user[key] : "");
                    break;
                case 'role':
                    setRoleInput(user ? user[key] : "");
                    break;
            }
        });
    }, [user]);

    const { mutate: updateUserFn, isPending: isPendingUpdateUserFn } = useMutation({
        mutationFn: async (data) => {
            return apiInstance(`admin`, {
                data,
                method: "PUT"
            });
        },
        onSuccess: (response) => {
            alert("Data berhasil diubah", "", false);
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
        },
        onError: (response) => {
            alert("Data gagal diubah");
        },
        onSettled: () => {
            setOldPasswordInput("");
            setNewPasswordInput("");
            setConfirmNewPasswordInput("");
        }
    });

    const alert = (title, msg = "", error = true) => {
        Swal.fire({
            title: title,
            text: msg,
            icon: error ? 'error' : 'success'
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        // Validation
        if (!data.oldPassword.trim()) {
            alert("Password harus terisi");
            return;
        };
        if (data.newPassword.trim() || data.confirmNewPassword.trim()) {
            if (!data.oldPassword.trim()) {
                alert("Password harus diisi jika ingin mengganti password");
                return;
            }
            if (data.newPassword.trim() !== data.confirmNewPassword.trim()) {
                alert("Password baru harus sama dengan konfirmasi password");
                return;
            }
        }

        updateUserFn(data);
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className='relative px-6 sm:px-32 lg:max-w-[55rem] mx-auto pb-20'>
            <div className='px-6 grid grid-cols-6 md:grid-cols-8 items-center gap-y-4 my-10'>
                <EachUtils of={USER_PROFILE_FIELDS} render={(content, index) => {
                        let inputValue = "";
                        let onChangeHandler = () => { };
                        switch (content.name[0].toLowerCase()) {
                            case 'username':
                                inputValue = usernameInput;
                                onChangeHandler = setUsernameInput;
                                break;
                            case 'contact':
                                inputValue = contactInput;
                                onChangeHandler = setContactInput;
                                break;
                            case 'role':
                                inputValue = user && roleInput;
                                onChangeHandler = setRoleInput;
                                break;
                            case 'password':
                                inputValue = oldPasswordInput;
                                onChangeHandler = setOldPasswordInput;
                                break;
                            case 'newpassword':
                                inputValue = newPasswordInput;
                                onChangeHandler = setNewPasswordInput;
                                break;
                            case 'confirmpassword':
                                inputValue = confirmNewPasswordInput;
                                onChangeHandler = setConfirmNewPasswordInput;
                                break;
                        }
                        return <div className='col-span-6 md:col-span-8 grid grid-cols-6 md:grid-cols-8 items-center w-full'>
                            {index === 4 && <div className='col-span-6 md:col-span-8 mt-4 mb-6 h-[2px] bg-gray-600' />}
                            <div className="col-span-8 md:col-span-2">
                            <h4 className='text-xl'>{content.label}</h4>
                        </div>
                            <div className="col-span-8 md:col-span-6">
                                {<Input value={inputValue} onChange={(event) => onChangeHandler(event.target.value)} textSize="text-lg" name={content.name[1]} id={user?._id} bgColor={null} textCenter={false} hasShadow style={{ borderWidth: '1px', borderRadius: '5px', borderColor: '#e3e3e3' }} disabled={content?.id === 'role'} />}
                        </div>
                        </div>;
                }}
                />
                <div className="flex justify-end col-span-8 mt-4">
                        <Button style={{ width: "6rem" }}>Simpan</Button>
                </div>
            </div>
        </div>
        </form>
    );
};

export default BodyUserProfile;