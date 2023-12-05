const express = require("express")
const postReportedComment = require("../api/v1/Comments/reportedCommentsPost")
const getReportedComments = require("../api/v1/Comments/getReportedComments")
const deleteReportComment = require("../api/v1/Comments/deleteReportedComment")
const { VerifyToken, verifyAdmin } = require("./Authentication/verifyToken")
// const VerifyToken = require("./Authentication/verifyToken")
// const verifyAdmin = require("./Authentication/verifyAdmin")
const router = express.Router()

router.post('/reportedcomments',postReportedComment)

router.get('/reportedcomments',VerifyToken,verifyAdmin,getReportedComments)
router.delete('/deletereportedcomments/:id',deleteReportComment) 


module.exports = router