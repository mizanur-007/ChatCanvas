const {Schema, default: mongoose} = require("mongoose")


const tagsSchema = new Schema({
    created_by:{
        type: String,
        required: true
    } ,
    tag_title: {
        type: String,
        required: true
    }  
})

const tags = mongoose.model('tags',tagsSchema)

module.exports = tags