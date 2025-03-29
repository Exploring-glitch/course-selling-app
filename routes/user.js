const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");


userRouter.post("/signup", async function(req,res){
    //const email = req.body.email;
    //const password = req.body.password;   
    res.json({
        message: "Signed up"
    })
})

userRouter.post("/signin", async function(req,res){
    res.json({
        message: ""
    })
})

userRouter.get("/purchases" , async function(req,res){ //to see the purchased courses

})

module.exports ={
    userRouter: userRouter
}