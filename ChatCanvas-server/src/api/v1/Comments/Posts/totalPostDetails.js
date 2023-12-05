const { Types: { ObjectId } } = require('mongoose');
const posts = require('../../../../model/Posts');

const totalPostDetails = async(req,res)=>{
    const id = req.params.id
    const query = {_id:new ObjectId(id)}
    const result =await posts.findOne(query)
    res.send(result)
}

module.exports = totalPostDetails