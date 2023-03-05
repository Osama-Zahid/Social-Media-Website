const router = require("express").Router()
const { json } = require("express")
const Post= require("../models/post")
const User = require("../models/User")
//create a post
router.post("/", async(req,res)=>
{
    const newPost = new Post (req.body)
    try{
        const savedpost= await newPost.save()
        res.status(200).json(savedpost)
    }catch{
        res.status(500).json(err)
    }
})

//update a post
router.put("/:id",async(req,res)=>{
   try {
    const post = await Post.findById(req.params.id);
    if(post.userID===req.body.userID){
        await post.updateOne({$set:req.body});
        res.status(200).json("post has been updated")
    }else{
        res.status(403).json("You can update only your post")
    }
    }catch(err){
        res.status(500).json(err)
    }
})

//delete a post
router.delete("/:id",async(req,res)=>{
   try {
    const post = await Post.findById(req.params.id);
    if(post.userID===req.body.userID){
        await post.deleteOne();
        res.status(200).json("post has been deleted")
    }else{
        res.status(403).json("You can delete only your post")
    }
    }catch(err){
        res.status(500).json(err)
    }
})

//  like/dislike a post
router.put("/:id/like",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userID))
        {
            await post.updateOne({$push:{likes:req.body.userID}});
            res.status(200).json("post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userID}})
            res.status(200).json("post has been disliked")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// get a post
router.get('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post) 
    }catch(err)
    {
        res.status(500).json(err)
    }
})

// get timeline post
router.get("/timeline/:userID",async(req,res)=>
{
    try{
        const currentuser=await User.findById(req.params.userID);
        const userPost= await Post.find({userID:currentuser._id});
        const friendpost=await Promise.all(
            currentuser.following.map((friendId)=>{
                return Post.find({userID:friendId})
            })
        )
        res.status(200).json(userPost.concat(...friendpost))
    }catch(err)
    {
        res.status(500).json(err)
    }
})

// get user's all post
router.get("/profile/:username",async(req,res)=>
{
    try{
        const user= await User.findOne({username:req.params.username})
        const posts = await Post.find({userID:user._id});
        res.status(200).json(posts)
    }catch(err)
    {
        res.status(500).json(err)
    }
})

module.exports=router;