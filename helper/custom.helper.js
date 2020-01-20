var db = require('../config/db.config');
const User = db.registration;

function verifyEmailPhone(req, res, next) {
    var email = req.body.email;
    var phoneno = req.body.phoneno;

    if(email || phoneno){
        if (!email || !phoneno)
            return res.json({ auth: false, message: 'Please Email or phone Can not empty' });
              User.findOne({ where: { email: req.body.email} && {phoneno: req.body.phoneno} }).then(data => {
              if (data) {
                return res.json({
                    message: "User already exists",
                    auth:false
                });
            } else {
                next();
            }
        }).then(err=>{
            return res.json({
                message: "error "+err,
                auth:false
            });
        })
    }
   
// if(email){
//     if (!email)
//         return res.status(403).send({ auth: false, message: 'Please Email Can not empty' });
//           User.findOne({ where: { email: req.body.email } }).then(data => {
//           if (data) {
//             return res.status(200).send({
//                 message: "User already exists with email " + req.body.email,
//                 auth:false
//             });
//         } else {
//             console.log('raj------------->')
//             next();
//         }
//     })
// }

//     if(phoneno){
//         if (!phoneno)
//         return res.status(403).send({ auth: false, message: 'Please Phone number Can not empty' });
//         User.findOne({ where: { phoneno: req.body.phoneno } }).then(data => {
//             if (data) {
//                 return res.status(200).send({
//                     message: "User already exists with Phone Number " + req.body.phoneno,
//                     auth:false
//                 });
//             } else {
//                 next();
//             }
//         })
//     }

}
module.exports = verifyEmailPhone;