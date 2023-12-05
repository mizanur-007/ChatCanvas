import { useQuery } from '@tanstack/react-query';
import useAxios from '../useAxios';

const useReportedComments = (currentPage,perPage) => {
    console.log(currentPage,perPage)
    const axiosSecure = useAxios()
    
    const {data:reportData={},isLoading,refetch}= useQuery({
        queryKey:['reportedcomments',currentPage],
        queryFn: async()=>{
            const {data} = await axiosSecure(`/reportedcomments?currentpage=${currentPage}&size=${perPage}`)
            return data
        }
    })
    console.log(reportData)
    const {result:reportedComments=[],count} = reportData
    return {reportedComments,count,isLoading,refetch}
};

export default useReportedComments;