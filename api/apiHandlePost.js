const express  = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { registerUser, loginUser, registerUniversity } = require('../controllers/user.controller');
const {createCourse, updateCourse, deleteCourse, enrollCourse} = require("../controllers/course.controller");
const { getUserData } = require('../middlewares/getUser');
const { upload } = require('../middlewares/multer');
const { createVideo, deleteVideo } = require('../controllers/video.controller');

const JwtVerify = getUserData;

router.post('/login', loginUser);


router.post('/signup/user', registerUser);
router.post('/signup/university', registerUniversity);

router.post('/courses', JwtVerify, upload.single('image'), createCourse);
router.post('/courses/:courseId/update', JwtVerify, upload.single('image'), updateCourse);
router.post('/courses/:courseId/delete', JwtVerify, deleteCourse);
router.post('/courses/:courseId/enroll', JwtVerify, enrollCourse);
router.post('/courses/:courseId/add-videos', JwtVerify, upload.single("videoFile"),createVideo);
router.post('/courses/:videoId/delete-videos', JwtVerify, deleteVideo);

module.exports = router;