const responseHandler = require('./responseHandler');

exports.catchErrors = (fn) => {
    return function(req,res,next) {
        return fn(req,res,next).catch(next);
    }
}

exports.notFound = (req,res,next) => {
    return responseHandler.getResponse(404,"",{},res);
}

exports.logErrors = (err,req,res,next) => {
    // TODO : Integrate some error logging service probably new relic or amazon cloudwatch
    console.error(err.stack);
    return responseHandler.getResponse(500,"There is some issue with the request. Please try again later",null,res);
}