const express=require('express');
const admin_route=express();
const bodyParser=require('body-parser')
const adminController=require('../controllers/adminController');
const userController=require('../controllers/userController');
const { parseArgs } = require('util');

admin_route.use(bodyParser.json())
admin_route.use(bodyParser.urlencoded({extended:true}))
admin_route.set('view engine','ejs')
admin_route.set('views','./views')

const multer=require('multer');
const path=require('path')
admin_route.use(express.static('public'))
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images'));

    },
    filename:function(req,file,cb)
    {
        const name=Date.now()+'-'+file.originalname;
        cb(null,name);

    }
});
const upload=multer({storage:storage});

// admin_route.get('/login',adminController.login);
admin_route.get('/blog-setup',adminController.blogSetup)
admin_route.post('/blog-setup', upload.single('blog_image'),adminController.blogSetupSave)
admin_route.get('/dashboard',adminController.dashboard,userController.verifyLogin)
admin_route.get('/create-post',adminController.loadPostDashboard)
admin_route.post('/create-post',adminController.addPost)
admin_route.get('/logout',adminController.logout)
admin_route.post('/upload-post-image',upload.single('image'),adminController.uploadPostImage);
admin_route.post('/delete-post',adminController.deletePost)
module.exports=admin_route;
