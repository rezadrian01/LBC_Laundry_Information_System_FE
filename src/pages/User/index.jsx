import Sidebar from "@mods/Sidebar/sidebar";
import BodyUserProfile from "@mods/User/body";
import UserProfileHeader from "@mods/User/header";
import { USER_PROFILE } from "@/constants/userProfile";

import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";
import { useSelector } from "react-redux";

const User = () => {
    const { isLoading: loadAuthData } = useAuth();
    const { userId, role } = useSelector(state => state.auth);
    const { data: user, isLoading: isLoadingCurrentUser, isError: isErrorCurrentUser, error: errorCurrentUser } = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            const response = await apiInstance(`admin/${userId}`);
            return response.data.data;
        },
        enabled: !loadAuthData && !!userId,
        retry: false
    });

    const keys = ["username", "contact", "role", "oldPassword", "newPassword", "confirmNewPassword"];
    // const user = USER_PROFILE;

    return (
        <>
            <Sidebar />
            {!isLoadingCurrentUser && <>
                <UserProfileHeader user={user} />
                <BodyUserProfile user={user} keys={keys} />
            </>}
        </>
    );
};

export default User;