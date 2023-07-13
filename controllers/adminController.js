const BlogSetting=require('../models/BlogSettingModel')
const User=require('../models/userSchemaModel')
const Post=require('../models/postModel')
const bcrypt=require('bcrypt')
const { error } = require('console')
const blogSetup=async(req,res)=>{
    var blogSetting=await BlogSetting.find({})
    if(blogSetting.length>0)
    {
        res.redirect('/login')

    }
    else{
        res.render('./blogSetup')
    }
}
const blogSetupSave=async(req,res)=>{
    try{
        const blog_title=req.body.blog_title;
        const blog_image=req.file.filename;
        const description=req.body.description;
        const email=req.body.email;
        const name=req.body.name;
        const password=req.body.password;
        const blogSetting=new BlogSetting({
            blog_title:blog_title,
            blog_logo:blog_image,
            description:description
        });
        await blogSetting.save();
        const user=new User({
            name:name,
            email:email,
            password:password,
            is_admin:1
        });
        const userData=await user.save();
        if(userData)
        {
            res.redirect('/login')
        }
        else{
            res.render('/blogSetup',{message:'Blog not setup properly.'})
            
    
        }

    }
    catch(err)
    {
        console.log(err)
    }
}
const dashboard=async(req,res)=>{
    try{
         const allPosts=await Post.find({})

        res.render('admin/dashboard',{posts:allPosts})


    }
    catch(err)
    {
        console.log(err);
    }
}
const loadPostDashboard=async(req,res)=>{
    try{
        //  const users=await User.find({})
        res.render('admin/postDashboard')

    }
    catch(err)
    {
        console.log(err)
    }

}
const addPost=async(req,res)=>{
    try{
        var image='';
        if(req.body.image!==undefined)
        {
            image=req.body.image;
        }

        const post=new Post({
            title:req.body.title,
            content:req.body.content,
            image:image
            
        })
        const postData= await post.save();
        res.render('admin/postDashboard',{message:"post added successfully"})

    }
    catch(err)
    {
        console.log(err)
    }
}
const uploadPostImage=async(req,res)=>{
    try{
        var imagePath='/images';
        imagePath=imagePath+'/'+req.file.filename;
        res.send({success:true,msg:"Image uploaded successfully",path:imagePath})



    }
    catch(err)
    {
        res.send({success:false,msg:err.message})
    }
}
const logout=async(req,res)=>{
    try{
        res.redirect('/')
    }
    catch(err)
    {
        console.log(err)
    }
}
const deletePost=async(req,res)=>{
    try{
        await Post.deleteOne({_id:req.body.id})
        res.status(400).send({success:true,msg:"Post deleted successfully"})

    }
    catch(err)
    {
        res.status(400).send({success:false,msg:error.message})
    }
}
module.exports={
    blogSetupSave,
    dashboard,
    loadPostDashboard,
    blogSetup,
    uploadPostImage,
    addPost,
    logout,
    deletePost
}