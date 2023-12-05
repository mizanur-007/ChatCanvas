const {Schema, default: mongoose} = require("mongoose")

const reportedcommentsSchema = new Schema({
    commentor: {
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
    feedback:{
        type: String,
        required: true
    }
})

const reportedcomments = mongoose.model('reportedcomments',reportedcommentsSchema)

module.exports = reportedcomments