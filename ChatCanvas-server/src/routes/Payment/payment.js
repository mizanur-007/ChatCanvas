const express = require('express')
const paymentIntent = require('../../api/v1/Payments/paymentIntent')
const savePayment = require('../../api/v1/Payments/savePayment')
const router = express.Router()


router.post('/payment',paymentIntent)

router.post('/paymentinfo',savePayment)

module.exports = router