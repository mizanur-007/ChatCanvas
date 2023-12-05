import { Avatar, Box, Paper, Typography } from "@mui/material"
import useAuth from "../../Hooks/useAuth";
import useUserPost from "../../api/Posts/useUserPost";
import Post from "../../Component/Posts/Post";
import AdminProfile from "../Admin Profile/AdminProfile";
import Loader from "../../Component/Loader/Loader";
import useUserDetails from "../../api/Users/useUserDetails";
import VerifiedIcon from '@mui/icons-material/Verified';
import HowToRegIcon from '@mui/icons-material/HowToReg';


const UserProfile = () => {
    const {user,loading} = useAuth()
    const {userPosts} = useUserPost()
    const {userDetailsData,userLoading} = useUserDetails()


    if(loading||userLoading){
        return <Loader></Loader>
    }
   const role =userDetailsData.role
   const status =userDetailsData.status

    const posts = userPosts.slice(0,3)
    return (
<>
{
    role !=='admin' ? <div>
    <Paper elevation={12} sx={{display:'flex', alignItems:'center', justifyContent:'center',p:4,bgcolor:'primary.light',mb:10}}>
    <Box sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
    <Avatar
      alt="Remy Sharp"
      src={user?.photoURL}
      sx={{ width: '200px', height: '200px' }}
    />
<Box sx={{display:'flex',mt:2,gap:1,alignItems:'center',justifyContent:'center'}}>
<Typography variant="h6" sx={{ fontWeight:'bold'}}>
       {user?.displayName}
    </Typography>
    <Typography>
      {
        status =='Gold' ?   <VerifiedIcon sx={{color:'blue',fontSize:'26px'}}></VerifiedIcon> : <HowToRegIcon  sx={{color:'primary.bronze',fontSize:'28px'}}></HowToRegIcon>
      }
    </Typography>
</Box>
    <Typography sx={{fontSize:'15px', color:'gray'}}>
       {user?.email}
    </Typography>
    </Box>
            </Paper>
    
            {
        // eslint-disable-next-line react/prop-types
        posts?.map(post => <Post key={post?._id} post={post}></Post>)
    }
    </div> : <AdminProfile></AdminProfile>
}
</>
    );
};

export default UserProfile;