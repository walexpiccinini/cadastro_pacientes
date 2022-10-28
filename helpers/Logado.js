module.exports = {
    Logado: function(req,res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("error_msg", "Você precisa fazer login para acessar esta página!")
            res.redirect("/")
        }
    }
}