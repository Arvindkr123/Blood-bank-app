import { UserModel } from './../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register controller
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

// login controller
export const loginController = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    // if existingUser is not found then do this
    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }

    // if user exists then comparing password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!comparePassword) {
      return res
        .status(500)
        .send({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '20d',
      }
    );
    return res.status(200).send({
      success: true,
      message: 'login successfully',
      token,
      existingUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: 'Error in Login Api', error });
  }
};

// GET CURRENT USER CONTROLLER
export const getCurrentUserController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: 'user fetch successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'unable to get current user',
      error,
    });
  }
};
