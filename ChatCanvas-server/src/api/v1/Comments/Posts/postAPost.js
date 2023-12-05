const posts = require("../../../../model/Posts");

 

 const postAPost = async(req,res)=>{
    const data = req.body;
    const doc = {
        author_image: data.photoURL,
        author_name: data.name,
        author_email: data.email,
        post_title:data.postTitle,
        post_description:data.postDescription,
        tag: data.tag,
        access: data.access,
        posted_time: Date.now(),
        upvote:data.upVote,
        downvote:data.downVote
    }

    const result = await posts.create(doc)
    res.send(result)
}

module.exports = postAPost