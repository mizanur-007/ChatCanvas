import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../AxiosPublic";


const useTags = () => {
    

 const {data:tags=[],isLoading}=useQuery({
    queryKey:['tags'],
    queryFn:async()=>{
        const {data} =await axiosPublic('/tags')
        return data;
    }
 })
 return {tags,isLoading};
};

export default useTags;