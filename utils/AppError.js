class AppError extends Error{
    constructor(
        statusCode, message="Something went wrong", errors=[], stack=""
     ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this, this.constructor);// Adds the .stack property automatically
        }
    }
}

module.exports = {AppError}