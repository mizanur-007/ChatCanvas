const user = require("../../../model/userModel")

const saveAUser = async(req,res)=>{
    const data = req.body

    const options={ upsert: true }
    const email = req.params.email
    const query={email:email}
    const isExist = await user.findOne(query)
    if(isExist){
        return
    }
    const updatedoc={
        $set:{
            userName:data.userName,
            email:data.email,
            photo:data.photo,
            role:data.role,
            status:data.status,
            permission:data.permission
        }
    }
    const result =await user.updateOne(query,updatedoc,options)
    res.send(result)
}

module.exports = saveAUser