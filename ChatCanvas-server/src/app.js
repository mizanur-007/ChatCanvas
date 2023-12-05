const express = require("express");
const middlewares = require("./middlewares/middleware");
const connectToDB = require("./db/connnectDB");
require('dotenv').config()
const app = express();
const port  = process.env.PORT || 5000;

// middlewares 
middlewares(app)


const postRoute = require('./routes/posts')
const announcementRoute = require('./routes/announcement')
const tagsRoute = require("./routes/tags")
const commentsRoute = require("./routes/comments")
const jwtRoute = require("./routes/Authentication/createToken")
const removeTokenRoute = require('./routes/Authentication/removetoken')
const paymentRoute = require('./routes/Payment/payment')
const reportedCommentsRoute = require('./routes/reportedComments')
const userRoute = require('./routes/Authentication/saveUser');
const searchRouter = require('./routes/Searches/searches')
const VerifyToken = require("./routes/Authentication/verifyToken");

app.get('/health',(req,res)=>{
    res.send("Lets unite all")
})

app.use(postRoute)
app.use(announcementRoute)
app.use(tagsRoute)
app.use(commentsRoute)
app.use(reportedCommentsRoute)
app.use(userRoute)
app.use(searchRouter)



app.use(jwtRoute)
app.use(removeTokenRoute)

app.use(paymentRoute)


app.all('*',(req,res,next)=>{
    const error = new Error(`Can not find this url`)
    error.status = 404
    next(error)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({message: err.message})
})


const main = async()=>{
    await connectToDB()
    app.listen(port,()=>{
        console.log("app is running")
    })
}

main()