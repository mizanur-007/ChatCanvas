const express = require("express")
const comments = require("../model/commentsModel")
const postComment = require("../api/v1/Comments/postComment")
const getPostComments = require("../api/v1/Comments/getPostComments")
const countComments = require("../api/v1/Comments/countComments")
const VerifyToken = require("./Authentication/verifyToken")
const cookieParser = require('cookie-parser')
const getPostCommentsCount = require("../api/v1/Comments/getPostCommentsCount")
const router = express.Router()

router.post('/comments',postComment)

router.get('/comments/:id',getPostComments)
router.get('/commentscount',countComments)
router.get('/postcommentcount',getPostCommentsCount)

module.exports = router