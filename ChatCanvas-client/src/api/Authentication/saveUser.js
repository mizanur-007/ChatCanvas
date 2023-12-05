import axiosPublic from "../AxiosPublic"


export const saveUser = async(user)=>{
    const {data} = axiosPublic.put(`/user/${user?.email}`,user)
    console.log(data)
    return data
}