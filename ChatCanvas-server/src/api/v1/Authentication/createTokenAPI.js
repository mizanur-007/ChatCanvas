const jwt = require('jsonwebtoken')
require('dotenv').config()

const createAToken =  async(req,res)=>{
    const data = req.body;
    
    const token = jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: '12h'});
    res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none' 
    })
    .send({message: 'success'})
  }

  module.exports = createAToken