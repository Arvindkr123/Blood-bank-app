import express from 'express';
import {
  registerController,
  loginController,
} from '../controllers/authController.js';
const authRouter = express.Router();

// register method POST
authRouter.post('/register', registerController);

// Login method POST
authRouter.post('/login', loginController);

export default authRouter;
