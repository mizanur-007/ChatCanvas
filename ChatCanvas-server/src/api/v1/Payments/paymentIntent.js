const stripe = require('stripe')(process.env.PAYMENT_SK)

const paymentIntent = async(req,res)=>{
    const data = req.body
    const amount=data.amount
    const netAmount = parseInt(amount*100)
    if(!amount || netAmount <1 ){
        return
    }

    const {client_secret} = await stripe.paymentIntents.create({
        amount: netAmount,
        currency:'usd',
        payment_method_types:["card"]
    })

    res.send({clientSecret: client_secret})

}

module.exports = paymentIntent