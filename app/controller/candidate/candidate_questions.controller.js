var db = require('../../../config/db.config');

const CandidateQuestionAns = db.userquestionans;
const Candidate = db.candidatemodel;
const Candidate_questions = db.candidate_questions;




exports.create = (req, res) => {
    let questionIdArray
    let answerIdArray
    let questionId = req.body.question_id;
    let answerId = req.body.answer;
    if(questionId && answerId){
        questionIdArray = questionId.split(',');
        answerIdArray = answerId.split(',');

        Object.keys(questionIdArray).forEach(function (key) {
            var questionVal = questionIdArray[key];
            const newCandidateQuestionAns = new CandidateQuestionAns({
                user_id: req.body.user_id,
                question_id: questionVal,
                answer: answerIdArray[key],
            });
            newCandidateQuestionAns.save(function (err) {
                return res.json({
                    error: err,
                    message: "Something went to wrong"
                })
            });
        });
    }
   
     Candidate.update({
         industry: req.body.industry,
         category: req.body.category
     },{
         where: {user_id: req.body.user_id}
     }).then(data =>{
        return res.json({
            success: true,
            message: "Record Insert Succesfully"
        })
     })
    
 };



 exports.findAll = (req,res)=>{
    Candidate_questions.findAll().then(data=>{
        return res.json({
            success: true,
            message: "Data Found",
            data: data,
        })
    }).catch(err=>{
        return res.json({
            success: false,
            message: "Something went to wrong "+err
        })
    })
}
