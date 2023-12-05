const express = require("express")
const saveAUser = require("../../api/v1/Authentication/saveAUser")
const getUsers = require("../../api/v1/User/getUsers")
const updateUser = require("../../api/v1/User/updateUser")
const updateUserPermission = require("../../api/v1/User/updateUserPermission")
const countUser = require("../../api/v1/User/countUser")
const updateUserStatus = require("../../api/v1/User/updateUserStatus")
const singleUserDetails = require("../../api/v1/User/singleUserDetails")
const router = express.Router()


router.put('/user/:email',saveAUser)
router.get('/singleuser/:email',singleUserDetails)
router.get('/users',getUsers)
router.get('/usercount',countUser)

router.patch('/updateuser/:id',updateUser)
router.patch('/updateuserstatus/:email',updateUserStatus)
router.patch('/updateuserpermission/:email',updateUserPermission)

module.exports = router