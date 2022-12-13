import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

// custom imports
import cuponRouter from './src/routes/cupon.route.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cupon', cuponRouter);

app.listen(PORT, async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB!');
    }catch(e){
        console.log('something went wrong with db');
    }
    console.log(`http://localhost:${PORT}`);
});
