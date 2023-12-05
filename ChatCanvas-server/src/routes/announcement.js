const express = require("express")
const getAllAnnouncement = require("../api/v1/allannouncements")
const postAnnouncement = require("../api/v1/postAnnouncement")

const router = express.Router()

router.get('/announcements',getAllAnnouncement)
router.post('/announcements',postAnnouncement)

module.exports = router