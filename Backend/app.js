import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import userRouter from './routes/user.routes.js';
import RouteBoss from './routes/RideBoss.routes.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
connectDB();
const app=express();



app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/user',userRouter);
app.use('/Rider',RouteBoss);
app.get('/',(req,res)=>{    
        res.send('Hello World');
}
);

export default app;