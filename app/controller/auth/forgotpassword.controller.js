const bcrypt = require('bcryptjs');
var md5 = require('md5');
const sgMail = require('@sendgrid/mail');
var db = require('../../../config/db.config');
var otpGenerator = require('otp-generator')
const User = db.registration;
const Employer = db.employer;
const Candidate = db.candidatemodel;
var nodemailer = require('nodemailer');



exports.forgotpass = (req, res) => {
    // Validate Request
    if (!req.body.email) {
        return res.json({
            message: "User email can not be empty"
        });
    }
    User.findOne({ where: { email: req.body.email}}).then(data => {
        if (data) {
            if(data.isSocialLogin == 3){
                return res.json({
                    success:false,
                    message: "Social login can not update password",
                });
            }
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
                subject: 'OTP for password reset!',
                text: 'You requested for a password reset, kindly use this otp to reset your password ' +otp,
                html: '<!DOCTYPE html><html><head><title>Forget Password Email</title></head><body><div><h3>Dear ' + data.email + ' ,</h3><p>You requested for a password reset, Your OTP is <h2>' + otp + '</h2>'
            };
            transporter.sendMail(msg, function (error, info) {
                if (error) {
                    return res.json({
                        success:false,
                        message: "Something went to wrong! "+error,
                    });
                } else {
                        User.update({
                            otp: otp
                        }, {
                            where: { id: data.id }
                        }).then(data => {
                            return res.json({
                                success:true,
                                message: "Kindly check your email for reset password",
                            });
                        })
                 }
            });
      } else {
        return res.json({
            success:false,
            message: "User not found with ID" + req.body.email
        });
      }
   })
  
  
};

/**
 * macth otp
 */
exports.matchotp = (req, res) => {
    // Validate Request
    otp = req.body.otp;
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user.otp) {
            if (otp == user.otp) {
                res.json({
                    success: true,
                    user_id: user.id,
                    message: "Otp matched"
                });
            } else {
                return res.json({
                    success: false,
                    message: "OTP not match"
                });
            }
        } else {
            return res.json({
                success: false,
                message: "User not found with ID" + req.body.email
            });
        }
    }).catch(err => {
        res.json({
            success: false,
            message: "Something went to wrong!"
        });
    })

};



/**
 * Reset password
 */
exports.resetpass = (req, res) => {
    // Validate Request
    if(!req.body.newpassword){
        return res.json({
            success: false,
            message: "New password can not be empty"
        });
    }
    console.log(req.body.newpassword);
    // if (req.body.newpassword === req.body.confirmpassword) {
        User.findOne({ where: { email: req.body.email } }).then(user => {
            if (user) {
                let userPassHash = '';
                if (req.body.newpassword != '') {
                    userPassHash = md5(req.body.newpassword);
                }
                User.update({
                    password: userPassHash
                }, {
                    where: { email: req.body.email }
                }).then(() => {
                    User.update({
                        otp: null
                    }, {
                        where: { email: req.body.email }
                    }).then(() => {
                        return res.json({
                            success: true,
                            message: "Password reset successfully"
                        });
                    })
                })
            } else {
                return res.json({
                    success: false,
                    message: "User not found with email " + req.body.email
                });
            }
        }).catch(err => {
            res.json({
                success: false,
                message: "Something went to wrong!"
            });
        })
    // }
};