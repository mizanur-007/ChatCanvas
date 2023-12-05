import axios from "axios";
import { clearCookie } from "./Authentication/clearCookie";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const useAxios = () => {
    
    axiosSecure.interceptors.response.use(
        (response)=>{
            return response;
        },
        async(error)=>{
            if(error.response.status == 401 || error.response.status== 403){
                await clearCookie()
                window.location.href = '/login'
                
            }
           return Promise.reject (error)
    
        }
    )

    return axiosSecure
};

export default useAxios;