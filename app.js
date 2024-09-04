const express = require('express')
const mongoose=require('mongoose');
const methodOverride=require('method-override')
const app = express()
const port = 3000
const path=require('path');
const Campground=require('./models/campground');
const { compile } = require('ejs');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({ extended: true }));       //this is for converting the req data sent in meaningful form
app.use(methodOverride('_method'))

const db=mongoose.connection

db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("database connected!!")
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', async(req, res) => {
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
  })

app.get('/campgrounds/new', async(req, res) => {
    res.render('campgrounds/new')
  })

  app.post('/campgrounds', async(req, res) => {
    const campground=new Campground(req.body.campground)
    console.log(req.body)
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`)
  })

app.get('/campgrounds/:id', async(req, res) => {
    const campground= await Campground.findById(req.params.id)
    res.render('campgrounds/show',{campground})
  })

app.get('/campgrounds/:id/edit', async(req, res) => {
    const campground= await Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground})
  })

  app.put('/campgrounds/:id', async(req, res) => {
    res.send('it worked')
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})