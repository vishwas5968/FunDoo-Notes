import User from '../models/user.model';
import bcrypt from "bcryptjs";
import HttpStatus from "http-status-codes";

//create new user
export const registerUser = async (body) => {
  return await User.create(body);
};

export const getUserByEmail = (email) => {
  return User.find({email:email})
}

export const login=async(req,res,next)=>{
  const data=await User.find({email:req.body.email})
  if (data.length === 1){
    const match=await bcrypt.compare(req.body.password, data[0].password)
    return {
      ...data[0],
      isMatch:match
    }
    // const isMatch=await bcrypt.compareSync(req.body.password, data[0].password)
  }
  else {
    throw new Error()
  }
}

