
module.exports = (app) => {
  const authforgot = require('../../controller/auth/forgotpassword.controller');
  const verifyemail = require('../../controller/auth/verifyemail.controller');
  const interviewcollection = require('../../controller/auth/interviewcollection.controller');
  const feedcollection = require('../../controller/auth/feedcollection.controller');
  const jobpostcollection = require('../../controller/auth/jobpost.controller');
  const industry = require('../../controller/auth/industrytype.controller');
  const userquestionans = require('../../controller/auth/userquestionans.controller');
  const questions = require('../../controller/auth/questionary.controller');
  const category = require('../../controller/auth/categorytype.controller');
  const companyinfo = require('../../controller/auth/company_info.controller');
  const companybio = require('../../controller/auth/company_bio.controller');
  const recoverymail = require('../../controller/auth/recovermail.controller');
  const companymember = require('../../controller/auth/company_member.controller');
  const jobalert = require('../../controller/auth/jobalert.controller');
  const employer_filter = require('../../controller/auth/employer_filter.controller');
  const bookmarks = require('../../controller/auth/bookmarks.controller');
  const swip_match = require('../../controller/candidate/swip_match.controller');
  const common_controller = require('../../controller/auth/common.controller');
  var multer = require('multer');
  const path = require('path');
  
  const email = require('../../../helper/custom.helper');
  const verifylogin = require('../../middleware/token.verify.middleware');

  // const candidate = require('../../controller/auth/candidate.controller');
  const registration = require('../../controller/auth/registration.controller');
  
  // const join = require('../../controller/auth/join.controller');
  const profileSettinginfo = require('../../controller/auth/profile_setting.controller');
  //  Create a new User
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/images/companyIdCard/')
    },
    filename: function (req, file, callback) {

      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  let upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      let ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }
      callback(null, true)
    }
  });


  // company bio profile pic upload

  
  let storage_bio1 = multer.diskStorage({
    destination: function (req, file, callback) {
      let ext = path.extname(file.originalname)
       if (ext === '.jpeg' || ext === '.txt' || ext === '.pdf' || ext === '.png' || ext === '.doc' || ext === 'docx' || ext === '.jpg') {
          callback(null, 'public/employer_file/profile/')
        }else if(ext === '.mp4' || ext === '.MP2T' || ext === '.mov'){
          callback(null, 'public/employer_file/requirementVideo/')
        } else {
          callback({ error: 'Mime type not supported' })
        }
       
    },
    filename: function (req, file, callback) {

        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload_company_bio = multer({ storage: storage_bio1 })

  // company info logo upload

  let storage_logo = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/images/companyLogo/')
    },
    filename: function (req, file, callback) {

      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  let uploadLogo = multer({
    storage: storage_logo,
    fileFilter: function (req, file, callback) {
      let ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
      }
      callback(null, true)
    }
  });




  /*==========================
  upload feed image and video
============================*/

let feed_storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'text/plain' || file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'image/png') {
        callback(null, 'public/feedcollection/feedImage')
      } else if (file.mimetype === 'video/mp4' ||file.mimetype === 'application/x-mpegURL' ||file.mimetype === 'video/MP2T') {
        callback(null, 'public/feedcollection/feedVideo')
      } else {
        callback({ error: 'Mime type not supported' })
      }
     
  },
  filename: function (req, file, callback) {

      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var uploadFeed = multer({ storage: feed_storage })
 
  /* ========Forgot password====*/

  app.post('/forgotpassword', authforgot.forgotpass);
  app.post('/matchotp', authforgot.matchotp);
  app.post('/resetpassword', authforgot.resetpass);

   /* =====email verification======*/
   app.post('/verifyemail', verifyemail.emailverify);
   app.post('/verifyemailcheckotp', verifyemail.matchotp);
  
   /*
     User login and registration
   */
  
   app.post('/registration', upload.single('profile_pic'), registration.create);
   app.post('/login', registration.login);
 
 
  /* =================
     Interview collection
     =================*/

  app.post('/interviewcollection', verifylogin, interviewcollection.create);

  /* =================
     Job Feed collection
     =================*/

  app.post('/postfeed', verifylogin, uploadFeed.any(),feedcollection.create);

  app.post('/feedcomments', feedcollection.createfeedcomment);

  app.post('/feedlike', verifylogin, feedcollection.createfeedLike)

  /* =================
   Job Post collection
   =================*/

  app.post('/jobpostcreate', verifylogin, jobpostcollection.create);
  app.patch('/updatejobpost/:userId', verifylogin, jobpostcollection.update);
  app.post('/getjobposts', verifylogin, jobpostcollection.getJobPost);

  /* =================
     Get Industry Type
     =================*/
  app.get('/industries', industry.findAll);
  app.get('/categories', category.findAll);

  /* =================
    Get Questions
    =================*/
  app.get('/questions', verifylogin, questions.findAll);


  /* =================
    Post question and answer
    =================*/
  app.post('/userquestionanswer', verifylogin, userquestionans.create);

  /* =================
  Post Company info
  =================*/
  app.post('/companyinfo', verifylogin, uploadLogo.single('company_logo'), companyinfo.create);
  app.put('/updatecompanyinfo',verifylogin, uploadLogo.single('company_logo'), companyinfo.updatecompanyinfo);

  app.get('/getcompanytype', companyinfo.getCompanyType);

  /* =================
  Post Company Bio
  =================*/
  // app.post('/companybio', verifylogin, uploadProfile.single('profile_pic'), companybio.create);
  app.post('/companybio',verifylogin, upload_company_bio.any(), companybio.create);
  app.put('/updatecompanybio', verifylogin, upload_company_bio.any(),companybio.updatecompanybio);

  /* =================
   recovery mail
  =================*/
  app.put('/recoverymail', verifylogin, recoverymail.update);

  /* =================
   Company member
   =================*/
  app.post('/companymember', verifylogin, companymember.create);
  app.post('/companymembers', verifylogin, companymember.findById);
  app.post('/delete_companymembers', verifylogin, companymember.deleteById);
  app.put('/companymember', verifylogin, companymember.update);
  // 4 -Dec Dev

  // app.get('/jointable', join.findProfile);
  app.post('/getProfileSettinginfo', verifylogin, profileSettinginfo.findProfileSetting);
  //12-dev

  /* =================
      candidate alert
      =================*/
  app.post('/jobalert', verifylogin, jobalert.create);
  app.post('/getJobalert', verifylogin, jobalert.findAll);
  app.put('/jobalertupdate', verifylogin, jobalert.update);

  /* ==============
     job filters
     ==============*/
  app.post('/employer_swip_filter',verifylogin, employer_filter.filter);

  // 5 Dec DEV
 
  app.put('/user_update',verifylogin, registration.partial_update)

  app.post('/addbookmarks',verifylogin, bookmarks.create);

  /* ==============
     get saved jobs
     ==============*/
  app.post('/getsavedjobs', verifylogin, bookmarks.getsavedjobs);

   /* ==============
     get candidates matched related with jobs
     ==============*/
  app.post('/getcandidatesjobs',verifylogin, swip_match.getcandidatesjobs);   

   /* ==============
     view Applicantes matched related with jobs
     ==============*/
  app.post('/viewapplicants',verifylogin, jobpostcollection.viewapplicants);   

  /* ==============
    Get branches
     ==============*/
     app.get('/branches',verifylogin, common_controller.getbranches);   

     /* ==============
    Get company name
     ==============*/
     app.get('/companyname', common_controller.getcompanyname);   


}