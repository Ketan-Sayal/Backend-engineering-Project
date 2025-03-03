const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).send({
        error: 'Something went wrong!',
        message: err.message || 'Internal Server Error' // Include error message if available
    });
}
module.exports = errorHandler;