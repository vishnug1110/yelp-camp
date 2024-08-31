const express = require('express')
const mongoose=require('mongoose');
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

const db=mongoose.connection

db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("database connected!")
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/makeCampground', async(req, res) => {
    const camp=new Campground({title:'my backyard',description:'cheap camping'});
    await camp.save()
    res.send(camp)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})