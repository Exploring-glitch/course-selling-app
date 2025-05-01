const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const { z } = require("zod"); 
const bcrypt = require("bcrypt"); 
const jwt = require ("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");

userRouter.post("/signup", async function(req,res){ //done
    //input validations using zod
    const requiredBody = z.object({ 
        email : z.string().email("Email must be in correct format").max(100).min(5, "Email must contain atleast 5 characters"),
        password : z.string().max(100).min(5, "Password must contain atleast 5 characters"),
        firstName : z.string().max(100).min(3),
        lastName : z.string().max(100).min(2)
    })
    const result = requiredBody.safeParse(req.body); 
    if(!result.success){
        const error = result.error.errors.map(err => err.message); //extracts the error messages only
        return res.status(404).json({
            message: error
        })
    }
    //
    const { email, password, firstName, lastName } = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,5);
        await userModel.create({
            email : email,
            password : hashedPass,
            firstName : firstName,
            lastName : lastName
        })
        return res.json({
            message: "Signed up successfully"
        })
    }
    catch(e){
        return res.status(404).json({
            message: "User already exists"
        })
    }
    
})

userRouter.post("/signin", async function(req,res){ //done
    const { email, password } = req.body;

    const response = await userModel.findOne({
        email : email
    })
    if(!response){
        return res.status(404).json({
            message : "Incorrect credentials"
        })
    }
    const passCompare = await bcrypt.compare(password, response.password);
    if(passCompare){
        const token = jwt.sign({ id : response._id },JWT_USER_SECRET);
        res.header("userToken", token);
        return res.json({
            token : token
        })
    }
    else{
        return res.status(404).json({
            message: "Incorect password"
        })
    } 
})

userRouter.get("/viewpurchases" ,userMiddleware ,async function(req,res){ //done
    const userId = req.Userid;
    const purchases = await purchaseModel.find({
        userId : userId
    })
    const coursedata = await courseModel.find({ //to get the purchased course data
        _id: { $in: purchases.map(x => x.courseId) }
    }) 
    res.json({
        purchases,
        coursedata
    })
})

module.exports ={
    userRouter: userRouter
}