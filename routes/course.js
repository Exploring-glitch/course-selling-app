const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db");

courseRouter.get("/preview", async function(req,res){ //to see courses
    res.json({
        message: "preview endpoint"
    })

})

courseRouter.post("/purchase", async function(req,res){ //to purchase courses 

})

module.exports = {
    courseRouter: courseRouter
}