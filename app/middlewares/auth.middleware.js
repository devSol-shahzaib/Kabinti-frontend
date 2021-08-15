const db = require('../models')
const StaffManager = db.manager;
const Staff = db.staff;
checkManagerEmail=(req,res,next)=>{
        StaffManager.findOne({email:req.body.email})
        .exec((err,user)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message:'Email already is in use'});
                return;
            }
            next()
        })
    
}
checkStaffEmail=(req,res,next)=>{
        Staff.findOne({email:req.body.email})
        .exec((err,user)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message:'Email already is in use'});
                return;
            }
            next()
        })
    
}
checkLogin=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        res.status(403).send({message:"Please login to proceed"})
    }
    else{
        next();
    }
    
}
const signupHelpers = {
    checkManagerEmail,
    checkStaffEmail,
    checkLogin   
}
module.exports= signupHelpers;
