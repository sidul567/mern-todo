const createError = require('http-errors');

// not found handler
function notFoundHandler(req,res,next){
    next(createError(404,"Your request content was not found!"));
}

// error handler
function errorHandler(err,req,res,next){
    res.status(err.status || 404).json(err.message);
}

module.exports = {
    notFoundHandler,
    errorHandler
}