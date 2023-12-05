require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const user = require('../../model/userModel')

const VerifyToken = async(req,res,next)=>{
    const token = req.cookies?.token
    
    if(!token){
        return res.status(401).send({ message: 'Unauthorized Access' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          console.log(err)
          return res.status(401).send({ message: 'Unauthorized Access' })
        }
        req.user = decoded
        
        next()
      })

}

const verifyAdmin =async(req,res,next)=>{
  const email = req.user.email
  console.log(email)
  const query = {email:email}
  const isExist = await user.findOne(query)
  console.log(isExist)
  if(!isExist || isExist?.role !=='admin'){
      return res.status(401).send({message:'Unauthorized access'})
  }
  next()
}

module.exports = {VerifyToken,verifyAdmin}