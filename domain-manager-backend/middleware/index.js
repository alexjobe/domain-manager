// An object to hold all middleware
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.json(req.body);
}

module.exports = middlewareObj;

