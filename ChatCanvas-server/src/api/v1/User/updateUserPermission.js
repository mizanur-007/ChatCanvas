const user = require("../../../model/userModel")


const updateUserPermission = async(req,res)=>{
    const email = req.params.email
    const data = req.body
    const query = {email: email}
    const updateDoc={
        $set:{
            permission:data.action
        }
    }
    const result = await user.updateOne(query,updateDoc)
    res.send(result)
}

module.exports = updateUserPermission