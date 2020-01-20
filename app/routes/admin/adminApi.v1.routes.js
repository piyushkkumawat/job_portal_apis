module.exports = (app) => {
    const admin = require('../../controller/admin/admin.controller');
    var multer = require('multer');
    const path = require('path');
    const email = require('../../../helper/custom.helper');
      

const candidateProfilestorage = multer.diskStorage({
   destination: "./public/candidate_file/Pictures/",
   filename: function(req, file, cb){
     cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
   }
});

  let candidateProfileupload = multer({
    storage: candidateProfilestorage,
    fileFilter: function (req, file, callback) {
      let ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }
      callback(null, true)
    }
  });
    

 const employeProfilestorage = multer.diskStorage({
   destination: "./public/employer_file/profile/",
   filename: function(req, file, cb){
     cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
   }
});

  let employeProfileupload = multer({
    storage: employeProfilestorage,
    fileFilter: function (req, file, callback) {
      let ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }
      callback(null, true)
    }
  });


app.post('/adminlogin',admin.login)
app.post('/adminProfile',admin.profile);
app.post('/adminUpdateProfile/:id',admin.updateProfile);

app.post('/addCompany',admin.addCompany);
app.post('/editCompany/:id',admin.editCompany);
app.get('/companyList',admin.companyList);

// id=userId ,id1=status
app.get('/deleteCompany/:id/:id1',admin.deleteCompany);

app.post('/editCandidate/:id',admin.editCandidate);
// id=userId ,id1=status
app.get('/deleteCandidate/:id/:id1',admin.deleteCandidate);

app.get('/candidateList',admin.candidateList);

app.post('/addJobPost',admin.addJobPost);
app.post('/editJobPost/:id',admin.editJobPost);


// id=userId ,id1=status
app.get('/deleteJobPost/:id/:id1',admin.deleteJobPost);
app.get('/jobPostList',admin.jobPostList);

// conplaints section start
app.post('/addComplaint',admin.addComplaint);
app.get('/getComplaints',admin.getComplaints);
app.get('/getComplaintsDetails/:id',admin.getComplaintsDetails);
app.get('/changeComplaintsStatus/:id/:id1',admin.changeComplaintsStatus);
// conplaints section end


// faq section start
app.post('/addFAQ',admin.addFAQ);
app.get('/getfaq',admin.getfaq);
app.get('/getfaqDetails/:id',admin.getfaqDetails);
app.get('/changeFaqStatus/:id/:id1',admin.changeFaqStatus);


// faq section end

//employer
app.post('/addEmployer',employeProfileupload.single('profilepic'),admin.addEmployer);
app.get('/getEmployer',admin.getEmployer)
app.get('/getEmployerDetail/:id',admin.getEmployerDetail)
app.get('/changeEmployerStatus/:id/:id1',admin.changeEmployerStatus)

// get industry type
app.get('/industryType',admin.industryType)

//candidate
app.post('/addCandidate',admin.addCandidate)
app.get('/getCandidate',admin.getCandidate)
app.get('/changeCandidateStatus/:id/:id1',admin.changeCandidateStatus)
app.get('/getCandidateDetail/:id',admin.getCandidateDetail)
app.post('/insertFileCandidate/:id',admin.insertFileCandidate)

app.post('/updatecandidatProfile/:id',admin.updatecandidatProfile)
app.post('/updatecandidatotherpic1/:id',admin.updatecandidatotherpic1)

  app.post('/upload', candidateProfileupload.single('myImage'), admin.updateCandidateProfile);
  app.post('/uploadEmloyeFile', employeProfileupload.single('myImage'), admin.uploadEmloyeFile);

  // Get all languages
  app.get('/getLanguages',admin.getLanguages);

  //  Get all qualification
  app.get('/getQualification',admin.getQualification);

  //  Get all institution
  app.get('/getInstitutions',admin.getInstitution);

  //  Get all shifts
  app.get('/getShifts',admin.getShifts);

  //  Get all employement type
  app.get('/getEmployementType',admin.getEmployementType);

  //  Get all designation type
  app.get('/getDesignation',admin.getDesignation);

  // app.post('/upload', function(req, res) {
  //       candidateProfileupload(req,res,function(err){
  //           console.log(req.file.originalname);
  //           if(err){
  //                res.json({status:false,err_desc:err});
  //                return;
  //           }
  //            res.json({status:true,fileName:req.file.originalname});
  //       });
  //   });


}