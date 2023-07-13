const mongoose=require('mongoose')
const post=require('./BlogSettingModel')
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
   },
   reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Review'
  }]

  
})
const posts=new mongoose.model("Post",postSchema);
module.exports=posts;
