const Post=require('../models/postModel')
const Review=require('../models/review')
// const Comment=require('../models/commentModel');
const mongoose=require('mongoose')
const { post } = require('../routes/adminRoutes')
const loadBlog=async(req,res)=>{
    try{
        var search=""
        if(req.query.search)
        {
            search=req.query.search
        }

        const posts=await Post.find({
            $or:[
                {title:{$regex:'.*'+search+'.*',$options:'i'}},
                {content:{$regex:'.*'+search+'.*',$options:'i'}}
            ]
        })

        res.render('blog',{posts:posts})
    }
    catch(err)
    {
        console.log(err)
    }
}
const loadPost=async(req,res)=>{
    try{
       const post= await Post.findOne({"_id":req.params.id}).populate('reviews')
       console.log(post)
       res.render('post',{post:post})

    }
    catch(err){
        console.log(err);

    }
}
// var ObjectId = require('mongoose').Types.ObjectId;
const addComment=async(req,res)=>{
    try{
        const {pid}=req.params
        const {name,comment}=req.body
        const post =await Post.findById(pid)
        const review=new Review({name,comment})
        post.reviews.push(review)
        await post.save()
        await review.save()
        res.redirect(`/post/${pid}`);
    //  res.status(200).send({success:true,msg:"Comment added successfully."})
     
    
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