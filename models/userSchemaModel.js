const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   is_admin:{
    type:String,
    required:true
   }
   // token:{
   //  type:String,
   //  required:true
   // }
    
})
const user=new mongoose.model("user",userSchema);
module.exports=user;
