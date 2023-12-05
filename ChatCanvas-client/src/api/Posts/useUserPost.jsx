import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../useAxios";


const useUserPost = () => {
    const axiosSecure = useAxios()

    const {user,loadiing} = useAuth() 
    const email = user?.email;
    const {data:userPosts=[],isLoading}= useQuery({
        queryKey:['userPosts',email],
        enabled:!loadiing ,
        queryFn: async()=>{
            const res = await axiosSecure(`/posts/user/${email}`)
            return res.data
        }
    })
    

    return {userPosts,isLoading};
};


export default useUserPost;