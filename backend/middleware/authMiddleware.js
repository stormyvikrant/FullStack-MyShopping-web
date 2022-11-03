import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js"


const protect = expressAsyncHandler( async (req, res, next) =>{


    let token 


    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

try{

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    // console.log(decoded)

    req.user= await User.findById(decoded.id).select("-password")

    // console.log(req.user)


    next()
}
catch(error){
console.log(error)
res.status(401)
throw new Error ("Token failed, bad token ")


}

    }

    if(!token){

        res.status(401)

        throw new Error ("Not authorized, no Token ")
    }

    

}
)


const admin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){ //req.user is checking whether user is loggedin
        next()
    }
    else{
        res.status(401)
        throw new Error("Not authorized as an Admin")
    }
}




export {protect, admin}