const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
JWT_ADMIN_SECRET = "200531262007";


adminRouter.post("/signup", async function(req,res){ //done
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
        await adminModel.create({
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

adminRouter.post("/signin", async function(req,res){ //donei
    const { email, password } = req.body;

    const response = await adminModel.findOne({
        email : email
    })
    if(!response){
        return res.status(404).json({
            message : "Incorrect credentials"
        })
    }

    const passCompare = await bcrypt.compare(password, response.password);
    if(passCompare){
        const token = jwt.sign({ id : response._id },JWT_ADMIN_SECRET);
        res.header("adminToken", token);
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

adminRouter.post("/course", async function(req,res){  //post courses

})

adminRouter.put("/course", async function(req,res){  //update courses

})

adminRouter.get("/course", async function(req,res){  //see the created courses

})
    

module.exports ={
    adminRouter: adminRouter
}