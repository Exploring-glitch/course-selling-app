require('dotenv').config()
console.log(process.env.MONGO_URL);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

app.use(express.json());

const { userRouter } = require("./routes/user");
const { adminRouter} = require("./routes/admin")
const { courseRouter } = require("./routes/course");

app.use("/user", userRouter); //for http://.../user/.. start userRouter
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


async function main(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to mongoose");
        app.listen(3000);
    } 
    catch(e){
        console.log("Error connecting to mongoose");
    }
}
main();




