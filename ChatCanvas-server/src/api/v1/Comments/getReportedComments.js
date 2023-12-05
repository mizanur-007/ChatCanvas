const reportedcomments = require("../../../model/reportCommentsModel")

const getReportedComments = async(req,res)=>{
    const currentPage = parseInt(req.query.currentpage-1)
    const size = parseInt(req.query.size)
    
    const result = await reportedcomments.find().skip(currentPage*size).limit(size)
    const count =await reportedcomments.estimatedDocumentCount()
    res.send({result,count})
}

module.exports = getReportedComments