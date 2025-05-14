const Course = require('../models/course.model');
const { uploadFile } = require('../utils/cloudinary');
const { asyncHandler } = require('../utils/asyncHandler');
const User = require('../models/user.model');


const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const owner = req.user._id; // Assuming you have user auth middleware
  if(!title || !description || !category){
    req.flash("course-error", "All Feilds are required");
    return res.redirect("/create-course");
  }
  
  let imageUrl = null;
  if (req.file) {
    const cloudinaryResult = await uploadFile(req.file.path);
    if (!cloudinaryResult) {
      req.flash("course-error", "Failed to upload image");
      return res.redirect("/create-course");
    }
    imageUrl = cloudinaryResult.url;
  } else {
    req.flash("course-error", "All Feilds are required");
    return res.redirect("/create-course");
  }
  
  
  const course = await Course.create({
    title,
    description,
    imageUrl,
    category,
    owner
  });
  
  return res.status(302).redirect("/courses");
});



// Update course
const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description, category } = req.body;
  
  const course = await Course.findById(courseId);
  if (!course) {
    req.flash("course-error", "Course is not a valid course");
      return res.redirect("/update-course");
  }
  
  if (course.owner.toString() !== req.user._id.toString()) {
    req.flash("course-error", "User is not the owner");
      return res.redirect("/update-course");
  }
  
  let imageUrl = course.imageUrl;
  if (req.file) {
    const cloudinaryResult = await uploadFile(req.file.path);
    if (cloudinaryResult) {
      imageUrl = cloudinaryResult.url;
    }
  }
  
  
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      title: title || course.title,
      description: description || course.description,
      imageUrl,
      category: category || course.category
    },
    { new: true }
  );
  if(!updatedCourse){
    req.flash("course-error", "Something went wrong");
      return res.redirect("/courses");
  }
  
  return res.status(302).redirect("/courses");
});


const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  
  
  const course = await Course.findById(courseId);
  if (!course) {
    req.flash("course-error", "Course is not a valid course");
      return res.redirect("/courses");
  }
  
  if (course.owner.toString() !== req.user._id.toString()) {
    req.flash("course-error", "User is not the owner");
      return res.redirect("/courses");
  }
  
  
  await Course.findByIdAndDelete(courseId);
  
  return res.status(302).redirect("/courses");
});


const enrollCourse = asyncHandler(async(req, res)=>{
    const userId = req.user._id;
    const {courseId} = req.params;
    const user = await User.findById(userId);
    const course  = await Course.findById(courseId);
    if(!course){
      req.flash("course-error", "Course is not a valid course");
      return res.redirect("/courses");
    }
    if(user.coursesEnrolledIn.includes(courseId)){
      req.flash("course-error", "User is already enrolled in the course");
      return res.redirect("/courses");
    }
    user.coursesEnrolledIn.push(courseId);
    await user.save({validateBeforeSave:false});
    return res.status(200).redirect("/courses");
    
})



module.exports = {
  createCourse,
  deleteCourse,
  updateCourse,
  enrollCourse
};