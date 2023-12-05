const express = require("express")
const removeAToken = require("../../api/v1/Authentication/removetokenAPI")
const router = express.Router()

router.post('/logout', removeAToken)

  module.exports = router