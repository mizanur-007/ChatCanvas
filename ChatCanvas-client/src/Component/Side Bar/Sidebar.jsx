import { Box, Button, Divider, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useUserDetails from '../../api/Users/useUserDetails';
import useUserPostCount from '../../api/Posts/useUserPostCount';
import Loader from '../Loader/Loader';

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

const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const {userDetailsData,userLoading} = useUserDetails()
    const {count,countLoading} = useUserPostCount()

    if(userLoading|| countLoading){
      return <Loader></Loader>
  }
  
    const role =userDetailsData?.role
    const status =userDetailsData?.status
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  

    return (
        <div>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
{
    role == 'admin' ? <>
                    <Link to={'/'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Home</Typography>
                  </MenuItem>
                  </Link>
                  <Divider></Divider>
                  <Link to={'/dashboard'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Admin Profile</Typography>
                  </MenuItem>
                  </Link>
                  <Divider></Divider>
                  <Link  to={'/dashboard/manageusers'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Manage Users</Typography>
                  </MenuItem>
                  </Link>
                  <Divider></Divider>
                  <Link  to={'/dashboard/reports'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Reported Comments</Typography>
                  </MenuItem>
                  </Link>
                  <Divider></Divider>
                  <Link  to={'/dashboard/makeannouncement'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                  <Divider></Divider>
                    <Typography color={'black'}  textAlign="center">Make Announcement</Typography>
                  </MenuItem>
                  </Link>
    </> : <>
    <Link to={'/'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Home</Typography>
                  </MenuItem>
                  </Link>
                  <Divider></Divider>
                  <Link to={'/dashboard'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">My Profile</Typography>
                  </MenuItem>
                  </Link>
                  <Divider></Divider>

{
    count ==5 && status =="Bronze" ?   <Link onClick={handleOpen} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
    <MenuItem >
      <Typography color={'black'}  textAlign="center">Add Post</Typography>
    </MenuItem>
    </Link> : <Link  to={'/dashboard/addpost'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
    <MenuItem >
      <Typography color={'black'}  textAlign="center">Add Post</Typography>
    </MenuItem>
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
                  <Divider></Divider>
                  <Link  to={'/dashboard/userposts'} style={{textDecoration:'none', color:'black' ,fontWeight:'bold'}}>
    <MenuItem >
      <Typography color={'black'}  textAlign="center">My Posts</Typography>
    </MenuItem>
    </Link>
    </>
}


                  <Divider></Divider>
                
              </Menu>
            </Box>
        </div>
    );
};

export default Sidebar;