import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorPage from "../Error/ErrorPage"
import { Avatar, Box, Container, IconButton, Paper, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import { FacebookShareButton } from "react-share";
import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../api/useAxios";
import { AwesomeButton } from "react-awesome-button";
import { CommentDiscussionIcon, FileAddedIcon } from "@primer/octicons-react";
import AwesomeButtonStyles from "react-awesome-button"
import useUserDetails from "../../api/Users/useUserDetails";
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const PostDetails = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user} = useAuth()
  const axiosSecure = useAxios()
  const { userDetailsData, userLoading } = useUserDetails();
    const {id} = useParams();
    
    
    const {data: post = {}, isLoading, isError, refetch}=useQuery({
        queryKey:['post'],
        queryFn: async()=>{ 
          const {data} = await  axiosSecure(`/post/${id}`)
          return data

        }
    })
    

    if(isLoading||userLoading){
      return <Loader></Loader>
  }
  else if(isError){
      return <ErrorPage></ErrorPage>
  }


    const {author_image, author_name, downvote
        , post_description, post_title, posted_time, tag
        , upvote, voteDifference, _id, comments:commentsCount}=post

        const handleUpVote =async()=>{
          const newUpVote = upvote+1;
          const {data}= await axiosSecure.patch(`/post/updateUp/${_id}`,{newUpVote})
          refetch()
          
        }
        const handleDownVote =async()=>{
          const newDownVote = downvote+1;
          const {data}= await axiosSecure.patch(`/post/updateDown/${_id}`,{newDownVote})
          refetch()
          
        }

        const shareURL = `https://chat-canvas-server.vercel.app/post/${_id}`


        const handlecomment=async(e)=>{
          e.preventDefault()
          const form = e.target
          const comment = e.target.comment.value;
          const commentor = user?.email;
          const postID = _id;
          const postTitle = post_title

          const newdata = {
            postID, postTitle, comment, commentor
          }
          console.log(userDetailsData?.permission)
          if (userDetailsData?.permission == "restricted"){
return toast.error("You are restricted to comment for violating rules",{
  position:'top-center',
  autoClose:2000
})
          }else{
            const data = await axiosSecure.post('/comments',newdata)
            const newCommentsCount = commentsCount+1;
            const result = await axiosSecure.patch(`/post/updatecomments/${_id}`,{newCommentsCount})
            console.log(result)
            refetch()
          }
         
          form.reset()
          handleClose()
        }
        


    
          const formattedDate = format(new Date(posted_time), 'dd-MM-yyyy hh:mm a');
        
        
    

    return (
        <div style={{marginTop: '30px'}}>
<Container maxWidth='md'>
<Box component={Paper} elevation={16} sx={{p:6}}>
            {/* avatar name  */}
            <Box sx={{display:'flex', alignItems:'center',gap: 3,mb:2}}>
            <Avatar
            alt="Remy Sharp"
            src={author_image}
            sx={{ width: 56, height: 56 }}
          />
          <Typography fontWeight={'bold'} sx={{fontSize: '20px'}}>{author_name}</Typography>
            </Box>
{/* content  */}
            <Box>
                <Typography fontWeight={'bold'} mb={1} fontSize={'18px'} color={'primary.main'}>{post_title}</Typography>
                <Typography  fontWeight={'lighter'} mb={2} fontSize={'16px'}>{post_description}</Typography>
                <Typography>
          <Box  sx={{bgcolor: 'primary.light', display:'inline', p:1, borderRadius: 2}}>
          #{tag}
          </Box>
        </Typography>
        <Typography  fontWeight={'lighter'} mb={3} mt={3} fontSize={'14px'}>{formattedDate}</Typography>
            </Box>

{/* button  */}
<Box sx={{display:'flex', gap: 4}}>
<IconButton  onClick={handleOpen} aria-label="comments">
          <CommentIcon />
          <Typography ml={1}>{commentsCount}</Typography>
        </IconButton>
        {/* modal  */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Comment
          </Typography>
          <Box
      component="form"
      onSubmit={handlecomment}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
          id="outlined-multiline-flexible"
          name="comment"
          label="Comment"
          multiline
          required
          maxRows={6}
        />
        <AwesomeButton
        
        cssModule={AwesomeButtonStyles}
                style={{marginTop:'20px',marginBottom:'30px',width:'140px',backgroundColor:'#76c893',color:'white'}}
                after={<CommentDiscussionIcon />} type="submit">Submit</AwesomeButton>
    </Box>
        </Box>
      </Modal>
        <IconButton onClick={handleUpVote} aria-label="upvote">
          <ThumbUpIcon />
          <Typography ml={1}>{upvote}</Typography>
        </IconButton>
        <IconButton   onClick={handleDownVote} aria-label="downvote">
          <ThumbDownIcon />
          <Typography ml={1}>{downvote}</Typography>
        </IconButton>
       <FacebookShareButton url={shareURL}>
       <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       </FacebookShareButton>
</Box>

            </Box>
</Container>
        </div>
    );
};

export default PostDetails;