/* const validate=(req,res,next)=>{
    const error={};
    if(!req.body.title){
       return res.send("please enter title")
    }
    next();
} */

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false
    });
    if(error) {
      return res.send(error.details)
    }
    next();
}

module.exports=validate;