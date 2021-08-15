const db = require('../models')
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken');
const { request } = require('express');
const { shift } = require('../models');
const StaffManager = db.manager;
const Shift = db.shift;
const availableSlots = db.availbilty;
const Staff = db.staff;
const Notification = db.notification;
const bcrypt = require('bcrypt');
const {validNewHours} = require("../../utils/helpers")



deleteShift=(req,res)=>{
    shift.findByIdAndDelete({_id:req.body.shiftId}).exec((err,result)=>{
        if(err){
            res.status(500).send({message:err})
        }
        res.status(200).send({message:"Shift deleted successfully"});
    })
}


getStaffbyId=(req,res)=>{
    Staff.find({_id:req.params.id},(err,user)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            const userData = user[0];
            const {_id,fullname, hours_limit, hours_worked}=userData
            res.render('update-hours', {_id,fullname,hours_limit,hours_worked, isManager:req.session.isManager})
        }
    })
}


createShift=(req,res,next)=>{
    const user_id = req.session.user_id;
   var date = new Date().toLocaleDateString("en-US");
   var result = new Date(date + " " + req.body.start_time);
    const _shift=new Shift({
        start_time:req.body.start_time,
        end_time:req.body.end_time,
        assigned_date:req.body.assigned_date,
        assigned_by:user_id
    })
    _shift.save((err,shift)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            res.status(200).send({message:"shift has been created successfully"})
        }
    })
}

signUp = (req,res,err)=>{
    const _staffmanager = new StaffManager({
        fullname:req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        password:bcrypt.hashSync(req.body.password,8)
    })
    _staffmanager.save((err,manager)=>{
       if(err){
           res.status(500).send({message:err})
           return
       }
           res.status(200).send({
               message:"manager inserted successfully"
           })
       
    })
}

signIn=(req,res,next)=>{
    StaffManager.findOne({email:req.body.email}).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
           return res.status(404).send({message:"user not found"});
        }
        const passwordIsValid= bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid){
            return res.status(404).send({
                accessToken:null,
                message:"Inavlid password"})
        }
        token = jwt.sign({id:user.id},config.secret,{expiresIn:86400})
        req.session.save(()=>{
            req.session.user_id=user.id;
            req.session.manager_name=user.fullname;
            req.session.isLoggedIn = true;
            req.session.isManager = true;
            res.status(200).send({message:"you are successfully logged in!"})
        })

      

    })
}

const managerCont = { 
    signUp,
    signIn,
    createShift,
    getStaffbyId,
    deleteShift
}
module.exports = managerCont;