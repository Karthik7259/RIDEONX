import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import userRouter from './routes/user.routes.js';
import RouteBoss from './routes/RideBoss.routes.js';
import mapsrouter from './routes/maps.routes.js'
import cors from "cors"
import cookieParser from 'cookie-parser';
import rideRoutes from './routes/ride.routes.js'
import Razorpay from 'razorpay'

connectDB();
const app=express();



app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/user',userRouter);
app.use('/Rider',RouteBoss);
app.use('/maps',mapsrouter);
app.use('/rides',rideRoutes);
app.post('/rides')
// payment implmentations
app.post('/orders',async (req,res)=>{    
        const razorpay=new Razorpay({
                key_id:"rzp_test_1jDPjzRImXgBiQ",
                key_secret:"qT1ug8HjdAFHwVNmOsXW2snN"
        })
        const options={
                amount:req.body.amount,
                currency:req.body.currency,
                receipt:"reciept",
                payment_capture:1
        }

   try{
        const response=await razorpay.orders.create(options)


        res.json({
         order_id:response.id,
         currency:response.currency,
         amount:response.amount
        })

   }catch(error){
        res.status(500).send("Internal server error")
   }

}
);

app.get("/payment/:paymentId",async(req,res)=>{
        const {paymentId}=req.params;

        const razorpay=new Razorpay({
                key_id:"rzp_test_1jDPjzRImXgBiQ",
                key_secret:"qT1ug8HjdAFHwVNmOsXW2snN"
        })
        try{
            const payment=await razorpay.payments.fetch(paymentId)
            if(!payment){
                return res.status(500).json("Error at razorpay loading ")
            }


            res.json({
                status:payment.status,
                method:payment.method,
                amount:payment.amount,
                currency:payment.currency
            })
        }catch(err){
           res.status(500).json("failed to fetch deatails")

        }


})


export default app;