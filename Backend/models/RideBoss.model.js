import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const RideBossSchema =   new mongoose.Schema({   
        fullname:{
            firstname:{
                type:String,
                required:true,
                minlength:[3,'First name must be at least 3 characters long'],
    
            },
            lastname:{
                type:String,
                minlength:[3,'First name must be at least 3 characters long'],
    
            }
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            match:[/\S+@\S+\.\S+/,'Please enter a valid email address']
        },
        password:{ 
            type:String,
            required:true,
            minlength:[6,'Password must be at least 6 characters long'],
            select:false
        },
        socketId:{
            type:String,
           
        },
        status:{    
            type:String,
            enum:['active','inactive'],
            default:'inactive',
        },
        vechicle:{
           color:{
                type:String,
                required:true,
                minlength:[3,'Color must be at least 3 characters long'],
           },
           plate:{
                type:String,
                required:true,
                minlength:[3,'Plate must be at least 3 characters long'],
           },
           capacity:{
                type:Number,
                required:true,
                min:[1,'R must be at least 1'],
           },
           vechicleType:{
                type:String,
                required:true,
                enum:['Car','Bike','Auto'],
           }
        },
        location:{  
            lat:{
                type:Number,
                
            },
            lng:{
                type:Number,
                
            },
        },


    });

RideBossSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

RideBossSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

RideBossSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
    
const RideBossModel = mongoose.model('RideBoss',RideBossSchema);

export default RideBossModel;


