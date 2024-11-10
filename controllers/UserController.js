const prisma = require('../db/db')

const createUser = async(req,res)=>{
  try{

  const {username} = req.body
  
  const findUser = await prisma.user.findUnique({
    where:{
      username:username
    }
  })

  if(findUser){
    return res.json({status:400,message:"User already exists"})
  }
  
  const newUser = await prisma.user.create({
    data:{
      username:username
    }
  })

  return res.json({status:200,message:"user created"})
}catch(err){
  console.log('err',err)
  return res.json({status:500,message:err})
}

}

module.exports = {createUser}