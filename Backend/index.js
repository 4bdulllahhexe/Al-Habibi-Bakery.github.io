import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
dotenv.config();


const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes)

const dbURI = process.env.DB_URI;
// const dbURI = "mongodb://localhost:27017"

const connectDB = async () => {
    try{
        await mongoose.connect(dbURI);
        console.log('Mongoose connected....')
    } catch (err) {
        console.error('error connecting to MongoDB:', err.message);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})