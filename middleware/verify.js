const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        res.status(500).json({message: "login değilin"});
    }
    jwt.verify(token, "SECRET_KEY", (err, user) =>{
        if(err){
            req.user = user;
            res.status(500).json({message : "token geçersiz"});
            next();
        }
    })
}

const verifyUser = (req, res, next) =>{
    verifyToken(req, res, next, () =>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(500).json({message: "login değilin"});
        }
    })
}

const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, next, () =>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(500).json({message: "login değilin"});
        }
    })
}


module.exports = {verifyAdmin, verifyUser, verifyToken}