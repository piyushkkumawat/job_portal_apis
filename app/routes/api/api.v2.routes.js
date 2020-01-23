module.exports = (app) => {
    var multer = require('multer');
    const path = require('path');
    const candidate = require('../../controller/candidate/candidate.controller');
    const eduactiondetails = require('../../controller/candidate/educationwork.controller');
    const email = require('../../../helper/custom.helper');
    const verifylogin = require('../../middleware/token.verify.middleware');
    const candidatequestionandanswer = require('../../controller/candidate/candidate_questions.controller');
    const candidatequestions = require('../../controller/candidate/candidate_questions.controller');
    const candidatebio = require('../../controller/candidate/candidate_bio.controller');
    const iqQuestions = require('../../controller/candidate/iqQuestions.controller');
    


  
    // candidate bio resume file

    let candidate_bio_file = multer.diskStorage({
      destination: function (req, file, callback) {
        console.log(file.originalname);
        let ext = path.extname(file.originalname)
        if (ext === '.jpeg' || ext === '.txt' || ext === '.pdf' || ext === '.png' || ext === '.doc' || ext === 'docx' || ext === '.jpg') {
            callback(null, 'public/candidate_file/candidateResumes/')
        }else if(ext === '.mp4' || ext === '.MP2T'){
            callback(null, 'public/candidate_file/candidateResumeVideos/')
        }else{
          callback({ error: 'file type not supported' })
        }
        // if (file.mimetype === 'image/jpeg' || file.mimetype === 'text/plain' || file.mimetype === 'pdf' || file.mimetype === 'vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'image/png' || file.mimetype === 'docx') {
        //     callback(null, 'public/candidate_file/candidateResumes/')
        //   } else if (file.mimetype === 'video/mp4' ||file.mimetype === 'application/x-mpegURL' ||file.mimetype === 'video/MP2T') {
        //     callback(null, 'public/candidate_file/candidateResumeVideos/')
        //   } else {
        //     callback({ error: 'Mime type not supported' })
        //   }
         
      },
      filename: function (req, file, callback) {

          callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
  })

var upload = multer({ storage: candidate_bio_file })

      /*==========================
     candidate iqQuestion upload
     ===========================*/

let candidate_iqQuestion_file = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/candidate_file/iqQuestionImage')
  },
  filename: function (req, file, callback) {

    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var uploadIqQuestionImage = multer({ 
  storage: candidate_iqQuestion_file,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(res.end('Only images are allowed'), null)
    }
    callback(null, true)
  }
 })

      /*==========================
     candidate registration
     ===========================*/

    app.post('/candidate_update_basicinfo',verifylogin, candidate.createBasicInfo);

      /*==========================
     candidate Filter
     ===========================*/
     app.post('/candidate_swip_filter',verifylogin, candidate.filter);
    
     /*==========================
     education details API
     ===========================*/

    app.post('/post_eduaction_details',verifylogin, eduactiondetails.create_education);
    app.post('/get_eduaction_detail',verifylogin, eduactiondetails.findeducation);
    app.put('/update_eduaction_detail', verifylogin, eduactiondetails.update_education);
     app.post('/delete_education_detail', verifylogin, eduactiondetails.delete_education);

    //   /*==========================
    //  work details API
    //  ===========================*/

     app.post('/post_work_details', verifylogin, eduactiondetails.create_work);
     app.post('/get_work_detail',verifylogin, eduactiondetails.findwork);
     app.put('/update_work_detail', verifylogin, eduactiondetails.update_work);
     app.post('/delete_work_detail', verifylogin, eduactiondetails.delete_work);
     
    /* =================
    Post question and answer and update industry and category
    =================*/
   app.post('/candidatequestionandanswer', verifylogin, candidatequestionandanswer.create);

     /* =================
    Get Questions
    =================*/
   app.get('/candidatequestions', verifylogin, candidatequestions.findAll);


   /* =================
    Candidate Bio info
    =================*/
    app.post('/createcandidatebio',verifylogin, upload.any(), candidatebio.create);
    app.post('/getcandidatebio',verifylogin, candidatebio.findOne);
    app.put('/updatecandidatebio', upload.any(),  candidatebio.update);

    app.get('/getcandidateprofile', candidate.findProfile);
    // app.get('/candidatefilter', candidate.findFilterProfile);


     /*==========================
     candidate iq questions
     ===========================*/

     app.post('/createiqQuestion',verifylogin, uploadIqQuestionImage.single('questionImage'), iqQuestions.create);
     app.get('/get_iqQuestion', iqQuestions.findAll);
     app.post('/submitTest',verifylogin, iqQuestions.testsubmit);

     /*==========================
     candidate iq questions result
     ===========================*/

     app.get('/get_iqQuestion_result', iqQuestions.findIqResult);

  
  }