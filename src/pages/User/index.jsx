import Sidebar from "@/components/Modules/Sidebar/sidebar";
import BodyUserProfile from "@/components/Modules/User/body";
import UserProfileHeader from "@/components/Modules/User/header";
import { USER_PROFILE } from "@/constants/userProfile";

const User = () => {
    const keys = ["name", "phone", "role", "password"];
    const user = USER_PROFILE;

    return (
        <>
            <Sidebar />
            <UserProfileHeader user={user} />
            <BodyUserProfile user={user} keys={keys} />
        </>
    );
};

export default User;