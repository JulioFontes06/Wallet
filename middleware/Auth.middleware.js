function Auth(req, res, next) {
    if(req.session.authUser){
        next()
    }else{
        res.redirect("/")
    }
}

module.exports = Auth