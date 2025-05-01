const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user")

courseRouter.get("/viewcourses", async function(req,res){ //done 
    const courses = await(courseModel.find({}));
    return res.json({
        courses
    })
})

courseRouter.post("/purchase", userMiddleware, async function(req,res){ //done
    const userId = req.Userid;
    console.log(userId);
    const courseId = req.body.courseid;
    try{
        await purchaseModel.create({
            courseId : courseId,
            userId : userId
        })
        return res.json({
            message : "You have successfully bought the course"
        })
    }catch(e){
        return res.status(404).json({
            message : "Failed to buy course"
        }) 
    }

})

module.exports = {
    courseRouter: courseRouter
}