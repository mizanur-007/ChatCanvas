import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";


const useUserCount = () => {
    const axiosSecure = useAxios()

    const {data: counts={},isLoading:userCountLoading}= useQuery ({
        queryKey:['usercount'],
        queryFn: async()=>{
            const res = await axiosSecure(`/usercount`)
            return res.data
        }
    })
    const {count:userCount} = counts
    return {userCount,userCountLoading};
};

export default useUserCount;