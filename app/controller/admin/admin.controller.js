const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var db = require('../../../config/db.config');
const Admin = db.Admin;
const Company = db.companyinfo;
const Candidate = db.registration;
const jobPost = db.jobPost;
const Complaint = db.Complaint;
const Languages = db.Languages;
const Qualification = db.Qualification;
const Institution = db.Institutions;
const Shifts = db.Shift;
const EmployementType = db.EmployementType;
const Designation = db.Designation;
const FAQ = db.FAQ;
var md5 = require('md5');

const candidatemodel = db.candidatemodel;
const registration = db.registration;
const candidate_bio = db.candidate_bio;
const work = db.work;
const education = db.education;

const companybio = db.companybio;
const companyinfo = db.companyinfo;
const memberinfo = db.memberinfo;
const jobalert = db.jobalert;
const industrytype = db.industrytype;


// candidate
registration.hasMany(db.candidate_bio,{foreignKey: 'user_id'});
registration.hasMany(candidatemodel,{foreignKey: 'user_id'});
registration.hasMany(work,{foreignKey: 'user_id'});
registration.hasMany(education,{foreignKey: 'user_id'});

// employer
registration.hasMany(companyinfo,{foreignKey: 'user_id'});
db.companyinfo.hasMany(db.memberinfo,{foreignKey: 'company_id'});
registration.hasMany(companybio,{foreignKey: 'user_id'});
registration.hasMany(jobalert,{foreignKey: 'user_id'});


exports.login = (req, res) => {
if(req.body.email){
    Admin.findOne({ where:{ email: req.body.email}}).then(user=>{
        if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with email " + req.body.email });
        if(md5(req.body.password) != user.password){
          return res.status(401).send({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
       }else{
       var token = jwt.sign({exp: user.id, data: user.fname }, 'secret');
        res.status(200).send({ auth: true, id: user.id, token: token, role: user.role, data: { name: user.name,  email: user.email }, message: "Authentication passed" });
       
       }
      
    })
}
if(req.body.phoneno){
    Admin.findOne({ where:{phoneno: req.body.phoneno}}).then(user=>{
        if (!user) return res.status(401).send({ auth: false, token: null, message: "User not found with Phone number " + req.body.phoneno });
         if(md5(req.body.password) != user.password){
          return res.status(401).send({ auth: false, token: null, message: "Authentication failed,Password is wrong" });
       }else{
       var token = jwt.sign({exp: user.id, data: user.fname }, 'secret');
      res.status(200).send({ auth: true, id: user.id, token: token, role: user.role, data: { name: user.name,  email: user.email }, message: "Authentication passed" });
       
       }
         })
}
}

exports.profile = (req, res) => {
   Admin.findOne({ where:{ id: req.body.adminId}}).then(user=>{
        if (!user) return res.status(401).send({ message: "User not found" });
        console.log('user',user.dataValues.password)
       return res.status(200).send(user);   
      
    })
}

exports.updateProfile=(req,res) => {
 if(md5(req.body.oldPassword) != md5(req.body.newPassword))
{
   return res.status(401).send({ message: "old password and new password did not match."});
}else{
      Admin.update({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.newPassword),
        phoneno: req.body.phoneno,
       
    },{
        where:{ id: req.params.id}
    }).then(data=>{
        res.send({message:'profile updated successfully'});
    }).catch(err=>{
        res.send({message:'profile updation failed. '});
    })
}
}


exports.addCompany=(req,res) => {
    console.log(req.body);
//   if(md5(req.body.password) != md5(req.body.confirmPassword))
// {
//    return res.status(401).send({ message: "old password and new password did not match."});
// }else{

   const addCompany = new companyinfo({
              compayName:req.body.compayName,
              email:req.body.email,
              phoneNo:req.body.phoneNo,
              landLineNo:req.body.landLineNo,
              aadharNoPanNo:req.body.aadharNoPanNo,
              industryType:req.body.industryType,
              subIndustryType:req.body.subIndustryType,
              contactPersonName:req.body.contactPersonName,
              contactPersonDesigination:req.body.contactPersonDesigination,
              officeAddress:req.body.officeAddress,
              location:req.body.location,
              passsword:req.body.passsword,
              confirmPassword:req.body.confirmPassword,
     });
     addCompany.save(req.body)
        .then(data => {
            res.send({data:data,message:"data saved successfully"});
        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while creating a User. OR company already exists",

            });
        });
     // }
}

exports.editCompany=(req,res)=>{
  Company.findOne({ where:{ id: req.params.id}}).then(company=>{
        if (!company) return res.status(401).send({  message: "company not found " });
   if(md5(req.body.passsword) != md5(req.body.confirmPassword))
     {
     return res.status(401).send({ message: "old password and confirm password did not match."});
       }else{Company.update(req.body ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'company edit successfully'});
    }).catch(err=>{
        res.send({message:'company edit failed. '});
    })
    }
 })
}

exports.deleteCompany=(req,res)=>{
   Company.findOne({ where:{ id: req.params.id}}).then(company=>{
        if (!company) return res.status(401).send({  message: "company not found " });
   Company.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'company delete successfully'});
    }).catch(err=>{
        res.send({message:err+'company delete failed. '});
    })
    })
}


exports.companyList=(req,res)=>{
  Company.findAll()
.then(function(projects) {
  res.json(projects);
})
}



// exports.addCandidate=(req,res)=>{
//   const addCandidate = new Candidate(req.body);
//      addCandidate.save(req.body)
//         .then(data => {
//             res.send({data:data,message:"data saved successfully"});
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message + "Some error occurred while creating a User. OR candidate already exists",

//             });
//         });
// }

exports.editCandidate=(req,res)=>{
   Candidate.findOne({ where:{ id: req.params.id}}).then(candidate=>{
        if (!candidate) return res.status(401).send({  message: "candidate not found " });
  if(md5(req.body.passsword) != md5(req.body.confirmPassword))
{
   return res.status(401).send({ message: "old password and confirm password did not match."});
}else{
   Candidate.update(
        req.body
    ,{
        where:{ id: req.params.id}
    }).then(data=>{
        res.send({message:'candidate edit successfully',data:data});
    }).catch(err=>{
        res.send({message:err+'candidate edit failed. '});
    })
}
    })
}

exports.deleteCandidate=(req,res)=>{
   Candidate.findOne({ where:{ id: req.params.id}}).then(candidate=>{
        if (!candidate) return res.status(401).send({  message: "candidate not found " });
   Candidate.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'candidate delete successfully'});
    }).catch(err=>{
        res.send({message:err+'candidate delete failed. '});
    })
    })
}

exports.candidateList=(req,res)=>{
 Candidate.findAll({
          where: {status: 1}
        })
            .then(function(data) {
            res.json(data);
        }) 
        }

exports.addJobPost=(req,res)=>{
     const addjobPost = new jobPost(req.body);
     addjobPost.save(req.body)
        .then(data => {
            res.send({data:data,message:"data saved successfully"});
        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while creating a User. OR post already exists",

            });
        });    
}

exports.editJobPost=(req,res)=>{
  jobPost.findOne({ where:{ id: req.params.id}}).then(post=>{
        if (!post) return res.status(401).send({  message: "post not found " });
//   if(md5(req.body.passsword) != md5(req.body.confirmPassword))
// {
//    return res.status(401).send({ message: "old password and confirm password did not match."});
// }else{
   jobPost.update(
        req.body
    ,{
        where:{ id: req.params.id}
    }).then(data=>{
        res.send({message:'Post edit successfully',data:data});
    }).catch(err=>{
        res.send({message:err+'post edit failed. '});
    })
    })
// }
}

exports.deleteJobPost=(req,res)=>{
    jobPost.findOne({ where:{ id: req.params.id}}).then(post=>{
        if (!post) return res.status(401).send({  message: "post not found " });
   jobPost.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'Jobpost delete successfully'});
    }).catch(err=>{
        res.send({message:err+'jobpost delete failed. '});
    })
    })
}

exports.jobPostList=(req,res)=>{
  jobPost.findAll({
  where: {status: 1}
})
.then(function(data) {
  res.json(data);
}) 
}
//complaints swction starts
exports.addComplaint=(req,res)=>{
  if(req.body.id == undefined){

  const addComplaintData = new Complaint(req.body)
  addComplaintData.save(req.body)
        .then(data => {
            res.send({data:data,message:"compliant saved successfully"});
        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while creating a compliant. OR compliant already exists",

            });
        });
    }else{
         Complaint.update(req.body ,{where:{ id: req.body.id} }).then(data=>{
        res.send({message:'Complaint update successfully'});
    }).catch(err=>{
        res.send({message:err+'Complaint update failed. '});
    })

    }     
}

//complaints section end
// get all complaints
exports.getComplaints=(req,res)=>{
 Complaint.findAll({where: {status: 1} }) .then(function(data) {
  res.json(data);
}) 
} 

// edit faq
exports.getComplaintsDetails=(req,res)=>{
 Complaint.findOne({where: {id:req.params.id,status: 1} }) .then(function(data) {
  res.json(data);
}) 
}

exports.changeComplaintsStatus=(req,res)=>{
    Complaint.findOne({ where:{ id: req.params.id}}).then(post=>{
        if (!post) return res.status(401).send({  message: "Complaint not found ",status:false });
   Complaint.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'Complaint status change successfully',status:true});
    }).catch(err=>{
        res.send({message:err+'Complaint status change failed.',status:false});
    })
    })
}

//FAQ section start
exports.addFAQ=(req,res)=>{
if(req.body.id == undefined){
  const addFAQData = new FAQ(req.body)
  addFAQData.save()
        .then(data => {
            res.send({data:data,message:"FAQ saved successfully"});
        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while creating a faq.",

            });
        }); 
   }else{
       FAQ.update(req.body ,{where:{ id: req.body.id} }).then(data=>{
        res.send({message:'faq update successfully'});
    }).catch(err=>{
        res.send({message:err+'faq update failed. '});
    })

   }
}

// get all faq
exports.getfaq=(req,res)=>{
 FAQ.findAll({where: {status: 1} }) .then(function(data) {
  res.json(data);
}) 
} 

// edit faq
exports.getfaqDetails=(req,res)=>{
 FAQ.findOne({where: {id:req.params.id,status: 1} }) .then(function(data) {
  res.json(data);
}) 
}

exports.changeFaqStatus=(req,res)=>{
    FAQ.findOne({ where:{ id: req.params.id}}).then(post=>{
        if (!post) return res.status(401).send({  message: "faq not found ",status:false });
   FAQ.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'faq status change successfully',status:true});
    }).catch(err=>{
        res.send({message:err+'faq status change failed.',status:false});
    })
    })
}
//FAQ section end

// employer
exports.addEmployer=(req,res)=>{
  var obj_length=Object.keys(req.body).length;
  console.log('obj_length',obj_length)
  console.log('rew',req.body)

if(req.body.id == undefined){
// if(obj_length > 28 ){
//  return  res.status(200).send({ message: "Post parameter is more than required"});
// }
// else if(obj_length < 28 ){
//  return  res.status(200).send({ message: "Post parameter is less than required"});
// }else{
const Employer = new registration({

          
              company_name:req.body.company,
              industry:req.body.industry,
              email:req.body.email,
              fullName:req.body.fname + ' '+req.body.lname,
              fname:req.body.fname,
              lname:req.body.lname,
              phoneno:req.body.phoneno,
              role_type:1,
              recovery_email:req.body.recovery_email,
              status:1
     });
     Employer.save()
        .then(data => {
                 const CompanyInfo = new companyinfo({
                  user_id:data.id,
                  designation:req.body.designation,
                  company_type:req.body.company_type,
                  company_formed_year:req.body.company_formed_year,
                  company_website:req.body.company_website,
                  company_location:req.body.company_location,
                  company_lat:req.body.company_lat,
                  company_lng:req.body.company_lat,
                  company_branches:req.body.company_branches,
                  company_description:req.body.company_description

                  });

                  const addCandidateAlert = new jobalert({
                   user_id:data.id,
                   designation:req.body.cdesig,
                   qualification:req.body.cqua,
                   shift:req.body.cshift,
                   typeof_employement:req.body.cemp,
                   employement_category:req.body.ccate,
                   industry_category:req.body.cindus,
                   candidate_location:req.body.cloca,
             
                   });
                   addCandidateAlert.save(req.body)
                     .catch(err => {
                          res.status(500).send({
                              message: err.message + "Some error occurred while inserting data in ob alert. OR job post already exists",

                          });
                      });
                  
                 CompanyInfo.save()
                 .then(companyInfodata => {
                      const CompanyBio = new companybio({
                       user_id:data.id,
                       bio_info:req.body.bio_info
                       });
                       CompanyBio.save()
                      .then(companyBiodata => {
                          const CompanyMember = new memberinfo({
                           company_id:companyInfodata.id,
                           member_email_id:req.body.cids,
                           member_phoneno:req.body.mphone,
                           member_name:req.body.mname,
                           member_designation:req.body.mdesig,
                           member_specialization:req.body.mspc
                           
                           });
                           CompanyMember.save()
                          .then(companyMemberdata => {
                              res.send({message:"data saved successfully",status:true});
                          }).catch(err => {
                              res.status(500).send({
                                  message: err.message + "Some error occurred while insering in  company  member. OR companyMenber already exists",

                                                    });
                                  });
                             }).catch(err => {
                              res.status(500).send({
                                  message: err.message + "Some error occurred while inserting in company bio. OR companyBio already exists",

                                                   });
                                      });
              
                            }).catch(err => {
                            res.status(500).send({
                                message: err.message + "Some error occurred while inserting in  company info. OR companyInfo already exists",

                                               });
                               });

        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while inserrting in employer. OR employer already exists",

            });
        });
    // }
}else{
//   console.log('====================================',obj_length);
// console.log(req.body);
// if(obj_length > 30 ){
//  return  res.status(200).send({ message: "Post parameter is more than required"});
// }
// else if(obj_length < 30 ){
//  return  res.status(200).send({ message: "Post parameter is less than required"});
// }else{
   registration.update({
           
             company_name:req.body.company,
              industry:req.body.industry,
              email:req.body.email,
              fullName:req.body.fname + ' '+req.body.lname,
              fname:req.body.fname,
              lname:req.body.lname,
              phoneno:req.body.phoneno,
              recovery_email:req.body.recovery_email,
             

     },
     {where:{ id: req.body.id}})
        .then(data => {
                    jobalert.update(
                     {
                        // user_id:data.id,
                       designation:req.body.cdesig,
                       qualification:req.body.cqua,
                       shift:req.body.cshift,
                       typeof_employement:req.body.cemp,
                       employement_category:req.body.ccate,
                       industry_category:req.body.cindus,
                       candidate_location:req.body.cloca,
                     }, {where:{ user_id: req.body.id}})
                     .catch(err => {
                          res.status(500).send({
                              message: err.message + "Some error occurred while update data in ob alert.",

                          });
                      });
                  
                 companyinfo.update(
                   {
                       // user_id:data.id,
                  designation:req.body.designation,
                  company_type:req.body.company_type,
                  company_formed_year:req.body.company_formed_year,
                  company_website:req.body.company_website,
                  company_location:req.body.company_location,
                  company_lat:req.body.company_lat,
                  company_lng:req.body.company_lat,
                  company_branches:req.body.company_branches,
                  company_description:req.body.company_description

                   },{where:{ user_id: req.body.id}})
                 .then(companyInfodata => {
                       companybio.update(
                         {
                          // user_id:data.id,
                       bio_info:req.body.bio_info  
                         },{where:{ user_id: req.body.id}})
                      .then(companyBiodata => {
                          console.log('----=======',req.body.companyId)

                        //   memberinfo.update(
                        //     {member_phoneno:'123777745' }
                        //      ,{where:{ id: 168} }).then(data=>{
                        //   res.send({message:"data updated successfully",status:true});
                        // }).catch(err=>{
                        //     res.send({message:err+'company memmber update failed. '});
                        // })
                           memberinfo.update(
                             {

                             member_email_id:req.body.cids,
                             member_phoneno:req.body.mphone,
                             member_name:req.body.mname,
                             member_designation:req.body.mdesig,
                             member_specialization:req.body.mspc
                             },
                             {where:{company_id: req.body.companyId.toString}})
                          .then(companyMemberdata => {
                              res.send({message:"data updated successfully",status:true});
                          }).catch(err => {
                              res.status(500).send({
                                  message: err.message + "Some error occurred while update in  company  member.",

                                                    });
                                  });
                             }).catch(err => {
                              res.status(500).send({
                                  message: err.message + "Some error occurred while update in company bio.",

                                                   });
                                      });
              
                            }).catch(err => {
                            res.status(500).send({
                                message: err.message + "Some error occurred while update in  company info.",

                                               });
                               });

        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while update in employer.",

            });
        });
    // }
}
}

exports.getEmployer= (req,res)=>{

 registration.findAll({
  where: {role_type:1},
   include: [
           {model:companybio },
           {model:jobalert },
           {model:companyinfo,
                include: [
                {
                  model: memberinfo
                }
                ]
          }
          ],order: [['updatedAt', 'DESC']] }) .then(function(data) 
  {

    res.json({status:'success',data:data}); 
  })
}

exports.getEmployerDetail= (req,res)=>{

 registration.findOne({
  where: {id: req.params.id},
   include: [
           {model:companybio },
           {model:jobalert },
           {model:companyinfo,
                include: [
                {
                  model: memberinfo
                }
                ]
          }
          ] }) .then(function(data) 
  {
        
        
    res.json({status:'success',data:data}); 
  })
}

exports.uploadEmloyeFile=(req,res)=>{
 res.send({filePath:req.file.path})
}

exports.changeEmployerStatus=(req,res)=>{
    registration.findOne({ where:{ id: req.params.id}}).then(post=>{
        if (!post) return res.status(401).send({  message: "emloyer not found " });
   registration.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'employer status change successfully',status:true});
    }).catch(err=>{
        res.send({message:err+'employer status change failed.',status:false});
    })
    })
}

exports.industryType=(req,res)=>{
  industrytype.findAll()
.then(function(data) {
  res.json(data);
}) 
}

exports.addCandidate=(req,res)=>{
    var obj_length=Object.keys(req.body).length;
 console.log(obj_length)
 console.log(req.body)
 if(req.body.id == undefined){


 const addInUsers = new registration({
              email:req.body.emailid,
              fullName:req.body.fname + ' '+req.body.lname,
              fname:req.body.fname,
              lname:req.body.lname,
              phoneno:req.body.mobileno,
              role_type:2,
              recovery_email:req.body.recoveryEmail,
              status:1
});
     addInUsers.save()
        .then(data => {
             // add candidate bio start
                const candidateBio = new candidate_bio({
                  user_id:data['id'],
                  candidate_info:req.body.aboutYou,
                  special_telent:req.body.specialTalents,
                  sports:req.body.sports,
                  social_responsiblity:req.body.socialResponse
                });
               candidateBio.save()
                  .then(data1 => {
                        
                  }).catch(err => {
                      res.status(500).send({
                          message: err.message + "Some error occurred while creating a candidate bio. OR candidate bio already exists",

                      });
                  });
          // add candidate bio end

           // add candidate info start
                const AddInCandidate = new candidatemodel({
                  user_id:data['id'],
                    date_of_birth:req.body.startDate,
                    gender:req.body.gender,
                    language_knows:req.body.language,
                    marital_status:req.body.matrialStatus,
                    height:req.body.height,
                    differently_abled:req.body.DifferentlyAble,
                     special_telent:req.body.specialTalents,

                });

               AddInCandidate.save()
                  .then(data2 => {
                     
                  }).catch(err => {
                      res.status(500).send({
                          message: err.message + "Some error occurred while creating a candidate info. OR candidate  already exists",

                      });
                  });
          // add candidate info end
           // add candidate work details start
           console.log('hello0',req.body)
                const AddInCandidateWorkDetails = new educationworkdetails({
                  user_id:data['id'],
                   highest_qualification:req.body.qualification,
                   name_institution:req.body.institutename,
                   year_of_passing:req.body.yearPassing,
                   
                });

               AddInCandidateWorkDetails.save()
                  .then(data3 => {
                      res.send({data:data['id'],message:"data saved successfully"});
                  }).catch(err => {
                      res.status(500).send({
                          message: err.message + "Some error occurred while creating a candidate work details.",

                      });
                  });
          // add candidate work details end
        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while creating a candidate(in user table). OR candidate already exists",

            });
        });
 }else{
   console.log('else')
    // Candidate.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
    //     res.send({message:'candidate delete successfully'});
    // }).catch(err=>{
    //     res.send({message:err+'candidate delete failed. '});
    // })
      registration.update(
        {
               email:req.body.emailid,
              fullName:req.body.fname + ' '+req.body.lname,
              fname:req.body.fname,
              lname:req.body.lname,
              phoneno:req.body.mobileno,
              recovery_email:req.body.recoveryEmail, 
        },{where:{ id: req.body.id} }
       )
        .then(data => {
             // add candidate bio start
               candidate_bio.update(
               {
                 candidate_info:req.body.aboutYou,
                  special_telent:req.body.specialTalents,
                  sports:req.body.sports,
                  social_responsiblity:req.body.socialResponse
               },{where:{ user_id: req.body.id} }
               )
                  .then(data => {
                        
                  }).catch(err => {
                      res.status(500).send({
                          message: err.message + "Some error occurred while update a candidate bio.",

                      });
                  });
          // add candidate bio end

           // add candidate info start
               candidatemodel.update(
               {
                    date_of_birth:req.body.startDate,
                    gender:req.body.gender,
                    language_knows:req.body.language,
                    marital_status:req.body.matrialStatus,
                    height:req.body.height,
                    differently_abled:req.body.DifferentlyAble,
                     special_telent:req.body.specialTalents,
                      },{where:{ user_id: req.body.id} }
               )
                  .then(data => {
                     
                  }).catch(err => {
                      res.status(500).send({
                          message: err.message + "Some error occurred while update a candidate info.",

                      });
                  });
          // add candidate info end
           // add candidate work details start
                educationworkdetails.update(
               {    highest_qualification:req.body.qualification,
                  name_institution:req.body.institutename,
                   year_of_passing:req.body.yearPassing, 
                 },{where:{ user_id: req.body.id} }
               )
                  .then(data => {
                      res.send({data:req.body.id,message:"data update successfully"});
                  }).catch(err => {
                      res.status(500).send({
                          message: err.message + "Some error occurred while update a candidate work details.",

                      });
                  });
          // add candidate work details end
        }).catch(err => {
            res.status(500).send({
                message: err.message + "Some error occurred while update a candidate(in user table). OR candidate already exists",

            });
        });
 }
}

exports.getCandidate= (req,res)=>{
   registration.findAll({
  where: {role_type:2},
   include: [
           {model:candidate_bio },
           {model:candidatemodel },
           {model:work },
           {model:education },
           
          ],order: [['updatedAt', 'DESC']] }) .then(function(data) 
  {

    res.json({status:'success',data:data}); 
  })
}

exports.getCandidateDetail= (req,res)=>{

 registration.findOne({
  where: {id: req.params.id,role_type:2},
   include: [
           {model:candidate_bio },
           {model:candidatemodel },
           {model:work },
           {model:education}
          ] }) .then(function(data) 
  {
        
        
    res.json({status:'success',data:data}); 
  })
}

exports.changeCandidateStatus=(req,res)=>{
    registration.findOne({ where:{ id: req.params.id}}).then(post=>{
        if (!post) return res.status(401).send({  message: "candidate not found " });
   registration.update({status:req.params.id1 } ,{where:{ id: req.params.id} }).then(data=>{
        res.send({message:'candidate status change successfully',status:true});
    }).catch(err=>{
        res.send({message:err+'candidate status change failed.',status:false});
    })
    })
}
exports.updateCandidateProfile=(req,res)=>{
 res.send({candidate_profile:req.file.path})
}
exports.insertFileCandidate=(req,res)=>{
 console.log('body',req.body)
 console.log('id',req.params.id)
  registration.update({profile_pic:req.body.profile} ,{where:{ id: req.params.id} }).then(data1=>{
               candidate_bio.update(
                 {profile_pic:req.body.profile,other_img1:req.body.other,other_img2:req.body.pan
                 }
                 
                  ,{where:{ user_id: req.params.id} }).then(data=>{
                        res.send({message:'file inserted successfully',status:true});
                    }).catch(err=>{
                        res.send({message:err+'file insert failed.',status:false});
                    })
        
    }).catch(err=>{
        res.send({message:err+'inserting candidate profile',status:false});
    })
}
exports.updatecandidatProfile=(req,res)=>{
  registration.update({profile_pic:req.body.profile} ,{where:{ id: req.params.id} }).then(data1=>{
     candidate_bio.update(
                 {profile_pic:req.body.profile}
                  ,{where:{ user_id: req.params.id} }).then(data=>{
                        
         res.send({message:'profile uploaded successfully',status:true});
                    })

    }).catch(err=>{
        res.send({message:err+'update failed candidate profile',status:false});
    })
}
exports.updatecandidatotherpic1=(req,res)=>{
  var data={}
  if(req.body.type == 1 ){
data.other_img1=req.body.other
  }else{
    data.other_img2=req.body.pan
  }
            candidate_bio.update( data,{where:{ user_id: req.params.id} }).then(data=>{
                        res.send({message:'other '+req.body.type+' updated successfully',status:true});
                    }).catch(err=>{
                        res.send({message:err+'other  '+req.body.type+' updated failed.',status:false});
                    })
}

/* ==============
   Get All languages
   ==============*/
exports.getLanguages=(req,res)=>{
    Languages.findAll()
        .then(function(data) {
            res.json({
                success: true,
                data: data
            });
            }).catch(err=>{
                res.json({
                    success: false,
                    message: "Something went to wrong! "+err
                })
            }) 
  }

  /* ==============
   Get All qualification
   ==============*/
  exports.getQualification = (req, res) =>{
    Qualification.findAll()
        .then(function(data){
            res.json({
                success: true,
                data: data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "Something went to wrong! "+err
            })
        })
  }

  /* ==============
   Get All institutions
   ==============*/
  exports.getInstitution = (req, res) =>{
    Institution.findAll()
        .then(function(data){
            res.json({
                success: true,
                data: data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "Something went to wrong! "+err
            })
        })
  }

  /* ==============
   Get All Shifts
   ==============*/

   exports.getShifts = (req, res) =>{
    Shifts.findAll()
        .then(function(data){
            res.json({
                success: true,
                data: data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "Something went to wrong! "+err
            })
        })
  }

    /* ==============
   Get All Emploeyemnt Type
   ==============*/

   exports.getEmployementType = (req, res) =>{
    EmployementType.findAll()
        .then(function(data){
            res.json({
                success: true,
                data: data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "Something went to wrong! "+err
            })
        })
  }

    /* ==============
   Get All Designation Type
   ==============*/

   exports.getDesignation = (req, res) =>{
    Designation.findAll()
        .then(function(data){
            res.json({
                success: true,
                data: data
            })
        }).catch(err =>{
            res.json({
                success: false,
                message: "Something went to wrong! "+err
            })
        })
  }