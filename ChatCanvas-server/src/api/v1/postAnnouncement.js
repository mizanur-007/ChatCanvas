const announcements = require("../../model/announcementModel");

const postAnnouncement = async(req,res)=>{
    const data = req.body;
    const doc = {
        author_name: data.author_name,
        author_imageURL: data.author_imageURL,
        title:data.title,
        description:data.description,
    }

    const result = await announcements.create(doc)
    res.send(result)
}

module.exports = postAnnouncement