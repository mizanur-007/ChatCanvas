const comments = require("../../../model/commentsModel")


const postComment = async(req,res)=>{
    const data= req.body
    const doc = {
        post_id: data.postID,
        post_title: data.postTitle,
        comment:data.comment,
        commentor:data.commentor
    }
    const result = await comments.create(doc)
    res.send(result)
}

module.exports = postComment