const Video = require('../models/video.model');
const Course = require('../models/course.model');
const { uploadVideo } = require('../utils/cloudinary');
const { asyncHandler } = require('../utils/asyncHandler');
const fs = require('fs');
const path = require('path');

const createVideo = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { name, title, description } = req.body;
  
  // Validate required fields
  if (!name || !title || !description) {
    req.flash("video-error", "All fields are required");
    return res.redirect(`/courses/${courseId}/add-videos`);
  }
  
  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    req.flash("video-error", "Course not found");
    return res.redirect(`/courses/${courseId}/add-videos`);
  }
  
  // Check if user is the course owner
  if (course.owner.toString() !== req.user._id.toString()) {
    req.flash("video-error", "You are not authorized to add videos to this course");
    return res.redirect(`/courses/${courseId}/add-videos`);
  }
  
  // Check if video file was uploaded
  if (!req.file) {
    req.flash("video-error", "Video file is required");
    return res.redirect(`/courses/${courseId}/add-videos`);
  }
  
  // Upload video file to Cloudinary
  let videoFile = null;
  try {
    const cloudinaryResult = await uploadVideo(req.file.path, { resource_type: 'video' });
    if (!cloudinaryResult) {
      req.flash("video-error", "Failed to upload video");
      return res.redirect(`/courses/${courseId}/add-videos`);
    }
    
    videoFile = cloudinaryResult.url;
    
    // Remove temporary file after successful upload
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  } catch (error) {
    console.error("Error uploading video:", error);
    req.flash("video-error", "Failed to upload video");
    return res.redirect(`/courses/${courseId}/add-videos`);
  }
  
  // Create a new video document
  const newVideo = await Video.create({
    name,
    title,
    description,
    videoFile
  });
  
  // Add the video reference to the course
  course.videos.push(newVideo._id);
  await course.save();
  
  req.flash("success", "Video added successfully");
  return res.redirect(`/courses/${courseId}/videos`);
});

const getVideosByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  
  // Find the course and populate the videos field
  const course = await Course.findById(courseId).populate('videos');
  
  if (!course) {
    req.flash("error", "Course not found");
    return res.redirect('/courses');
  }

  const isOwner = course.owner.toString()===req.user._id.toString();
  
    // Render view for regular requests
    return res.render('courseVideos.ejs', {
      isOwner,
      course,
      courseId,
      videos: course.videos
    });
  
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  
  // Find the video
  const video = await Video.findById(videoId);
  if (!video) {
    req.flash("error", "Video not found");
    return res.redirect('/courses');
  }
  
  // Find which course this video belongs to
  const course = await Course.findOne({ videos: videoId });
  if (!course) {
    req.flash("error", "Associated course not found");
    return res.redirect('/courses');
  }
  
  // Check if user is the course owner
  if (course.owner.toString() !== req.user._id.toString()) {
    req.flash("error", "You are not authorized to delete this video");
    return res.redirect(`/courses/${course._id}`);
  }
  
  // Remove the video ID from the course's videos array
  course.videos = course.videos.filter(v => v.toString() !== videoId);
  await course.save();
  
  // Delete the video
  await Video.findByIdAndDelete(videoId);
  
  req.flash("success", "Video deleted successfully");
  return res.redirect(`/courses`);
});



module.exports = {
  createVideo,
  getVideosByCourse,
  deleteVideo,
};