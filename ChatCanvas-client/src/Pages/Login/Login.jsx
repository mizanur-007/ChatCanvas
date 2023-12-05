import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Lottie from "lottie-react";
import loginanime from '../../assets/loginanime.json'
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from "../../Hooks/useAuth";
import { saveUser } from "../../api/Authentication/saveUser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Helmet } from "react-helmet-async";



const Login = () => {

  const { register, handleSubmit } = useForm()
  const[checked,setChecked] = useState(false)
  const {login, googleLogin} = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
  console.log(checked)

  const onSubmit =async (data) => {
    const email= data.email
    const password= data.password

    try{
      const loginData = await login(email,password);
      toast.success("Logged In",{
        position:'top-center',
        autoClose:2000
      })
      navigate(location?.state?.from?.pathname || '/')

    }
    catch(error){
      toast.error(error.message,{
        position:'top-center',
        autoClose:2000
      })
    }
    
  }


      //google
      const handleGoogleLogin= async()=>{
        try{
          const data = await googleLogin();
          toast.success("Logged In",{
            position:'top-center',
            autoClose:2000
          })
          navigate(location?.state?.from?.pathname || '/')

          const {user} = data
          const userData = {
            userName: user?.displayName,
            email: user.email,
            photo:user.photoURL,
            role:'guest',
            status:'Bronze',
            permission:'permitted'
            
           }
  
           const saveUserData = await saveUser(userData)
        console.log(saveUserData)
        }
        catch(error){
          toast.error(error.message,{
            position:'top-center',
            autoClose:2000
          })
        }
      }

    return (
<div>
<Helmet>
      <title>Registration</title>
    </Helmet>
<Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
        
          item
          sx={{display:{xs:'none',sm:'block',lg:'block'},height:{lg:'224px'}}}
          xs={false}
          sm={6}
          lg={6}
          
        >
            <Box sx={{height: {lg:'400px',sm:'250px'}, width: {lg:'600px',sm:'400px'}}}>
            <Lottie animationData={loginanime} loop={true} />
            </Box>
            </Grid>
        <Grid item xs={12} sm={6} lg={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', height: '80px', width: '80px' }}>
              <LockPersonIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign In
            </Typography>
            <Box noValidate  sx={{ mt: 1 }}>
<form onSubmit={handleSubmit(onSubmit)}>
<TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("password")}
                label="Password"
                type={checked ? "text":"password"}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox onClick={()=>setChecked(!checked)} value="remember" color="primary" />}
                label="show Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
</form>
              <Button onClick={handleGoogleLogin} fullWidth variant="outlined">
                <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyItems: 'center'
            }}>
                <Typography>SIgn In With</Typography>  <Typography sx={{ml: 2}}><FaGoogle /> </Typography>
                </Box>
              </Button>
              <Grid container>
                <Grid item sx={{mt: 2,  display: 'flex', alignItems: 'center', gap: 1}}>
                  
                    <Typography sx={ {color: 'black'}} variant="body2">Dont have an account?</Typography>
                    <Link to={'/registration'}> <Typography color={"blue"}> Sign Up</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
</div>
    );
};

export default Login;