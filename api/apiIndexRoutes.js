const express = require('express');
const router = express.Router();
const {getUserData} = require('../middlewares/getUser');
const path = require('path'); 

router.get('/', (req, res)=>{
    res.status(200).render('welcome.ejs');
})

router.get('/login', (req, res)=>{
    res.status(200).render('login.ejs');
})

router.get('/home', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('home.ejs', {name:username});
})

router.get('/discover', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('discover.ejs', {name:username});
})

router.get('/events', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('events.ejs', {name:username}, );
})

router.get('/prepare', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('prepare.ejs', {name:username});
})

router.get('/careers', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('careers.ejs', {name:username});
})

router.get('/community', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('community.ejs', {name:username});
})

router.get('/courses', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('courses.ejs', {name:username});
})

router.get('/rankings', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('ranking.ejs', {name:username});
})

router.get('/Resources', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('resources.ejs', {name:username});
})

router.get('/feestructure', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('feestructure.ejs', {name:username});
})

router.get('/register', (req, res)=>{
    res.status(200).render('signUp.ejs');
})


router.get('/logout', getUserData, (req, res)=>{
    res.clearCookie("userData")
    .redirect('/');
})

module.exports = router;