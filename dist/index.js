var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB!');
    }
    catch (e) {
        console.log('something went wrong with db');
    }
    console.log(`http://localhost:${PORT}`);
}));
