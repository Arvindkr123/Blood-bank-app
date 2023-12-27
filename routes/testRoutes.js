import express from 'express';
import testController from '../controllers/testController.js';

// router object
const testRouter = express.Router();

testRouter.get('/test', testController);

export default testRouter;
