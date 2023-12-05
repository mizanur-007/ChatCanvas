const searched = require("../../../model/searchModel")


const getSearch = async(req,res)=>{
    try{
        const result = await searched.aggregate([
            {
                $group:{
                    _id: '$search_text',
                    count:{$sum:1}
                }
            },
            {
                $sort:{
                    count:-1
                }
            },
            {
                $sort:{
                    searched_time:-1
                }
            }
        ]).limit(3)
        res.send(result)

    }
    catch(err){
        console.log(err)
    }
}

module.exports= getSearch