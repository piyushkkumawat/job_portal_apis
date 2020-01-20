const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var fs = require('fs');
const User = db.user;


// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User email or password can not be empty"
        });
    }
    // let profile_pic_name=req.file.path?req.file.path:'';
    // let userPassHash = '';
    // if (req.body.password != '') {
    //     userPassHash = bcrypt.hashSync(req.body.password, 10);
    // }

    // const newUser = new User({
    //     name: req.body.name,
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: userPassHash,
    //     role: req.body.role,
    //     enable_location: req.body.enable_location,
    //     profile_visibility: req.body.profile_visibility,
    //     location: req.body.location,
    //     industry: req.body.industry,
    //     category: req.body.category,
    //     phoneno: req.body.phoneno,
    //     designation: req.body.designation,
    //     specialization: req.body.specialization,
    //     account_plan: req.body.account_plan,
    //     profile_building_questions: req.body.profile_building_questions,
    //     status: req.body.status,
    //     date_of_birth: req.body.date_of_birth,
    //     gender: req.body.gender,
    //     languages: req.body.languages,
    //     marital_status: req.body.marital_status,
    //     height: req.body.height,
    //     weight: req.body.weight,
    //     differently_abled: req.body.differently_abled,
    //     differently_abled_details: req.body.differently_abled_detailsm,
    //     info: req.body.info,
    //     special_talents: req.body.special_talents,
    //     profile_pic: profile_pic_name
    // });

    // // Save User in the database

    // newUser.save()
    //     .then(data => {
    //         res.send(data);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating a User."
    //         });
    //     });

};

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
        enable_location: req.body.enable_location,
        profile_visibility: req.body.profile_visibility,
        location: req.body.location,
        industry: req.body.industry,
        category: req.body.category,
        phoneno: req.body.phoneno,
        designation: req.body.designation,
        specialization: req.body.specialization,
        account_plan: req.body.account_plan,
        profile_building_questions: req.body.profile_building_questions,
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
    },{
        where:{ id: req.params.userId}
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
      
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findByPk(req.params.userId)
        .then(user => {
            if (!user) {
                console.log("User not found", req.params.userId);
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