const { Schema, default: mongoose } = require("mongoose");


const paymentSchema = new Schema({
    Name:{
        type: String,
        required: true
    } ,
    email:{
        type: String,
        required: true
    } ,
    transactionID:{
        type: String,
        required: true
    } ,
    date:{
        type: Date,
        required: true
    } 
})

const payments = mongoose.model('payments',paymentSchema)
module.exports = payments