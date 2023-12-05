const express = require("express")
const {getAllPost, getAllPostPipeline, getAPost} = require("../api/v1/allpost")
const router = express.Router()
const { Types: { ObjectId } } = require('mongoose');
const posts = require("../model/Posts");
const updateUpVote = require("../api/v1/Comments/Posts/updateUpVoteAPI");
const updateDownVote = require("../api/v1/Comments/Posts/updateDownVote");
const countPost = require("../api/v1/Comments/Posts/countPosts");
const postAPost = require("../api/v1/Comments/Posts/postAPost");
const userGetPost = require("../api/v1/Comments/Posts/userGetPosts");
const deletePost = require("../api/v1/Comments/Posts/deletePost");
const userCountPost = require("../api/v1/Comments/Posts/userPostCount");
const updatePostAccess = require("../api/v1/Comments/Posts/updatePostAccess");
const updateCommentsCount = require("../api/v1/Comments/Posts/updateCommentsCount");
const totalPostDetails = require("../api/v1/Comments/Posts/totalPostDetails");


router.get('/posts',getAllPostPipeline)
router.get('/post/:id', getAPost)

router.get('/postcount',countPost);
router.get('/userpostcount/:email',userCountPost);
router.get('/posts/user/:email',userGetPost)
router.get('/totalcommentpost/:id',totalPostDetails)
  

router.patch('/post/updateUp/:id',updateUpVote)


router.patch('/post/updateDown/:id',updateDownVote)
router.patch('/post/updatecomments/:id',updateCommentsCount)
router.patch('/updatepostaccess/:id',updatePostAccess)

router.post('/posts',postAPost)

router.delete('/deletepost/:id',deletePost)


module.exports = router