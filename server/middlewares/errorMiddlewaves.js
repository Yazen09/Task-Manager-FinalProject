const routeNotFound = (req,res,next) => {
    const error = new Error(`Route not found : ${req.originalUrl}`);
    res.status(404);
    next (error);
};

const errorHandler = (err, req , res , next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;


    if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode = 404
        message = "Ressource not found";
    }

    req.status(statusCode).json({
        message : message,
        stack : process.env == "production" ? null : err.stack,
    });
};



export {routeNotFound , errorHandler};