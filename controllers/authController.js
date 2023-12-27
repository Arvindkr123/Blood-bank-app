import { UserModel } from './../models/userModel.js';
import bcrypt from 'bcryptjs';
export const registerController = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    // validation
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: 'User already registered' });
    }
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // access rest data
    const user = new UserModel(req.body);
    await user.save();
    return res
      .status(201)
      .send({ success: true, message: 'User registered successfully', user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: 'Error in Register Api', success: false, error });
  }
};
