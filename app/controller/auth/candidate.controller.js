const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var fs = require('fs');
const Candidate = db.candidatemodel;
const jwt = require('jsonwebtoken');


// Create and Save a new User
exports.create = (req, res) => {
    console.log('0-------------<',req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "User email or password can not be empty"
        });
    }
    let userPassHash = '';
    if (req.body.password != '') {
        userPassHash = bcrypt.hashSync(req.body.password, 10);
    }

    const newCandidate = new Candidate({
        name: req.body.name,
        fullName: req.body.fullName,
        email: req.body.email,
        password:userPassHash,
        phoneno: req.body.phoneno,
        status:1
    });

    // Save User in the database
    newCandidate.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a User."
            });
        });

};


exports.login = (req, res) => {
   
if(req.body.email){
    Candidate.findOne({ where:{ email: req.body.email}}).then(user=>{
        if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with email " + req.body.email });
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        console.log('============0',passwordIsValid)
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "Authentication failed" });
        console.log('=--------------->dasd')
        var token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        console.log('=--------------->raka')
        res.status(200).send({ auth: true, id: user.id, token: token, role: user.role, data: { name: user.name,  email: user.email }, message: "Authentication passed" });
       
    })
}
// if(req.body.phoneno){
//     User.findOne({ where:{phoneno: req.body.phoneno}}).then(user=>{
//         if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with Phone number " + req.body.phoneno });
//         var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: "Authentication failed" });
//         var token = jwt.sign({ id: user._id }, process.env.SECRET, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({ auth: true, id: user.id, token: token, data: { name: user.name, email: user.email}, message: "Authentication passed" });
//     })
// }
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