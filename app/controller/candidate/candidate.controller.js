const bcrypt = require('bcryptjs');
var db = require('../../../config/db.config');
var fs = require('fs');
const Candidate = db.candidatemodel;
const Registration = db.registration;
const jwt = require('jsonwebtoken');
var md5 = require('md5');
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
let profile_pic_name;
let ageFromString;

// Create and Save a new User
exports.create = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.json({
            status: 400,
            auth: false,
            message: err.message || "User email or password can not be empty.",
        });
    }
    let userPassHash = '';
    if (req.body.password != '') {
        userPassHash = md5(req.body.password);
    }
    let fname = req.body.fname;
    let lname = req.body.lname;
    let fullname = fname+" "+lname; 
    const newRegistration = new Registration({
        email: req.body.email,
        fullName: fullname,
        phoneno: req.body.phoneno,
        password: userPassHash,
        role_type: req.body.role_type,
        status: 1
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

};

// update basic info 

exports.createBasicInfo = (req, res) =>{
    let dob;
    let reqData = req.body;
    if(!req.body.user_id){
        res.json({
            success: false,
            message: "User id can not be empty",
        })
    }
    // dob =  req.body.date_of_birth;
    // console.log("dob=>>",dob);
    // let ageFromString = new AgeFromDateString(dob).age;
    // console.log("age===>",ageFromString);
    Registration.findOne({ where: { id: req.body.user_id } }).then(user => {
        if(!user){
            res.json({
                success: false,
                message: "User not found"
            })
        }
        if(user){
            Candidate.findOne({where:{user_id:req.body.user_id}}).then(data =>{
                if(!data){
                    dob =  req.body.date_of_birth;
                    ageFromString = new AgeFromDateString(dob).age;
                    const createbasicinfo =new Candidate({
                        user_id: req.body.user_id,
                        date_of_birth: req.body.date_of_birth,
                        gender: req.body.gender,
                        language_knows: req.body.language_knows,
                        marital_status: req.body.marital_status,
                        height: req.body.height,
                        weight: req.body.weight,
                        differently_abled: req.body.differently_abled,
                        differently_abled_details: req.body.differently_abled_details,
                        age: ageFromString
                    })
                    createbasicinfo.save().then(data =>{
                        res.json({
                                    success: true,
                                    message: "Data insert successfull",
                                })
                    }).then(err =>{
                        res.json({
                            success: false,
                            message: "Something went to wrong "+err,
                        })
                    })
                }
                if(data){
                    if(req.body.date_of_birth){
                        dob =  req.body.date_of_birth;
                        ageFromString = new AgeFromDateString(dob).age;
                    }else{
                        ageFromString = data.age;
                    }

                    Candidate.update({
                        user_id: req.body.user_id,
                        date_of_birth: req.body.date_of_birth,
                        gender: req.body.gender,
                        language_knows: req.body.language_knows,
                        marital_status: req.body.marital_status,
                        height: req.body.height,
                        weight: req.body.weight,
                        differently_abled: req.body.differently_abled,
                        differently_abled_details: req.body.differently_abled_details,
                        age: ageFromString
                    },{
                        where:{user_id:req.body.user_id}
                    }).then(()=>{
                        res.json({
                            success: true,
                            message: "Update Successfully",
                        })
                    }).catch(err=>{
                        res.json({
                            success: false,
                            message: "Something went to wrong! "+err,
                        })
                    })
                }
            })
          
        }
    })
   
}




exports.findProfile = (req, res) => {
    if(!req.body.user_id){
        res.json({
            success:false,
            message:"User Id can not be empty"
        })
    }
    db.registration.findOne({
        attributes: [
            ['id','user_id'],
            ['profile_pic','company_id'],
            'email','fullName','company_name','phoneno','role_type','enable_location','profile_visibility','industry','category'],
        include: [
            {   
                where:{user_id: req.body.user_id},
                model: db.candidate_bio,
                attributes: [['id','candidateBioId'],
                'profile_pic', 'other_img1', 'other_img2', 'candidate_idcard', 'candidate_info', 'special_telent', 'social_responsiblity', 'sports', 'candidate_resume_video', 'candidate_resume']
            },
            {
                model: db.educationworkdetails,
                attributes: [['id','educationDetailsId'],
                'highest_qualification','fresher','name_institution','year_of_passing','name_of_company','designation','total_years_of_experience','from_date','to_date']
           },
           {
            model: db.candidatemodel,
            attributes: [['id','candidateBasicInfoId'],
            'date_of_birth','gender','language_knows','marital_status','height','weight','differently_abled','differently_abled_details','age']
           },
         ],
       }).then(data =>{
        res.json({
            success:true,
            data:data
        })
    }).catch(err =>{
        res.json({
            message: "error " +err
        })
    })
  
};

