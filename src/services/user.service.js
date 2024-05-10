import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/user.util';

//create new user
export const registerUser = async (body) => {
  return await User.create(body);
};

export const getUserByEmail = (email) => {
  return User.find({email:email})
}

export const login=async(req,res,next)=>{
  const data=await User.findOne({email:req.body.email})
  if (data){
    const match=await bcrypt.compare(req.body.password, data.password)
    // enableCache()
    return {
      data,
      isMatch:match
    }
    // const isMatch=await bcrypt.compareSync(req.body.password, data[0].password)
  }
  else {
    throw new Error()
  }
}

export const forgotPassword = async (email) => {
  const data = await User.find({email:email})
  if (data.length) {
    await sendEmail(email)
  }
}

export const resetPassword = async (email, password) =>{
  const data =await User.findOne({email:email})
  if (data !== null) {
    data.password=await bcrypt.hash(password,5)
    return User.findOneAndUpdate({ email: email }, data, { new: true })
  }
  throw new Error("Unauthorized Request")
}