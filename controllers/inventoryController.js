import mongoose from 'mongoose';
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

    if (req.body.inventoryType === 'out') {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      // calculate the blood in quantity
      const totalRequestedInBoodQuantity = await InventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: 'in',
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum: '$quantity' },
          },
        },
      ]);
      // console.log(totalBoodQuantity);
      // calculate total blood out quantity
      const totalOutOfRequestedBloodGroup = await InventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: 'out',
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: 'bloodGroup',
            total: { $sum: '$quantity' },
          },
        },
      ]);
      let totalIn = totalRequestedInBoodQuantity[0]?.total || 0;
      let totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      // in and out blood quantity calculations
      const availableQuantityofBloodGroup = totalIn - totalOut;
      // qauntity validation
      if (availableQuantityofBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityofBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      req.body.hospital = user?._id;
    }

    // if (inventoryType === 'in' && user.role !== 'donar') {
    //   return res.status(500).send({
    //     success: false,
    //     message: 'this is not donar account',
    //     user,
    //   });
    // }
    // if (inventoryType === 'out' && user.role !== 'hospital') {
    //   return res.status(500).send({
    //     success: false,
    //     message: 'this is not hospital account',
    //     user,
    //   });
    // }

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
