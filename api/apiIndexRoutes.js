const express = require('express');
const router = express.Router();
const {getUserData} = require('../middlewares/getUser');
const path = require('path'); 
const Course = require('../models/course.model');
const Career = require('../models/career.model');

router.get('/', (req, res)=>{
    res.status(200).render('welcome.ejs');
})

router.get('/login', (req, res)=>{
    const error = req.flash("error-login");
    res.status(200).render('login.ejs', {error:error});
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

router.get('/careers', getUserData, async(req, res)=>{
    const {username} = req?.user;
    const careers = await Career.aggregate([{
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"ownerUsername",
            pipeline:[{
                $project:{
                    username:1
                }
            }]
        }
    }, {
        $addFields:{
            owner:{
                $first:"$ownerUsername"
            }
        }
    }]);
    res.status(200).render('careers.ejs', {name:username, careers:careers||[]});
})

router.get('/community', getUserData, (req, res)=>{
    const {username} = req?.user;
    res.status(200).render('community.ejs', {name:username});
})

router.get('/courses', getUserData, async(req, res)=>{
    const {username} = req?.user;

    const courses = await Course.aggregate([{
        $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"ownerUsername",
            pipeline:[{
                $project:{
                    username:1
                }
            }]
        }
    }, {
        $addFields:{
            owner:{
                $first:"$ownerUsername"
            }
        }
    }]);
    res.status(200).render('courses.ejs', {name:username, courses:courses|| []});
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
    const error = req.flash("error-register")
    res.status(200).render('signUp.ejs', {error:error});
})


router.get('/logout', getUserData, (req, res)=>{
    res.clearCookie("userData")
    .redirect('/');
})

module.exports = router;