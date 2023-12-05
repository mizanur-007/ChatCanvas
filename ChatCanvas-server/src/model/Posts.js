const {Schema, default: mongoose} = require("mongoose")


const postSchema = new Schema({
    author_image:{
        type: String,
        required: true
    } ,
    author_name: {
        type: String,
        required: true
    } ,
    author_email: {
        type: String,
        required: true
    } ,
    post_title: {
        type: String,
        required: true
    } ,
    post_description: {
        type: String,
        required: true
    } ,
    tag: {
        type: String,
        required: true
    } ,
    access: {
        type: String,
        required: true
    } ,
    posted_time: { type: Date, default: Date.now, required:true },
    upvote: {
        type: Number,
        required: true
    } ,
    downvote: {
        type: Number,
        required: true
    } ,
    comments: {
        type: Number, 
        default: 0
    }
})

const posts = mongoose.model('posts',postSchema)

module.exports = posts