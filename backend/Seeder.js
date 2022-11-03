import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js"
import products from "./data/products.js";

import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"


import connectDB from "./config/db.js"

dotenv.config();

connectDB()

const importData  = async() =>{
try{
await Order.deleteMany();
await Product.deleteMany();
await User.deleteMany();

const createUsers = await User.insertMany(users)

const adminUser= createUsers[0]._id

const sampleProducts= products.map((p)=>{
    return {...p, user: adminUser}
})

await Product.insertMany(sampleProducts)

console.log("Data Imported")

}
catch(error){
console.log(error.message)
}

}




const destroyData  = async() =>{
    try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    
    
    console.log("Data destroyed")
    
    }
    catch(error){
    console.log(error.message)
    }
    
    }


if(process.argv[2]=== "-d"){

    destroyData()
}

else{
    importData()
}

