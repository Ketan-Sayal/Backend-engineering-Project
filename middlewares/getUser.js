const jwt = require('jsonwebtoken');
const Owner = require('../models/owner.model');

module.exports.getUserData = (req, res, next)=>{
    try {
        const token = req.cookies.userData;
        if(!token){
            res.redirect('/login');
        }
        const data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        if(!data) res.redirect('/login');
        req.user = data;
    } catch (error) {
        throw new Error(error);
    } 
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    try {
        const token = req.cookies.userData;
        if(!token){
            return res.redirect('/login');
        }
        const data = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        if(!data) return res.redirect('/login');
        const owner = await Owner.findOne({username:data?.username});
        if(!owner) return res.redirect('/home');

    } catch (error) {
        throw new Error(error);
    } 
    next();
}