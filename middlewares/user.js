const { JWT_USER_SECRET } = require("../config");
const jwt = require("jsonwebtoken");


function userMiddleware(req,res,next){
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(404).json({
                message: "No token provided"
            })
        }
        const decodedData = jwt.verify(token, JWT_USER_SECRET);
        const decodedId = decodedData.id;
        if(decodedId){
            req.Userid = decodedId;
            next();
        }
    }
    catch(e){
        return res.status(404).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    userMiddleware : userMiddleware
}