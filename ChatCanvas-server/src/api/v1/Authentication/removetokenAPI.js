
const removeAToken = async(req,res)=>{
    
    res.clearCookie('token', {maxAge: 0}).send({message:'cleared cookie'})
  }

  module.exports = removeAToken