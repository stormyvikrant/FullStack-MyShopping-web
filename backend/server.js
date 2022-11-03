import path from "path"

// const express= require('express');
import express from "express";
import cors from "cors";
import morgan from "morgan"
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


connectDB();
// const dotenv= require("dotenv")
import dotenv from "dotenv";
// const products= require('./data/products');

//Note- If using ES Module then add ".js" in backend file only/


// const cors = require('cors');
dotenv.config();

const app = express();

if(process.env.NODE_ENV === 'development'){  //morgan will run only in development mode
  app.use(morgan("dev"))   
}

app.use(express.json());
app.use(cors())




app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);


app.get("/api/config/paypal", (req,res)=> res.send(process.env.PAYPAL_CLIENT_ID) )//Paypal

//make upload folder accessible by making it static
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "/frontend/build")))

//   app.get("*", (req, res)=> res.sendFile(__dirname, "frontend", "build", "index.html"))
// //* - all except api
// }else{

  app.get("/", (req, res) => {
    return res.send("API is running");
  });
// }



app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} MODE at port ${PORT}`
  )
);
