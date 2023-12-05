const { Types: { ObjectId } } = require('mongoose');
const user = require('../../../model/userModel');

const updateUser = async(req,res)=>{
    const id = req.params.id
    const data = req.body
    const query = {_id: new ObjectId(id)}
    const updateDoc={
        $set:{
            role:data.role
        }
    }
    const result = await user.updateOne(query,updateDoc)
    res.send(result)
}

module.exports = updateUser