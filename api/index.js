const express=require('express')
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require("./models/User");
const MessageModel=require("./models/Message");
//const translate = require('google-translate-api-x');
const { translate } = require('bing-translate-api');


const cors=require('cors');
const bcrypt = require('bcryptjs');
const cookieParser=require('cookie-parser')
const ws=require('ws');
const fs = require('fs');

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads')); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
app.use(express.static('public'))
app.use(cors({credentials: true, origin:true}));
mongoose.connect(process.env.MONGO_URL);

const jwtSecret=process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

async function getUserData(req){
  return new Promise ((resolve,reject)=>{
    const token=req.cookies?.token;
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    }
    else{
      reject('No Token')
    }
  })
}


app.post('/register', async (req,res) => {
  const { username, password, name, job, imageUrl } = req.body;
  try {
    const hashedPassword=bcrypt.hashSync(password,bcryptSalt);
     const found = await User.findOne({ username });
     if(found)
     {
        res.status(200).json("Duplicate User");
        res.end();
     }
     else
     {
         const createdUser = await User.create({
           username: username,
           password: hashedPassword,
           job: job,
           name: name,
           imageUrl: imageUrl,
         });
         jwt.sign(
           { userId: createdUser._id, username },
           jwtSecret,
           {},
           (err, token) => {
             if (err) throw err;
             res
               .cookie("token", token, { sameSite: "none", secure: true })
               .status(201)
               .json({
                 id: createdUser._id,
                 user: createdUser,
               });
           }
         );
     }
   
  } catch(err) {
    if (err) throw err;
    res.status(500).json('error');
  }
});

app.post('/login', async(req,res)=>{
  const {username,password}=req.body;
  const found=await User.findOne({username});
  console.log(found);
  if(found){
    const check=bcrypt.compareSync(password,found.password);
    if(check)
    {
      jwt.sign({userId:found._id,username},jwtSecret,{},(err,token)=>{
        res.cookie('token',token,{sameSite:'none', secure:true}).status(201).json({
          id:found._id,
          user:found
        });
      });
    }
    if(!check)
    {
      res.send("UnAuthorized");
    }
  }
  if (!found) {
    res.send("Not an User");
  }
})

app.post('/logout',(req,res)=>{
  res.cookie('token','',{sameSite:'none', secure:true}).json('ok');
})

app.get('/profile', (req,res) => {
  const token=req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json('no token');
  }
});

app.listen(process.env.API_PORT, () => {
  console.log(`Server Running on ${process.env.API_PORT}`);
});


module.exports=app;
