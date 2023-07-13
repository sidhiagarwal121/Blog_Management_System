const Port=6526;
require('./db/conn')
const express=require('express')
const app=express()
const adminRoute=require('./routes/adminRoutes')
const isBlog=require('./middlewares/isBlog')
app.use(isBlog.isBlog)
app.use('/',adminRoute)
const userRoute=require('./routes/userRoutes')
app.use('/',userRoute)
const blogRoute=require('./routes/blogRoute');
const blog_route = require('./routes/blogRoute');
const posts = require('./models/postModel');
app.use('/',blogRoute)

app.listen(Port,function(req,res)
{
    console.log(`server running successfully on port ${Port}`)
})