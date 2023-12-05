const tags = require("../../model/tags")

const getAllTags =  async(req,res)=>{
    const result = await tags.find()
    res.send(result)
}

module.exports = getAllTags