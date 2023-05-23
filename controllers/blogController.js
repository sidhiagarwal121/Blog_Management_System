const Post=require('../models/postModel')
const loadBlog=async(req,res)=>{
    try{
        const posts=await Post.find({})
        res.render('blog',{posts:posts})
    }
    catch(err)
    {
        console.log(err)
    }
}
const loadPost=async(req,res)=>{
    try{
       const post= await Post.findOne({"_id":req.params.id})
       res.render('post',{post:post})

    }
    catch(err){
        console.log(err);

    }
}
const addComment=async(req,res)=>{
    try{

        res.status(200).send({success:true,msg:"Comment added successfully."})
    
    }
    catch(err)
    {
        res.status(200).send({success:false,msg:err.message})
    }
}
module.exports={
    loadBlog,
    loadPost,
    addComment
}