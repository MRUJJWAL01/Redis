const express = require("express");
const { checheIntance } = require("../services/cache.service");

const router = express.Router();
const authController = require("../controller/auth.controller");
const { authMiddlware } = require("../middleware/auth.middleware");

router.post("/register",authController.rgisterUser);
router.post("/login",authController.loginUser);
router.get("/logout",authController.logoutUser)

router.get("/home",authMiddlware,(req,res)=>{
    res.send("Hello i am home")
})

// router.post("/save",async (req,res)=>{
//     // try {
//     //     let {name, age, email } = req.body;
//     //     console.log(name,age,email);
//     //     try {
//     //         await checheIntance.setEx("user",60,JSON.stringify(req.body));
            
//     //     } catch (error) {
//     //         console.log(error.message);
            
//     //     }

//     //      let savedUser = await checheIntance.get("user");
//     //      console.log(savedUser);
         
//     //     if(!savedUser){
//     //         res.status(400).json({
//     //             message: "Bad Req"
//     //         })
//     //     }
//     //         let parsedUser = JSON.parse(savedUser);
//     //         console.log(parsedUser);
            

//     //         res.status(201).json({
//     //             message : 'User saved in redis',
//     //             user:parsedUser

//     //         })
//     //        console.log(parsedUser);
//     //         console.log("hello");
            
    
//     // } catch (error) {
//     //     res.status(402),express.json({
//     //         message:error.message
//     //     })
//     //     console.log(error);
        
        
//     // }

    
// })

module.exports = router;