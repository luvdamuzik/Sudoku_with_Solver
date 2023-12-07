var express = require('express');
var router = express.Router();
var pool = require('./pool');
var bcrypt = require('bcrypt');
const {checkNotAuthenticated,checkAuthenticated} = require("./passport");

//dodaj admin
const dodajAkount = async (req,res,next) =>{
    const kriptovanPassword = await bcrypt.hash(req.body.password,10);

  const korisnik = {
      ime: req.body.name,
      password: kriptovanPassword,
      email: req.body.email
  }
      pool.query(`insert into korisnici (ime, password, email) values ($1,$2,$3) returning id`
          , [korisnik.ime, korisnik.password, korisnik.email], (err, result) => {
              if (err) {
                  console.log(err);
                  return next();
              }
          })
    next();
}

router.post('/',dodajAkount,function (req,res,next){})

module.exports = router;
