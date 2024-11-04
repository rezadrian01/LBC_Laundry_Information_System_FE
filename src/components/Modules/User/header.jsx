import { GoPerson } from "react-icons/go";

const UserProfileHeader = ({ user }) => {
    const translatedRole = getTranslatedRole(user.role);

    return (
        <div className='bg-primary-pink-300/70 w-full min-h-[40svh] flex flex-col items-center justify-center'>
            <div>
                <div className="bg-white rounded-full p-1">
                    <GoPerson size={100} />
                </div>
                <div className="text-center font-semibold mt-4 text-gray-50">
                    <h2 className="font-bold text-3xl">{user.name}</h2>
                    <p className="text-xl">{translatedRole}</p>
                </div>
            </div>
        </div>
    );
};

const getTranslatedRole = (role) => {
    switch (role.toLowerCase()) {
        case "employee":
            return "Karyawan";
        case "admin":
            return "Admin";
        case "owner":
            return "Owner";
    }
};

export default UserProfileHeader;