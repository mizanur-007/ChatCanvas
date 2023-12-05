const express = require("express")
const getAllTags = require("../api/v1/alltags")
const postTags = require("../api/v1/postTags")
const router = express.Router()

router.get('/tags',getAllTags)
router.post('/tags',postTags)


module.exports = router