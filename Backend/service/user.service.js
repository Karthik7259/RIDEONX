import UserModel from "../models/user.model.js";


export const createUser= async ({
    firstname,
    lastname,
    email,
    password
}) => {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }

    const user=UserModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });
 return user;
}
