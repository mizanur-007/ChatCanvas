import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../useAxios";


const useUserPostCount = () => {
    const axiosSecure = useAxios()

    const {user,loading}=useAuth()
    const {data: counts={},isLoading:countLoading,refetch}= useQuery ({
        queryKey:['userPostcount',user?.email],
        enabled:!loading,
        queryFn: async()=>{
            const res = await axiosSecure(`/userpostcount/${user?.email}`)
            return res.data
        }
    })
    const {count} = counts
    return {count,countLoading,refetch};
};

export default useUserPostCount;