import User from '../models/user.model';

//create new user
export const registerUser = async (body) => {
  return await User.create(body);
};

export const getUserByEmail = (email) => {
  return User.find({email:email})
}


