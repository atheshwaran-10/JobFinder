const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
  username:{type:String,unique:true},
  password:String,
  name:String,
  job:String,
  imageUrl:String

},{timestamps:true});

const UserModel=mongoose.model('User',UserSchema);
module.exports = UserModel;