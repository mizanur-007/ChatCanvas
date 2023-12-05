const user = require("../../../model/userModel")

const singleUserDetails = async(req,res)=>{

    const email = req.params.email
    const query = {email:email}
    const result = await user.findOne(query)
    res.send(result)
}

module.exports = singleUserDetails