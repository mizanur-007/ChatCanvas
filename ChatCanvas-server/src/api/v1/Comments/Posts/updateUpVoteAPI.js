const posts = require("../../../../model/Posts")
const { Types: { ObjectId } } = require('mongoose');


const updateUpVote = async(req,res)=>{
    const data = req.body
    const id = req.params.id
    const query = {_id: new ObjectId(id)}

    const updateData = {
        $set:{
            upvote: data.newUpVote
        }
    }
    const result = await posts.updateOne(query,updateData)
    res.send(result)
}

module.exports = updateUpVote