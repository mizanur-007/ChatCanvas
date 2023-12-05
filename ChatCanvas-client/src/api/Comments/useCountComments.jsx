import { useQuery } from '@tanstack/react-query';
import useAxios from '../useAxios';


const useCountComments = () => {
    const axiosSecure = useAxios()



    const {data: counts={},isLoading:commentCountLoading}= useQuery ({
        queryKey:['commentscount'],
        queryFn: async()=>{
            const res = await axiosSecure(`/commentscount`)
            return res.data
        }
    })
    const {count:commentsCount} = counts
    return {commentsCount,commentCountLoading};
};

export default useCountComments;