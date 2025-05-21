import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js';

const app = express()

dotenv.config();
connectDB();

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)

app.use('/api',userRoutes);
app.use('/api/sessions', sessionRoutes);

const port = process.env.PORT;
app.listen(port,()=> console.log(`Server running on port ${port}`));
