import { Box, Container, Paper, Typography } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import './form.css'
import CheckoutForm from './CheckoutForm ';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet-async';


const Membership = () => {


    const amount = 10
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);



    return (
<div>
<Helmet>
      <title>ChatCanvas||Membership</title>
    </Helmet>
<div style={{marginTop:'50px'}}>
           <Container maxWidth='md'>
           <Box textAlign={'center'} component={Paper} elevation={8} bgcolor={'primary.light'} py={6}>
                <Typography variant='h4' fontWeight={'bold'}>Become A Member</Typography>
                <Typography fontWeight={'lighter'} mt={1} fontSize={'14px'}>Join the Community: Enjoy Exclusive Membership Privileges</Typography>
                <Typography variant='h6' mt={1}>Only at ${amount}*</Typography>

<Elements stripe={stripePromise} >
<CheckoutForm></CheckoutForm>
</Elements>
            </Box>
           </Container>

        
        </div>
</div>
    );
};

export default Membership;