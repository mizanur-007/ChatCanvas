import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../AxiosPublic";


const useSearch = () => {
    const {data:searches=[],isLoading}=useQuery({
        queryKey:['searches'],
        queryFn:async()=>{
            const {data} =await axiosPublic('/searches')
            return data;
        }
     })
     return {searches,isLoading};
};

export default useSearch;