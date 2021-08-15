const { compareSync } = require('bcrypt');
const { format } = require('path');
const db = require('../models')
const StaffUser = db.staff;
const Shift = db.shift;
const Manager = db.manager;
const Availability = db.availbilty;
const Notification = db.notification;
dashboard=(req,res,next)=>{
    if(req.session.isManager){
        StaffUser.find({}).lean().exec((err,staffDbData)=>{
            if(err){
                res.status(500).send({message:err})
            }
            else{
                Shift.find({assigned_by:req.session.user_id}).lean().exec((err,shiftDbData)=>{
                    if(err){
                        res.status(500).send({message:err});
                    }
                    else{
                        var shifts=shiftDbData.map(shift=>shift);
                        var staffs = staffDbData.map(staff=>staff);
                        res.status(200).render('dashboard',{ shifts , staffs, isManager:req.session.isManager});
                    }
                })
            }
        })
        
      
    }
    else{
        Availability.find({user_id:req.session.user_id})
        .lean()
        .exec((err,slots)=>{
            if(err){
                res.status(500).send({message:err})
            }
            else{
                res.render('dashboard',{slots,isManager:req.session.isManager})
                      
            }
        })
        
        
    }
    
}

const dashCont ={
    dashboard
}
module.exports=dashCont;