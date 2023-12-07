const lokalnaStrategija = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var pool = require('./pool');

function inicijalizacija(passport){
    const autentikacija = (email, password, done) => {
        pool.query(`select * from korisnici where email = $1;`, [email], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.rows.length > 0) {
                const user = result.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    }else {
                        return done(null, false, {message: "Password nije tacan"});
                    }
                })
            } else {
                return done(null, false, {message: "Email nije registrovan."});
            }
        })
    }
    passport.use(new lokalnaStrategija({usernameField: 'email',passwordField:'password'},autentikacija));
    passport.serializeUser((user, done) => done(null,user.id));

    passport.deserializeUser((id, done) => {
        pool.query(`select * from korisnici where id = $1`, [id], (err, result) => {
            if(err) {
                throw err;
            }
            return done(null, result.rows[0]);
        })
    });
}

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


module.exports = {inicijalizacija,checkNotAuthenticated,checkAuthenticated};