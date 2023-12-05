
const posts = require("../../model/Posts")
const { Types: { ObjectId } } = require('mongoose');

const getAllPost = async(req,res)=>{
    const result = await posts.find().sort({posted_time:-1})
    res.send(result);
}

// post aggregate
const getAllPostPipeline = async(req,res)=>{
    const tag = req.query.tag
    const sortData = req.query.sort
    const currentPage = parseInt(req.query.currentpage-1)
    const size = parseInt(req.query.size)
    const query = {tag: tag}
    if(sortData=='true'){
        const result = await posts.aggregate([
            {
                $match: {access:'public'}
              },
            {
                $addFields: {
                    voteDifference: { $subtract: ["$upvote", "$downvote"] }
                }
            },
            {
                $sort: { voteDifference: -1 }
                }
        ]).skip(currentPage*size).limit(size)
        const count = await posts.estimatedDocumentCount()
        res.send(result);
    }
    else if (query.tag == 'null'){
        const result = await posts.aggregate([
            {
                $match: {access:'public'}
              },
            {
                $addFields: {
                    voteDifference: { $subtract: ["$upvote", "$downvote"] }
                }
            },
            {
                $sort: { posted_time: -1 }
                }
        ]).skip(currentPage*size).limit(size)
        const count = await posts.estimatedDocumentCount()
        res.send(result);
        
    }
    
    else{
        const result = await posts.aggregate([
            {
                $match: {tag: tag,access:'public'}
              },
            {
                $addFields: {
                    voteDifference: { $subtract: ["$upvote", "$downvote"] }
                }
            }
        ]).skip(currentPage*size).limit(size)
        const count = await posts.estimatedDocumentCount()
        res.send(result);
    }
    
}

const getAPost = async(req,res)=>{
const id = req.params.id;
const query = {_id: new ObjectId(id)}
const result = await posts.findOne(query)
res.send(result)
}


module.exports={getAllPost, getAllPostPipeline, getAPost}