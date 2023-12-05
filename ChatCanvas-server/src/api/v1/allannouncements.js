
const announcements = require("../../model/announcementModel")

const getAllAnnouncement =  async(req,res)=>{
    const result = await announcements.find()
    const count = await announcements.estimatedDocumentCount()
    res.send({result,count})
}

module.exports = getAllAnnouncement;