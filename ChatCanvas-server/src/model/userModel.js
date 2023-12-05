const {Schema, default: mongoose} = require("mongoose")


const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    } ,
    email:{
        type: String,
        required: true
    } ,
    photo: {
        type: String,
        required: true
    } ,
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        required: true
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user