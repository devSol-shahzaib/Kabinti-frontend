const db = require('../app/models');
const Staff = db.staff;
module.exports={
    increment: inc=>{
        return inc+1;
    }
    ,
    validNewHours: (limit,current,previous)=>{
        if(!previous){
            previous = 0 ;
        }
        const total_hours = parseInt(current,10) + parseInt(previous,10);
        if(limit>=total_hours){
            return true;
        }
        else{
            return false;
        }
    }
   
}