const asyncHandler = (fn)=>async(req, res, next)=>{
    try{
        return await fn(req, res, next);
    }catch(err){
        next(err);
    }
}

module.exports = {asyncHandler};