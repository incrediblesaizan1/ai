import mongoose from "mongoose";

export const connectDB = () =>{

  try {
    mongoose.connect(process.env.MONGODB_URI!)
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        process.exit();
    })

  } catch (error) {
    console.log('Something goes wrong while connecting MongoDB !');
    console.log(error);
  }
}