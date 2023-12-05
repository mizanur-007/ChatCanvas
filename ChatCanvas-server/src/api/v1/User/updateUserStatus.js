const user = require("../../../model/userModel")


const updateUserStatus = async(req,res)=>{
    const email = req.params.email
    const data = req.body
    const query = {email: email}
    const updateDoc={
        $set:{
            status:data.status
        }
    }
    const result = await user.updateOne(query,updateDoc)
    res.send(result)
}

module.exports = updateUserStatus