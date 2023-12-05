import { useEffect, useState } from "react";
import Announcements from "../../Component/Announcements/Announcements";
import Banner from "../../Component/Banner/Banner";
import Posts from "../../Component/Posts/Posts";
import Tags from "../../Component/Tags/Tags";
import Loader from "../../Component/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@mui/material";
import usePostCount from "../../api/Posts/usePostCount";
import { postSearch } from "../../api/Searched/search";
import useAxios from "../../api/useAxios";
import { Helmet } from "react-helmet-async";
import axiosPublic from "../../api/AxiosPublic";

const Home = () => {

  const [displayPost, setDisplayPost] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {count} = usePostCount()

  

  const perPage = 5;
  const numberOfPage = Math.ceil(count/perPage)

  const { data: filterPosts = [], isLoading: loading } = useQuery({
    queryKey: ["posts", searchText, sort,currentPage],
    queryFn: async () => {
      const res = await axiosPublic(`/posts?tag=${searchText}&sort=${sort}&currentpage=${currentPage}&size=${perPage}`);
      return res.data;
    },
  });
  console.log(sort)

  useEffect(() => {
    if (filterPosts !== displayPost) {
      setDisplayPost(filterPosts);
    }
  }, [filterPosts,displayPost]);

  const handleSearch = async(search) => {
    setSearchText(search);
    const postData ={
      value: search
    }
    const response = await postSearch(postData)
    console.log(response)
    setSort(false);
  };

  const handlePage = (e, page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader></Loader>;
  }



  return (
    <div>
      <Helmet>
        <title>ChatCanvas || Home</title>
      </Helmet>
      <Banner handleSearch={handleSearch}></Banner>
      <Tags></Tags>
      <Announcements></Announcements>
      <Posts posts={displayPost} isLoading={loading} setSort={setSort}></Posts>
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        onChange={handlePage}
        page={currentPage}
        count={numberOfPage}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default Home;
