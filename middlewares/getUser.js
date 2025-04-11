module.exports.getUserData = (req, res, next)=>{
    try {
        const data = req.cookies.userData;
        if(!data) res.redirect('/login');
        req.user = data;
    } catch (error) {
        console.log(err);
    } 
    next();
}