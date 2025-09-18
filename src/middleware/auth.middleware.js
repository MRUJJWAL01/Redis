const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const cacheClient = require("../services/cache.service");

const authMiddlware = async (req, res, next) => {
  try {
    let token = req.cookies.ticket;

    if (!token) {
     return res.status(404).json({
        msg: "token not found, unauthorized",
      });
    }
    let isblacklisted = await cacheClient.get(token);
    if(isblacklisted){
        res.status(401).json({
            msg:"token is blacklisted"
        })
    }
    let decode = jwt.verify(token, process.env.Sec_Key);
    if (!decode) {
     return  res.status(404).json({
        msg: "token not valid ",
      });
    }
    
    let user = await userModel.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({
      msg: `"error in middlware ${error.message}`,
    });
    console.log("error in middleware", error);
  }
};

module.exports = {
  authMiddlware,
};
