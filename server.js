import express from 'express';
import testRouter from './routes/testRoutes.js';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// test routes
app.use('/api/v1', testRouter);

// port
const PORT = process.env.PORT || 8080;

//listen port
app.listen(PORT, () => {
  console.log(
    `Node server runing in ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue
      .white
  );
});
