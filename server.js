const express = require('express');
const dbConfig = require('./app/config/db.config')
const db = require('./app/models')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const expSession = require('express-session');
const helpers = require('./utils/helpers');
const hbs = require('express-handlebars');
const { response } = require('express');
const exphbs = hbs.create({helpers});

// db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log(`successfuly connected to ${dbConfig.DB}`)
// }).catch((err)=>{
//     console.log(`Connection error : ${err}`)
//     process.exit()
// })

// cors setup
const corsOption={
    origin:"http://localhost:8080"
}
app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"public")))

// session setup
app.use(expSession({
    name:'EMS-session',
    secret:`my-secret-session`,
    resave:true,
    saveUninitialized:true,
    cookie:{}
}))
//user interface template setting
app.engine("handlebars",exphbs.engine);
app.set("view engine","handlebars");

// routes
app.get('/',(req,res)=>{
    const products=[
        {id:"1",imgUrl:"/images/prod-lotion.png",title:"Night Beauty",breifDesc:"A mosturising night lotion for smooth skin.",price:"23",discPercent:"10"},
        {id:"2",imgUrl:"/images/prod-lipstick.png",title:"Lip finer",breifDesc:"A classic lipstick to party makeups and much more",price:"10",discPercent:"5"},
        {id:"3",imgUrl:"/images/prod-coco.png",title:"Pure Coco Oil",breifDesc:"100% pure coconut oil for many skin benefits",price:"15",discPercent:"3"},
        {id:"4",imgUrl:"/images/prod-lipstick.png",title:"Lip Balm",breifDesc:"A classic lipstick to party makeups and much more",price:"10",discPercent:"5"},
        ]
    res.render('index',{products});
})
app.get('/about',(req,res)=>{
   
    res.render('about');
})
app.get('/products',(req,res)=>{
    const products=[
        {id:"1",imgUrl:"/images/prod-lotion.png",title:"Night Beauty",breifDesc:"A mosturising night lotion for smooth skin.",price:"23",discPercent:"10"},
        {id:"2",imgUrl:"/images/prod-lipstick.png",title:"Lip finer",breifDesc:"A classic lipstick to party makeups and much more",price:"10",discPercent:"5"},
        {id:"3",imgUrl:"/images/prod-coco.png",title:"Pure Coco Oil",breifDesc:"100% pure coconut oil for many skin benefits",price:"15",discPercent:"3"},
        {id:"4",imgUrl:"/images/prod-lipstick.png",title:"Lip Balm",breifDesc:"A classic lipstick to party makeups and much more",price:"10",discPercent:"5"},
        {id:"5",imgUrl:"/images/prod-lotion.png",title:"Night Beauty",breifDesc:"A mosturising night lotion for smooth skin.",price:"23",discPercent:"10"},
        {id:"6",imgUrl:"/images/prod-lipstick.png",title:"Lip finer",breifDesc:"A classic lipstick to party makeups and much more",price:"10",discPercent:"5"}
    ]
    res.render('products',{products})
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
require('./app/routes/manager.route')(app);

// server setup
const PORT= process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

module.exports = app;