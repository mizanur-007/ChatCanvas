const express = require("express")
const postSearch = require("../../api/v1/Search/postSearch")
const getSearch = require("../../api/v1/Search/getSearch")

const router = express.Router()

router.post('/searches',postSearch)
router.get('/searches',getSearch)


module.exports = router