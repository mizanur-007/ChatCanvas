import axiosPublic from "../AxiosPublic"

export const postSearch = async(postdata)=>{
    const {data} = await axiosPublic.post('/searches',postdata)
    return data
}