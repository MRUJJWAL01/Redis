const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cacheClient = require("../services/cache.service");

const rgisterUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      res.status(422).json({
        msg: "user already exist",
      });
    }
    let hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const user = await userModel.create({
      name,
      email,
      password: hash,
      mobile,
    });
    const token = jwt.sign({ user: user._id }, process.env.Sec_Key);
    res.cookie("ticket", token);
    res.status(201).json({
      msg: "user registered",
      user: user,
    });
  } catch (error) {
    res.status(401).json({
      message: `error ->>>>>>>>, ${error.message}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) res.status(402).json({ msg: "invalid credential" });
    const isPassValid = bcrypt.compare(password, user.password);
    if (!isPassValid) res.status(402).json({ msg: "invalid credential" });
    const token = await jwt.sign({ id: user._id }, process.env.Sec_Key, {
      expiresIn: "1h",
    });
    res.cookie("ticket", token);
    res.status(201).json({
      msg: "user logged in ",
      user: user,
    });
  } catch (error) {
    res.status(401).json({
      message: `error ->>>>>>>>, ${error.message}`,
    });
  }
};
const logoutUser = async(req,res)=>{
    const token = req.cookies.ticket; 
    try {
        res.clearCookie("ticket");
        await cacheClient.set(token,"blacklisted");
        res.status(200).json({
            msg:"user Logged Out",
        })

    } catch (error) {
        res.status(500).json({
            msg:`error in logout ${error.message}`,
            error:error
        })

        
    }

}

module.exports = {
  rgisterUser,
  loginUser,
  logoutUser
};
