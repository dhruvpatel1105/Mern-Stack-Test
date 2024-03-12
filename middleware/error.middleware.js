const errorMiddleware=(err, req, res, next) =>{
     const status = err.status || 500;
     const message = err.message || "BACKEND ERROR";
     const extraDetails = err.extraDetails || "Error From Backed "

     console.log("errorMiddleware");

     return res.status(status).send({message,extraDetails})
}

module.exports=errorMiddleware;