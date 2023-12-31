import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URII);
    console.log(
      `connected to mongoose database ${mongoose.connection.host}`.bgGreen
        .yellow
    );
  } catch (error) {
    console.log(`Mongoose connection error: ${error}`.bgRed.white);
  }
};

export default connectDB;
