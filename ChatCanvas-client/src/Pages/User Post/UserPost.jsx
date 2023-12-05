import { Box, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Component/Loader/Loader';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useUserPostCount from '../../api/Posts/useUserPostCount';
import Select from 'react-select';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxios from '../../api/useAxios';
import { Helmet } from 'react-helmet-async';

const UserPost = () => {
  const axiosSecure = useAxios()
  const [currentPage, setCurrentPage] = useState(1);
  const {count,countLoading,refetch:countrefetch} = useUserPostCount()
  const [selectedOption, setSelectedOption] = useState(null);


  const perPage = 10;
  const numberOfPage = Math.ceil(count/perPage)

    const {user,loadiing} = useAuth() 
    const email = user?.email;
    const {data:userPosts=[],isLoading, refetch}= useQuery({
        queryKey:['userposts',currentPage],
        enabled:!loadiing ,
        queryFn: async()=>{
            const res = await axiosSecure(`/posts/user/${email}?currentpage=${currentPage}&size=${perPage}`)
            return res.data
        }
    })

    if(isLoading|| loadiing){
        return <Loader></Loader>
    }

    const handlePage = (e, page) => {
      setCurrentPage(page);
    };

    const handleDelete=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axiosSecure.delete(`/deletepost/${id}`)
           refetch()
      countrefetch()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
      
        
      
    }

    const options=[
      {
          value:"public",
          label:'Public'
      },
      {
          value:'private',
          label:'Private'
      }
  ]

  const handleUpdate=(id)=>{
    const data = selectedOption.value
    const updateData = {
      value: data
    }
console.log(data)
    Swal.fire({
      title: "Are you sure?",
      text: `You want to set visibility ${data}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Continue"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const {data} = await axiosSecure.patch(`/updatepostaccess/${id}`,updateData)
        
        if(data?.acknowledged){
          toast.success(`Visibility updated to ${updateData?.value}`)
        }
      }
    });

    
  }
    

    return (
        <div>
                <Helmet>
        <title>My Posts</title>
      </Helmet>
            <Box>
            <TableContainer component={Paper} sx={{bgcolor:'primary.lighter',minHeight:'100vh'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead  >
          <TableRow>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Post Title</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Number of Votes</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Comments</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Visibility</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Update</TableCell>
            <TableCell sx={{fontWeight: 'bold',fontSize:'18px'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
{
    userPosts?.map(post=>             <TableRow key={post?._id}>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
          {post?.post_title}
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
        <IconButton  aria-label="upvote">
          <ThumbUpIcon />
          <Typography ml={1}>{post?.upvote}</Typography>
        </IconButton>
        <IconButton  aria-label="downvote">
          <ThumbDownIcon />
          <Typography ml={1}>{post?.downvote}</Typography>
        </IconButton>
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
<Link to={`/dashboard/postcomments/${post?._id}`}>
<Tooltip title='See Comments'>
<IconButton  aria-label="comments">
          <CommentIcon />
        </IconButton>
</Tooltip>
</Link>
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
        <Select
      className="select"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
        <Tooltip title="Delete">
  <IconButton onClick={()=>handleUpdate(post?._id)}>
    <SystemUpdateIcon  sx={{color:'green'}}/>
  </IconButton>
</Tooltip>
        </TableCell>
        <TableCell sx={{fontSize:'16px'}} component="th" scope="row">
        <Tooltip title="Delete">
  <IconButton onClick={()=>handleDelete(post?._id)}>
    <DeleteIcon  sx={{color:'red'}}/>
  </IconButton>
</Tooltip>
        </TableCell>
      </TableRow>)
}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
            <Pagination
        sx={{ display: "flex", justifyContent: "center",mt:5 }}
        onChange={handlePage}
        page={currentPage}
        count={numberOfPage}
        variant="outlined"
        shape="rounded"
      />
        </div>
    );
};

export default UserPost;