const searched = require("../../../model/searchModel")


const postSearch=async(req,res)=>{
    const data = req.body
    const doc = {
        search_text:data.value
    }
    const result = await searched.create(doc)
    res.send(result)
}

module.exports = postSearch