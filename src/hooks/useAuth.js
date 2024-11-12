import { authAction } from "@/stores/auth";
import { branchAction } from "@/stores/branch";
import apiInstance from "@/utils/apiInstance";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { data: adminData, isLoading, isError, error } = useQuery({
        queryFn: async () => {
            const response = await apiInstance('auth/check');
            return response.data.adminData;
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
        if (!isLoading && adminData) {
            const { _id, role } = adminData;
            const { _id: id, name, address } = adminData.latestBranchId;
            dispatch(authAction.signin({ userId: _id, role }));
            dispatch(branchAction.changeActiveBranch({
                id, name, address
            }))
        }
    }, [isLoading, adminData]);
    return { isLoading };
};

export default useAuth;