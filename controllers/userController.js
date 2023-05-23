const User=require('../models/userSchemaModel')
const bcrypt=require('bcrypt')
const loadLogin=async(req,res)=>{
    try{
        res.render('login')

    }
    catch(err)
    {
        console.log(err.message)
    }
}
const verifyLogin=async(req,res)=>{
    try{
        // const users=await User.find({})
        // res.render('blog',{posts:posts})
        const salt = await bcrypt.genSalt(15);
       const email=req.body.email;
       const password=req.body.password;
       const newHashedPassword = await bcrypt.hash(password, salt)
       const userData=await User.findOne({email:email})
       console.log(userData.password)
       console.log(password)
       if(userData)
       {
         const passwordMatch=await bcrypt.compareSync(userData.password,newHashedPassword);
         console.log(passwordMatch)
         if(passwordMatch)
         {
            req.session.user_id=userData._id;
            req.session.is_admin=userData.is_admin;
            if(userData.is_admin==1)
            {
                // console.log("1")
                res.redirect('/dashboard')
            }
            else
            {
                res.redirect('/profile')
            }

         }
         else
         {
            console.log("user data incorrect")
            res.render('login',{message:"email and password are incorrect"})  
         }

       }
       else
       {
        res.render('login',{message:"email and password are incorrect"})

       }

    }
    catch(err)
    {
        console.log(err.message)
    }
}
const profile=async(req,res)=>{
    try{
        res.render('profile')

    }
    catch(err)
    {
        console.log(err.message)
    }
}
module.exports={
    loadLogin,
    profile,
    verifyLogin
}