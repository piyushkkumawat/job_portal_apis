const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var otpGenerator = require('otp-generator')
const User = db.registration;
const VerifyEmail = db.verifyemail;
var nodemailer = require('nodemailer');


exports.emailverify = (req, res) => {
    // Validate Request
    if (!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    VerifyEmail.findOne({ where: { email: req.body.email}}).then(data => {
        if (data) {
            console.log("data")
            otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                service: 'gmail',
                 auth: {
                    user: 'ccambio620@gmail.com',
                    pass: 'Cambio@620'
                }
            });
            const msg = {
                to: data.email,
                from: 'ccambio620@gmail.com',
                subject: 'OTP for verify email!',
                html: '<!DOCTYPE html><html><head><title>For Verify Email</title></head><body><div><h3>Dear ' + data.email + ' ,</h3><p>You requested for a verify email, Your OTP is <h2>' + otp + '</h2>'
            };
            transporter.sendMail(msg, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    VerifyEmail.update({
                        otp: otp
                    }, {
                        where: { id: data.id }
                    }).then(data => {
                        return res.json({
                            status:200,
                            message: "Kindly check your email for verify email",
                        });
                    })
                }
            });
      } else {
        const verifyemail = new VerifyEmail({
            email: req.body.email
         })
         console.log("asdasdasdsdasd");
         verifyemail.save().then(data =>{
              otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
              var transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  service: 'gmail',
                  auth: {
                      user: 'ccambio620@gmail.com',
                      pass: 'Cambio@620'
                  }
              });
              const msg = {
                  to: data.email,
                  from: 'ccambio620@gmail.com',
                  subject: 'OTP for verify email!',
                  html: '<!DOCTYPE html><html><head><title>For Verify Email</title></head><body><div><h3>Dear ' + data.email + ' ,</h3><p>You requested for a verify email, Your OTP is <h2>' + otp + '</h2>'
              };
              transporter.sendMail(msg, function (error, info) {
                  if (error) {
                      return res.json({
                          status: 200,
                          auth:false,
                          message: "Something went to wrong! "+err,
                      });
                  } else {
                      VerifyEmail.update({
                          otp: otp
                      }, {
                          where: { id: data.id }
                      }).then(data => {
                          return res.json({
                              status: 200,
                              auth:true,
                              message: "Kindly check your email for verify email",
                          });
                      })
                  }
              });
         })
      }
 })
  
};

// /**
//  * macth otp
//  */
exports.matchotp = (req, res) => {
    otp = req.body.otp;
    VerifyEmail.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
            if (otp == user.otp) {
                VerifyEmail.update({
                    otp: null
                },{
                    where:{email: req.body.email}
                }).then(() =>{
                    return res.json({
                        status:200,
                        auth: "true"
                    });
                })
            } else {
                return res.json({
                    status: 1,
                    message: "OTP not match"
                });
            }
        } else {
            return res.json({
                status: 1,
                message: "User not found with ID" + req.body.email
            });
        }
    }).catch(err => {
        res.send(err);
    })

};
