import mongoose from "mongoose";

const connectDB = async() =>{
   try{
    const conn= await mongoose.connect(
       
       "mongodb+srv://vikrantmodern:<password>@cluster0.vbffj.mongodb.net/?retryWrites=true&w=majority"
      
    )
    console.log(`mongo connected: ${conn.connection.host} `)
   }
   catch(error){
    
       console.log(`Error: ${error.message}`)
      process.exit(1)
     
   }
    
}

export default connectDB

