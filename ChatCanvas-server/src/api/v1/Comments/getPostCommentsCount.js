const comments = require("../../../model/commentsModel")



const getPostCommentsCount = async(req,res)=>{
    
    try{
        const result = await comments.aggregate([
            {
                $group:{
                    _id: '$post_id',
                    count:{$sum:1}
                }
            }
        ])
        res.send(result)

    }
    catch(err){
        console.log(err)
    }
}

module.exports = getPostCommentsCount