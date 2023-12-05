const {Schema, default: mongoose} = require("mongoose")


const announcementSchema = new Schema({
    author_name: {
        type: String,
        required: true
    } ,
    author_imageURL:{
        type: String,
        required: true
    } ,
    title: {
        type: String,
        required: true
    } ,
    description: {
        type: String,
        required: true
    }
})

const announcements = mongoose.model('announcements',announcementSchema)

module.exports = announcements