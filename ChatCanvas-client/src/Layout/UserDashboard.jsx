import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import useUserDetails from "../api/Users/useUserDetails";
import Loader from "../Component/Loader/Loader";
import useUserPostCount from "../api/Posts/useUserPostCount";
import * as React from 'react';
import { Helmet } from "react-helmet-async";
import Sidebar from "../Component/Side Bar/Sidebar";

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

const UserDashboard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {userDetailsData,userLoading} = useUserDetails()
  const {count,countLoading} = useUserPostCount()

  if(userLoading|| countLoading){
    return <Loader></Loader>
}

  const role =userDetailsData.role
  const status =userDetailsData.status

  return (
    <div>
      <Helmet>
      <title>Dashboard||Profile</title>
    </Helmet>
    <Sidebar></Sidebar>
      <Grid container>
        {/* sidebar  */}
        <Grid item sx={{display:{xs:'none',sm:'none',lg:'block'}}}  lg={3}>
          <Box sx={{ minHeight: "100vh", bgcolor: "secondary.light" }}>
            <Box>
             {
              role =='admin' ?  <List component="nav" aria-label="mailbox folders">
              <Link to={'/'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
              <ListItem button>
                 <ListItemText primary="Home" />
               </ListItem>
              </Link>
              <Divider />
              <Link to={'/dashboard'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
              <ListItem button>
                 <ListItemText primary="Admin Profile" />
               </ListItem>
              </Link>
               <Divider />
              <Link  to={'/dashboard/manageusers'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
              <ListItem button divider>
                 <ListItemText primary="Manage Users" />
               </ListItem>
              </Link>
<Link  to={'/dashboard/reports'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
<ListItem button>
                 <ListItemText primary="Reported Comments" />
               </ListItem>
</Link>
<Divider />
<Link  to={'/dashboard/makeannouncement'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
<ListItem button>
                 <ListItemText primary="Make Announcement" />
               </ListItem>
</Link>
               <Divider />
             </List>  :  <List component="nav" aria-label="mailbox folders">
               <Link to={'/'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
               <ListItem button>
                  <ListItemText primary="Home" />
                </ListItem>
               </Link>
               <Divider />
               <Link to={'/dashboard'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
               <ListItem button>
                  <ListItemText primary="My Profile" />
                </ListItem>
               </Link>
                <Divider />
{
  count ==5 && status =='Bronze' ? <Link onClick={handleOpen} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
  <ListItem button divider>
     <ListItemText primary="Add Post" />
   </ListItem>
  </Link> : <Link  to={'/dashboard/addpost'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
               <ListItem button divider>
                  <ListItemText primary="Add Post" />
                </ListItem>
               </Link>
}
               <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box textAlign='center' sx={style}>
          <Typography sx={{color:'red'}} id="modal-modal-title" variant="h6" component="h2">
            You exceeds the maximum of add post limits.
          </Typography>
          <Typography my={1}  id="modal-modal-title" variant="h6" component="h2">
            Explore our premium services By
          </Typography>
          <Typography sx={{color:'green',mb:3}} id="modal-modal-title" variant="h5" component="h2">
            Becoming A Member
          </Typography>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >

       <Link to={'/membership'}>
       <Button sx={{ml:2}} variant="contained">Become A Member</Button>
       </Link>
    </Box>
        </Box>
      </Modal>
<Link  to={'/dashboard/userposts'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
<ListItem button>
                  <ListItemText primary="My Posts" />
                </ListItem>
</Link>
                <Divider />
              </List>
             }
            </Box>
          </Box>
        </Grid>

        {/* outlet  */}
        <Grid item xs={12} sm={12} lg={9} p={4}>
            <Box>
                <Outlet></Outlet>
            </Box>

        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboard;
