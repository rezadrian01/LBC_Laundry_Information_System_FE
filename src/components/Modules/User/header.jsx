import { ROLE_LIST } from "@/constants/roleList";
import { GoPerson } from "react-icons/go";

const UserProfileHeader = ({ user }) => {
    const role = ROLE_LIST.find(role => role.en.toLowerCase() === user?.role?.toLowerCase());
    return (
        <div className='bg-primary-pink-300/70 w-full min-h-[40svh] flex flex-col items-center justify-center'>
            <div>
                <div className="bg-white rounded-full p-1">
                    <GoPerson size={100} />
                </div>
                <div className="text-center font-semibold mt-4 text-gray-50">
                    <h2 className="font-bold text-3xl">{user?.username}</h2>
                    <p className="text-xl">{role?.id}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader;