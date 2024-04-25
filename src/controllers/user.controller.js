import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
const bcrypt=require("bcryptjs")
import {jsonResponse} from "../utils/JsonResponse..js";
import {generateJwt} from "../utils/user.util.js";

export const registerUser = async (req, res, next) => {
  // console.log(req.body)
  const data=await UserService.getUserByEmail(req.body.email)
  req.body.password=await bcrypt.hash(req.body.password,5)
  // req.body.password=bcrypt.hashSync(req.body.password,5)
    try {
      if (data.length===0) {
        const data = await UserService.registerUser(req.body);
        const {firstName, lastName, email} = data
        res.status(HttpStatus.CREATED).json(jsonResponse(HttpStatus.CREATED,{
          firstName: firstName,
          lastName: lastName,
          email: email
        },'User created successfully'))
      }
      else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'User with this email is already present'
        });
      }
    }catch (error) {
      next(error)
    }
};

export const login=async(req,res,next)=> {
  try {
    const data = await UserService.login(req, res, next)
    if (data.isMatch) {
      const token= generateJwt(data._id,req.body.email)
      res.cookie("at",token)
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: "Congratulations! Login Successful"
      })
    }
    else {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `Error! Wrong Password`,
      })
    }
  }catch (e) {
    console.log(e)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Error! Register with email first`,
    })
  }
}