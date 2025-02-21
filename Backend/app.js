import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import userRouter from './routes/user.routes.js';
import cors from "cors"
connectDB();
const app=express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));


app.use('/user',userRouter);

app.get('/',(req,res)=>{    
        res.send('Hello World');
}
);

export default app;