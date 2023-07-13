const express=require('express');
const blog_route=express();
const bodyParser=require('body-parser')
const path = require('path')
const blogController=require('../controllers/blogController');
// blog_route.post('/add-comment',blogController.addComment)
blog_route.use(bodyParser.json())
blog_route.use(bodyParser.urlencoded({extended:false}))
blog_route.set('view engine','ejs')
blog_route.set('views','./views')
blog_route.use(express.static(path.join(__dirname, "public")));
blog_route.get('/',blogController.loadBlog)
blog_route.get('/post/:id',blogController.loadPost)
// blog_route.get('/post/:pid/review')
blog_route.post('/post/:pid/review',blogController.addComment)
module.exports=blog_route;