import axios from "axios";

axios.defaults.withCredentials = true;
const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`
});

export default apiInstance;