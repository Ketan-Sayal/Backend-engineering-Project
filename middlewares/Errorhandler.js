const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({
        error: 'Something went wrong!',
        message: err.message || 'Internal Server Error' // Include error message if available
    });
}
module.exports = errorHandler;