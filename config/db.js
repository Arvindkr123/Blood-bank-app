import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URII);
    console.log(
      `connected to mongoose database ${mongoose.connection.host}`.bgRed.white
    );
  } catch (error) {
    console.log(`Mongoose connection error: ${error}`.bgRed.white);
  }
};

export default connectDB;
