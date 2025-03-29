const express = require("express");
const app = express();
const port = 3000;


const { userRouter } = require("./routes/user");
const { adminRouter} = require("./routes/admin")
const { courseRouter } = require("./routes/course");

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);





