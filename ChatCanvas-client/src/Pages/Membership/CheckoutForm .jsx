
import {  CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import  { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import './form.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../api/useAxios';

const CheckoutForm  = () => {
  const axiosSecure = useAxios()
  const [processing,setProcessing] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const {user,loading} = useAuth()
    const navigate = useNavigate()
    

  const [errorMessage, setErrorMessage] = useState(null);
  const [secret, setSecret] = useState('')

    const amount = 10

    useEffect(()=>{
        if(amount >0){
          console.log(amount)
           axiosSecure.post('/payment',{amount})
            .then((data)=>{
                
                setSecret(data?.data?.clientSecret)
            })
        }
    },[amount])
   


    const handleSubmit =async(e)=>{
        e.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)
        if(card == null){
            return
        }

        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('error', error)
            setErrorMessage(error.message)
        }
        else{
            setErrorMessage('')
            console.log('payment method', paymentMethod)
        }
        setProcessing(true)

        const {paymentIntent, error:confirmError}= await stripe.confirmCardPayment(secret, {
            payment_method:{
                card: card,
                billing_details:{
                    email: user?.email,
                    name: user?.displayName
                }
            }
        })


        if(confirmError){
            console.log(confirmError)
            setErrorMessage(confirmError)
        }

        if(paymentIntent.status == 'succeeded'){
            console.log(paymentIntent)
            const saveTransaction = {
              Name:user?.displayName,
              email:user?.email,
              transactionID: paymentIntent.id,
              date: new Date()

            }
            const update = {
              status:'Gold'
            }
            
            const data = await axiosSecure.post('/paymentinfo',saveTransaction)
            
            const updateData = await axiosSecure.patch(`/updateuserstatus/${user?.email}`,update)
            setProcessing(false)
            navigate('/dashboard')
            toast.success('Congrats, You are now a Golden user',{
              position:'top-center',
              autoClose:2000
            })
        }

    }
    return (
        <>
        <form className='my-2' onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            className="centered-card-element"
          />
          <div className='flex mt-2 justify-around'>
            <button
              type='submit'
              disabled={!stripe}
              style={{marginTop:'25px', paddingLeft:'10px',paddingRight:'10px',paddingTop:'8px',paddingBottom:'8px',backgroundColor:'green',color:'white'}}
            >
            
                Pay ${amount}
              
            </button>
          </div>
        </form>
        {errorMessage && <p className='text-red-600 ml-8'>{errorMessage}</p>}
      </>
    );
};

export default CheckoutForm ;