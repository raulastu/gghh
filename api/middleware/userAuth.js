exports.userAuthentication = function (req, res, next){
    console.log(req.session);

    if ('loggedInUser' in req.session ){
        next();
    }else{
        res.send(401, {"error":"User not logged in"} );
    }
}
