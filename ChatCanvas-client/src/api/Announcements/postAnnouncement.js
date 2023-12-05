import axiosPublic from "../AxiosPublic"

export const postAnnouncement =async(announcement)=>{
    const {data} = await axiosPublic.post('/announcements',announcement)
    return data
}