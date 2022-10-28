const express = require('express')
const app = express()
var LocalStrategy   = require('passport-local').Strategy
var mysql = require('mysql')
const crypto = require('crypto')
const flash = require("connect-flash")
app.use(flash())
var connection = mysql.createConnection({
    host     : '192.168.0.18',
    user     : 'master',
    password : 'master'
});

connection.query('USE clinica');

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'usuario', passwordField: 'senha',passReqToCallback: true},(req,usuario, senha, done)=>{
        const hash = crypto.createHash('md5').update(senha).digest('hex')
        connection.query("select * from funcionario where user ='"+usuario+"'",function(err,rows){
            if(err){
                return done(err);
            }if(!rows.length){
                return done(null,false,req.flash('error_msg', 'Usuário não encontrado.'))
            }if(!(rows[0].pass == hash)){
                return done(null,false,req.flash('error_msg', 'Senha incorreta.'));
            }
            return done(null, rows[0])
        })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        connection.query("select * from funcionario where id = "+id,function(err,user){	
            done(err, user);
        });
    });
}