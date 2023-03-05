const mongoose =require('mongoose');
const postschema=new mongoose.Schema(
    {
        userID:{
            type:String,
            require:true
        },
        desc:{
            type:String,
            max:500
        },
        video:{
            type:String,
        },
        images:
        {
            type:String,
        },
        likes:{
            type:Array,
            default:[]
        },
        dislikes:{
            type:Array,
            default:[]
        },
        comments:
        {
            type:String,
            max:500
        },
        share:{
            type:Array,
            default:[]
        }
    },
        {timestamps:true}
);

module.exports = mongoose.model("Post",postschema);