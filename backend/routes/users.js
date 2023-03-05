const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//update user
router.put('/:id', async(req,res)=>{
    if(req.body.userID === req.params.id || req.body.isadmin)
    {
        if(req.body.password)//update password=> user must have valid email address
        {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password,salt)
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("account has been updated")
        }catch (err)
        {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account")
    }
})

//delete user
router.delete('/:id', async(req,res)=>{
    if(req.body.userID === req.params.id || req.body.isadmin)
    {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("account has been deleted")
        }catch (err)
        {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can delete only your account")
    }
});

//get a user
router.get("/", async(req, res) => {
    const userId=req.query.userID
    const username=req.query.username
    try{
        const user= userId 
        ? await User.findById(userId)
        : await User.findOne({username:username})
        const {password,updatedAt, ... other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
});

//follow a user
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userID !==req.params.id)//check users are same
    {
        try{
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req.body.userID)//user trying to make request
            if(!user.followers.includes(req.body.userID))
            {
                await user.updateOne({$push:{followers:req.body.userID}})
                await currentuser.updateOne({$push:{following:req.params.id}})
                res.status(200).json("user has been followed")
            }
            else{
                res.status(403).json("you already follow this user")
            }
        }catch(err)
        {
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you cannot follow yourself")
    }
});

//unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userID !==req.params.id)//check users are same
    {
        try{
            const user = await User.findById(req.params.id)
            const currentuser = await User.findById(req.body.userID)//user trying to make request
            if(user.followers.includes(req.body.userID))
            {
                await user.updateOne({$pull:{followers:req.body.userID}})
                await currentuser.updateOne({$pull:{following:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }
            else{
                res.status(403).json("you donot follow this user")
            }
        }catch(err)
        {
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you cannot unfollow yourself")
    }
})

module.exports = router