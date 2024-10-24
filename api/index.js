import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


const app = express();


dotenv.config();

app.use(express.json());

app.use(cookieParser());

// ************************************** // database \\ *************************

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("DB is connected..."))
    .catch(err => console.log(err))


app.use('/api/user', userRoutes);

app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000... ');
});


