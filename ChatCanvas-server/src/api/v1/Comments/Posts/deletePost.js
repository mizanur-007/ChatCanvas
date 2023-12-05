const { Types: { ObjectId } } = require('mongoose');
const posts = require('../../../../model/Posts');

const deletePost = async(req,res)=>{
    const id = req.params.id
    const query = {_id:new ObjectId(id)}
    const result = await posts.deleteOne(query)
    res.send(result)
}

module.exports = deletePost