const { Types: { ObjectId } } = require('mongoose');
const reportedcomments = require('../../../model/reportCommentsModel');

const deleteReportComment=async(req,res)=>{
    const id = req.params.id
    const query = {_id:new ObjectId(id)}
    const result = await reportedcomments.deleteOne(query)
    res.send(result)
}

module.exports = deleteReportComment