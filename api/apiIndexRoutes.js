const express = require('express');
const router = express.Router();
const path = require('path'); 

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/welcome.html'))
})

router.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

router.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/home.html'))
})

router.get('/discover', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/discover.html'))
})

router.get('/events', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/events.html'))
})

router.get('/prepare', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/prepare.html'))
})

router.get('/careers', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/careers.html'))
})

router.get('/community', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/community.html'))
})

router.get('/courses', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/courses.html'))
})

router.get('/rankings', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/ranking.html'))
})

router.get('/Resources', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/resources.html'))
})

router.get('/feestructure', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/feestructure.html'))
})

router.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/signUp.html'))
})

module.exports = router;