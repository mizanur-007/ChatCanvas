const user = require("../../../model/userModel")

const getUsers=async(req,res)=>{
    const UserName = req.query.username
    const currentPage = parseInt(req.query.currentpage-1)
    const size = parseInt(req.query.size)
    let result = []
    if(UserName !== 'null'){
        const query={userName:UserName}
         result = await user.find(query)
}
    else if(UserName == 'null')
    {
         result = await user.find().skip(currentPage*size).limit(size)
    }
    const count =await user.estimatedDocumentCount() 
    res.send({result,count})
}

module.exports = getUsers