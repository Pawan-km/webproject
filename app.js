const express = require('express')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 80;
const mongoose = require('mongoose');
const app = express()
mongoose.connect('mongodb://localhost/email', {useNewUrlParser: true, useUnifiedTopology: true});


app.use('/static', express.static('static'))
const emailSchema = new mongoose.Schema({
    email : String
});

const email = mongoose.model('email', emailSchema);
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// EndPoints
app.get('/', (req, res) => {
    res.status(200).render('home.pug')
})
app.get('/relax', (req, res) => {
    res.status(200).render('relax.pug')
})
app.get('/eat', (req, res) => {
    res.status(200).render('eat.pug')
})
app.get('/about', (req, res) => {
    res.status(200).render('about.pug')
})
app.get('/travel', (req, res) => {
    res.status(200).render('travel.pug')
})

app.post('/', (req, res) => {
    var myData = new email(req.body)
    myData.save().then(() => {
        res.render("home.pug")
    }).catch(() =>{
        res.status(400).send("Email not submitted")
    })
})

app.listen(port, () =>{
    console.log(`Listening on the port ${port}`)
})