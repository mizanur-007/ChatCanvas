 import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../AxiosPublic';

 
 const usePostCount = () => {
    

    const {data: counts={},isLoading:countLoading}= useQuery ({
        queryKey:['postcount'],
        queryFn: async()=>{
            const res = await axiosPublic(`/postcount`)
            return res.data
        }
    })

    const {count} = counts
    return {count,countLoading};
 };
 
 export default usePostCount;