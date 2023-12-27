import { UserModel } from '../models/userModel.js';
import InventoryModel from './../models/inventoryModel.js';

// add inventory controller
export const addInventoryController = async (req, res) => {
  try {
    // validation
    const { email, inventoryType } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'user not found',
        user,
      });
    }
    if (inventoryType === 'in' && user.role !== 'donar') {
      return res.status(500).send({
        success: false,
        message: 'this is not donar account',
        user,
      });
    }
    if (inventoryType === 'out' && user.role !== 'hospital') {
      return res.status(500).send({
        success: false,
        message: 'this is not hospital account',
        user,
      });
    }

    // save record
    const inventory = new InventoryModel(req.body);
    await inventory.save();
    return res.status(200).send({
      success: true,
      message: 'add inventory successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error adding inventory api',
      error,
    });
  }
};

// get blood records
export const getBloodRecordController = async (req, res) => {
  try {
    const inventory = await InventoryModel.find({
      organization: req.body.userId,
    });
    return res.status(200).send({
      success: true,
      message: 'get all blood records successfully!!!',
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'error getting blood records',
      error,
    });
  }
};
