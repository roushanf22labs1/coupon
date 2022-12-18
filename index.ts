import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import swagerJsDoc from 'swagger-jsdoc';
import swagerUi from 'swagger-ui-express';

// custom imports
import cuponRouter from './src/routes/cupon.route.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

const options: swagerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coupon API Documentation',
            version: '1.0.0',
            description: 'Coupon Api made using express, nodejs, mongoose, mongodb...'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/routes/*.ts']
}
const swaggerSpec = swagerJsDoc(options);
app.use('/api-docs', swagerUi.serve, swagerUi.setup(swaggerSpec));

app.use('/coupon', cuponRouter);

app.listen(PORT, async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB!');
    }catch(e){
        console.log('something went wrong with db');
    }
    console.log(`http://localhost:${PORT}`);
});
