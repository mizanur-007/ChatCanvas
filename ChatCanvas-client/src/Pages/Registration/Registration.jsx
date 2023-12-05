import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import registeranime from '../../assets/registeranime.json'
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlinePeopleAlt } from "react-icons/md";
import { imgUpload } from "../../api/utilities";
import useAuth from "../../Hooks/useAuth";
import { saveUser } from "../../api/Authentication/saveUser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const Registration = () => {

  const { register,formState: { errors }, handleSubmit } = useForm()
    const{createUser,  updateUser, googleLogin} = useAuth();
    const location = useLocation()
    const navigate = useNavigate()

    const onSubmit = async(data) => {
                const name= data.name
                 const image= data.image[0]
             const email= data.email
                 const password= data.password

                 try {
                  const imageURL = await imgUpload(image);
                  
      
                  const loginData = await createUser(email,password);

      
                  const updateData = await updateUser(name,imageURL.data.display_url)
                  toast.success("Signed Up Successfully",{
                    position:'top-center',
                    autoClose:2000
                  })
                  navigate(location?.state?.from?.pathname || '/')
      
                  const user = {
                    userName: name,
                    email: email,
                    photo:imageURL.display_url,
                    role:'guest',
                    status:'Bronze',
                    permission:'permitted'
                    
                   }
      
                   const saveUserData = await saveUser(user)
                   console.log(saveUserData)
      
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
          toast.success("Signed Up Successfully",{
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
<Grid container  component="main" sx={{ height: '100vh' , justifyItems: 'center' }}>
        <Grid
        height={56}
          item
          xs={false}
          sm={6}
          lg={6}
          sx={{display:{xs:'none',sm:'block',lg:'block'}}}
        >
            <Box sx={{height: {lg:'450px',sm:'250px'},mt:{sm:'80px'}, width: {lg:'600px',sm:'420px'}}}>
            <Lottie animationData={registeranime} loop={true} />
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', height: '80px', width: '80px', fontWeight:'bold', fontSize:'40px' }}>
              <MdOutlinePeopleAlt />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign Up
            </Typography>
            <Box  noValidate  sx={{ mt: 1 }}>
<form  onSubmit={handleSubmit(onSubmit)}>
<TextField
                margin="dense"
                required
                fullWidth
                id="name"
                label="Your Name"
                {...register("name")}
                autoComplete="name"
                autoFocus
              />
              <div  style={{border:'1px solid', borderRadius:'4px', borderColor:'gray' , marginTop:'8px', marginBottom: '8px', paddingLeft:'10px'}}>
              <input type="file" style={{marginTop: '12px', marginBottom: '12px'}} required id="image" {...register("image")} autoFocus accept='image/*'></input>
              </div>
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
                {...register("password",{minLength: { value: 6, message: 'Password must be at least 6 characters' }})}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
               {errors.password && <p style={{color:'red'}} role="alert">{errors.password.message}</p>}
              <FormControlLabel
                control={<Checkbox required value="remember" color="primary" />}
                label="Accepts Terms & Conditions"
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
</form>
              <Button onClick={handleGoogleLogin} fullWidth variant="outlined">
                <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyItems: 'center'
            }}>
                <Typography>SIgn Up With</Typography>  <Typography sx={{ml: 2}}><FaGoogle /> </Typography>
                </Box>
              </Button>
              <Grid container>
                <Grid item sx={{mt: 2,  display: 'flex', alignItems: 'center', gap: 1}}>
                  
                    <Typography sx={ {color: 'black'}} variant="body2"> Have an account?</Typography>
                    <Link to={'/login'}> <Typography color={"blue"}> Sign In</Typography>
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

export default Registration;