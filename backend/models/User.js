const mongoose =require('mongoose');
const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:3,
        max:50
    },
    lastName:{
        type:String,
        require:true,
        min:3,
        max:50
    },
    bio:{
        type:String,
        max:50,
    },
    username:{
        type:String,
        require:true,
        min:3, //minimum 3 characters for this name
        max:20,//maximum 20 characters fror this name
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,//5 people
        default:[]
    },
    following:{
        type:Array,//5 people
        default:[]
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    qualification:{
        type:String,
        max:50
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant"],
      required: true,
    },
    },
    {timestamps:true},
    { collation: { locale: "en" } }
);

module.exports = mongoose.model("User",userschema);