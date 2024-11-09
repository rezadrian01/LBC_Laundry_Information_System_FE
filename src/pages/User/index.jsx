import Sidebar from "@mods/Sidebar/sidebar";
import BodyUserProfile from "@mods/User/body";
import UserProfileHeader from "@mods/User/header";
import { USER_PROFILE } from "@/constants/userProfile";

import useAuth from "@/hooks/useAuth";

const User = () => {
    useAuth();
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