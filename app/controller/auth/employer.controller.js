const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var fs = require('fs');
const Employer = db.employer;
const Registration = db.registration;
const Candidate = db.candidatemodel;
const jwt = require('jsonwebtoken');
var md5 = require('md5');
let profile_pic_name;
let isSocialLogin;
// Create and Save a new User
exports.create = (req, res) => {
    if(!req.body.isSocialLogin){
        return res.json({
            status: 400,
            auth: false,
            message: "isSocialLogin can not be empty",
        });
    }
    if (req.body.isSocialLogin == 1) {
        if (!req.body.email) {
            return res.json({
                status: 400,
                auth: false,
                message: "User email can not be empty.",
            });
        }
    }
    if (req.body.isSocialLogin == 0) {
        if (!req.body.email || !req.body.password) {
            return res.json({
                status: 400,
                auth: false,
                message: "User email or password can not be empty.",
            });
        }
    }

    let userPassHash = '';

    if (req.body.isSocialLogin == 1) {
        userPassHash = null;
        isSocialLogin = req.body.isSocialLogin;
    }
    if (req.body.isSocialLogin == 0) {
        if (req.body.password != '') {
            userPassHash = md5(req.body.password);
        }
        isSocialLogin = req.body.isSocialLogin;
    }
    let fname = req.body.fname;
    let lname = req.body.lname;
    let fullname = fname + " " + lname;
    // for employer
    if (req.body.role_type == 1) {
        if (req.file) {
            profile_pic_name = req.file.path ? req.file.path : '';
        }


        const newRegistration = new Registration({
            email: req.body.email,
            fullName: fullname,
            phoneno: req.body.phoneno,
            password: userPassHash,
            role_type: req.body.role_type,
            isSocialLogin: isSocialLogin
        });

        // Save User in the database
        newRegistration.save()
            .then(data => {
                const newEmployerRegistration = new Employer({
                    user_id: data.id,
                    email: req.body.email,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    phoneno: req.body.phoneno,
                    profile_pic: profile_pic_name,
                    role_type: req.body.role_type,
                    enable_location: req.body.enable_location,
                    profile_visibility: req.body.profile_visibility,
                    status: 1
                });
                newEmployerRegistration.save().then(data1 => {
                    var token = jwt.sign({ id: data1.user_id }, process.env.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.json({
                        status: 200,
                        message: 'Register Successfully',
                        auth: true,
                        user_id: data1.user_id,
                        token: token
                    });
                    //  return res.status(200).send({message:'Register Successfully',status:true});
                }).catch(err => {
                    return res.json({
                        status: 500,
                        auth: false,
                        message: err.message || "Some error occurred while creating a User.",
                    });
                })

            });
    }

    // for candidate
    if (req.body.role_type == 2) {
        const newRegistration = new Registration({
            email: req.body.email,
            fullName: fullname,
            phoneno: req.body.phoneno,
            password: userPassHash,
            role_type: req.body.role_type,
            isSocialLogin: isSocialLogin
        });

        // Save User in the database
        newRegistration.save()
            .then(data => {
                const newCandidateRegistration = new Candidate({
                    user_id: data.id,
                    email: req.body.email,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    phoneno: req.body.phoneno,
                    role_type: req.body.role_type,
                    enable_location: req.body.enable_location,
                    profile_visibility: req.body.profile_visibility,
                });
                newCandidateRegistration.save().then(data1 => {
                    var token = jwt.sign({ id: data1.user_id }, process.env.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    return res.json({
                        success: true,
                        message: 'Register Successfully',
                        user_id: data1.user_id,
                        token: token
                    });
                    //  return res.status(200).send({message:'Register Successfully',status:true});
                }).catch(err => {
                    return res.json({
                        status: 500,
                        success: false,
                        message: err.message || "Some error occurred while creating a User.",
                    });
                })

            });
    }



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
            if (user.isSocialLogin == 1) {
                var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
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
            if (user.isSocialLogin == 0) {
                if (!req.body.password) {
                    return res.json({ auth: false, token: null, message: "Authentication failed, Password can not be empty" });
                }
                if (md5(req.body.password) != user.password) {
                    return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                } else {
                    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
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
            }
        })
    }

    if (req.body.phoneno) {
        Registration.findOne({ where: { phoneno: req.body.phoneno } }).then(user => {
            if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with Phone number " + req.body.phoneno });
            if (user.isSocialLogin == 1) {
                var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
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
            if (user.isSocialLogin == 0) {
                if (!req.body.password) {
                    return res.json({ auth: false, token: null, message: "Authentication failed, Password can not be empty" });
                }
                if (md5(req.body.password) != user.password) {
                    return res.json({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
                } else {
                    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    // var token = jwt.sign({ exp: user.id, data: user.fname }, 'secret');
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
            }
        })
    }
}


exports.update = (req, res) => {
    userdata = req.body;
    if (!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    let userPassHash = '';
    if (req.body.password != '' && req.body.password != undefined) {
        userPassHash = bcrypt.hashSync(req.body.password, 10);
    }
    // Find user and update it with the request body    
    User.update({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: userPassHash,
        role: req.body.role,
        industry: req.body.industry,
        category: req.body.category,
        phoneno: req.body.phoneno,

        status: req.body.status,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        languages: req.body.languages,
        marital_status: req.body.marital_status,
        height: req.body.height,
        weight: req.body.weight,
        differently_abled: req.body.differently_abled,
        differently_abled_details: req.body.differently_abled_detailsm,
        info: req.body.info,
        special_talents: req.body.special_talents,
    }, {
        where: { id: req.params.userId }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })

};

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
