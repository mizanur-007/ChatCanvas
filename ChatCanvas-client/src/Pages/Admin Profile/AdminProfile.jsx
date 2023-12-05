
import { Avatar, Box, Paper, Typography } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import AddTags from '../../Component/Tags/AddTags';
import Chart from '../../Component/Chart/Chart';
import usePostCount from '../../api/Posts/usePostCount';
import useUserCount from '../../api/Users/useUserCount';
import useCountComments from '../../api/Comments/useCountComments';
import Loader from '../../Component/Loader/Loader';

const AdminProfile = () => {
    const {user} = useAuth()
    const {count,countLoading}=usePostCount()
    const {userCount,userCountLoading}=useUserCount()
    const {commentsCount,commentCountLoading}= useCountComments()
    if(countLoading,userCountLoading,commentCountLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div>
<Paper elevation={12} sx={{display:'flex',flexDirection:{xs:'column',sm:'column',lg:'row'}, alignItems:'center', justifyContent:'center',gap:{lg:18,sm:4,xs:4},p:4,bgcolor:'primary.light',mb:10}}>
<Box sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
<Avatar
  alt="Remy Sharp"
  src={user?.photoURL}
  sx={{ width: '200px', height: '200px' }}
/>
<Typography variant="h6" sx={{mt:2, fontWeight:'bold'}}>
   {user?.displayName}
</Typography>
<Typography sx={{fontSize:'15px', color:'gray'}}>
   {user?.email}
</Typography>
</Box>
<Box>
    <Typography variant='h5' sx={{mb:2}}>
        Number of Users: {userCount}
    </Typography>
    <Typography  variant='h5' sx={{mb:2}}>
        Number of Post: {count}
    </Typography>
    <Typography  variant='h5' sx={{mb:2}}>
        Number of Comments: {commentsCount}
    </Typography>
</Box>
        </Paper>

        
</div>
<Chart></Chart>
<AddTags></AddTags>

        </div>
    );
};

export default AdminProfile;