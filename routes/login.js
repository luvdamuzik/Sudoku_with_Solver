var express = require('express');
var router = express.Router();
var pool = require('./pool');
var passport = require('passport');
const {inicijalizacija,checkAuthenticated} = require("./passport");
inicijalizacija(passport);

router.post('/',passport.authenticate('local',{
    successRedirect : '/login/success',
    failureRedirect: '/login/unsuccess',
    failureFlash: true
}))

router.get('/success',function(req,res,next){
    res.send({
        token:'test123'
    })
})

router.get('/unsuccess',function(req,res,next){
    console.log("NE MOZE")
})



module.exports = router;
