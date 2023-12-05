import { useQuery } from "@tanstack/react-query"
import axiosPublic from "../AxiosPublic"

const useAnnouncements = ()=>{

    const {data:announcements=[],isLoading, isError, refetch}= useQuery ({
        queryKey:['announcements'],
        queryFn: async()=>{
            const res = await axiosPublic('/announcements')
            return res.data
        }
    })
    const {result, count} = announcements
    return {result,count,isLoading, isError, refetch};
}
export default useAnnouncements;