const {managerCont,staffCont} = require('../controllers');
const {signupHelpers} = require('../middlewares')
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.post("/api/manager/signup",[signupHelpers.checkManagerEmail],[managerCont.signUp]);
    app.post("/api/manager/signin",[managerCont.signIn]);
    }