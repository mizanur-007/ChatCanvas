const {Schema, default: mongoose} = require("mongoose")

const searchSchema = new Schema({
    search_text: {
        type: String,
        required: true
    } ,
    searched_time: { type: Date, default: Date.now, required:true }
})

const searched = mongoose.model('searched',searchSchema)

module.exports = searched