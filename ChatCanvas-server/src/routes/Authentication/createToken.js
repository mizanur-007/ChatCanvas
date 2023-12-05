const express = require("express")
const router = express.Router()

const jwt = require("jsonwebtoken")
const createAToken = require("../../api/v1/Authentication/createTokenAPI")
    //create a cookie with jwt
    router.post('/jwt',createAToken)

      module.exports = router