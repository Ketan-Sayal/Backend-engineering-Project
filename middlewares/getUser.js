const jwt = require('jsonwebtoken');

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
        throw new Error(err);
    } 
    next();
}