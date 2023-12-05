const comments = require("../../../model/commentsModel")

const getPostComments = async(req,res)=>{
    const currentPage = parseInt(req.query.currentpage-1)
    const size = parseInt(req.query.size)
    const id = req.params.id
    const query = {post_id:id}
    const result = await comments.find(query).skip(currentPage*size).limit(size)
    res.send(result)
    
}

module.exports = getPostComments