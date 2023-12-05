import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../AxiosPublic';

const usePosts = () => {

    
    const {data:posts=[],isLoading}= useQuery ({
        queryKey:['posts'],
        queryFn: async()=>{
            const res = await axiosPublic(`/posts`)
            return res.data
        }
    })

    return {posts,isLoading};
};

export default usePosts;