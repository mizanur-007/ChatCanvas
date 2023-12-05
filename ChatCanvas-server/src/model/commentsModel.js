const {Schema, default: mongoose} = require("mongoose")


const commentsSchema = new Schema({
    post_id: {
        type: String,
        required: true
    } ,
    post_title: {
        type: String,
        required: true
    } ,
    comment:{
        type: String,
        required: true
    },
    commentor:{
        type: String,
        required: true
    }
})

const comments = mongoose.model('comments',commentsSchema)

module.exports = comments