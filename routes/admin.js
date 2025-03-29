const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");


adminRouter.post("/signup", async function(req,res){
    //const email = req.body.email;
    //const password = req.body.password;   
    res.json({
        message: "Signed up"
    })
})

adminRouter.post("/signin", async function(req,res){
    res.json({
        message: ""
    })
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