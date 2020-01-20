const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('../../../config/db.config');
const User = db.user;
const UserToken = db.usertoken;


exports.login = (req, res) => {
   
if(req.body.email){
    User.findOne({ where:{ email: req.body.email}}).then(user=>{
        console.log(req.body.password,user.password);
        if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with email " + req.body.email });
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "Authentication failed" });
        var token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, id: user.id, token: token, role: user.role, data: { name: user.name,  email: user.email }, message: "Authentication passed" });
       
    })
}
if(req.body.phoneno){
    User.findOne({ where:{phoneno: req.body.phoneno}}).then(user=>{
        console.log(req.body.phoneno);
        if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with Phone number " + req.body.phoneno });
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "Authentication failed" });
        var token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, id: user.id, token: token, data: { name: user.name, email: user.email}, message: "Authentication passed" });
    })
}
}