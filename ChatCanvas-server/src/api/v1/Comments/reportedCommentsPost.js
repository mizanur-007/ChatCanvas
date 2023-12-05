const reportedcomments = require("../../../model/reportCommentsModel")

const postReportedComment = async(req,res)=>{
    const data= req.body
    const doc = {
        commentor: data.commentor,
        post_title: data.postTitle,
        comment:data.comment,
        feedback: data.feedback
    }
    const result = await reportedcomments.create(doc)
    res.send(result)
}

module.exports = postReportedComment