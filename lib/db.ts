import mongoose from 'mongoose'

export const connectDB = async()=>{
        try{
                await mongoose.connect(process.env.MONGODB as string);
                console.log("Connected")
        }catch(e){
            console.log("ERRro connected to mongodb",e)
        }
}

