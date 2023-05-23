const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   content:{
    type:String,
    required:true
   },
   image:{
      type:String,
      default:""
   }

  
    
})
const posts=new mongoose.model("Post",postSchema);
module.exports=posts;
