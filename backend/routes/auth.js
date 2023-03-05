const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
//register
router.post("/register", async(req,res)=>{
    
    try{
        //generate new password
        const salt= await bcrypt.genSalt(10);
        const hashedpassword =await bcrypt.hash(req.body.password, salt)
        //create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpassword
        });
        //save user and respond
        const user=await newUser.save();
        const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        token: token,
        type: user.type,
      });
    }catch(err)
    {
        res.status(500).json(err)
    }
});

//LOGIN
router.post("/login",async(req,res)=>{
    try{
    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("user not found");

    const valid_password=await bcrypt.compare(req.body.password,user.password)
    !valid_password && res.status(404).json("wrong password")
    // const token = jwt.sign({ _id: User._id }, authKeys.jwtSecretKey);
    res.status(200).json(user)
    } catch(err)
    {
        res.status(500).json(err)
    }
});

module.exports = router;