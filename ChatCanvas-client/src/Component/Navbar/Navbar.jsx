import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useAuth from '../../Hooks/useAuth';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import useAnnouncements from '../../api/Announcements/useAnnouncements';
import { AwesomeButton } from 'react-awesome-button';
import { DashIcon, SignOutIcon } from '@primer/octicons-react';
import { Dashboard, DashboardOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';

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



const Navbar = () => {
    const {user,loading,logOut} = useAuth();
    const{count} = useAnnouncements()
    const {result:announcements=[],isLoading} = useAnnouncements()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogOut =()=>{
      logOut()
      .then(()=>{
        console.log('logout')
        toast.success('Logged Out',{
          position:'top-center',
          autoClose:2000
        })
      })
      .catch((err)=>{
        console.log(err.message)
        toast.error(err.message,{
          position:'top-center',
          autoClose:2000
        })
      })
      setAnchorElUser(null);
    }

    if(loading || isLoading){
      return <Loader></Loader>
    }

    return (
        <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img  style={{height: '50px'}} src='https://i.ibb.co/HqtLcC6/removal-ai-3b82ef7d-27b5-4011-8418-fed023500bc7-capture.png'></img>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                ml: -3,
                mr: 9
              }}
            >
              ChatCanvas
            </Typography>
  
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
                
                  <Link style={{textDecoration:'none'}} to={'/'}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Home</Typography>
                  </MenuItem>
                  </Link>
                  <Link style={{textDecoration:'none'}} to={'/membership'}>
                  <MenuItem >
                    <Typography color={'black'}  textAlign="center">Membership</Typography>
                  </MenuItem>
                  </Link>
                
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img  style={{height: '50px'}} src='https://i.ibb.co/HqtLcC6/removal-ai-3b82ef7d-27b5-4011-8418-fed023500bc7-capture.png'></img>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                ml: -3
              }}
            >
              ChatCanvas
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
               <Link to={'/'} style={{textDecoration:'none'}}>
               <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Home
                </Button>
               </Link>

               <Link to={'/membership'} style={{textDecoration:'none'}}>
               <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Membership
                </Button>
               </Link>
              
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip onClick={handleOpen} title="Open settings" style={{cursor:'pointer'}}>
              <Badge sx={{mr:2}} badgeContent={count} color="success">
  <NotificationsNoneIcon color="action" />
</Badge>
                {
                  user ?   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="user" sx={{height: '50px' , width: '50px'}} src={user?.photoURL
}/>
                </IconButton>:  <Link to={'/login'}>
  <Button variant='outlined' sx={{borderColor:'white'}}>
    <Typography color={'white'}>Join Us</Typography>
  </Button>
  </Link>
                }



              </Tooltip>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{fontWeight:'bold'}} component="h2">
            Announcements
          </Typography>
          {
            announcements.map((announce,index)=> <Box sx={{display:'flex' , gap:2, mt:2}} key={announce._id}>
<Typography sx={{fontWeight:'bold'}}>{index+1}.</Typography>
<Typography>{announce.title}</Typography>
            </Box>)
          }
         
        </Box>
      </Modal>
              
              <Menu
                sx={{ mt: '45px',textAlign:'center' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                
                  <MenuItem >
                    <Typography textAlign="center">{user?.displayName}</Typography>
                  </MenuItem>
                 
                 <Link to={'/dashboard'} style={{textDecoration:'none'}}>
                 <MenuItem >
                 <AwesomeButton type='primary' after={<DashboardOutlined />}>
                 <MenuItem >
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                 </AwesomeButton>
                  </MenuItem>
                 </Link>

                 <AwesomeButton after={<SignOutIcon />} type='danger' onPress={handleLogOut}  style={{paddingRight:'8px',paddingLeft:'8px'}}>
                 <MenuItem >
                    <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
                 </AwesomeButton>
                
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default Navbar;