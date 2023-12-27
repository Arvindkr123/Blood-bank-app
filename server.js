import express from 'express';
import testRouter from './routes/testRoutes.js';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();
// connection to mongoose database
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// test routes
app.use('/api/v1', testRouter);
app.use('/api/v1/auth', authRouter);

// port
const PORT = process.env.PORT || 8080;

//listen port
app.listen(PORT, () => {
  console.log(
    `Node server runing in ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue
      .white
  );
});
