
const { Types: { ObjectId } } = require('mongoose');
const posts = require('../../../../model/Posts');


const updateCommentsCount = async(req,res)=>{
    const data = req.body
    const id = req.params.id
    const query = {_id: new ObjectId(id)}

    const updateData = {
        $set:{
            comments: data.newCommentsCount
        }
    }
    const result = await posts.updateOne(query,updateData)
    res.send(result)
}
module.exports = updateCommentsCount