var db = require('../../../config/db.config');

const UserQuestionAns = db.userquestionans;
const Registration = db.registration;



exports.create = (req, res) => {
    if (!req.body.user_id) {
        return res.json({
            auth: false,
            message: "User Id can not be empty"
        })
    }
    if (!req.body.role_type) {
        return res.json({
            auth: false,
            message: "Role type can not be empty"
        })
    }
    let questionIdArray
    let answerIdArray
    let questionId = req.body.question_id;
    let answerId = req.body.answer;
    if (questionId && answerId) {
        questionIdArray = questionId.split(',');
        answerIdArray = answerId.split(',');

        Object.keys(questionIdArray).forEach(function (key) {
            var questionVal = questionIdArray[key];
            const newUserQuestionAns = new UserQuestionAns({
                user_id: req.body.user_id,
                question_id: questionVal,
                answer: answerIdArray[key],
            });
            newUserQuestionAns.save(function (err) {
                return res.json({
                    error: err,
                    message: "Something went to wrong"
                })
            });
        });
    }
    // if (req.body.role_type == 1) {
        Registration.update({
            industry: req.body.industry,
            category: req.body.category
        }, {
            where: { id: req.body.user_id }
        }).then(data => {
            return res.json({
                status: 200,
                auth: true,
                message: "Record Insert Succesfully"
            })
        }).then(err =>{
            return res.json({
                status: 200,
                auth: false,
                message: "Something went to wrong!"
            })
        })
    // }
    //  else if (req.body.role_type == 2) {
    //     Candidate.update({
    //         industry: req.body.industry,
    //         category: req.body.category
    //     }, {
    //         where: { user_id: req.body.user_id }
    //     }).then(data => {
    //         return res.json({
    //             success: true,
    //             message: "Record Insert Succesfully"
    //         })
    //     }).then(err =>{
    //         return res.json({
    //             status: 200,
    //             auth: false,
    //             message: "Something went to wrong!"
    //         })
    //     })
    // }



};
