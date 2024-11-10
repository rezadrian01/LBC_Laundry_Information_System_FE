import { authAction } from "@/stores/auth";
import apiInstance from "@/utils/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const response = await apiInstance('auth/check');
            return response;
        },
        queryKey: ['auth-data'],
        retry: false
    });

    // Redirect to login page
    useEffect(() => {
        if (isError && error?.response?.status === 401) {
            navigate('/login');
        }
    }, [isError, error, navigate]);

    // Set global state
    useEffect(() => {
        if (!isLoading && data) {
            const { id, role } = data?.data?.adminData;
            dispatch(authAction.signin({ userId: id, role }));
        }
    }, [isLoading, data]);
    return { isLoading };
};

export default useAuth;