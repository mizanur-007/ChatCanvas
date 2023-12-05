import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";


const useGetComments = ({id}) => { 
    const axiosSecure = useAxios()

    // console.log(id)
    const {data:comments=[],isLoading}= useQuery({
        queryKey:['userposts'],
        queryFn: async()=>{
            const {data} = await axiosSecure(`/comments/${id}`)
            return data
        }
    })
    return comments
};

export default useGetComments;