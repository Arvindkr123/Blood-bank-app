import express from 'express';
import {
  registerController,
  loginController,
  getCurrentUserController,
} from '../controllers/authController.js';
import { webTokenHandler } from '../middleware/authMiddleware.js';
const authRouter = express.Router();

// register method POST
authRouter.post('/register', registerController);

// Login method POST
authRouter.post('/login', loginController);

// GET THE CURRENT USER || GET
authRouter.get('/current-user', webTokenHandler, getCurrentUserController);

export default authRouter;
