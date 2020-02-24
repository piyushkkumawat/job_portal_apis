const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var fs = require('fs');
const Registration = db.registration;
const CompanyInfo = db.companyinfo;
const jwt = require('jsonwebtoken');
var md5 = require('md5');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let profile_pic_name;
let isSocialLogin;
let userPassHash;
// Create and Save a new User
exports.create = (req, res) => {
    
    Registration.findOne({
        where: {
            [Op.or]: [{ email: req.body.email },
            { phoneno: req.body.phoneno }]
        }
    }).then(data => {
        if (data) {
            return res.json({
                status: 400,
                success: false,
                auth: false,
                message: "user already exist.",
            });
        }
        if (!data) {
            if (req.body.isSocialLogin == 3) {
                if (!req.body.email) {
                    return res.json({
                        status: 400,
                        success: false,
                        auth: false,
                        message: "User email can not be empty.",
                    });
                }
            }
            if (req.body.isSocialLogin == 0) {
                if (!req.body.email || !req.body.password) {
                    return res.json({
                        status: 400,
                        success: false,
                        auth: false,
                        message: "User email or password can not be empty.",
                    });
                }
                if (req.body.password != '') {
                    userPassHash = md5(req.body.password);
                }
                isSocialLogin = req.body.isSocialLogin;
            }

            if (!req.body.role_type) {
                return res.json({
                    status: 400,
                    success: false,
                    auth: false,
                    message: "role type can not be empty",
                });
            }


            if (req.body.isSocialLogin == 3) {
                userPassHash = null;
                isSocialLogin = req.body.isSocialLogin;
            }

            let fname = req.body.fname;
            let lname = req.body.lname;
            let fullname = fname + " " + lname;

            // if (req.body.role_type == 1) {
            if (req.file) {
                profile_pic_name = req.file.path ? req.file.path : '';
            }

            Registration.create({
                email: req.body.email,
                fullName: fullname,
                company_name: req.body.company_name,
                phoneno: req.body.phoneno,
                password: userPassHash,
                role_type: req.body.role_type,
                isSocialLogin: isSocialLogin,
                fname: req.body.fname,
                lname: req.body.lname,
                profile_pic: profile_pic_name,
                enable_location: req.body.enable_location,
                location :req.body.location,
                lat: req.body.lat,
                lng: req.body.lng,
                city: req.body.city,
                area: req.body.area,
                profile_visibility: req.body.profile_visibility,
            })
                .then(user => {
                    // you can now access the newly created user
                    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.json({
                        auth: true,
                        message: 'Register Successfully',
                        success: true,
                        user_id: user.id,
                        role_type: user.role_type,
                        token: token
                    });
                })
                .catch(function (err) {
                    // print the error details
                    return res.json({
                        status: 500,
                        success: false,
                        auth: false,
                        message: "Error " + err.message,
                    });
                });

        }
    })
};


exports.login = (req, res) => {
    if (!req.body.phoneno && !req.body.email) {
        return res.json({
            message: " Email or phone can not be empty ",
            auth: false
        });
    }
    if (req.body.email) {
        Registration.findOne({ where: { email: req.body.email } }).then(user => {

            if (!user) return res.json({
                status: 401,
                message: "User not found with email " + req.body.email,
                auth: false
            });
            // console.log(user);
            if (user) {
                if (user.status == 1) {
                    return res.json({
                        message: "Your account is deactivated Please connect admin",
                        auth: false
                    });
                }
                CompanyInfo.findOne({ where: { user_id: user.id } }).then(companyinfo => {
                    if (user.isSocialLogin == 3) {
                        if (req.body.password) {
                            if (md5(req.body.password) != user.password) {
                                return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                            }
                        }
                        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
                        if (!companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                        if (companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                company_id: companyinfo.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }

                    }
                    if (user.isSocialLogin == 0 || user.isSocialLogin == null) {
                        // if (!req.body.password) {
                        //     return res.json({ auth: false, token: null, message: "Authentication failed, Password can not be empty" });
                        // }
                        if (req.body.password) {
                            if (md5(req.body.password) != user.password) {
                                return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                            }
                        }
                        // if (md5(req.body.password) != user.password) {
                        //     return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                        // } else {
                        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
                        if (!companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                        if (companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                company_id: companyinfo.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                        // }
                    }
                })
            }
        })
    }

    if (req.body.phoneno) {
        Registration.findOne({ where: { phoneno: req.body.phoneno } }).then(user => {
            if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with Phone number " + req.body.phoneno });
            if (user) {
                if (user.status == 1) {
                    return res.json({
                        message: "Your account is deactivated Please connect admin",
                        auth: false
                    });
                }
                CompanyInfo.findOne({ where: { user_id: user.id } }).then(companyinfo => {
                    if (user.isSocialLogin == 3) {
                        if (req.body.password) {
                            if (md5(req.body.password) != user.password) {
                                return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                            }
                        }
                        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
                        if (!companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                        if (companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                company_id: companyinfo.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                    }

                    if (user.isSocialLogin == 0 || user.isSocialLogin == null) {

                        if (req.body.password) {
                            if (md5(req.body.password) != user.password) {
                                return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                            }
                        }
                        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        if (!companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                        if (companyinfo) {
                            return res.json({
                                status: 200,
                                message: "Authentication passed " + req.body.email,
                                role: user.role_type,
                                auth: true,
                                user_login_id: user.id,
                                company_id: companyinfo.id,
                                token: token,
                                data: { name: user.name, email: user.email }
                            });
                        }
                    }
                });
            }
        })
    }
}


exports.partial_update = (req, res) => {
    let data = req.body;
    if (!req.body.user_id) {
        res.json({
            success: false,
            message: "User Id can not be empty",
        })
    }
    Registration.findOne({ where: { id: req.body.user_id } }).then(user => {
        if (user) {
            Registration.update({
                ...data
            }, {
                where: { id: user.id }
            }).then(data => {
                res.json({
                    success: true,
                    message: "update successfully",
                })
            })
        }
        if (!user) {
            res.json({
                success: false,
                message: "user not found",
            })
        }
    }).catch(err => {
        res.json({
            success: false,
            message: "Something went to wrong! " + err,
        })
    });

}


// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findByPk(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};
