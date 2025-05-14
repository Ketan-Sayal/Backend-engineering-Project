const Owner = require("../models/owner.model");
const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

module.exports.loginUser = asyncHandler(async(req, res)=>{
    // check if that user already exists by username or email
    // do jwt sign also
    // Send a flash of error message and redirect the user to the register page
    const {username, password} = req.body;

    if([username, password].some(val=>val==="")){
        req.flash("error-login", "All feilds are required");
        return res.status(302).redirect("/register");
    }

    const user = await User.findOne({$or:[{username:username}, {password:password}]});

    if(!user){
        req.flash("error-register", "User doesnot exist");
        return res.redirect("/register");
    }
    
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        req.flash("error-login", "User doesnot exist");
        return res.status(302).redirect("/login");
    }

    const userNoPassword = await User.findById(user._id).select("-password");

    
    const token = user.generateAccessToken();
    return res.status(200).cookie("userData", token).redirect("/home");
    
});

module.exports.registerUser = asyncHandler(async(req, res, next)=>{
    // Check that any feild is empty or not?
    // register only user that has unique name or email otherwise send them to login page
    // create the user and login it
    const {username, password, Email} = req.body;
    if([username, password, Email].some(val=>val==="")){
        req.flash("error-register", "All feilds are required");
        return res.status(302).redirect("/register");
    }

    const user = await  User.findOne({$or:[{username:username}, {email:Email}]});
    if(user){
        req.flash("error-register", "User already exists");
        return res.status(302).redirect("/register");
    }
    const owner = await Owner.find();
    if(owner.length<=0){
        await Owner.create({
        username:username,
        email:Email,
        password:password
        });
    }

    const createdUser = await User.create({
        username:username,
        email:Email,
        password:password
    });
    const token = createdUser.generateAccessToken();
    return res.status(302).cookie("userData", token).redirect("/home");

});