const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
   blog_title:{
    type:String,
    required:true
   },
   blog_logo:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   }
    
})
const blog=new mongoose.model("BlogSetting",blogSchema);
module.exports=blog;
