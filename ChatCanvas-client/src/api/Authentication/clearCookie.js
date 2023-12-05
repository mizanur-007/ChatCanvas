import axiosCookie from "../AxiosCookie"


// Clear token from browser
export const clearCookie = async () => {
    const { data } = await axiosCookie.post('/logout')
    return data
  }