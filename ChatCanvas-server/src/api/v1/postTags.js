const tags = require("../../model/tags")

const postTags = async(req,res)=>{
    const data = req.body
    const query = {tag_title:data.tag_title}
    const isExist = await tags.findOne(query)
    if(isExist){
        return res.send({message:'Tag exist already'})
    }
    const doc ={
        created_by:data.created_by,
        tag_title:data.tag_title
    }

    const result =await tags.create(doc)
    res.send(result)

}

module.exports = postTags