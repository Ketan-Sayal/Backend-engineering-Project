const express = require('express');
const router = express.Router();
const {getUserData, isOwner} = require('../middlewares/getUser');
const path = require('path'); 
const Course = require('../models/course.model');
const Career = require('../models/career.model');
const User = require('../models/user.model');
const { getVideosByCourse } = require('../controllers/video.controller');
const Owner = require('../models/owner.model');

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
});

router.get("/create-course", getUserData, isOwner,(req, res)=>{
    const error = req.flash("course-error");
    res.status(200).render("createCourse.ejs", {error});
})


router.get('/courses', getUserData, async(req, res)=>{
    const {username} = req?.user;

    const user = await User.findOne({username}).select("-password");

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

    const owners = await Owner.find({username:username});
    const owner = owners[0];
    const isOwner = owner?.username === username;

    res.status(200).render('courses.ejs', {name:username, courses:courses|| [], user, isOwner});
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
});

router.get("/courses/:courseId/update", getUserData,async (req, res)=>{
    req.flash("course-error", "");
    const {courseId} = req.params;
    const course = await Course.findById(courseId);

    if(!course){
        res.flash("course-error", "Coiurse is not found");
        res.status(302).redirect("/courses");
    }

    if(req.user._id.toString()!==course.owner.toString()){
        res.flash("course-error", "User is not the owner");
        res.status(302).redirect("/courses");
    }

    res.status(200).render("updateCourse.ejs", {course} );

});

router.get('/courses/:courseId/add-videos', async (req, res) => {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);

    if(!course){
        res.flash("course-error", "Coiurse is not found");
        res.status(302).redirect("/courses");
    }
    
  res.render('addVideo', { 
    courseId: courseId,
    messages: req.flash() // For displaying flash messages
  });
});

router.get('/courses/:courseId/videos', getUserData,getVideosByCourse);


router.get('/logout', getUserData, (req, res)=>{
    res.clearCookie("userData")
    .redirect('/');
})

module.exports = router;