process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
let server = require('../server');
const supertest = require('supertest');
const should = chai.should();
const sinon = require("sinon");
const {signupHelpers} = require('../app/middlewares');
chai.use(chaiHttp);
const agent=supertest.agent(server);

const db = require('../app/models');
const Availability = db.availbilty;
const Notification = db.notification;
const Shift = db.shift;
const Staff = db.staff;
const Manager = db.manager;


function clearDB() {
    var promises = [
        Staff.remove().exec(),
        Manager.remove().exec(),
        Shift.remove().exec(),
        Availability.remove().exec(),
        Notification.remove().exec()
    ];

    Promise.all(promises)
        .then(function () {
            console.log("Im hit")
        })
}

clearDB();

// Sprint 1 tests

// //Test: manager signup
describe('Test: manager signup',()=>{
   
    it("It should insert a manager with entered details into database",(done)=>{
        const manager = {
            fullname:"Manager1",
            email:"manager1@domain.com",
            phone:"02348897654",
            address:"Baker Street, London",
            password:"12345"
        }
        agent.post('/api/manager/signup')
        .send(manager)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();     
        })
    })

   

 
})

// Test: staff signup
describe('Test: staff signup',()=>{
  
    it("Manager should login first with status 200",(done)=>{
            const manager = {
                email:"manager1@domain.com",
                password:"12345"
            }
            agent.post('/api/manager/signin')
            .send(manager)
            .end((err,response)=>{
                if(err){
                    console.log(err);
                }
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();     
            })
        })
    it("It should insert a staff with entered details into database",(done)=>{
        const staff = {
        fullname:"staff1",
        email:"staff1@domain.com",
        phone:"203328080",
        address:"This is testing staff address",
        password:"12345",
        hours_limit:20,
        }
        agent.post('/api/staff/signup')
        .send(staff)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();     
        })
    })
   
})

// Test: staff signin with incorrect infromation

describe('Test: staff login with incorrect details',()=>{
    it("It should return status 404 with message",(done)=>{
        const staff = {
            email:"staff1@domain.com",
            password:"123455" //password is incorrect
        }
        agent.post('/api/staff/signin')
        .send(staff)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(404);
            response.body.should.be.a('object');
            done();     
        })
    })

 
})

// Test: staff signin with correct infromation
describe('Test: staff login with correct details',()=>{

   

    it("It should return status 200 with staff data",(done)=>{
        const staff = {
            email:"staff1@domain.com",
            password:"12345"
        }
        agent.post('/api/staff/signin')
        .send(staff)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();     
        })
    })

  
})
// Test: manager signin with correct infromation
describe('Test: manager login with correct details',()=>{
    it("It should return status 200 with user data",(done)=>{
        const manager = {
            email:"manager1@domain.com",
            password:"12345"
        }
        agent.post('/api/manager/signin')
        .send(manager)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();     
        })
    })
})
//Test: manager signin with incorrect infromation
describe('Test: manager login with incorrect details',()=>{
    it("It should return status 404 with message",(done)=>{
        const manager = {
            email:"manager1@domain.com",
            password:"123455"
        }
        
        agent.post('/api/manager/signin')
        .send(manager)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(404);
            response.body.should.be.a('object');
            done();     
        })
    })

 
})

// Test: adding new shifts to system
describe('Test: Add new shifts to system',()=>{
  
    it("Manager should login first with status 200",(done)=>{
            const manager = {
                email:"manager1@domain.com",
                password:"12345",

            }
            agent.post('/api/manager/signin')
            .send(manager)
            .end((err,response)=>{
                if(err){
                    console.log(err);
                }
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();     
            })
        })
    it("It should insert a new shift into database",(done)=>{
        const shift = {
            start_time:"9:00",
            end_time:"11:00",
            assigned_date:"23/12/2021"
        }
        agent.post('/api/manager/create-shift')
        .send(shift)
        .end((err,response)=>{
            if(err){
                console.log(err);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();     
        })
    })
   
})
// Test: add availability
describe('Test: add staff availibility',()=>{
  
    it("Staff should login first with status 200",(done)=>{
            const staff = {
                email:"staff1@domain.com",
                password:"12345"
            }
            agent.post('/api/staff/signin')
            .send(staff)
            .end((err,response)=>{
                if(err){
                    console.log(err);
                }
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();     
            })
        })
        it("It should add new available slot for staff",(done)=>{
                const slot = {
                    start_time:"9:00",
                    end_time:"11:00",
                    created_at:"23/5/2021"
                }
                agent.post('/api/staff/create-available-slot')
                .send(slot)
                .end((err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();     
                })
            })
        
   

})


// Test: Update staff profile
describe('Test: update staff information',()=>{
  
    it("Staff should login first with status 200",(done)=>{
            const staff = {
                email:"staff1@domain.com",
                password:"12345"
            }
            agent.post('/api/staff/signin')
            .send(staff)
            .end((err,response)=>{
                if(err){
                    console.log(err);
                }
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();     
            })
        })
        it("It should update staff data",(done)=>{
                const staff = {
                    fullname:"NewTestingstaff",
                    phone:"2132444",
                    address:"This is updated address"
                }
                agent.post('/api/staff/update-profile')
                .send(staff)
                .end((err,response)=>{
                    if(err){
                        console.log(err);
                    }
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    done();     
                })
            })
        
   

})


