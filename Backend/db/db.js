import mongoose from 'mongoose';

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
    })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Error connecting to the database');
        console.log(error);
    });
}

export default connectToDb;