import { useQuery } from '@tanstack/react-query';

import axiosPublic from '../AxiosPublic';

const usePostCommentCount = () => {
    const {data,isLoading}=useQuery({
        queryKey:['commentsCount'],
        queryFn:async()=>{
          const {data} =await axiosPublic(`/postcommentcount`)
          return data
        }
      })
      
      return {data,isLoading}
};

export default usePostCommentCount;