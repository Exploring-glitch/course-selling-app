const { JWT_ADMIN_SECRET } = require("../config");
const jwt = require("jsonwebtoken");


function adminMiddleware(req,res,next){
    try{
        const token = req.header["userToken"];
        if(!token){
            return res.status(404).json({
                message: "No token provided"
            })
        }
        const decodedData = jwt.verify(token, JWT_ADMIN_SECRET);
        const decodedId = decodedData.id;
        if(decodedId){
            req.Adminid = decodedId;
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
    adminMiddleware : adminMiddleware
}