import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDb = async () => {
    try{
        const connectInstance = await mongoose
        .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n MongoDB Connected !! Db Host: ${connectInstance.connection.host}`)
    }
    catch(err){
        console.log("Mongodb Error",err);
        process.exit(1);
    }
}

export default connectDb;