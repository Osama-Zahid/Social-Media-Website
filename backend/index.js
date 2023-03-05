const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const path=require("path")
const multer=require("multer")
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");

const fs = require("fs");
dotenv.config({ path: './config.env' });

// MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection connected successfully hurrah'));
//console.log(process.env.MONGO_URL)

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images');
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
})
app.use("/images/assets", express.static(path.join(__dirname, "public/images/assets")));
const upload=multer(storage);
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
    return res.status(200).json("File uploaded.")
  }catch(err)
  {
    console.log(err)
  }
})

// Setting up middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/posts",postRoute);

app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(8080,()=>{
    console.log("Backend server is running!");
});