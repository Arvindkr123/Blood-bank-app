import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, 'Inventory type is required'],
      enum: ['in', 'out'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
    },
    quantity: {
      type: Number,
      required: [true, 'blood quantity is required'],
    },
    donarEmail: {
      type: String,
      required: [true, 'donar email is required'],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'organization is required'],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: function () {
        return this.inventoryType === 'out';
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      // required: function () {
      //   return this.inventoryType === 'in';
      // },
    },
  },
  { timestamps: true }
);
const InventoryModel = mongoose.model('Inventory', inventorySchema);
export default InventoryModel;
