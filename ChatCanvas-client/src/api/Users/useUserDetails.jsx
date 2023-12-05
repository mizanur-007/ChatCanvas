import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../useAxios";


const useUserDetails = () => {
    const axiosSecure = useAxios()

    const {user,loadiing} = useAuth() 
    const email = user?.email;
    const {data:userDetailsData=[],isLoading:userLoading}= useQuery({
        queryKey:['userdetails',email],
        enabled:!loadiing ,
        queryFn: async()=>{
            const res = await axiosSecure(`/singleuser/${email}`)
            return res.data
        }
    })
    console.log(userDetailsData)

    return {userDetailsData,userLoading};
};

export default useUserDetails;