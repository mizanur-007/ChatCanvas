const posts = require("../../../../model/Posts")

const userGetPost = async(req,res)=>{
    const currentPage = parseInt(req.query.currentpage-1)
    const size = parseInt(req.query.size)
    const email = req.params.email
    const query = {author_email:email}

    const result = await posts.find(query).sort({ posted_time: -1 }).skip(currentPage*size).limit(size)
    res.send(result)
}

module.exports = userGetPost