import express from 'express';
import {
  addInventoryController,
  getBloodRecordController,
} from '../controllers/inventoryController.js';
import { webTokenHandler } from '../middleware/authMiddleware.js';

const inventoryRouter = express.Router();

//routes
// Add inventory || POST
inventoryRouter.post(
  '/create-inventory',
  webTokenHandler,
  addInventoryController
);

// get all blood records
inventoryRouter.get(
  '/get-inventory',
  webTokenHandler,
  getBloodRecordController
);

export default inventoryRouter;
